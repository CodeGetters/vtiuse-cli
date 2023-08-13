import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import { spawn } from "cross-spawn";
import { exec } from "child_process";
import config from "./config";
import type { projectInfoType } from "./types/index";

export const fileOperation = (fileInfo: projectInfoType) => {
  const spinners = [ora("Loading1..."), ora("Loading2...")];
  // 开始第一个 loading

  spinners[0].start();

  // 创建文件夹
  fs.mkdirSync(`./${fileInfo.name}`);
  // 拉取项目模版
  process.chdir(`${process.cwd()}/${fileInfo.name}`);
  const initPro = spawn("git", ["init"]);
  initPro.on("close", (code: string) => {
    console.log("git init over ✔", code);
  });

  // 拉取项目模版
  const getTemplate = spawn("git", [
    "remote",
    "add",
    "origin",
    config.repository,
  ]);
  getTemplate.on("close", (code: string) => {
    console.log("git add origin over ✔", code);
  });

  // const startSparse = spawn("git", ["config", "core.sparsecheckout", "true"]);
  // startSparse.on("close", (code: string) => {
  //   console.log("git config over ✔", code);
  // });

  // exec("echo src/api >> .git/info/sparse-checkout");

  const pullTemplate = spawn("git", ["pull", "origin", "main"]);

  pullTemplate.stdout.on("data", (data: string) => {
    console.log(`stdout: ${data}`);
  });

  pullTemplate.stderr.on("data", (data: string) => {
    console.error(`stderr: ${data}`);
  });

  pullTemplate.on("close", (code: string) => {
    spinners[0].succeed("Loading1 Success");
    console.log("git pull over ✔");
  });

  // 修改文件信息
  // fs.readFile(
  //   `${process.cwd()}/${fileInfo.name}/package.json`,
  //   (err, data) => {}
  // );

  console.log(chalk.cyan(`project ${fileInfo.name} already created 🎉`));
};

// 读取并选择模板
// const getAndSelectModule = async () => {
// 获取远程仓库中的目录
// const tplDirs = fs.readdirSync();
// console.log("tplDirs", tplDirs);
// 可选的模板
// const tplModules = [];
// for (const item of tplDirs) {
//   // 筛选目录并将 .git 排除
//   if (fs.statSync().isDirectory() && item !== ".git") {
//     tplModules.push({
//       value: item,
//       name: item,
//     });
//   }
// }
// };

// fs.readFile(`${process.cwd()}/${}/package.json`, (err, data) => {
//   if (err) throw err;
//   let _data = JSON.parse(data.toString())
//   _data.name = program.init
//   _data.version = '1.0.0'
//   let str = JSON.stringify(_data, null, 4);
//   fs.writeFile(`${process.cwd()}/${program.init}/package.json`, str, function (err) {
//     if (err) throw err;
//   })
// });

// // 监听子进程的输出
// childProcess.stdout.on("data", (data: string) => {
//   console.log(`stdout: ${data}`);
// });

// childProcess.stderr.on("data", (data: string) => {
//   console.error(`stderr: ${data}`);
// });

// // 监听子进程的退出事件
// childProcess.on("close", (code: string) => {
//   console.log(`子进程退出，退出码: ${code}`);
// });
