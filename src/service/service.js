'use strict';

import {HELP_OUTPUT} from "../literals/texts";

const { Command } = require('commander');
const fs = require(`fs`);

const packageJsonFile = require(`../../package.json`);

const ARGUMENTS = {
  VERSION: 'version',
  HELP: 'help',
}

const program = new Command();

program
  .option(`-v, --${ARGUMENTS.VERSION}`, 'output the program version')
  .option(`-h, --${ARGUMENTS.HELP}`, 'output the program version')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);

const options = program.opts();

if (options[ARGUMENTS.VERSION]) {
  const version = packageJsonFile.version;
  console.log(version);
}

if (options[ARGUMENTS.HELP]) {
  console.log(HELP_OUTPUT);
}

// if (options.debug) console.log(options);
// console.log('pizza details:');
// if (options.small) console.log('- small pizza size');
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);
