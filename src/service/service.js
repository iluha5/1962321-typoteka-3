'use strict';

const {Command} = require(`commander`);
const {UNKNOWN_COMMAND} = require(`../literals/texts`);
const {ARGUMENTS, DEFAULT_COUNT} = require(`./config`);
const {EXIT_CODES} = require(`./config`);
const {Cli} = require(`./cli`);

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
      if (program.opts().generate) {
        Cli[ARGUMENTS.GENERATE].run(DEFAULT_COUNT);
      } else {
        console.log(UNKNOWN_COMMAND);
      }
    }

    process.exit(EXIT_CODES.SUCCESS);
  }

  const firstArgument = Object.keys(program.opts())[0];
  const generateCount = program.opts().generate;

  if (typeof firstArgument !== `undefined` && Cli[firstArgument]) {
    Cli[firstArgument].run(generateCount);
  }
};

app();
