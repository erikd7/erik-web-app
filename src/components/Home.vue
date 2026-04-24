<template>
  <div class="p-10">
    <div class="flex flex-row justify-between mobile-one-col">
      <div
        class="flex flex-column justify-center items-center"
        style="flex-basis: 40%;"
      >
        <div
          class="flex flex-col justify-center flex-nowrap text-6xl font-normal leading-normal mt-0 mb-1 p-2"
          style="color: #60789e;"
        >
          <span class="slide-in-from-left">
            <div>Erik&nbsp;</div>
            <div>Dietrich</div></span
          >
          <div class="fade-in flex flex-row justify-around text-2xl">
            <a
              href="https://www.linkedin.com/in/erik-dietrich-000506134/"
              target="_blank"
            >
              <i class="hover-grow cursor-pointer fab fa-linkedin" />
            </a>
            <a href="https://github.com/erikd7" target="_blank">
              <i class="hover-grow cursor-pointer fab fa-github" />
            </a>
            <a href="https://wellfound.com/u/erik-dietrich-1" target="_blank">
              <i class="hover-grow cursor-pointer fab fa-angellist" />
            </a>
          </div>
        </div>
      </div>
      <div
        class="fade-in mt-0 mb-1 p-2 flex flex-row justify-center"
        style="--duration: .5s"
      >
        <img src="../data/coverPhoto.jpeg" class="image-display" />
      </div>
      <div
        class="flex flex-col flex-grow justify-center items-stretch font-normal leading-normal mt-0 mb-1 p-2"
        style="color: #60789e"
      >
        <div class="slide-fade-right text-left text-4xl">
          Full stack engineer&nbsp;
        </div>
        <div class="slide-fade-left text-center text-2xl">
          designing, building, and continuously improving end-to-end systems
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center mobile-one-col">
      <CardTile
        className="slide-fade-right"
        style="--duration: .5s"
        header="End-to-End Ownership"
        headerClass="text-3xl"
      >
        <template v-slot:body
          >Designs, builds, and ships production systems from UX through backend
          and deployment</template
        >
      </CardTile>
      <CardTile
        className="slide-fade-right"
        style="--duration: 1s"
        header="Product-Minded Engineering"
        headerClass="text-3xl"
      >
        <template v-slot:body
          >Turns ambiguous business problems into reliable, user-facing
          solutions</template
        >
      </CardTile>
      <CardTile
        className="slide-fade-right"
        style="--duration: 1.5s"
        header="Systems at Scale"
        headerClass="text-3xl"
      >
        <template v-slot:body
          >Builds and operates high-impact systems with strong performance,
          consistency, and reliability</template
        >
      </CardTile>
      <CardTile
        className="slide-fade-right"
        style="--duration: 2s"
        header="Execution & Leadership"
        headerClass="text-3xl"
      >
        <template v-slot:body
          >Drives technical design, mentors engineers, and improves team
          velocity through pragmatic process</template
        >
      </CardTile>
    </div>
  </div>
</template>

<script>
import CardTile from "../SharedComponents/CardTile.vue";
export default {
  components: { CardTile },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-weight: bold;
}
</style>
