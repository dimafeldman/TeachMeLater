/**
 * PhraseController
 *
 * @description :: Server-side logic for managing phrases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res, next) {

    // sanity check
    var errors        = {},
        phraseObj     = {
          phrase: _.escape(req.param('phrase'))
        };

    if (!phraseObj.phrase) {
        _.assign(errors, {title: ['Please enter a phrase']});
    }


    if (_.size(errors)) {
        return res.json({errors: errors}, 422);
    }

    // Create a User with the params from the form
    Phrase.create(phraseObj, function phraseCreated(err, phrase) {

        // if there's an error
        if (err) {
          return res.json({errors: {general: ['Something went wrong. please try again']}}, 422);
        }

        return res.json({phrase: phrase});
    });
  },

  /**
   * `PhraseController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },


  /**
   * `PhraseController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `PhraseController.list()`
   */
  list: function (req, res) {
    return res.json({
      todo: 'list() is not implemented yet!'
    });
  }
};

