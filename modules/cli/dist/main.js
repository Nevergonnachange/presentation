#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var fs = require("fs");
var bindCallback_1 = require("rxjs/observable/bindCallback");
var of_1 = require("rxjs/observable/of");
var throw_1 = require("rxjs/observable/throw");
var operators_1 = require("rxjs/operators");
var path_1 = require("path");
var mkdir = bindCallback_1.bindCallback(fs.mkdir);
var writeFile = bindCallback_1.bindCallback(fs.writeFile);
var currentDir = path_1.resolve('.');
var sildesDir = path_1.join(currentDir, 'modules/slides');
console.log(__dirname);
console.log(path_1.resolve('.'));
var argv = yargs
    .usage('Usage: <command> [options]')
    .command('p <name> <author>', 'Create a new presentation', presenationBuilder, presenationHandler)
    .command('c <presentationn> <name> [index]', 'Create a chapter', chapterBuilder, chapterHandler)
    .command('s <presentatio> <chapte> <slide> [index]', 'Create a slide', slideBuilder, slideHandler)
    .help('h')
    .alias('h', 'help')
    .argv;
function presenationBuilder(args) { return args; }
function presenationHandler(args) {
    var presentationDir = path_1.join(sildesDir, args.name);
    console.log("Generating new Presentation: " + args.name);
    mkdir(path_1.join(sildesDir, args.name))
        .pipe(operators_1.concatMap(function (res) { return res ? throw_1._throw(res) : of_1.of("created directory: " + presentationDir); }))
        .subscribe(__printSuccess, __printError);
}
function chapterBuilder(args) { return args; }
function chapterHandler(args) {
}
function slideBuilder(args) { return args; }
function slideHandler(args) {
}
function __printSuccess(msg) {
    console.log(msg);
}
function __printError(err) {
    console.log(err);
}
