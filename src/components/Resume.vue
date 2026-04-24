<template>
  <div class="mainPane-container">
    <div class="resume-embed-container slide-fade-up-grandchild">
      <div class="resume-actions fade-in" style="--duration: 0.8s">
        <button
          class="resume-download-button"
          :disabled="isDownloadingPdf"
          @click="handleDownloadPdf"
        >
          {{ isDownloadingPdf ? "Preparing PDF..." : "Download PDF" }}
        </button>
      </div>
      <div
        :class="[
          'resume-embed-viewport',
          { 'resume-embed-hidden': !isLoaded },
          { 'fade-in': isLoaded },
        ]"
        style="--duration: 1.8s"
      >
        <iframe
          ref="resumeEmbed"
          :class="[
            'resume-embed',
            { 'resume-embed-hidden': !isLoaded },
            { 'fade-in': isLoaded },
          ]"
          src="https://erikd7.github.io/resume/"
          title="Resume"
          scrolling="no"
          style="--duration: 1.8s"
          @load="handleLoad"
        />
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      isLoaded: false,
      resumeUrl: "https://erikd7.github.io/resume/",
      isDownloadingPdf: false,
    };
  },
  methods: {
    handleLoad() {
      window.requestAnimationFrame(() => {
        this.isLoaded = true;
      });
    },

    async handleDownloadPdf() {
      if (this.isDownloadingPdf) {
        return;
      }

      this.isDownloadingPdf = true;

      let sandbox = null;
      let hiddenFrame = null;

      try {
        const response = await fetch(this.resumeUrl);
        const resumeHtml = await response.text();
        hiddenFrame = document.createElement("iframe");
        hiddenFrame.setAttribute("aria-hidden", "true");
        hiddenFrame.style.position = "fixed";
        hiddenFrame.style.right = "0";
        hiddenFrame.style.bottom = "0";
        hiddenFrame.style.width = "0";
        hiddenFrame.style.height = "0";
        hiddenFrame.style.border = "0";
        hiddenFrame.style.visibility = "hidden";
        document.body.appendChild(hiddenFrame);

        await this.writeFrameContent(hiddenFrame, resumeHtml);
        await this.waitForFrameToRender(hiddenFrame);

        const frameDocument = hiddenFrame.contentDocument;
        const printableSource =
          frameDocument.querySelector(".page") || frameDocument.body;
        const printableClone = printableSource.cloneNode(true);

        this.copyComputedStyles(
          printableSource,
          printableClone,
          hiddenFrame.contentWindow,
        );
        this.makeAssetUrlsAbsolute(printableClone);
        this.applyPdfFixups(printableClone);

        sandbox = document.createElement("div");
        sandbox.className = "resume-pdf-sandbox";
        sandbox.appendChild(printableClone);
        document.body.appendChild(sandbox);

        await this.waitForSandboxToRender(sandbox);

        const printableElement = sandbox.querySelector(".page") || sandbox;

        await html2pdf()
          .set({
            filename: "DietrichErikResume.pdf",
            margin: 0,
            pagebreak: { mode: ["css", "legacy"] },
            html2canvas: {
              scale: 2,
              useCORS: true,
              backgroundColor: "#ffffff",
            },
            jsPDF: {
              unit: "in",
              format: "letter",
              orientation: "portrait",
            },
          })
          .from(printableElement)
          .save();
      } catch (error) {
        console.error("Failed to generate resume PDF", error);
      } finally {
        if (sandbox) {
          document.body.removeChild(sandbox);
        }

        if (hiddenFrame) {
          document.body.removeChild(hiddenFrame);
        }

        this.isDownloadingPdf = false;
      }
    },
    async writeFrameContent(frame, html) {
      const frameDocument = frame.contentDocument;
      const htmlWithBase = html.includes("<base")
        ? html
        : html.replace("<head>", `<head><base href="${this.resumeUrl}" />`);

      await new Promise((resolve) => {
        frame.onload = resolve;
        frameDocument.open();
        frameDocument.write(htmlWithBase);
        frameDocument.close();
      });
    },
    copyComputedStyles(sourceElement, targetElement, sourceWindow) {
      if (
        sourceElement.nodeType !== Node.ELEMENT_NODE ||
        targetElement.nodeType !== Node.ELEMENT_NODE
      ) {
        return;
      }

      const computedStyle = sourceWindow.getComputedStyle(sourceElement);
      const styleText = Array.from(computedStyle)
        .map((propertyName) => {
          return `${propertyName}: ${computedStyle.getPropertyValue(
            propertyName,
          )};`;
        })
        .join(" ");

      targetElement.style.cssText = styleText;

      Array.from(sourceElement.children).forEach((child, index) => {
        this.copyComputedStyles(
          child,
          targetElement.children[index],
          sourceWindow,
        );
      });

      this.copyPseudoBefore(sourceElement, targetElement, sourceWindow);
    },
    copyPseudoBefore(sourceElement, targetElement, sourceWindow) {
      const pseudoStyle = sourceWindow.getComputedStyle(
        sourceElement,
        "::before",
      );
      const pseudoContent = pseudoStyle.content;

      if (
        !pseudoContent ||
        pseudoContent === "none" ||
        pseudoContent === "normal" ||
        pseudoContent === '""'
      ) {
        return;
      }

      const beforeNode = document.createElement("span");
      beforeNode.setAttribute("aria-hidden", "true");
      beforeNode.textContent = this.parsePseudoContent(pseudoContent);

      const styleText = Array.from(pseudoStyle)
        .filter((propertyName) => propertyName !== "content")
        .map((propertyName) => {
          return `${propertyName}: ${pseudoStyle.getPropertyValue(
            propertyName,
          )};`;
        })
        .join(" ");

      beforeNode.style.cssText = styleText;
      targetElement.prepend(beforeNode);
    },
    parsePseudoContent(content) {
      const trimmedContent = content.trim();

      if (
        (trimmedContent.startsWith('"') && trimmedContent.endsWith('"')) ||
        (trimmedContent.startsWith("'") && trimmedContent.endsWith("'"))
      ) {
        return trimmedContent.slice(1, -1);
      }

      return trimmedContent;
    },
    makeAssetUrlsAbsolute(rootElement) {
      rootElement.querySelectorAll("[src], [href]").forEach((element) => {
        if (element.hasAttribute("src")) {
          element.setAttribute(
            "src",
            new URL(element.getAttribute("src"), this.resumeUrl).href,
          );
        }

        if (
          element.tagName === "A" &&
          element.hasAttribute("href") &&
          !element.getAttribute("href").startsWith("#")
        ) {
          element.setAttribute(
            "href",
            new URL(element.getAttribute("href"), this.resumeUrl).href,
          );
        }
      });
    },
    applyPdfFixups(rootElement) {
      rootElement.querySelectorAll("h2").forEach((heading) => {
        const currentPaddingBottom =
          parseFloat(heading.style.paddingBottom) || 0;
        const currentMarginBottom = parseFloat(heading.style.marginBottom) || 0;

        heading.style.paddingBottom = `${Math.max(currentPaddingBottom, 6)}px`;
        heading.style.marginBottom = `${Math.max(currentMarginBottom, 8)}px`;
      });
    },
    async waitForSandboxToRender(sandbox) {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const images = Array.from(sandbox.querySelectorAll("img"));
      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve();
          }

          return new Promise((resolve) => {
            image.onload = resolve;
            image.onerror = resolve;
          });
        }),
      );

      await new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          window.setTimeout(resolve, 250);
        });
      });
    },
    async waitForFrameToRender(frame) {
      const frameWindow = frame.contentWindow;
      const frameDocument = frame.contentDocument;

      if (frameDocument.fonts?.ready) {
        await frameDocument.fonts.ready;
      }

      const images = Array.from(frameDocument.images || []);
      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve();
          }

          return new Promise((resolve) => {
            image.onload = resolve;
            image.onerror = resolve;
          });
        }),
      );

      await new Promise((resolve) => {
        frameWindow.requestAnimationFrame(() => {
          frameWindow.setTimeout(resolve, 250);
        });
      });
    },
  },
};
</script>

<style scoped>
.resume-embed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: transparent;
}

.resume-actions {
  width: 816px;
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.resume-download-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  padding: 0.65rem 1rem;
  border: 0;
  background: #60789e;
  color: #fff;
  font-weight: 600;
  border-radius: 9999px;
  box-shadow: 0 10px 20px rgba(20, 34, 51, 0.12);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
}

.resume-download-button:hover {
  background: #4f678a;
  box-shadow: 0 14px 28px rgba(20, 34, 51, 0.18);
  transform: translateY(-1px);
}

.resume-embed-viewport {
  width: 816px;
  max-width: 100%;
  height: 1056px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(20, 34, 51, 0.12),
    0 2px 8px rgba(20, 34, 51, 0.08);
}

.resume-embed {
  width: 1085px;
  height: 1056px;
  border: 0;
  display: block;
  background: transparent;
  overflow: hidden;
  transform: translateX(-135px);
  transform-origin: top left;
}

.resume-embed-hidden {
  opacity: 0;
}

@media only screen and (max-width: 650px) {
  .resume-actions {
    width: 100%;
    justify-content: center;
    padding: 0 1rem;
  }

  .resume-embed-viewport {
    width: 100%;
    height: 1056px;
  }

  .resume-embed {
    width: 100%;
    height: 1056px;
    transform: none;
  }
}

.resume-download-button:disabled {
  background: #8ea0ba;
  cursor: wait;
  transform: none;
  box-shadow: 0 10px 20px rgba(20, 34, 51, 0.08);
}

.resume-download-button:disabled:hover {
  background: #8ea0ba;
  box-shadow: 0 10px 20px rgba(20, 34, 51, 0.08);
}

.resume-pdf-sandbox {
  position: absolute;
  left: -10000px;
  top: 0;
  width: 8.5in;
  min-height: 11in;
  background: #fff;
}
</style>
