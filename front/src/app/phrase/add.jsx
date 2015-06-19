var React = require('react'),
    Material = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),
    Router = require('react-router'),

    Paper = Material.Paper,
    CircularProgress = Material.CircularProgress,
    RaisedButton = Material.RaisedButton,
    TextField = Material.TextField;

var PhraseAdd = React.createClass({
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
            loader: false
        }
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
                this.refs.phrase.setValue('');
                this.setState({'loader': true});

                setTimeout(function() {
                    that.transitionTo('phraseShow', {phraseId: data.phrase.id});
                }, 3000);
            }.bind(this),
            error: function(xhr, status, err) {

            }.bind(this)
        });

    },

    render: function() {

        var props  = this.props,
            state  = this.state;

        return (
            <Paper zDepth={0} className="cont-inner">
                <form onSubmit={this.handleSubmit}>
                    {(state.loader) ? '' : <TextField ref="phrase" hintText="A phrase that you want to learn" floatingLabelText="Phrase" style={{display: 'block', margin: '0 auto'}}/>}
                    {(state.loader) ? <CircularProgress style={{margin: '50px auto 0 auto', display: 'block'}} mode="indeterminate" size={2}/> : <RaisedButton label="Add" primary={true} style={{margin: '10px auto', maxWidth: '100', display: 'block'}}/>}

                </form>
            </Paper>
        );
    }
});

module.exports = PhraseAdd;