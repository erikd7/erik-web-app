<template>
  <div class="p-10">
    <div class="flex flex-row justify-between mobile-one-col">
      <div class="flex flex-column justify-center items-center" style="flex-basis: 40%;">
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
            <a href="https://github.com/normalone7" target="_blank">
              <i class="hover-grow cursor-pointer fab fa-github" />
            </a>
            <a href="https://hub.docker.com/u/normalone7" target="_blank">
              <i class="hover-grow cursor-pointer fab fa-docker" />
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
          Full stack engineering&nbsp;
        </div>
        <div class="slide-fade-left text-center text-2xl">
          focused on process improvement and end-to-end user experience
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center mobile-one-col">
      <CardTile
        className="slide-fade-right"
        style="--duration: .5s"
        header="Full Stack Engineer"
        headerClass="text-3xl"
      >
        <template v-slot:body>Front and back end experience</template>
      </CardTile>
      <CardTile
        className="slide-fade-right"
        style="--duration: 1s"
        header="Product Designer"
        headerClass="text-3xl"
      >
        <template v-slot:body>Creating solutions for complex business needs</template>
      </CardTile>
      <CardTile
        className="slide-fade-right"
        style="--duration: 1.5s"
        header="Scrum Master"
        headerClass="text-3xl"
      >
        <template v-slot:body>Embedded Scrum Master on an Agile team</template>
      </CardTile>
      <CardTile
        className="slide-fade-right"
        style="--duration: 2s"
        header="Project Manager"
        headerClass="text-3xl"
      >
        <template v-slot:body>Over 2 years project management experience</template>
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
