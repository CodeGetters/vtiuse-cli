#!/usr/bin/env node

import config from "./config";
import fs from "fs-extra";
import { cloneRep } from "./clone";
import { interactionCom } from "./command";

const getInfo = async () => {
  const { projectInfo, templateType } = await interactionCom();
  // 创建文件夹
  fs.mkdirSync(`./${projectInfo.name}`);

  // 拉取项目模版
  cloneRep(projectInfo, config.repository, templateType);
};
const path = require("path");
  const packageDir = path.dirname(require.resolve("vtiuse-cli"));
  const pack = path.join(packageDir, "/node_modules/vtiuse-cli/lib");
  console.log(pack);

// getInfo();
