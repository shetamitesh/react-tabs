import React, { CSSProperties } from "react";
import TabItem, { TabInputs } from "./Tab";
declare class Tabs extends React.Component {
    static Tab: typeof TabItem;
    static propTypes: {
        activeTab: {
            id: React.Validator<string>;
        };
        children: React.Validator<React.ReactNode[]>;
        tabsProps: {
            style?: React.Validator<Object>;
            className?: React.Validator<string>;
        };
        onClick: React.Validator<any>;
    };
    props: {
        activeTab: TabInputs;
        children: React.ReactDOM;
        tabsProps?: {
            style?: CSSProperties;
            className?: string;
        };
        onClick: (event: React.MouseEvent<HTMLElement>) => void;
    };
    state: {
        tabsElements: any[];
    };
    updateDimensions(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default Tabs;
