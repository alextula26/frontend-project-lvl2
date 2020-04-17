#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program
  .version('1.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    gendiff(firstConfig, secondConfig);
  })
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
