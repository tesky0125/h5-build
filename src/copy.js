const path = require('path');
const Promise = require('bluebird');
const fs = require('./lib/fs');

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
function copy() {
  const ncp = Promise.promisify(require('ncp'));

  return Promise.all([
    ncp(path.join(process.cwd(), './libs'), path.join(process.cwd(),  './demo/libs')),
  ]);
}

module.exports = copy;
