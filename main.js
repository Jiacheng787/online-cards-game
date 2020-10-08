const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const app = require('./src/index.js');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node JS CLI", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension?"
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".rb", ".js", ".php", ".css"],
      filter: function(val) {
        return val.split(".")[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath);
  return filePath;
};

const success = filepath => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  );
};

const run = async () => {
  // show script introduction
  init();
  
  console.log("正在初始化卡牌...")
  const cards = new app.Cards();
  
  console.log("正在洗牌...");
  cards.shuffle();
  
  console.log("正在发牌...");
  cards.deal();
  console.log(cards);
  
  console.log(cards.n == "you" ? "您先出牌" : "对手先出牌")
  console.log(cards.you)

  // ask questions
  // const answers = await askQuestions();
  // const { FILENAME, EXTENSION } = answers;

  // create the file
  // const filePath = createFile(FILENAME, EXTENSION);

  // show success message
  // success(filePath);
};

run();