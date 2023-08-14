import chalk from "chalk";
import { spawn } from "node:child_process";
import ora from "ora";
import type { projectInfoType } from "./types/index";

/**
 *
 * 从远程仓库拉取目标目录下的模版
 *
 * @param fileInfo 本地目录名
 * @param repository 仓库地址
 * @param targetDir 仓库目标目录
 */
export const cloneRep = (
  fileInfo: projectInfoType,
  repository: string,
  targetDir: string
) => {
  const spinners = ora("Loading...👀");
  spinners.start();

  const cloneRep = spawn("git", ["clone", repository, fileInfo.name]);

  cloneRep.stderr.on("data", (data: string) => {
    console.error(`stderr: ${data}`);
  });

  cloneRep.on("close", (code: number) => {
    code === 0 ? spinners.succeed() : spinners.fail();
    // 对文件进行筛选(删除不要文件)
    console.log(
      chalk.cyan(
        "The template is successfully pulled, and the files are filtered🥰"
      )
    );
  });
};
