<template>
<div>
  <transition name="custom-classes-transition" :enter-active-class="reOptions.enterAnimation" :leave-active-class="reOptions.exitAnimation">
    <div v-show="isActive" class="vue-simple-sidenav" >
      <slot></slot>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: "VueSimpleSidenav",
  props: {
    options: Object,
    active: Boolean
  },
  data() {
    return {
      isActive: this.active || false,
      reOptions: {
        enterAnimation: "",
        exitAnimation: "",
        width: "100%",
        closeOnOutsideClick: true,
        closeOnEsc: true,
        background: '#111111'
      },
      isAnimating: false
    };
  },
  mounted() {
    this.sidenav = this.$el.childNodes[0];

    if(this.reOptions.closeOnOutsideClick){
      document.addEventListener('click', (e) => {
        if(e.target !== this.sidenav){
          this.clickOutside(e);
        }
      })
    }

    if (this.options) {
      Object.assign(this.reOptions, this.options);
      this.sidenav.style.width = this.reOptions.width;
      this.sidenav.style.background = this.reOptions.background;
    }
    this.bindEsc();
  },
  methods: {
    clickOutside(e) {
      if (this.isActive && !this.isAnimating && this.reOptions.closeOnOutsideClick) {
        this.handleClosing(true);
      }
    },
    handleClosing(emit = false) {
        if (emit) {
          this.$emit('update:active', false)
        }
        this.isActive = false;
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
        // this.handleOpening();
      } else {
        this.handleClosing();
      }
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
  z-index: 5000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>