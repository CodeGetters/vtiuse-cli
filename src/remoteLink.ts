// 读取远程仓库
import fs from "fs";

export default (templatesDirRootPath: string) => {
  let remoteUrl = "";
  if (fs.existsSync(`${templatesDirRootPath}/defaultRemoteUrl.txt`)) {
    remoteUrl = fs.readFileSync(
      `${templatesDirRootPath}/defaultRemoteUrl.txt`,
      "utf-8"
    );
  }
  return {
    type: "input",
    name: "remoteUrl",
    default: remoteUrl || undefined,
    message: "请设置远程仓库地址",

    validate(val: string) {
      // git仓库的正则表达式 http://cn.voidcc.com/question/p-qlprjeax-kd.html
      const gitRemoteUrlReg =
        /(\w+:\/\/)([email protected])*([\w\d\.]+)(:[\d]+){0,1}\/*(.*)/;
      if (!val) {
        return "请设置远程仓库地址";
      } else if (!gitRemoteUrlReg.test(val)) {
        return "远程仓库地址格式错误，请重新输入";
      } else {
        return true;
      }
    },
  };
};
