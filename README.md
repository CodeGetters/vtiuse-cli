<p align="center">
    <img src="/public/vtiuse.svg" />
</p>

English|[简体中文](./README-ZH.md)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

<h1>vtiuse-cli</h1>

> A cli that can pull different vue3 project templates from a remote project template repository. It is mainly used for pulling fixed project templates (it can also be used for pulling subfolder under the warehouse). That is, when you have a project template that you want to pull under a monorepo repository, you can use this.

## Install

```shell
npm i vtiuse-cli -g
```

## Usage

```shell
# pull templates from the default repository
vtiuse-cli create <projectName>

# Change the default repository address
vtiuse-cli repo <newRepo>

# Change the default target directory
vtiuse-cli dir <newDir>
```

## 示例

As an example, pull files in the src directory under the default repository

```sh
npm i vtiuse-cli -g

# Check the default target directory
vtiuse-cli target

vtiuse-cli create test
```

[npm-version-src]: https://img.shields.io/npm/v/vtiuse-cli
[npm-version-href]: https://npmjs.com/package/vtiuse-cli
[npm-downloads-src]: https://img.shields.io/npm/dm/vtiuse-cli
[npm-downloads-href]: https://npmjs.com/package/vtiuse-cli
[license-src]: https://img.shields.io/github/license/CodeGetters/vtiuse-cli.svg
[license-href]: https://github.com/CodeGetters/vtiuse-cli/blob/main/LICENSE
