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
            url: BASE_URL + 'phrase/create/',
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

        return (
            <Paper zDepth={0} innerClassName="cont-inner">
                <form onSubmit={this.handleSubmit}>
                    <TextField ref="phrase" hintText="A phrase that you want to learn" floatingLabelText="Phrase" />
                    <RaisedButton label="Add" primary={true} />
                </form>
            </Paper>
        );
    }
});

module.exports = PhraseAdd;