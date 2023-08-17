import ora from "ora";
import chalk from "chalk";
import fileOperation from "./fileOperation";
import { spawn } from "node:child_process";
import type { projectInfoType } from "./types/index";

/**
 *
 * 从远程仓库拉取目标目录下的模版
 *
 * 删除没有选择的文件夹/文件
 *
 * 将目标文件夹提到根目录
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

  cloneRep.on("close", (code: number) => {
    code === 0 ? spinners[0].succeed() : spinners[0].fail();
    // 检查退出码
    if (!code) {
      console.log(
        chalk.cyan(
          "The template is successfully pulled, and the files are filtered🥰"
        )
      );
      spinners[1].start();

      // 对文件进行筛选和移动
      fileOperation(fileInfo, templateType);

      spinners[1].succeed();
    } else {
      // 克隆失败
      console.log(
        "Project cloning failed. Please check whether the network is connected❓❗"
      );
    }
  });
};
