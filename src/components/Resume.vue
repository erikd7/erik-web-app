<template>
  <div class="card-array">
    <!--New Column-->
    <div class="flex-grow-0 flex-shrink">
      <!--Photo-->
      <CardTile class="flex-grow-0-imp">
        <div class="flex-container flex justify-center">
          <div>
            <img src="../data/coverPhoto.jpeg" class="image-display" />
          </div>
        </div>
      </CardTile>
      <!--Contact Info-->
      <CardTile header="Contact Information">
        <div class="flex flex-col">
          <div
            v-for="detail in contactDetails"
            :key="detail.label"
            class="flex flex-col"
          >
            <div class="list-label">{{ detail.label }}</div>
            <div class="list-info">
              <a
                v-if="detail.label === 'email'"
                class="link"
                :href="`mailto:${detail.info}`"
              >
                {{ detail.info }}
              </a>
              <a v-else>
                {{ detail.info }}
              </a>
            </div>
          </div>
        </div>
      </CardTile>
      <CardTile header="Links">
        <div v-for="link in links" :key="link.title" class="flex flex-col">
          <div>
            <a class="link" :href="link.url" target="_blank">{{
              link.title
            }}</a>
          </div>
        </div>
      </CardTile>
    </div>
    <!--New Column-->
    <div class="flex-grow">
      <!--Education-->
      <a v-for="(education, index) in educationList" :key="index">
        <CardTile>
          <div class="card-header">
            <a class="font-bold">
              {{ education.institution.name }}
            </a>
            <a class="text-sm">
              class of
            </a>
            <a class="font-bold">
              {{ education.graduationYear }}
            </a>
          </div>
          <div>
            {{ education.degree }}
            <a v-if="education.distinction" class="text-sm">
              with
            </a>
            <a>
              {{ education.distinction }}
            </a>
          </div>
          universitying
          <div
            v-for="(focus, index) in education.majors.concat(education.minors)"
            :key="index"
          >
            <div>
              {{ focus }}
            </div>
          </div>
        </CardTile>
      </a>
      <!--Languages-->
      <CardTile header="Languages">
        <SkillsList :skills="languagesAndFrameworks"></SkillsList>
      </CardTile>
      <CardTile header="Frameworks & Libraries">
        <SkillsList :skills="frameworks"></SkillsList>
      </CardTile>
      <CardTile header="Development Apps">
        <SkillsList :skills="apps"></SkillsList>
      </CardTile>
    </div>
    <!--New Column-->
    <div class="flex-grow">
      <CardTile header="Experience">
        <div>experience - NM</div>
      </CardTile>
      <CardTile>
        <div>
          Software Developer and Project Manager, Epic Systems. As a Software
          Developer: Led design and development of customer-facing project
          management web app focusing on optimization of customer
          decision-making processes. Used SQL, C#, JS Vue, and HTML/CSS with
          GitLab source control. Coordinated all parts of the SDLC, from initial
          scoping and design through development, testing, go-live, and
          continuous improvement. As a Project Manager: responsible for
          configuring large-scale software suite for healthcare organizations.
          Managed 20-member team. Member of Epic’s Infection Control Product
          Leads team during the COVID-19 response.
        </div>
      </CardTile>
      <CardTile>
        <div>experience - duke</div>
      </CardTile>
      <CardTile>
        <div>honors</div>
      </CardTile>
    </div>
  </div>
</template>

<script>
import CardTile from "../SharedComponents/CardTile";
import SkillsList from "../SharedComponents/SkillsList";
export default {
  components: { CardTile, SkillsList },
  props: {
    resume: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      contactDetails: [
        {
          label: "email",
          info: "erik.dietrich.b@gmail.com",
        },
        {
          label: "phone",
          info: "(724) 799-4475",
        },
        {
          label: "location",
          info: "Madison, WI & Remote",
        },
      ],
      educationList: [
        {
          institution: {
            name: "Virginia Tech",
            location: "Blacksburg, VA",
          },
          graduationYear: 2018,
          degree: "Bachelor of Science",
          majors: ["Industrial and Systems Engineering"],
          minors: ["Economics"],
          distinction: "Magna Cum Laude",
        },
      ],
      links: [
        {
          title: "LinkedIn",
          tooltip: "My LinkedIn page",
          url: "https://www.linkedin.com/in/erik-dietrich-000506134/",
        },
        {
          title: "GitHub",
          tooltip: "My GitHub profile - including this repo",
          url: "https://github.com/normalone7",
        },
      ],
      languagesAndFrameworks: [
        {
          name: "JavaScript",
          details: "2 years professional experience",
          level: 3,
        },
        {
          name: "Vue.js",
          details: "2 years professional experience and independent work",
          level: 3,
        },
        {
          name: "React",
          details: "1 year professional experience",
          level: 2,
        },
        {
          name: "Bootstrap",
          details: "1 year professional experience",
          level: 2,
        },
        {
          name: "Tailwind",
          details: "2 years professional experience and independent work",
          level: 2,
        },
        {
          name: "SQL",
          details: "5 years university and professional experience",
          level: 3,
        },
        {
          name: "HTML",
          details: "2 years professional experience",
          level: 3,
        },
        {
          name: "CSS",
          details: "2 years professional experience",
          level: 3,
        },
        {
          name: "R",
          details: "1 year university study",
          level: 1,
        },
        {
          name: "Python",
          details: "2 years university and independent work",
          level: 2,
        },
        {
          name: "Java",
          details: "2 years university and independent work  ",
          level: 2,
        },
        {
          name: "C#",
          details: "1 year professional experience",
          level: 1,
        },
      ],
      apps: [
        {
          name: "AWS",
          details:
            "1 year professional experience including S3, CloudWatch, lambdas, serverless functions",
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-weight: bold;
}
.card-array {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.card-array > div {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-basis: 10%;
}
.card-array > div > div {
  flex-grow: 1;
}
.image-display {
  border-radius: 10px;
  width: 300px;
}
.list-label {
  font-size: small;
}
.list-info {
  font-weight: bold;
}
.flex-grow-0-imp {
  flex-grow: 0 !important;
}
</style>
