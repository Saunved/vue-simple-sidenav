<script>
import Vue from 'vue';
import VueSimpleSidenav from '@/vue-simple-sidenav.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueSimpleSidenav
  },
    data(){
    return {
      open: false,
      sidenavOptions: {
        animate: true, enterAnimation: 'fadeInLeft', exitAnimation: 'fadeOutLeft',
        closeOnEsc: false
        }
    }
  }
});
</script>

<template>
  <div id="app">
    <vue-simple-sidenav :active.sync="open" v-bind="{options: sidenavOptions}">
    <a href>One</a>
    <a href>One</a>
    <a href>One</a>
    <button @click="open=false">Close</button>
</vue-simple-sidenav>

<button @click="open=true">Open sidenav 1</button>
  </div>
</template>

<style lang="scss">
.vue-simple-sidenav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  font-family: sans-serif;
    a {
    border: none;
    color: white;
    text-decoration: none;
    font-size: 18px;
    text-transform: uppercase;
    line-height: 36px;
    display: block !important;
    font-weight: 300;
    padding-bottom: 0px;

    &:hover {
      color: lighten(white, 10%);
      border: none;
    }
  }
}
</style>
