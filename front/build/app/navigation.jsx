var React = require('react'),
    Router = require('react-router'),
    Material = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),

    Toolbar = Material.Toolbar,
    ToolbarGroup = Material.ToolbarGroup,
    DropDownMenu = Material.DropDownMenu,
    RaisedButton = Material.RaisedButton;

var AppNavigation = React.createClass({
    mixins: [Router.Navigation],

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    getInitialState: function() {
        return {
            actionUrls: [
                {payload: 'phraseMain', text: 'Home'},
                {payload: 'phraseList', text: 'Phrase List'}
            ]
        };
    },

    render: function () {
        var state = this.state,
            props = this.props,
            that  = this;

        var onChangeDropDown = function(e, selectedIindex, menuItem) {
            that.transitionTo(menuItem.payload);
        };

        return (
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    <DropDownMenu menuItems={state.actionUrls} onChange={onChangeDropDown} />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <RaisedButton onTouchTap={that.transitionTo.bind(this, 'phraseAdd')} url={state.createPhraseUrl} label="Add Phrase" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

module.exports = AppNavigation;