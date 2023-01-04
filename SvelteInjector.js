"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvelteInjector = void 0;
var stores_1 = require("./stores");
var store_1 = require("svelte/store");
var svelteIndexAttribute = "svelte-element-index";
/**
 * @description Framework to inject Svelte components into other frameworks plus some tools.
 *
 * Refer to https://github.com/KoRnFactory/svelte-injector for full documentation
 *
 * To use your component use either {@link create} or {@link hydrate}.
 *
 * Have fun!
 *
 */
var SvelteInjector = /** @class */ (function () {
    function SvelteInjector() {
    }
    /**
     * @description Link a component class or a function to a string name.
     * Useful to create components from the DOM template with {@link hydrate}.
     *
     * @param name - name to assign to the component or function {@link link}
     * @param svelteComponent - Svelte component class
     */
    SvelteInjector.link = function (name, svelteComponent) {
        if (this.isClass(svelteComponent)) {
            this.links.push({ name: name, svelteComponent: svelteComponent });
        }
        else {
            this.links.push({ name: name, svelteComponentGetter: svelteComponent });
        }
    };
    SvelteInjector.isClass = function (func) {
        return typeof func === "function" && /^class\s/.test(Function.prototype.toString.call(func));
    };
    /**
     * Creates a single element at the bottom of an HTML element by component class or link name.
     *
     * @example
     * import Component from "src/Component.svelte"
     *
     * this.svelteChild = await SvelteInjector.create(this.$element[0], Component, props, options);
     *
     * @param domElement - The element in which the component will be rendered
     * @param component - the svelte component Class or the link name (as previously {@link link linked})
     * @param props - An object with props compatible with the Svelte Component
     * @param toRender = true - Boolean that indicates if the component should render immediately
     * @param options - Object with options, optional
     * @return - A promise that resolves the {@link SvelteElement} when the component is mounted or created (when toRender = false)
     */
    SvelteInjector.create = function (domElement, component, props, toRender, options) {
        if (toRender === void 0) { toRender = true; }
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var baseElement, svelteElement, returnPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SvelteInjector.createBaseElement(domElement, component, props, toRender)];
                    case 1:
                        baseElement = _a.sent();
                        return [4 /*yield*/, SvelteInjector.enhanceBaseElement(baseElement, this.sanitizeOptions(options))];
                    case 2:
                        svelteElement = _a.sent();
                        if (!svelteElement)
                            return [2 /*return*/, Promise.reject()];
                        returnPromise = SvelteInjector.resolveOnMount(svelteElement);
                        SvelteInjector.addComponents([svelteElement]);
                        return [2 /*return*/, returnPromise];
                }
            });
        });
    };
    SvelteInjector.createBaseElement = function (domElement, Component, props, toRender) {
        return __awaiter(this, void 0, void 0, function () {
            var componentClass, foundComponent, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof Component === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findComponentByName(Component)];
                    case 1:
                        foundComponent = _a.sent();
                        if (!foundComponent)
                            return [2 /*return*/, Promise.reject()];
                        componentClass = foundComponent;
                        return [3 /*break*/, 3];
                    case 2:
                        componentClass = Component;
                        _a.label = 3;
                    case 3:
                        index = SvelteInjector.extractIndexOrCreateNew(domElement);
                        return [2 /*return*/, {
                                domElement: domElement,
                                Component: componentClass,
                                props: props,
                                toRender: toRender,
                                index: index,
                            }];
                }
            });
        });
    };
    SvelteInjector.setProps = function (component, props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        component.props = props;
                        return [4 /*yield*/, this.updateComponent(component)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SvelteInjector.setToRender = function (component, toRender) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(component.toRender !== toRender)) return [3 /*break*/, 2];
                        component.toRender = toRender;
                        return [4 /*yield*/, this.updateComponent(component)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SvelteInjector.createObservers = function (svelteElement) {
        var observers = [];
        if (svelteElement.options.observeParents) {
            observers.push(this.createRemoveObserver(svelteElement));
        }
        if (svelteElement.options.observe) {
            observers.push(this.createDataObserver(svelteElement));
        }
        return observers;
    };
    SvelteInjector.createRemoveObserver = function (svelteElement) {
        var observer = new MutationObserver(function () {
            if (!document.body.contains(svelteElement.domElement)) {
                svelteElement.destroy();
            }
        });
        if (svelteElement.domElement.parentNode) {
            observer.observe(svelteElement.domElement.parentNode, { childList: true });
        }
        return observer;
    };
    SvelteInjector.createDataObserver = function (svelteElement) {
        var _this = this;
        var observer = new MutationObserver(function (mutations) {
            var haveAttributesChanged = mutations.find(function (m) { return m.type === "attributes"; });
            var haveCharactersChanged = mutations.find(function (m) {
                if (m.type === "characterData")
                    return true;
                if (m.type === "childList") {
                    if (m.removedNodes.length !== m.addedNodes.length)
                        return true;
                    var hasChanged_1 = false;
                    m.removedNodes.forEach(function (node, index) {
                        if (node.textContent !== m.addedNodes[index].textContent) {
                            hasChanged_1 = true;
                        }
                    });
                    return hasChanged_1;
                }
                return false;
            });
            if (haveAttributesChanged) {
                svelteElement.setToRender(_this.extractToRender(svelteElement.domElement));
            }
            if (haveCharactersChanged) {
                svelteElement.updateProps(_this.extractProps(svelteElement.domElement));
            }
        });
        observer.observe(svelteElement.domElement, { attributeFilter: ["data-to-render"] });
        var propsElement = this.getPropsElement(svelteElement.domElement);
        if (propsElement === null || propsElement === void 0 ? void 0 : propsElement.content) {
            observer.observe(propsElement.content, { characterData: true, subtree: true, childList: true });
        }
        return observer;
    };
    /**
     * Hydrates every SvelteElements found querying the target.
     *
     * @example
     *    this.svelteChildren = await SvelteInjector.hydrate(document.body);
     * @example Component format
     * <div data-component-name="hello">
     *     <template class="props"">
     *         // JSON formatted
     *         {"name": "hello"}
     *     </template>
     * </div>
     * @example Utility
     *  <div data-component-name="hello">
     *     {SvelteInjector.writeProps(
     *     		{name: "hello"}
     *     )}
     * </div>
     * @example Conditional rendering
     * // You can use {data-to-render} as the condition in an {#if}
     * <div data-component-name="hello" data-to-render"true">
     *     <template class="props"">
     *         // JSON formatted
     *         {"name": "hello"}
     *     </template>
     * </div>
     *
     * @param domTarget - The DOM Element that will be queried for Svelte Components to create
     * @param options - Object with options, optional
     *
     * @return - An array of promises that resolve each {@link SvelteElement} when the component is mounted or created (when toRender = false)
     */
    SvelteInjector.hydrate = function (domTarget, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var svelteElements, parsedElements, createdElements, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        svelteElements = Array.from(domTarget.querySelectorAll("[data-component-name]"));
                        if (!svelteElements || !svelteElements.length)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, Promise.all(svelteElements.map(function (element) { return SvelteInjector.parseElement(element); }))];
                    case 1:
                        parsedElements = _a.sent();
                        return [4 /*yield*/, Promise.all(parsedElements.map(function (element) { return SvelteInjector.enhanceBaseElement(element, _this.sanitizeOptions(options)).catch(console.warn); }))];
                    case 2:
                        createdElements = (_a.sent()).filter(function (element) { return element; });
                        promises = createdElements.map(function (element) { return SvelteInjector.resolveOnMount(element); });
                        SvelteInjector.addComponents(createdElements);
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SvelteInjector.parseElement = function (domElement) {
        return __awaiter(this, void 0, void 0, function () {
            var componentName, Component, props, toRender, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        componentName = domElement.dataset.componentName;
                        if (!componentName)
                            return [2 /*return*/, Promise.reject()];
                        return [4 /*yield*/, this.findComponentByName(componentName)];
                    case 1:
                        Component = _a.sent();
                        if (!Component) {
                            console.error("Requested component not found. Did you link it first?", domElement, componentName);
                            return [2 /*return*/, Promise.reject()];
                        }
                        props = this.extractProps(domElement);
                        toRender = this.extractToRender(domElement);
                        if (!Component || !domElement) {
                            return [2 /*return*/, Promise.reject("Component or target DOM Element not found.")];
                        }
                        index = this.extractIndexOrCreateNew(domElement);
                        return [2 /*return*/, {
                                domElement: domElement,
                                Component: Component,
                                props: props,
                                index: index,
                                toRender: toRender,
                            }];
                }
            });
        });
    };
    SvelteInjector.enhanceBaseElement = function (element, options) {
        return __awaiter(this, void 0, void 0, function () {
            var alreadyCreated, createdElement;
            return __generator(this, function (_a) {
                alreadyCreated = SvelteInjector.findElementByIndex(element.index);
                if (alreadyCreated) {
                    return [2 /*return*/, Promise.reject("Element with index: ".concat(element.index, " already created."))];
                }
                if (element.domElement.dataset.componentName) {
                    element.domElement.style.display = "contents";
                }
                createdElement = element;
                createdElement.options = options;
                createdElement.onMount = function () {
                    createdElement.observers = SvelteInjector.createObservers(createdElement);
                };
                createdElement.destroy = function () {
                    SvelteInjector.destroyElement(createdElement);
                };
                createdElement.updateProps = function (props) {
                    SvelteInjector.setProps(createdElement, props);
                };
                createdElement.setToRender = function (toRender) {
                    SvelteInjector.setToRender(createdElement, toRender);
                };
                return [2 /*return*/, createdElement];
            });
        });
    };
    SvelteInjector.findElementByIndex = function (index, currentComponents) {
        if (currentComponents === void 0) { currentComponents = (0, store_1.get)(stores_1.components); }
        var element = currentComponents.find(function (component) { return component.index.toString() === index.toString(); });
        return element !== null && element !== void 0 ? element : null;
    };
    SvelteInjector.extractIndexOrCreateNew = function (domElement) {
        var targetIndex = domElement.getAttribute(svelteIndexAttribute);
        var index;
        if (targetIndex) {
            index = Number.parseInt(targetIndex);
        }
        else {
            index = ++this.lastIndex;
            domElement.setAttribute(svelteIndexAttribute, index.toString());
        }
        return index;
    };
    SvelteInjector.resolveOnMount = function (element) {
        return new Promise(function (resolve) {
            if (!element.toRender) {
                return resolve(element);
            }
            var previousOnMount = element.onMount;
            element.onMount = function () {
                previousOnMount();
                resolve(element);
            };
        });
    };
    /**
     * Finds a component class from the linked name.
     *
     * Component must have been previously linked with {@link link}
     *
     * @param name - name of the component as previously linked with {@link link}
     */
    SvelteInjector.findComponentByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var link, component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        link = this.links.find(function (link) { return link.name.toLowerCase() === name.toLowerCase(); });
                        component = link === null || link === void 0 ? void 0 : link.svelteComponent;
                        if (!(!component && (link === null || link === void 0 ? void 0 : link.svelteComponentGetter))) return [3 /*break*/, 2];
                        return [4 /*yield*/, link.svelteComponentGetter()];
                    case 1:
                        component = _a.sent();
                        link.svelteComponent = component;
                        _a.label = 2;
                    case 2: return [2 /*return*/, component];
                }
            });
        });
    };
    /**
     * Finds a component name from the linked Class.
     *
     * Component must have been previously linked with {@link link} and instantiated at least once.
     *
     * @param Class - component Class as previously linked with {@link link}
     */
    SvelteInjector.findLinkNameByClass = function (Class) {
        var _a;
        return (_a = this.links.find(function (link) { return link.svelteComponent === Class; })) === null || _a === void 0 ? void 0 : _a.name;
    };
    SvelteInjector.destroyElement = function (component) {
        return new Promise(function (resolve) {
            if (component.observers) {
                // Disconnect observers
                component.observers.forEach(function (obs) { return obs.disconnect(); });
            }
            stores_1.components.update(function (components) {
                var index = components.indexOf(component);
                components.splice(index, 1);
                return components;
            });
            resolve(undefined);
        });
    };
    /**
     * Destroys all components in the array
     * @param components - An array of Svelte components to be destroyed
     *
     * @example
     * SvelteInjector.destroyAll(this.svelteChildren);
     */
    SvelteInjector.destroyAll = function (components) {
        return __awaiter(this, void 0, void 0, function () {
            var promises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        components.forEach(function (component) { return promises.push(component.destroy()); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SvelteInjector.clean = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var unsubscribe = stores_1.components.subscribe(function (components) { return __awaiter(_this, void 0, void 0, function () {
                            var orphans;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        orphans = components.filter(function (component) { return !document.body.contains(component.domElement); });
                                        return [4 /*yield*/, this.destroyAll(orphans)];
                                    case 1:
                                        _a.sent();
                                        resolve(components.length);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        unsubscribe();
                    })];
            });
        });
    };
    SvelteInjector.addComponents = function (elements) {
        var _this = this;
        stores_1.components.update(function (components) {
            elements.forEach(function (element) {
                var alreadyAdded = _this.findElementByIndex(element.index, components);
                if (!alreadyAdded) {
                    components.push(element);
                }
            });
            return components;
        });
    };
    SvelteInjector.updateComponent = function (element) {
        return SvelteInjector.updateComponents([element]);
    };
    SvelteInjector.updateComponents = function (elements) {
        return new Promise(function (resolve) {
            stores_1.components.update(function (components) {
                elements.forEach(function (element) {
                    var index = components.indexOf(element);
                    components[index] = element;
                });
                resolve(null);
                return components;
            });
        });
    };
    SvelteInjector.getComponentsNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentComponents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentComponents = (0, store_1.get)(stores_1.components);
                        if (!(currentComponents.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, SvelteInjector.clean()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, 0];
                }
            });
        });
    };
    /**
     * Stringifies and encodes a value for safe DOM usage
     *
     * See: {@link decode}
     *
     * @param value
     */
    SvelteInjector.encode = function (value) {
        return encodeURIComponent(this.stringify(value));
    };
    /**
     * Decodes and parses a string encoded with {@link encode}
     *
     * @param value
     */
    SvelteInjector.decode = function (value) {
        return this.parse(decodeURIComponent(value));
    };
    /**
     * Stringifies a value for DOM usage, without encoding
     *
     * See {@link parse}
     *
     * @param value
     * @param replacer
     * @param space
     */
    SvelteInjector.stringify = function (value, replacer, space) {
        if (replacer === void 0) { replacer = null; }
        if (space === void 0) { space = 2; }
        return JSON.stringify(value, replacer, space);
    };
    /**
     * Parses a stringified, not encoded value.
     *
     * See {@link stringify}
     *
     * @param value
     */
    SvelteInjector.parse = function (value) {
        return JSON.parse(value);
    };
    SvelteInjector.getPropsElement = function (svelteElement) {
        return svelteElement.querySelector("template.props");
    };
    SvelteInjector.sanitizeOptions = function (options, localDefaults) {
        if (localDefaults === void 0) { localDefaults = {}; }
        return __assign(__assign(__assign({}, this.defaultOptions), localDefaults), options);
    };
    /**
     * Returns an HTML string representing the props template HTML element, as expected from {@link hydrate}.
     *
     * @param props - props object
     * @param encode = true - apply encoding?
     */
    SvelteInjector.generatePropsBlock = function (props, encode) {
        if (encode === void 0) { encode = true; }
        return "<template class=\"props\">".concat(this.serializeProps(props, encode), "</template>");
    };
    /**
     * Returns stringified (and encoded?) string from an object, as expected from the parser.
     *
     * @param props - object
     * @param encode = true- apply encoding?
     */
    SvelteInjector.serializeProps = function (props, encode) {
        if (encode === void 0) { encode = true; }
        return encode ? this.encode(props) : this.stringify(props);
    };
    SvelteInjector.extractProps = function (svelteElement) {
        var _a, _b;
        var props = (_b = (_a = this.getPropsElement(svelteElement)) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.textContent;
        if (!props)
            return null;
        var parsedProps;
        try {
            var decode = !!props.includes("%7B");
            parsedProps = decode ? this.decode(props) : this.parse(props);
        }
        catch (e) {
            console.error("Malformed props for component:\n", svelteElement, "found: ", props, "\nProps should be in valid JSON format. Make sure that all keys are surrounded by double quotes" +
                "\nUse SvelteInjector.stringify() or SvelteInjector.encode() for automated processing");
        }
        return parsedProps;
    };
    SvelteInjector.extractToRender = function (svelteElement) {
        var toRenderAttribute = svelteElement.dataset.toRender;
        if (!toRenderAttribute)
            return true;
        var toRender;
        try {
            toRender = JSON.parse(toRenderAttribute);
        }
        catch (e) {
            console.error("Malformed toRender for component:\n", svelteElement, "found: ", toRenderAttribute, "\nToRender attribute should be just true or false. Make sure it is correctly rendered in the DOM");
        }
        return toRender;
    };
    SvelteInjector.links = [];
    SvelteInjector.lastIndex = -1;
    SvelteInjector.defaultOptions = {
        observe: true,
        observeParents: true,
    };
    return SvelteInjector;
}());
exports.SvelteInjector = SvelteInjector;
