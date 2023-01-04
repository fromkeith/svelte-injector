"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvelteComponent = void 0;
var index_1 = require("../../index");
var react_1 = require("react");
/**
 * @description
 * React Component for svelte-injector
 *
 * **Props:**
 *
 * component - component class or link name
 *
 * props - props object
 *
 * toRender (default: true)
 *
 * options (default: CreateOptions)
 *
 * onMount - function called with on mount with parameters: *element*
 *
 * @example
 * <SvelteComponent component={Component | "hello"} props={{name: "world"}}/>
 *
 */
var SvelteComponent = /** @class */ (function (_super) {
    __extends(SvelteComponent, _super);
    function SvelteComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElementRef = (0, react_1.createRef)();
        return _this;
    }
    SvelteComponent.prototype.componentDidMount = function () {
        var _this = this;
        if (this.rootElementRef.current) {
            index_1.default.create(this.rootElementRef.current, this.props.component, this.props.props, this.props.toRender, this.props.options).then(function (element) {
                _this.element = element;
                if (_this.props.onMount)
                    _this.props.onMount(element);
            });
        }
    };
    SvelteComponent.prototype.componentDidUpdate = function () {
        if (this.element) {
            this.element.updateProps(this.props.props);
            this.element.setToRender(this.props.toRender);
        }
    };
    SvelteComponent.prototype.render = function () {
        return react_1.default.createElement("div", { style: { display: "contents" }, ref: this.rootElementRef });
    };
    SvelteComponent.defaultProps = {
        toRender: true,
    };
    return SvelteComponent;
}(react_1.Component));
exports.SvelteComponent = SvelteComponent;
