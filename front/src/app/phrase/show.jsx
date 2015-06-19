var React        = require('react'),
    Material     = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),

    Tabs         = Material.Tabs,
    Tab          = Material.Tab,
    Paper        = Material.Paper,
    FontIcon     = Material.FontIcon,
    RaisedButton = Material.RaisedButton;

var PhraseShow = React.createClass({
    mixins: [Router.State],

    getInitialState: function () {
        return {phrase: []};
    },

    componentDidMount: function () {
        var props  = this.props,
            state  = this.state,
            params = this.getParams();

        $.ajax({
            url: BASE_URL + 'phrase/' + params.phraseId,
            dataType: 'json',async: false,

            success: function (res) {
                this.setState({phrase: res});
            }.bind(this)
        });
    },

    render: function () {

        var that        = this,
            props       = this.props,
            state       = this.state,
            phrase      = state.phrase,
            wikiResults = [];

        phrase.wikiResult = phrase.wikiResult ? JSON.parse(phrase.wikiResult) : [];
        phrase.stackResult = phrase.stackResult ? JSON.parse(phrase.stackResult) : [];

        if (phrase.wikiResult.length) {

            for (var i = 0; i < phrase.wikiResult.length; i++) {

                if (phrase.wikiResult[i]) {
                    wikiResults.push('<h5>' + phrase.wikiResult[i].title + '</h5><p>' + phrase.wikiResult[i].extract + '</p>');
                }
            }
        } else {
            wikiResults = 'No wiki results';
        }

        if (phrase.stackResult.length) {

            for (var i = 0; i < phrase.wikiResult.length; i++) {

                if (phrase.wikiResult[i]) {
                    wikiResults.push('<h5>' + phrase.wikiResult[i].title + '</h5><p>' + phrase.wikiResult[i].extract + '</p>');
                }
            }
        } else {
            stackResult = 'No StackOverflow results';
        }

        return (
            <Paper zDepth={0}>
                <Tabs>
                    <Tab label="Wiki">
                        <div className="cont-inner">
                            <h2 className="header-h2">Wiki Results</h2>
                            <div dangerouslySetInnerHTML={{__html: wikiResults}}></div>
                        </div>
                    </Tab>
                    <Tab label="Stackoverflow">
                        <div className="cont-inner">
                            <h2 className="header-h2">Stackoverflow Related Questions</h2>
                            {
                                phrase.stackResult.map(function (item, i) {
                                    item.url = 'http://stackoverflow.com/questions/' + item.question_id;

                                    return (
                                        <div>
                                            <a href={item.url} target="_blank">
                                                {/*(item.has_accepted_answer) ? '()' : ''*/}
                                                <p dangerouslySetInnerHTML={{__html: item.title}}></p>
                                                <FontIcon className="muidocs-icon-action-star"/>
                                                <br/>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Tab>
                </Tabs>
            </Paper>
        );
    }
});

module.exports = PhraseShow;