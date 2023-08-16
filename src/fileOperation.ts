import fs from "node:fs";
import config from "./config";
import path from "node:path";
import type { projectInfoType } from "./types/index";

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
    searchTargetFile(dirArr);

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
const searchTargetFile = (checkArr: string[]) => {
  let pathLink: string = process.cwd();

  for (let i = 0; i < checkArr.length; i++) {
    deleteFile(checkArr[i], pathLink);
    pathLink = path.join(pathLink, checkArr[i]);
  }
};

/**
 * @description 复制目标文件夹到另外正式文件夹
 * @param targetDir 目标文件夹
 * @param sourceDir 正式文件夹
 * 复制文件夹
 */
const copyFile = (sourceDir: string, targetDir: string) => {
  fs.mkdirSync(targetDir, { recursive: true });
  // 读取源文件夹中的内容
  const files = fs.readdirSync(targetDir);
  // 循环复制文件和子文件夹
  files.forEach((file) => {
    const sourcePath = `${sourceDir}/${file}`;
    const targetPath = `${targetDir}/${file}`;
    // 获取文件/文件夹的详细信息
    const stats = fs.statSync(sourcePath);
    if (stats.isFile()) {
      // 如果是文件，则直接进行复制
      fs.copyFileSync(sourcePath, targetPath);
    } else if (stats.isDirectory()) {
      // 如果是文件夹，则递归调用复制函数
      copyFile(sourcePath, targetPath);
    }
  });
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
        console.log("file 删除成功", file);
      } catch (err) {
        console.log("file 删除失败", file);
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
