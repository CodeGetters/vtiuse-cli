import fs from "node:fs";
import type { projectInfoType } from "./types/index";
import config from "./config";
import { table } from "node:console";
/**
 * @description 对文件进行开启稀疏模式
 *
 * 对项目进行深度遍历，直到找到目标文件夹
 *
 * 找到目标文件夹将这个文件夹进行深度复制
 *
 * 复制文件夹后删除文件夹下内的其他文件
 *
 */
export default async (projectInfo: projectInfoType, templateType: string[]) => {
  console.log("current Path:", process.cwd());
  console.log(".............👀👀👀👀👀👀👀👀👀...............");
  // 切换到模板目录
  process.chdir(`${projectInfo.name}_copy/${config.targetDir}`);
  console.log("current Path:", process.cwd());

  searchTargetFile(templateType);
  copyFile(`${config.targetDir}_copy`, config.targetDir);
};

/**
 *
 * @description 对目标文件夹进行深度查询
 * @param targetDir 目标文件夹
 *
 */
const searchTargetFile = (template: string[]) => {
  // 获取当前目录下的所有文件/文件夹
  const files = fs.readdirSync("./");
  console.log(files);
};

/**
 * @description 复制目标文件夹到另外正式文件夹
 * @param targetDir 目标文件夹
 * @param sourceDir 正式文件夹
 * 复制文件夹
 */
const copyFile = (sourceDir: string, targetDir: string) => {
  // fs.mkdirSync(targetDir, { recursive: true });
  // // 读取源文件夹中的内容
  // const files = fs.readdirSync(targetDir);
  // // 循环复制文件和子文件夹
  // files.forEach((file) => {
  //   const sourcePath = `${sourceDir}/${file}`;
  //   const targetPath = `${targetDir}/${file}`;
  //   // 获取文件/文件夹的详细信息
  //   const stats = fs.statSync(sourcePath);
  //   if (stats.isFile()) {
  //     // 如果是文件，则直接进行复制
  //     fs.copyFileSync(sourcePath, targetPath);
  //   } else if (stats.isDirectory()) {
  //     // 如果是文件夹，则递归调用复制函数
  //     copyFile(sourcePath, targetPath);
  //   }
  // });
};

/**
 * 删除文件夹
 */
const deleteFile = () => {
  // /^(?!OpenAI).*$/.test()
  // fs.rmSync("", { recursive: true });
};
