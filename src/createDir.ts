// 需要创建的目录
export default () => ({
  type: "input",
  name: "createDir",
  message: "请输入要创建的目录名称",
  validate(val: string) {
    if (val) return true;
    return "请输入要创建的目录名称";
  },
});
