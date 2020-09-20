Lightweight Vue sidenav with support for CSS transitions and zero dependencies, 4kb minified js

This component exposes a single slot where you can insert your sidebar. Sample code for a simple menu is provided below to help you get started

## How to use

```bash
npm i vue-simple-sidenav
```

The code below uses *animate.css* classes for transitions. Feel free to define your own classes and specify them in the sidenavOptions.

## Example 

**index.vue**
```html
<script>
import VueSimpleSidenav from 'vue-simple-sidenav';
import 'animate.css'; // optional, used here for CSS transitions, feel free to use your own classes

export default {
  components: {
    VueSimpleSidenav
  },
    data(){
    return {
      open: false,
      sidenavOptions: {
        enterAnimation: 'animate__faster animate__animated animate__slideInLeft', // optional, but recommended
        exitAnimation: 'animate__faster animate__animated animate__slideOutLeft', // optional, but recommended
        background: '#111111', // optional, default '#111111'
        width: '80%',  // optional, default: 100%
        closeOnEsc: false, // optional: default: false
        closeOnOutsideClick: true // optional, default: true
        }
    }
  }
};
</script>
<template>
  <div id="app">
    <vue-simple-sidenav :active.sync="open" v-bind="{options: sidenavOptions}">
        <a href="https://example.com">Link 1</a>
        <a href="https://example.com">Link 2</a>
        <a href="https://example.com">Link 3</a>
        <button @click="open=false">Close</button>
</vue-simple-sidenav>

<button @click="open=true">Open sidenav</button>
  </div>
</template>

<style lang="scss">
/*
This is sample SCSS code for a menu. Feel free to use this or create your own styles.
*/
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

  /* If using animate.css, setting duration to 0.6s gives a really smooth effect. Feel free to change */
  --animate-duration: 0.6s;
}
</style>
```