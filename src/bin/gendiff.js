#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program
  .version('1.0.7', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format json|recursion|plain', 'json')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = gendiff(firstConfig, secondConfig, program.format);
    console.log(diff);
  })
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
