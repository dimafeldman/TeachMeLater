var React = require('react'),
    Material = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),

    Paper = Material.Paper,
    RaisedButton = Material.RaisedButton,
    TextField = Material.TextField;

var PhraseAdd = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    handleSubmit: function(e) {
        e.preventDefault();

        var that   = this,
            phrase = this.refs.phrase.getValue();

        if (!phrase) {
            return;
        }

        $.ajax({
            url: BASE_URL + 'phrase/add/',
            method: 'post',
            data: {value: phrase},
            success: function(data) {
                //this.setState({value: phrase});
                this.refs.phrase.setValue('');
            }.bind(this),
            error: function(xhr, status, err) {

            }.bind(this)
        });

    },

    render: function() {

        var props  = this.props,
            state  = this.state;

        var markResolved = function () {
            var searchPage = '',
                resultPage = '',
                searchValue = '';

            if (chrome.history) {
                chrome.history.search({text: '', maxResults: 2}, function (data) {
                    searchPage = [data[1].url, data[1].title];
                    resultPage = [data[0].url, data[0].title];
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
            <Paper zDepth={0} className="cont-inner">
                <form onSubmit={this.handleSubmit}>
                    <TextField ref="phrase" hintText="A phrase that you want to learn" floatingLabelText="Phrase" style={{display: 'block', margin: '0 auto'}} />
                    <RaisedButton label="Add" primary={true} style={{margin: '10px auto', maxWidth: '100', display: 'block'}} />
                </form>
                <RaisedButton onClick={markResolved} label="Mark Resolved" primary={true}/>
            </Paper>
        );
    }
});

module.exports = PhraseAdd;