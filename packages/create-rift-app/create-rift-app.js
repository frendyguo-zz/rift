/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const path = require('path');
const execa = require('execa');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Promise = require('promise');

function copyTemplate(opts) {
  const {
    templatePath,
    projectPath,
  } = opts;

  return new Promise(function (resolve, reject) {
    console.log('Copying...');
    fsExtra.copy(templatePath, projectPath)
      .then(function () {
        console.log('Moving .gitignore if exists');
        return fsExtra.move(
          path.resolve(projectPath, './gitignore'),
          path.resolve(projectPath, './.gitignore'),
        );
      })
      .then(function () {
        console.log('Successfully copied rift template');
        return this;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.error(err);
        console.error('Copy command failed, try again.');
        reject(err);
        process.exit(1);
      });
  });
}

function getInstallCmd() {
  let cmd;
  if (cmd) {
    return cmd;
  }

  try {
    execa.sync('yarnpkg', ['--version']);
    cmd = 'yarn';
  } catch (e) {
    cmd = 'npm';
  }

  return cmd;
}

function getInstallArgs(cmd, packages) {
  if (cmd === 'npm') {
    const args = ['install', '--save', '--save-exact'];
    return args.concat(packages, ['--verbose']);
  }

  if (cmd === 'yarn') {
    const args = ['add'];
    return args.concat(packages);
  }

  return null;
}

function install(opts) {
  const {
    projectPath,
    projectName,
    packages = [],
  } = opts;

  if (packages.length === 0) {
    console.log('Missing packages in `install`, try running again.');
    process.exit(1);
  }

  const installCmd = getInstallCmd();
  const installArgs = getInstallArgs(installCmd, packages);

  console.log('Installing packages...');
  process.chdir(projectPath);

  return new Promise(function (resolve, reject) {
    execa(installCmd, installArgs)
      .then(function () {
        console.log('Installing modules...');
        return execa(installCmd, ['install']);
      })
      .then(function () {
        console.log(`Installed dependencies for ${projectName}`);
        resolve();
      })
      .catch(function () {
        console.log('Error installing packages...');
        return reject(new Error(`${installCmd} installation failed`));
      });
  });
}

module.exports = function createRiftApp(opts) {
  const projectName = opts.projectName;
  console.log(opts);

  if (!projectName) {
    console.log('no project name');
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log('project already rxist');
    process.exit(1);
  }

  const projectPath = `${process.cwd()}/${projectName}`;
  const templatePath = path.resolve(__dirname, './templates/basic');
  const options = {
    templatePath: templatePath,
    projectPath: projectPath,
    projectName: projectName,
  };

  copyTemplate(options)
    .then(function () {
      return install({
        projectName: options.projectName,
        projectPath: options.projectPath,
        packages: ['react', 'react-dom', 'react-router-dom', 'express', '@frendyguo/rift-scripts'],
      });
    })
    .then(function () {
      console.log(`Successfully created rift app for ${options.projectName}`);
    })
    .catch(function (err) {
      throw err;
    });
};
