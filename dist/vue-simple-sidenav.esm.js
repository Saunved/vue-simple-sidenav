//
//
//
//
//
//
//
//
//
//
var script = {
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

    if (this.reOptions.closeOnOutsideClick) {
      document.addEventListener('click', e => {
        if (e.target !== this.$el) {
          this.clickOutside(e);
        }
      });
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
      if (this.options.animate) {
        if (emit) {
          this.$emit('update:active', false);
        }

        this.isActive = false;
      } else {
        if (emit) {
          this.$emit('update:active', false);
        }

        this.isActive = false;
      }
    },

    bindEsc() {
      if (this.reOptions.closeOnEsc) {
        document.addEventListener("keyup", event => {
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
        this.$el.style.visibility = "visible"; // this.handleOpening();
      } else {
        this.handleClosing();
      }
    }

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
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('transition', {
    attrs: {
      "name": "custom-classes-transition",
      "enter-active-class": _vm.reOptions.enterAnimation,
      "leave-active-class": _vm.reOptions.exitAnimation
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isActive,
      expression: "isActive"
    }],
    staticClass: "vue-simple-sidenav"
  }, [_vm._t("default")], 2)])], 1);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-7b951416_0", {
    source: ".vue-simple-sidenav{position:fixed;z-index:5000;top:0;left:0;width:100%;height:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueSimpleSidenav(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueSimpleSidenav', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
