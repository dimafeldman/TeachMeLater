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
              value: _.escape(req.param('value')).replace(/\+|%20|\s/g, ' '),
              resolved: _.escape(req.param('resolved')),
              searchPage: _.escape(req.param('searchPage')),
              resultPage: _.escape(req.param('resultPage'))
            };

        if (!phraseObj.value) {
            _.assign(errors, {title: ['Please enter a phrase']});
        }

        if (_.size(errors)) {
            return res.json({errors: errors}, 422);
        }

        phraseObj.value_lower_case = phraseObj.value.toLowerCase();

        // Create a User with the params from the form
        Phrase.create(phraseObj, function phraseCreated(err, phrase) {

            // if there's an error
            if (err) {
              return res.json({errors: {general: ['Something went wrong. please try again']}}, 422);
            }

            ScraperService.scrapeWiki(phrase);
            ScraperService.scrapeStackExchange(phrase);

            return res.json({phrase: phrase});
        });
    },

  /**
   * `Phrase    Controller.delete()`
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

  check: function (req, res) {
      var errors    = {},
          phraseValue = _.escape(req.param('value')).replace(/\+|%20|\s/g, ' '),
          phraseValueClean = '';

      if (!phraseValue) {
        _.assign(errors, {title: ['Please enter a phrase']});
      }

      if (_.size(errors)) {
        return res.json({errors: errors}, 422);
      }

      phraseValueClean = phraseValue.toLowerCase();

      console.log('searching for phrase:', phraseValueClean);
      // Create a User with the params from the form
      Phrase.find({value_lower_case: phraseValueClean}, function phraseFound(err, phrase) {
          return res.json({phrase: phrase});
      });
  }
};

