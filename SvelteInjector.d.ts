import { SvelteComponent } from "svelte";
interface SvelteBaseElement {
    domElement: HTMLElement;
    Component: typeof SvelteComponent;
    props: any;
    toRender: boolean;
    index: number;
}
export interface SvelteElement extends SvelteBaseElement {
    instance?: SvelteComponent;
    options: Options;
    observers?: MutationObserver[];
    onMount(): void;
    destroy(): void;
    updateProps(props: any): void;
    setToRender(toRender: boolean): void;
}
export interface CreateOptions {
    observeParents?: boolean;
}
export interface HydrateOptions {
    observe?: boolean;
    observeParents?: boolean;
}
interface Options {
    observe: boolean;
    observeParents: boolean;
}
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
export declare class SvelteInjector {
    private static links;
    private static lastIndex;
    private static defaultOptions;
    /**
     * @description Link a component class or a function to a string name.
     * Useful to create components from the DOM template with {@link hydrate}.
     *
     * @param name - name to assign to the component or function {@link link}
     * @param svelteComponent - Svelte component class
     */
    static link(name: string, svelteComponent: typeof SvelteComponent | (() => Promise<typeof SvelteComponent>)): void;
    private static isClass;
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
    static create(domElement: HTMLElement, component: typeof SvelteComponent | string, props: any, toRender?: boolean, options?: CreateOptions): Promise<SvelteElement>;
    private static createBaseElement;
    private static setProps;
    private static setToRender;
    private static createObservers;
    private static createRemoveObserver;
    private static createDataObserver;
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
    static hydrate(domTarget: HTMLElement, options?: HydrateOptions): Promise<SvelteElement[]>;
    static parseElement(domElement: HTMLElement): Promise<SvelteBaseElement>;
    private static enhanceBaseElement;
    private static findElementByIndex;
    private static extractIndexOrCreateNew;
    private static resolveOnMount;
    /**
     * Finds a component class from the linked name.
     *
     * Component must have been previously linked with {@link link}
     *
     * @param name - name of the component as previously linked with {@link link}
     */
    static findComponentByName(name: string): Promise<typeof SvelteComponent | undefined>;
    /**
     * Finds a component name from the linked Class.
     *
     * Component must have been previously linked with {@link link} and instantiated at least once.
     *
     * @param Class - component Class as previously linked with {@link link}
     */
    static findLinkNameByClass(Class: typeof SvelteComponent): string | undefined;
    private static destroyElement;
    /**
     * Destroys all components in the array
     * @param components - An array of Svelte components to be destroyed
     *
     * @example
     * SvelteInjector.destroyAll(this.svelteChildren);
     */
    static destroyAll(components: SvelteElement[]): Promise<void>;
    private static clean;
    private static addComponents;
    private static updateComponent;
    private static updateComponents;
    private static getComponentsNumber;
    /**
     * Stringifies and encodes a value for safe DOM usage
     *
     * See: {@link decode}
     *
     * @param value
     */
    static encode(value: any): string;
    /**
     * Decodes and parses a string encoded with {@link encode}
     *
     * @param value
     */
    static decode(value: string): any;
    /**
     * Stringifies a value for DOM usage, without encoding
     *
     * See {@link parse}
     *
     * @param value
     * @param replacer
     * @param space
     */
    static stringify(value: any, replacer?: null, space?: number): string;
    /**
     * Parses a stringified, not encoded value.
     *
     * See {@link stringify}
     *
     * @param value
     */
    static parse(value: string): any;
    private static getPropsElement;
    private static sanitizeOptions;
    /**
     * Returns an HTML string representing the props template HTML element, as expected from {@link hydrate}.
     *
     * @param props - props object
     * @param encode = true - apply encoding?
     */
    static generatePropsBlock(props: any, encode?: boolean): string;
    /**
     * Returns stringified (and encoded?) string from an object, as expected from the parser.
     *
     * @param props - object
     * @param encode = true- apply encoding?
     */
    static serializeProps(props: any, encode?: boolean): string;
    private static extractProps;
    private static extractToRender;
}
export {};
