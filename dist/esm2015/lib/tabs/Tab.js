import React from "react";
import PropTypes from 'prop-types';
import { TabsContext } from "./TabsContext";
class Tab extends React.Component {
    componentDidMount() {
        this.context.context.addTab({
            id: this.props.id,
            title: this.props.title,
            tabIndex: this.props.tabIndex
        });
    }
    render() {
        const { context: { activeTab: { id: activeTabId } } } = this.context;
        const { children, id: tabId } = this.props;
        return activeTabId === tabId && children;
    }
}
Tab.contextType = TabsContext;
Tab.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tabIndex: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};
export default Tab;
//# sourceMappingURL=Tab.js.map