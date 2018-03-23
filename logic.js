const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

// Mongodb server must be running, this is on the default localport
const db = mongoose.connect('mongodb://localhost:27017/quotes-manager')

function toLower(quote) {
  return quote.toLowerCase();
}

// format for the database entries
const quoteSchema = mongoose.Schema({
  quote: {
    type: String,
    set: toLower
  },
  author: {
    type: String,
    set: toLower
  },
});


// Define model as an interface with the database
const Quote = mongoose.model('Quote', quoteSchema);

//// Controller Actions////
// adds quote, returns a success message
const addQuote = (quote) => {
  Quote.create(quote, (err) => {
    assert.equal(null, err);
    console.info('New quote added');
    db.disconnect();
  });
};

// returns quote as JSON
const getQuote = (searchTerm) => {
  // Define search criteria. The search here is case-insensitive and inexact.
  const search = new RegExp(searchTerm, 'i');
  Quote.find({
      $or: [{
        quote: search
      }, {
        author: search
      }]
    })
    .exec((err, quote) => {
      assert.equal(null, err);
      console.info(quote);
      console.info(`${quote.length} matches`);
      db.disconnect();
    });
};

// Export all methods
module.exports = {
  addContact,
  getContact
};