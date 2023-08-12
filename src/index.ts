#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import yargs from "yargs";
import fs from "fs-extra";

/**
 *
 * 返回包信息(version、help)
 * 模块：vue3、TS、vitest、cz-git、husky、eslint、unocss、vueuse、i18n
 * 根据模块返回相应的模版
 * 方法一：
 * 包里就自带模版
 * 方法二：
 * 克隆远程仓库的模版
 *
 */

const program = new Command();

const spinners = [ora("Loading1..."), ora("Loading2...")];
// 开始第一个 loading
spinners[0].start();

setTimeout(() => {
  spinners[0].succeed("Loading1 Success");
  spinners[1].start();
}, 3000);

setTimeout(() => {
  spinners[1].fail("Loading2 Fail");
}, 6000);

program.command("create <name>").action(async (name) => {
  console.log("🚀 Welcome to use vtiuse 😜");

  inquirer
    .prompt([
      {
        type: "confirm",
        name: "ts",
        message: "Do you want to use ts",
      },
      {
        type: "confirm",
        name: "husky",
        message: "Do you want to use husky",
      },
      {
        type: "confirm",
        name: "cz",
        message: "Do you want to use cz-git",
      },
      {
        type: "confirm",
        name: "eslint",
        message: "Do you want to use eslint",
      },
      {
        type: "confirm",
        name: "unocss",
        message: "Do you want to use vueuse",
      },
      {
        type: "confirm",
        name: "i8n",
        message: "Do you want to use vue-i18n",
      },
    ])
    .then((answer) => {
      console.log("answer:", answer);
      console.log(`${chalk.cyan("create project name:")} ${name}`);
      console.log("yargs:", yargs);
      return;
    });
});

program.command("help").description("command for detail about vtiuse-cli");

program.on("--help", () => {
  console.log(
    `\r\nRun ${chalk.cyan(
      "vtiuse-cli <command> --help"
    )} for detailed usage of given command\r\n`
  );
});

program.parse();

fs.mkdirSync(`./Hello`);
