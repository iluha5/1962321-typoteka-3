'use strict';

const {HELP_OUTPUT, COUNT_TOO_MUCH} = require(`../literals/texts`);
const {ARGUMENTS} = require(`../literals/config`);
const {Command} = require(`commander`);
const {getIsInteger} = require(`../helpers/getIsInteger`);
const fs = require(`fs`);
const packageJsonFile = require(`../../package.json`);

const generateMock = (numberOfLines) => {
  console.log(`generate count: `, numberOfLines);
};

const app = () => {
  const program = new Command();

  program
    .option(`-v, --${ARGUMENTS.VERSION}`)
    .option(`-h, --${ARGUMENTS.HELP}`)
    .option(`-g, --${ARGUMENTS.GENERATE} [count]`);

  program.exitOverride(); // throw instead of exit
  program
    .configureOutput({
      writeOut: () => process.stdout.write(``),
      writeErr: () => process.stdout.write(``),
    });

  try {
    program.parse(process.argv);
  } catch (err) {
    if (err.code === `commander.unknownOption`) {
      generateMock(1);
    }
  }

  const options = program.opts();

  if (options[ARGUMENTS.VERSION]) {
    const version = packageJsonFile.version;
    console.log(version);
  }

  if (options[ARGUMENTS.HELP]) {
    console.log(HELP_OUTPUT);
  }

  if (options[ARGUMENTS.GENERATE]) {
    const numberOfLines = options.generate;

    if (getIsInteger(numberOfLines)) {
      if (Number(numberOfLines) > 1000) {
        console.log(COUNT_TOO_MUCH);

        return;
      }

      generateMock(Number(numberOfLines));
    }
  }

};

app();
