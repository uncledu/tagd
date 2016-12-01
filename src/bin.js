#!/usr/bin/env node

'use strict'
import TagD from './index'
import yargs from 'yargs'
import child_process from 'child_process'

let argv = yargs
  .usage('Usage: $0 -c [num]')
  .command('count','delete the input count from the taglist beginner')
  .example('$0 -c 5', 'the first 5 tags from the taglist beginner will be deleted')
  .command('pattern','delete tags which match the pattern')
  .example('$0 -e 0.0.*','delete tags match expresion 0.0.*')
  .alias('c','count')
  .alias('e','pattern')
  .help('h')
  .alias('h', 'help')
  .global('[help,e,c]')
  .argv

try {
  let tagd=new TagD(argv)
  if(argv.partten){
    tagd.removeTagByPattern(argv.partten)
  }
  if(argv.count){
    tagd.removeTagCountingFromBeginner(argv.count)
  }
  tagd.start()
} catch (err) {
  console.error(err)
  process.exit(1)
}

