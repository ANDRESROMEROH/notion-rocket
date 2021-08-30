const boxen = require('boxen');
const chalk = require('chalk');
const figlet = require('figlet');

const { connectToGoogleDrive, listFiles } = require('./google/drive');

async function intro() {
  return new Promise((resolve, reject) => {
    figlet('Notion Rocket', function(err, data) {
      if (err) reject('Something went wrong');
      console.log(data);
      resolve(data);
    });
  })
}

function errorHandler({ message }) {
  console.error('\n' + chalk.redBright(message));
  process.exit(1);
}

async function main() {
  await intro();
  await connectToGoogleDrive();
  await listFiles();
  console.log(
    chalk.green(
      boxen(
        '✨ 🚀 All notes are in sync! 🚀 ✨', { padding: 1 }
      )
    )
  )
}


main().then(() => process.exit(0)).catch(errorHandler);