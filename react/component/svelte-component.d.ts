import { CreateOptions, SvelteElement } from "../../index";
import { SvelteComponent as SvelteComponentClass } from "svelte";
import { Component, RefObject } from "react";
export declare type SvelteComponentProps = typeof SvelteComponent.defaultProps & {
    component: string | typeof SvelteComponentClass;
    props?: any;
    toRender?: boolean;
    options?: CreateOptions;
    onMount?: (element: SvelteElement) => void;
};
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
export declare class SvelteComponent extends Component<SvelteComponentProps, null> {
    private element;
    rootElementRef: RefObject<HTMLDivElement>;
    static defaultProps: {
        toRender: boolean;
    };
    constructor(props: SvelteComponentProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
