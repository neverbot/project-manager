#!/usr/bin/env node --experimental-modules --no-warnings

import { readConfigFile } from './configuration.js';
import * as ProjectManager from './project-manager.js';
import * as Logger from './log.js';
import chalk from 'chalk';

let projects = {};

async function init() {
  Logger.init();
  await ProjectManager.init();

  projects = await readConfigFile('projects.json');
}

async function run() {
  for (let project in projects) {
    let info;
    let found;

    found = await ProjectManager.selectProject(project);

    if (!found) {
      Logger.error('Project ' + chalk.red(project) + ' not found.');
      continue;
    }

    // using the async function
    info = await ProjectManager.status();

    if (!info) {
      Logger.log('Project ' + chalk.red(project) + ' not found.');
      continue;
    }

    Logger.log('Project ' + chalk.cyan(project) + ' status: ');
    // Logger.log(info);
    Logger.log(
      '   Current branch: ' +
        info.current +
        ' ' +
        (info.behind ? chalk.red(info.behind) + ' commits behind' : chalk.green('Up to date :)')) +
        '.'
    );
    if (info.files.length) Logger.log('   Project has modified files, commit or remove them.');
  }
}

export default {
  init,
  run,
};
