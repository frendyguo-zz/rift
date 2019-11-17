#! /usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const packageJson = require('../package.json');

const createRiftApp = require('../create-rift-app');

let projectName;

// TODO: Add help messages
program
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => {
    projectName = name;
  })
  .allowUnknownOption()
  .parse(process.argv);

createRiftApp({
  projectName,
});
