/**
 * @jsx React.DOM
 */

(function () {

    var React = require('react'),
        Router = require('react-router'),

        BASE_URL = 'https://localhost:1337/',
        injectTapEventPlugin = require("react-tap-event-plugin");

    window.$ = require('jquery');

    //Needed for React Developer Tools
    window.React = React;
    window.Router = Router;
    window.BASE_URL = BASE_URL;


    //Needed for onTouchTap
    //Can go away when react 1.0 release
    //Check this repo:
    //https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();

    var AppRoutes = require('./routes.jsx').AppRoutes;

    //Render the main app component
    Router.run(AppRoutes, function (Handler) {
            // whenever the url changes, this callback is called again
            React.render(<Handler/>, document.body);
        });

})();
