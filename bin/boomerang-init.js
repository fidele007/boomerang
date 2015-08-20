#!/usr/bin/env node

var prompt = require('prompt');
var fs = require("fs-extra");

var init = function() {
  var args = process.argv.slice(2);
  var dir;
  if (args.length === 1) {
    dir = args[0];
    var exists = fs.existsSync(dir);
    if (exists) {
      console.error("Folder already exists");
      return;
    } else {
      fs.mkdirSync(dir);
    }
  } else {
    dir = ".";
  }

  prompt.start();
  var templates = __dirname + "/../templates";

  prompt.get(['domain'], function(err, result) {
    if (!result.domain) {
      console.error("Please enter a valid domain");
      return;
    }
    fs.mkdirSync(dir + "/" + "debs");
    fs.mkdirSync(dir + "/" + "images");
    fs.mkdirSync(dir + "/" + "packages");
    fs.writeFileSync(dir + "/CNAME", result.domain);
    fs.writeFileSync(dir + "/README.md", "# Boomerang Cydia Repo: " + result.domain);
    fs.copySync(templates + "/add.sh", dir + "/add.sh");
    fs.copySync(templates + "/depictions", dir + "/depictions");
  });
}

init();

module.exports = init;