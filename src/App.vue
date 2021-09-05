<template>
  <div id="app">
    <div class="menuPane">
      <Menu
        :sections="sections"
        :current="current"
        :setSection="setSection"
      />
    </div>
    <div class="mainPane">
      <component
        :is="current"
        v-bind="sections[current].props"
      />
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Resume from './components/Resume.vue';
import Menu from './components/Menu.vue';
import Cribbage from './components/Cribbage.vue';

export default {
  name: 'App',
  data() {
    return {
      current : 'home',
      resume: {
        info: {
          name: 'Erik Dietrich',
          email: 'eb.dietrich11@gmail.com',
          phone: '9991234567',
          location: 'Madison, WI'
        }
      },
    }
  },
  components: {
    Home,
    Resume,
    Menu,
    Cribbage
  },
  computed: {
    sections() {
      return {
        home: { name: 'Home', key: 'home', template: '<App />', props: {} },
        resume: { name: 'Resume', key: 'resume', template: '<Resume />', props: { resume: this.resume } },
        cover: { name: 'Cover', key: 'cover', template: '<Cover />' },
        personalInfo: { name: 'Personal Info', key: 'personalInfo', template: '<Personal />' },
        cribbage: { name: 'Cribbage Counter', key: 'cribbage', template: '<Cribbage />' }
      };
    },
  },
  methods: {
    setSection(section) {
      this.current = section;
      console.log(section)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
  display: flex;
  flex-flow: wrap;
}
.menuPane {
  width: 100%;
  margin: 20px 10px;
  border-bottom: 2px solid #60789e;
}
.button {
  color: black;
  border-radius: 8px;
  padding: 5px;
  border: 1px solid #60789e;
}
.button:hover {
    color: white;
    background-color: #60789e;
    cursor: pointer;
}
</style>
