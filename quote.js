const program = require('commander')
const {
  prompt
} = require('inquirer');
// pull in functions from logic.js
const {
  addQuote,
  getQuote
} = require('./logic.js')

program.version('0.0.1').description('Quote management system')

const questions = [{
    type: 'input',
    name: 'quote',
    message: 'Enter quote, in quotes ...'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Enter quote author\'s name, in quotes ...'
  }
];

program
  .command('addQuote')
  .alias('q')
  .description('Add a quote')
  .action(() => {
    prompt(questions).then(answers =>
      addQuote(answers));
  });

program.command('getQuote <searchTerm>').alias('f').description('Search by quote fragment or author').action(searchTerm => getQuote(searchTerm))

program.parse(process.argv)