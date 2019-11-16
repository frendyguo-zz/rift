const chalk = require('chalk');

const logger = (level, message, ...args) => {
  switch (level) {
    case 'log':
      console.log(`${chalk.black.bgBlueBright(' RIFT > ')} ${message}`, ...args);
      break;
    case 'warn':
      console.log(`${chalk.bgYellow(' Warn > ')} ${message}`, ...args);
      break;
    case 'error':
      console.log(`${chalk.bgRed(' Error > ')} ${typeof message === 'string' ? message : message.stack}`, ...args);
      break;
    default:
      console.log(`${chalk.red(message)}`, ...args);
  }
  return true;
};

module.exports = logger;
