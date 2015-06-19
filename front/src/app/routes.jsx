var React = require('react'),
    Material = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),

    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute,
    PhraseMain = require('./phrase/main.jsx'),
    PhraseAdd = require('./phrase/add.jsx'),
    PhraseList = require('./phrase/list.jsx'),
    PhraseShow = require('./phrase/show.jsx'),
    PhraseActions = require('./phrase/actions.jsx'),

    AppNavigation = require('./navigation.jsx');

var AppCanvas = Material.AppCanvas;

var App = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    getInitialState: function () {
        return {
            actionUrls: [
                {payload: 'phraseMain', text: 'Home'},
                {payload: 'phraseList', text: 'Phrase List'}
            ]
        };
    },

    render: function () {
        var state = this.state,
            props = this.props;

        return (
            <AppCanvas className="cont-main">
                <AppNavigation />
                <RouteHandler />
            </AppCanvas>
        );
    }
});

var AppRoutes = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={PhraseActions}/>
        <Route name="phraseMain" path="phrase" handler={PhraseMain}>
            <Route name="phraseList" path="list" handler={PhraseList}/>
            <Route name="phraseShow" path="show/:phraseId" handler={PhraseShow}/>
            <Route name="phraseAdd" path="add" handler={PhraseAdd}/>
            <Route name="phraseActions" path="actions" handler={PhraseActions}/>
            <DefaultRoute handler={PhraseActions}/>
        </Route>
    </Route>
);

exports.App = App;
exports.AppRoutes = AppRoutes;
