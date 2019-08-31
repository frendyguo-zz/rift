const fs = require('fs-extra');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const logger = require('./utils/logger');
const paths = require('./configs/path');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

measureFileSizesBeforeBuild(paths.appDist)
  .then((previousFileSizes) => {
    fs.emptyDirSync(paths.appDist);
    // BUILD
    // return 
  })
  .catch((err) => {
    logger('error', 'Failed to compile');
    logger('error', (err.message || err));
    process.exit(1);
  });
