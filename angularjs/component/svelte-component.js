"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelteComponent = void 0;
var SvelteInjector_1 = require("../../SvelteInjector");
var SvelteComponentController = /** @class */ (function () {
    function SvelteComponentController($element, $timeout) {
        this.$element = $element;
        this.$timeout = $timeout;
        this.encode = true;
        this.toRender = true;
        var propsElement = document.createElement("template");
        propsElement.className = "props";
        this.propsElement = propsElement;
    }
    SvelteComponentController.prototype.$onInit = function () {
        var _this = this;
        this.name = this.component || this.componentName;
        var rootElement = this.$element[0];
        rootElement.style.display = "contents";
        rootElement.firstChild.appendChild(this.propsElement);
        this.$timeout(function () {
            SvelteInjector_1.SvelteInjector.hydrate(rootElement, _this.options).then(function (_a) {
                var element = _a[0];
                _this.element = element;
                if (_this.on && element.instance) {
                    var events = Array.from(Object.entries(_this.on));
                    _this.off = events.map(function (_a) {
                        var name = _a[0], listener = _a[1];
                        return element.instance.$on(name, function (e) {
                            _this.$timeout(function () { return listener(e); });
                        });
                    });
                }
                if (_this.onMount)
                    _this.onMount({ element: element });
            });
        });
    };
    SvelteComponentController.prototype.$onChanges = function (changes) {
        var _a;
        if ((_a = changes.props) === null || _a === void 0 ? void 0 : _a.currentValue) {
            if (this.propsElement.content) {
                this.propsElement.content.textContent = SvelteInjector_1.SvelteInjector.serializeProps(this.props, this.encode);
            }
        }
    };
    SvelteComponentController.prototype.$onDestroy = function () {
        var _a, _b;
        (_a = this.off) === null || _a === void 0 ? void 0 : _a.forEach(function (cb) { return cb(); });
        (_b = this.element) === null || _b === void 0 ? void 0 : _b.destroy();
    };
    SvelteComponentController.$inject = ["$element", "$timeout"];
    return SvelteComponentController;
}());
/**
 * @description
 * AngularJS Component for svelte-injector
 *
 * **Bindings:**
 *
 * component: "@" - link name
 *
 * componentName: "@" - alias for component
 *
 * props: "<" - props object
 *
 * toRender: "<" (default: true)
 *
 * options: "<" (default: HydrateOptions)
 *
 * encode: "<" (default: true)
 *
 * onMount: "&" - function called with on mount with parameters: *element*
 *
 * on: "<" - map of callbacks for svelte component events. Eg. {click: (e) => void, hello: (e) => void}
 *
 * @example
 * <svelte-component component-name="hello" props"$ctrl.svelteProps" on-mount="setChildElement(element)"></svelte-component>
 *
 */
exports.svelteComponent = {
    template: "<div data-component-name=\"{{$ctrl.component || $ctrl.componentName}}\" data-to-render=\"{{$ctrl.toRender}}\"></div>",
    controller: SvelteComponentController,
    bindings: {
        component: "@",
        componentName: "@",
        props: "<",
        toRender: "<",
        options: "<",
        encode: "<",
        onMount: "&",
        on: "<",
    },
};
