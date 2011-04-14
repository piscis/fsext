var fs = require('fs');

// Extend Filesystem api
fs.copy = require(__dirname+'/lib/copy').copy;
fs.copySync = require(__dirname+'/lib/copy').copySync;

exports = module.exports = fs;