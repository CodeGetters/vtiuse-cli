#!/usr/bin/env node

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
import { interactionCom } from "./command";
import { cloneRep } from "./clone";
import config from "./config";
import fs from "fs-extra";
// import fileOperation from "./fileOperation";

const getInfo = async () => {
  const { projectInfo, templateType } = await interactionCom();

  // 创建文件夹
  fs.mkdirSync(`./${projectInfo.name}`);

  // 拉取项目模版
  cloneRep(projectInfo, config.repository, config.targetDir);

  // fileOperation();
};

getInfo();
