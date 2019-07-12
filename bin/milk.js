#!/usr/bin/env node --harmony

'use strict';

const chalk = require('chalk');
let VERSION = require('../package.json').version;
// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '../node_modules/';

const program = require('commander');

program.version(VERSION).usage('<command>[options]');

/**
 * 初始化模板
 */
program
  .command('init')
  .description('generate a project from a remote template')
  .action(() => {
    require('../command/init')();
  });

/**
 * 列取模板列表
 */
program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(() => {
    require('../command/list')();
  });

/**
 * 获取系统环境
 */
program
  .command('info')
  .description('print debugging information about your environment')
  .action(cmd => {
    console.log(chalk.bold('\nEnvironment Info:'));
    require('envinfo')
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'Yarn', 'npm'],
          Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
          npmPackages: '/**/{typescript,*vue*,@vue/*/}'
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true
        }
      )
      .then(console.log);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
