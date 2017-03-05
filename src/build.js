console.log('build cwd:',process.cwd())
const run = require('./run');

function build() {
  return run(require('./clean'))
  .then(() => run(require('./bundle')))
  .then(() => require('./compile')());
}

module.exports = build;
