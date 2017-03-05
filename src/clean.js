console.log('clean cwd:',process.cwd())
const del = require('del');
const fs = require('./lib/fs');
const path = require('path');

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return new Promise((resolve, reject) => {

    const debug = global.DEBUG;
    const delArr = debug ? [path.join(process.cwd(), 'demo/libs')] :
                            [path.join(process.cwd(), '.tmp'),
                              path.join(process.cwd(), 'build/*'),
                              path.join(process.cwd(), 'dist/*'),
                              path.join(process.cwd(), '!dist/.git')];

    console.log('delArr:',delArr)

    del(delArr, { dot: true }).then(() => {
      console.log('clean ok')
      return resolve();
    }).catch((err) => {
      console.log('clean err')
      return reject(err);
    });
  });
}

module.exports = clean;
