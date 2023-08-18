<p align="center">
    <img src="./public/vtiuse.svg" />
</p>

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

<h1>vtiuse-cli</h1>

> 一个可以从远程项目模版仓库中拉取不同 vue3 项目模版的 cli。主要是用于拉取固定的项目模版(也可以用于拉取仓库下的子文件夹)。也就是说，当你有一个想要拉取一个 monorepo 仓库下的其中一个项目模版，你就可以使用这个。

## 下载

```shell
npm i vtiuse-cli -g
```

## 使用

```shell
# 使用这个命令将会从默认仓库拉取模版
vtiuse-cli create <projectName>

# 使用这个命令将会修改默认仓库地址
vtiuse-cli repo <newRepo>

# 使用这个命令将会修改默认目标目录
vtiuse-cli dir <newDir>
```

## 示例

这里以拉取 cli 仓库下的 src/index.ts 作为示例

```sh
npm i vtiuse-cli -g

# modify the pull repo
vtiuse-cli repo git@github.com:CodeGetters/vtiuse-cli.git

# modify repo dir
vtiuse-cli dir src/index.ts

vtiuse-cli create test
```

[npm-version-src]: https://img.shields.io/npm/v/vtiuse-cli
[npm-version-href]: https://npmjs.com/package/vtiuse-cli
[npm-downloads-src]: https://img.shields.io/npm/dm/vtiuse-cli
[npm-downloads-href]: https://npmjs.com/package/vtiuse-cli
[license-src]: https://img.shields.io/github/license/CodeGetters/vtiuse-cli.svg
[license-href]: https://github.com/CodeGetters/vtiuse-cli/blob/main/LICENSE
