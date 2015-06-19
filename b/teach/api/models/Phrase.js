/**
* Phrase.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        resolved: {
          type: 'boolean',
          defaultsTo: false
        },

        searchPage: {
          type: 'string',
        },

        resultPage: {
          type: 'string',
        },

        value: {
          type: 'string',
          required: true
        },

        value_lower_case: {
          type: 'string',
          required: true
        },

        active: {
          type: 'boolean',
          defaultsTo: true
        },

        createdAt: {
          type: 'datetime'
        },

        userId: {
          type: 'string',
          defaultsTo: '0'
        },

        wikiResult: {
          type: 'string'
        },

        stackResult: {
          type: 'string'
        },

        googleResult: {
          type: 'string'
        }
    }
};

