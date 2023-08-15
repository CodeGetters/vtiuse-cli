import ora from "ora";
import chalk from "chalk";
import fileOperation from "./fileOperation";
import { spawn } from "node:child_process";
import type { projectInfoType } from "./types/index";

/**
 *
 * 从远程仓库拉取目标目录下的模版
 *
 * @param fileInfo 本地新建的目录名
 * @param repository 仓库地址
 */
export const cloneRep = (
  fileInfo: projectInfoType,
  repository: string,
  templateType: string[]
) => {
  const spinners = [ora("Loading...👀"), ora("Creating...😜")];
  spinners[0].start();

  const cloneRep = spawn("git", ["clone", repository, `${fileInfo.name}`]);

  cloneRep.stderr.on("data", (data: string) => {
    console.error(`stderr: ${data}`);
  });

  cloneRep.on("close", (code: number) => {
    code === 0 ? spinners[0].succeed() : spinners[0].fail();
    if (!code) {
      console.log(
        chalk.cyan(
          "The template is successfully pulled, and the files are filtered🥰"
        )
      );
      // 对文件进行筛选(删除不要文件)
      spinners[1].start();
      fileOperation(fileInfo, templateType);
      spinners[1].succeed();
    } else {
      console.log(
        "Project cloning failed. Please check whether the network is connected❓❗"
      );
    }
  });
};
