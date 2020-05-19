#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.9', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format tree|plain|json', 'json')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig, program.format);
    console.log(diff);
  })
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
