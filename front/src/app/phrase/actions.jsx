var React                = require('react'),
    Router               = require('react-router'),
    RouteHandler         = Router.RouteHandler,
    Material             = require('material-ui'),
    ThemeManager         = new Material.Styles.ThemeManager(),
    FlatButton           = Material.FlatButton,
    FontIcon             = Material.FontIcon,
    FloatingActionButton = Material.FloatingActionButton,
    List = Material.List,
    ListItem = Material.ListItem,
    Paper                = Material.Paper,
    RaisedButton         = Material.RaisedButton;

var PhraseActions = React.createClass({

    mixins: [Router.Navigation],

    render: function () {
        var that = this;

        var markResolved = function () {
            var searchPage  = '',
                resultPage  = '',
                searchValue = '';

            if (chrome.history) {
                chrome.history.search({text: '', maxResults: 2}, function (data) {
                    searchPage  = [data[1].url, data[1].title];
                    resultPage  = [data[0].url, data[0].title];
                    searchValue = searchPage[0].split('q=')[1] ? searchPage[0].split('q=')[1].split('&')[0] : resultPage[1];

                    $.ajax({
                        url: BASE_URL + 'phrase/add/',
                        method: 'post',
                        data: {
                            value: searchValue,
                            resolved: true,
                            searchPage: searchPage,
                            resultPage: resultPage
                        },
                        success: function (data) {

                        }.bind(this),
                        error: function (xhr, status, err) {

                        }.bind(this)
                    });
                });
            }
        };

        return (
            <Paper zDepth={0}>
                <div style={{}} className="cont-inner">
                    <List>
                        <ListItem onClick={markResolved}>
                            <FontIcon style={{float: 'left', marginTop: -5, marginRight: 8, color: '#FF4081'}} className="fa fa-star"/>
                            Mark a good result page!
                        </ListItem>
                        <ListItem onClick={that.transitionTo.bind(this, 'phraseAdd')}>
                            Add a search phrase
                        </ListItem>
                        <ListItem onClick={that.transitionTo.bind(this, 'phraseList')}>
                            My searches
                        </ListItem>
                    </List>
                </div>
            </Paper>
        );
    }
});

module.exports = PhraseActions;