import fs from "node:fs";
import config from "./config";
import path, { join } from "node:path";
import type { projectInfoType, configType } from "./types/index";

/**
 * @description 对文件进行开启稀疏模式
 *
 * 将目标目录拆解目录数组
 *
 * 调用 searchTargetFIle 函数获取只有 dirname/targetDir 文件路径
 *
 * 调用 moveFile 函数将目标文件移动到顶层目录
 *
 * 删除空文件夹
 *
 */
export default async (projectInfo: projectInfoType, templateType: string[]) => {
  // 切换到模板目录
  process.chdir(projectInfo.name);

  const dirArr = config.targetDir.split("/");
  if (!(dirArr[0] == "")) {
    operationTargetFile(dirArr);

    // 移动文件夹到顶层目录
    moveFile(config.targetDir);

    // 删除文件
    fs.rmSync(path.join(process.cwd(), dirArr[0]), { recursive: true });
  }
};

/**
 * @description 将目录下的除目标目录以外的文件全部删除
 *
 * 获取当前工作目录
 *
 * 调用删除文件夹函数将其他当前目录下的文件全部删除
 *
 * 切换目录又继续删除
 *
 * 直到最后只剩下 dirname/targetDir
 *
 * @param checkArr 目标路径数组
 */
const operationTargetFile = (checkArr: string[]) => {
  let pathLink: string = process.cwd();

  for (let i = 0; i < checkArr.length; i++) {
    deleteFile(checkArr[i], pathLink);
    pathLink = path.join(pathLink, checkArr[i]);
  }
};

/**
 * @description 删除除需要排除的文件夹的其他文件夹或文件
 * @param exclude 需要排除的文件夹
 * @param currentPath 文件夹目录
 */
const deleteFile = (exclude: string, currentPath: string) => {
  //读取文件夹下的文件目录，以数组形式输出
  fs.readdirSync(currentPath).forEach((file) => {
    if (!(exclude === file)) {
      try {
        fs.rmSync(path.join(currentPath, file), { recursive: true });
      } catch (err) {
        console.log("file operated failed", file);
      }
    }
  });
};

/**
 * 将目标目录下的所有文件/文件夹移动到顶层目录
 *
 * @param targetDir 目标目录
 */
const moveFile = (targetDir: string) => {
  const currentPath = path.join(process.cwd(), targetDir);

  fs.readdirSync(currentPath).forEach((file) => {
    fs.rename(`${targetDir}/${file}`, `${file}`, (err) => {});
  });
};

/**
 *
 * @description 将修改后的配置文件进行保存
 *
 * 这里的写入操作是覆盖写入操作(后期考虑换掉)
 *
 * @param config 新的配置文件
 */
export const saveModify = (config: configType) => {
  // 存放包的目录
  const packageDir = path.dirname(require.resolve("vtiuse-cli"));
  // 包的位置
  const packPath = join(packageDir, "/node_modules/vtiuse-cli");

  const updatedConfig = `"use strict";\n Object.defineProperty(exports, "__esModule", { value: true });\n exports.default = ${JSON.stringify(
    config,
    null,
    2
  )};`;

  const currentPath = join(packPath, "lib/config.js");
  fs.writeFile(currentPath, updatedConfig, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
