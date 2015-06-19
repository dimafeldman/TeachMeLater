var React        = require('react'),
    Material     = require('material-ui'),
    ThemeManager = new Material.Styles.ThemeManager(),

    Paper        = Material.Paper,
    RaisedButton = Material.RaisedButton,
    List         = Material.List,
    ListItem     = Material.ListItem;

var PhraseList = React.createClass({
    mixins: [Router.Navigation],

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    getInitialState: function () {
        return {phrases: []};
    },

    componentDidMount: function () {

        $.ajax({
            url: BASE_URL + 'phrase/find',
            dataType: 'json',

            success: function (res) {
                this.setState({phrases: res});
            }.bind(this)
        });
    },

    render: function () {

        var that  = this,
            rows  = [],
            props = that.props,
            state = that.state;

        var onItemClick = function () {
            console.log(this.id);

            that.transitionTo('phraseShow', {phraseId: this.id});
        };

        return (
            <Paper zDepth={0} className="cont-inner">
                <List subheader="Phrase List">
                    {
                    state.phrases.map(function (item, i) {
                        return (<ListItem key={item.id} onClick={onItemClick.bind(item)}>{item.value}</ListItem>)
                    })
                    }
                </List>
            </Paper>
        );
    }
});

module.exports = PhraseList;