var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;

var PhraseMain = React.createClass({

    render: function () {

        return (
            <RouteHandler />
        );
    }
});

exports.Main = PhraseMain;