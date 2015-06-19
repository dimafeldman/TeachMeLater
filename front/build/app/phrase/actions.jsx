var React                = require('react'),
    Router               = require('react-router'),
    RouteHandler         = Router.RouteHandler,
    Material             = require('material-ui'),
    ThemeManager         = new Material.Styles.ThemeManager(),
    FloatingActionButton = Material.FloatingActionButton,
    Paper                = Material.Paper,
    RaisedButton         = Material.RaisedButton;

var PhraseActions = React.createClass({

    render: function () {

        return (
            <Paper zDepth={0}>
                <FloatingActionButton innerClassName="fa star"></FloatingActionButton>
            </Paper>
        );
    }
});

module.exports = PhraseActions;