import simpleGit from 'simple-git';
import * as Logger from './log.js';

let git;
let projectsDirectory;
// const options = {
//   baseDir: process.cwd(),
//   binary: 'git',
//   maxConcurrentProcesses: 6,
// };

async function init() {
  projectsDirectory = process.cwd();
}

async function selectProject(repoName) {
  try {
    git = simpleGit(projectsDirectory + '/' + repoName);
  } catch (e) {
    return false; // not found
  }
  return true;
}

async function status() {
  let statusSummary = null;
  try {
    await git.fetch();
    statusSummary = await git.status();
  } catch (e) {
    Logger.error(e);
  }

  return statusSummary;
}

export { init, selectProject, status };
