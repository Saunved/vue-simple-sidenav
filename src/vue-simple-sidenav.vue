<template>
  <div class="vue-simple-sidenav" v-show="isActive" v-click-outside="clickOutside">
    <slot></slot>
  </div>
</template>

<script>
import "animate.css";
import * as vClickOutside from "v-click-outside-x";

export default {
  name: "VueSimpleSidenav",
  directives: {
    clickOutside: vClickOutside.directive,
  },  
  props: {
    options: Object,
    active: Boolean
  },
  data() {
    return {
      isActive: this.active || false,
      reOptions: {
        animate: true,
        enterAnimation: "slideInLeft",
        exitAnimation: "slideOutLeft",
        speed: "faster",
        width: "100%",
        closeOnOutsideClick: true,
        closeOnEsc: true,
        background: '#111'
      },
      isAnimating: false,
    };
  },
  mounted() {

    if (this.options) {
      Object.assign(this.reOptions, this.options);
      this.$el.style.width = this.reOptions.width;
      this.$el.style.background = this.reOptions.background;
    }
    this.bindEsc();
  },
  methods: {
    clickOutside(e) {
      if (this.isActive && !this.isAnimating && this.reOptions.closeOnOutsideClick) {
        this.handleClosing(true);
      }
    },
    handleOpening() {
      if (this.reOptions.animate) {
        this.animateCSS(this.reOptions.enterAnimation || "slideInLeft");
      }
    },
    handleClosing(emit = false) {
      if (this.options.animate) {
        this.animateCSS(this.reOptions.exitAnimation, () => {
          if (emit) {
            this.$emit('update:active', false)
          }
          this.isActive = false;
        });
      } else {
        if (emit) {
          this.$emit('update:active', false)
        }
        this.isActive = false;
      }
    },
    bindEsc() {
      if(this.reOptions.closeOnEsc){
        document.addEventListener("keyup", (event) => {
          if (event.key === "Escape") {
            if (this.isActive) {
              this.handleClosing(true);
            }
          }
        });        
      }
    },
    resolveState(value) {
      if (value) {
        this.isActive = true;
        this.$el.style.visibility = "visible";
        this.handleOpening();
      } else {
        this.handleClosing();
      }
    },
    animateCSS(animation, callback = () => {}, prefix = "animate__") {
      const animationName = `${prefix}${animation}`;
      const animationSpeed = `${prefix}${this.reOptions.speed}`;
      this.$el.classList.add(
        `${prefix}animated`,
        animationSpeed,
        animationName
      );

      this.$el.addEventListener(
        "animationend",
        () => {
          this.$el.classList.remove(
            `${prefix}animated`,
            animationSpeed,
            animationName
          );
          this.$emit('animationend')
          callback();
        },
        { once: true }
      );
    },
  },
  watch: {
    active(value) {
      if (value !== this.isActive) {
        this.resolveState(value);
        this.isAnimating = true;
        setTimeout(() => {
          this.isAnimating = false;
        }, 150);
      }
    },
  },
};
</script>

<style lang="scss">
.vue-simple-sidenav {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  --animate-duration: 0.6s;
}
</style>