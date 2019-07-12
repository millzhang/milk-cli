'use strict';
const config = require('../templates');
let tplList = config.tpl;
let tplNames = Object.keys(tplList);

module.exports = () => {
  console.log(tplNames);
  process.exit();
};
