import fs from "fs";
import chalk from "chalk";
import config from "./config";
import inquirer from "inquirer";
import { Command } from "commander";
import type { projectInfoType } from "./types/index";
import { saveModify } from "./fileOperation";

/**
 *
 * 执行 vtiuse-cli 时显示脚手架相关信息
 *
 * 检查项目名在当前是否已经存在并进行处理
 *
 * 获取用户想要集成的模块
 *
 * 并将需要集成的模块数组返回给创建项目函数
 *
 */
export const interactionCom = async () => {
  const program: Command = new Command();
  const packageInfo = require("../package.json");

  return new Promise<{ projectInfo: projectInfoType; templateType: string[] }>(
    (resolve, reject) => {
      let projectInfo: projectInfoType = {
        name: "",
      };
      let templateType: string[] = [];

      program
        .command("create <name>")
        .description("create Vue3 project from remote repo✨")
        .action(async (name: string) => {
          const currentPaths = fs.readdirSync(process.cwd());

          // 检查当前目录下是否有这个文件夹
          // 如果有需要重新输入项目名
          while (currentPaths.includes(name)) {
            const response = await inquirer.prompt({
              type: "input",
              name: "name",
              message: chalk.cyan(
                "This file name already exists, please re-enter 🤔"
              ),
            });
            name = response.name;
          }
          projectInfo.name = name;

          // 模块集成的内容
          const proInfo = await inquirer.prompt([
            {
              type: "checkbox",
              name: "templateCon",
              message: chalk.cyan(
                "Select the template you need for your project(experiment, just press <Enter>) 🎨"
              ),
              choices: [
                { name: "ts", checked: true },
                { name: "husky", checked: true },
              ],
            },
          ]);

          templateType = proInfo.templateCon;

          resolve({ projectInfo, templateType });
        });

      program
        .command("repoUrl")
        .description("show remote repository Url")
        .action(() => {
          console.log(chalk.cyan(`current repoUrl: ${config.repository} 💕`));
        });

      program
        .command("target")
        .description("show targetDir")
        .action(async () => {
          console.log(chalk.cyan(`current dir: ${config.targetDir} 💕`));
        });

      program
        .command("repo <newRepo>")
        .description("modify the repoUrl")
        .action((newRepo: string) => {
          config.repository = newRepo;
          saveModify(config);
          console.log(chalk.cyan(`New repoUrl: ${config.repository} 🎈`));
        });

      program
        .command("dir <newDir>")
        .description("modify the targetDir")
        .action((newDir: string) => {
          config.targetDir = newDir;
          saveModify(config);
          console.log(chalk.cyan(`New targetDir: ${config.targetDir} 🎈`));
        });

      program
        .version(packageInfo.version)
        .helpOption("-h, --help", "show help information")
        .description(chalk.cyan("Welcome to use vtiuse-cli 🎉"));

      program.parse();
    }
  );
};
