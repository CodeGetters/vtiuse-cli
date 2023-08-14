#!/usr/bin/env node

import { interactionCom } from "./command";
import { cloneRep } from "./clone";
import config from "./config";
import fs from "fs-extra";

const getInfo = async () => {
  const { projectInfo, templateType } = await interactionCom();
  // 创建文件夹
  fs.mkdirSync(`./${projectInfo.name}_copy`);

  // 拉取项目模版
  cloneRep(projectInfo, config.repository, templateType);
};

getInfo();
