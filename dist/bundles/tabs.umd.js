(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
    (global = global || self, factory(global.Tabs = {}, global.React, global.PropTypes));
}(this, (function (exports, React, PropTypes) { 'use strict';

    React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
    PropTypes = PropTypes && Object.prototype.hasOwnProperty.call(PropTypes, 'default') ? PropTypes['default'] : PropTypes;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    var TabsContext = React.createContext({
        context: {
            prevActiveTab: {},
            activeTab: { id: null },
            tabs: [],
            addTab: function (tab) { },
            removeTab: function (tab) { },
            onClick: function (tab) { return function (event) { }; }
        }
    });
    var TabProvider = /** @class */ (function (_super) {
        __extends(TabProvider, _super);
        function TabProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                tabs: [],
                prevActiveTab: {},
                activeTab: _this.props.activeTab
            };
            _this.addTab = function (tab) {
                var isTabExist = _this.state.tabs.find(function (t) { return tab.id === t.id; });
                if (!isTabExist) {
                    _this.setState(function (prevState, props) {
                        return {
                            tabs: prevState.tabs.concat(tab)
                        };
                    });
                }
            };
            _this.removeTab = function (tabId) {
                _this.setState(function (prevState, props) {
                    return {
                        tabs: prevState.tabs.filter(function (tab) { return tab.id !== tabId; })
                    };
                });
            };
            _this.onClick = function (tab) { return function (event) {
                _this.setState(function (prevState, props) {
                    return {
                        prevActiveTab: prevState.activeTab,
                        activeTab: tab
                    };
                });
                console.log(_this.props.onClick);
                _this.props.onClick();
            }; };
            return _this;
        }
        TabProvider.prototype.render = function () {
            return (React.createElement(TabsContext.Provider, { value: {
                    context: __assign(__assign({}, this.state), { addTab: this.addTab, removeTab: this.removeTab, onClick: this.onClick })
                } }, this.props.children));
        };
        return TabProvider;
    }(React.Component));
    var TabConsumer = TabsContext.Consumer;

    var Tab = /** @class */ (function (_super) {
        __extends(Tab, _super);
        function Tab() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tab.prototype.componentDidMount = function () {
            this.context.context.addTab({
                id: this.props.id,
                title: this.props.title,
                tabIndex: this.props.tabIndex
            });
        };
        Tab.prototype.render = function () {
            var activeTabId = this.context.context.activeTab.id;
            var _a = this.props, children = _a.children, tabId = _a.id;
            return activeTabId === tabId && children;
        };
        return Tab;
    }(React.Component));
    Tab.contextType = TabsContext;
    Tab.propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        tabIndex: PropTypes.oneOf([PropTypes.string, PropTypes.number])
    };

    var ListTabs = function (_a) {
        var children = _a.children, _b = _a.className, className = _b === void 0 ? null : _b, _c = _a.style, style = _c === void 0 ? {} : _c;
        return (React.createElement("ul", { style: __assign({ paddingLeft: 0, listStyle: "none", margin: 0 }, style), className: className }, children));
    };
    var TabTitleItem = function (_a) {
        var children = _a.children, innerRef = _a.innerRef, restProps = __rest(_a, ["children", "innerRef"]);
        return (React.createElement("li", __assign({ ref: innerRef, style: {
                display: "inline-block",
                transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            } }, restProps), children));
    };
    var ActiveTabBorder = function (_a) {
        var activeTabElement = _a.activeTabElement, restProps = __rest(_a, ["activeTabElement"]);
        var style = {
            height: "4px",
            backgroundColor: "#0088dd",
            position: "absolute",
            bottom: "0",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            willChange: "left, width"
        };
        if (activeTabElement) {
            style.width = activeTabElement.offsetWidth;
            style.left = activeTabElement.offsetLeft;
        }
        return (React.createElement("div", __assign({ style: style }, restProps)));
    };
    var TabAnchorItem = function (_a) {
        var isActiveTab = _a.isActiveTab, children = _a.children, tabIndex = _a.tabIndex, restProps = __rest(_a, ["isActiveTab", "children", "tabIndex"]);
        var style = {
            textTransform: "capitalize",
            color: "#000000",
            fontWeight: 600,
            padding: "16px 30px",
            cursor: "pointer",
            opacity: "0.4",
            display: "block",
            textDecoration: "none",
            backgroundColor: "transparent",
            outline: "none",
            border: 0,
            ":hover": {
                opacity: 1
            }
        };
        if (isActiveTab) {
            style.transition = "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";
            style.cursor = "default";
            style.opacity = 1;
        }
        return (React.createElement("button", __assign({ style: style, tabIndex: tabIndex }, restProps), children));
    };
    var TabsContainer = function (_a) {
        var children = _a.children, restProps = __rest(_a, ["children"]);
        return (React.createElement("div", __assign({ style: {
                position: "relative",
                borderBottom: "1px solid #dfdfdf"
            } }, restProps), children));
    };
    var ReactTabs = function (_a) {
        var children = _a.children, restProps = __rest(_a, ["children"]);
        return (React.createElement("div", __assign({ style: { position: "relative" } }, restProps), children));
    };
    var Tabs = /** @class */ (function (_super) {
        __extends(Tabs, _super);
        function Tabs() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                tabsElements: []
            };
            return _this;
        }
        Tabs.prototype.updateDimensions = function () {
            this.setState(__assign({}, this.state));
        };
        Tabs.prototype.componentDidMount = function () {
            window.addEventListener("resize", this.updateDimensions.bind(this));
        };
        Tabs.prototype.componentWillUnmount = function () {
            window.removeEventListener("resize", this.updateDimensions.bind(this));
        };
        Tabs.prototype.render = function () {
            var _this = this;
            var tabsProps = this.props.tabsProps || {};
            return (React.createElement(TabProvider, { activeTab: this.props.activeTab, onClick: this.props.onClick },
                React.createElement(TabConsumer, null, function (value) { return (React.createElement(ReactTabs, null,
                    React.createElement(TabsContainer, null,
                        React.createElement(ListTabs, { className: tabsProps.className, style: tabsProps.style }, value.context.tabs.map(function (tab, index) { return (React.createElement(TabTitleItem, { key: index, id: tab.id, innerRef: function (tabElement) {
                                if (!_this.state.tabsElements[tab.id]) {
                                    _this.setState(function (prevState, props) {
                                        var tabsElements = prevState.tabsElements;
                                        tabsElements[tab.id] = tabElement;
                                        return {
                                            tabsElements: tabsElements
                                        };
                                    });
                                }
                            } },
                            React.createElement(TabAnchorItem, { isActiveTab: value.context.activeTab.id === tab.id, onClick: value.context.onClick(tab), tabIndex: tab.tabIndex || index, onKeyPress: function (event) {
                                    var code = event.keyCode || event.which;
                                    if (code === 13) {
                                        value.context.onClick(tab)(event);
                                    }
                                } }, tab.title))); })),
                        React.createElement(ActiveTabBorder, { activeTabElement: _this.state.tabsElements[value.context.activeTab.id] })),
                    _this.props.children)); })));
        };
        Tabs.Tab = Tab;
        return Tabs;
    }(React.Component));
    Tabs.propTypes = {
        activeTab: {
            id: PropTypes.string.isRequired,
        },
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        tabsProps: {
            style: PropTypes.object,
            className: PropTypes.string
        },
        onClick: PropTypes.func
    };

    exports.Tab = Tab;
    exports.TabConsumer = TabConsumer;
    exports.TabProvider = TabProvider;
    exports.Tabs = Tabs;
    exports.TabsContext = TabsContext;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tabs.umd.js.map
