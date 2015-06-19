var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Material     = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),
    RaisedButton = Material.RaisedButton;

var PhraseMain = React.createClass({

    render: function () {

        return (
            <RouteHandler />
        );
    }
});

module.exports = PhraseMain;