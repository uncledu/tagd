#!/usr/bin/env node


'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let argv = _yargs2.default.usage('Usage: $0 -c [num]').command('count', 'delete the input count from the taglist beginner').example('$0 -c 5', 'the first 5 tags from the taglist beginner will be deleted').command('pattern', 'delete tags which match the pattern').example('$0 -e 0.0.*', 'delete tags match expresion 0.0.*').alias('c', 'count').alias('e', 'pattern').help('h').alias('h', 'help').global('[help,e,c]').argv;

try {
  let tagd = new _index2.default(argv);
  if (argv.partten) {
    tagd.removeTagByPattern(argv.partten);
  }
  if (argv.count) {
    tagd.removeTagCountingFromBeginner(argv.count);
  }
  tagd.list();
} catch (err) {
  console.error(err);
  process.exit(1);
}