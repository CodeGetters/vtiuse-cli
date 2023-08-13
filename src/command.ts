import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import { Command } from "commander";
import type { projectInfoType } from "./types/index";

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
  const program = new Command();
  const packageInfo = require("../package.json");

  return new Promise<{ projectInfo: projectInfoType; templateType: string[] }>(
    (resolve, reject) => {
      let projectInfo: projectInfoType = {};
      let templateType: string[] = [];

      program.command("create <name>").action(async (name) => {
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
              "Select the template you need for your project 🎨"
            ),
            choices: [
              { name: "ts", checked: true },
              { name: "husky", checked: true },
              { name: "cz", checked: true },
              { name: "eslint", checked: true },
              { name: "prettier", checked: true },
              { name: "unocss", checked: true },
              { name: "i18n", checked: true },
            ],
          },
        ]);
        templateType = proInfo.templateCon;

        resolve({ projectInfo, templateType });
      });

      program
        .version(packageInfo.version)
        .helpOption("-h, --help", "show help information")
        .description(chalk.cyan("Welcome to use vtiuse-cli 🎉"));

      program.parse();

      // Handle parsing errors or other exceptional cases
      // reject(new Error("Error message"));
    }
  );
};
