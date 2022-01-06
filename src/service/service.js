'use strict';

const chalk = require(`chalk`);
const {Command} = require(`commander`);
const {UNKNOWN_COMMAND} = require(`../literals/texts`);
const {ARGUMENTS, DEFAULT_COUNT, COMMANDER_UNKNOWN_ERROR_MESSAGE} = require(`./config`);
const {EXIT_CODES} = require(`./config`);
const {Cli} = require(`./cli`);

const app = () => {
  let isCommandError = false;
  const program = new Command();

  program
    .option(`-v, --${ARGUMENTS.VERSION}`)
    .option(`-h, --${ARGUMENTS.HELP}`)
    .option(`-g, --${ARGUMENTS.GENERATE} [${ARGUMENTS.GENERATE_COUNT}]`);

  program.exitOverride(); // throw instead of exit
  program
    .configureOutput({
      writeOut: () => process.stdout.write(``),
      writeErr: () => process.stdout.write(``),
    });

  try {
    program.parse(process.argv);
  } catch (err) {
    if (err.code === COMMANDER_UNKNOWN_ERROR_MESSAGE) {
      if (program.opts().generate) {
        Cli[ARGUMENTS.GENERATE].run(DEFAULT_COUNT);

        isCommandError = true;
      } else {
        console.log(chalk.red(UNKNOWN_COMMAND));

        process.exit(EXIT_CODES.ERROR);
      }
    }
  }

  if (!isCommandError) {
    const firstArgument = Object.keys(program.opts())[0];
    const generateCount = program.opts().generate;

    if (typeof firstArgument !== `undefined` && Cli[firstArgument]) {
      Cli[firstArgument].run(generateCount);
    } else {
      console.log(chalk.red(UNKNOWN_COMMAND));

      process.exit(EXIT_CODES.ERROR);
    }
  }
};

app();
