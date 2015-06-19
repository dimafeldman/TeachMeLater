var React = require('react'),
    Router = require('react-router'),
    Material = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),
    FlatButton = Material.FlatButton,
    FontIcon = Material.FontIcon,
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
            <Toolbar style={{background: '#e1f5fe', paddingLeft: 10}}>
                <ToolbarGroup key={0} float="left">
                    <FlatButton linkButton={true} onClick={that.transitionTo.bind(this, 'phraseActions')} label="Main" secondary={true}>
                        <FontIcon style={{float: 'left', marginTop: 5, marginLeft: 5}} className="fa fa-home"/>
                    </FlatButton>
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

module.exports = AppNavigation;