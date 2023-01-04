interface IOnProps {
    [eventName: string]: (e: Event) => void;
}
declare class SvelteComponentController {
    private $element;
    private $timeout;
    component: string | undefined;
    componentName: string | undefined;
    name: string | undefined;
    private props;
    toRender: boolean;
    options: any;
    encode: boolean;
    onMount: any;
    on?: IOnProps;
    off?: (() => void)[];
    private element;
    private propsElement;
    static $inject: string[];
    constructor($element: any, $timeout: any);
    $onInit(): void;
    $onChanges(changes: any): void;
    $onDestroy(): void;
}
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
export declare const svelteComponent: {
    template: string;
    controller: typeof SvelteComponentController;
    bindings: {
        component: string;
        componentName: string;
        props: string;
        toRender: string;
        options: string;
        encode: string;
        onMount: string;
        on: string;
    };
};
export {};
