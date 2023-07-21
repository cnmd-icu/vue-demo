#!/usr/bin/env node  

const { execSync } = require("child_process");
const program = require("commander");
const path = require("path");

// 获取当前脚本的目录路径
const scriptPath = path.dirname(process.argv[1]);

// 定义命令配置信息的数组
const commands = [
  {
    name: "dev",
    description: "dev project",
    cmd: `webpack-dev-server --progress --config  "../build/webpack.dev.js"`
  },
  {
    name: "build",
    description: "build project",
    cmd: `webpack --progress --node-env production --config ${path.join(scriptPath, "../build/webpack.prod.js")}`
  },{
    name: "build:dev",
    description: "build:dev project",
    cmd: `webpack --progress --config ${path.join(scriptPath, "../build/webpack.dev.js")}`
  },
  {
    name: "dll",
    description: "dll project",
    cmd: `webpack --config  ${path.join(scriptPath, "../build/webpack.dll.config.js")}`
  },{
    name: "analyze",
    description: "analyze project",
    cmd: `webpack --progress --analyze --node-env production --config ${path.join(scriptPath, "../build/webpack.dev.js")}`
  }
];

// 循环遍历命令配置信息数组，动态添加命令
commands.forEach(cmd => {
  program
    .command(cmd.name)
    .description(cmd.description)
    .action(() => {
      console.log("Running command:", cmd.cmd);
      execSync(cmd.cmd, { stdio: "inherit" });
    });
});

// 解析命令行参数
program.parse(process.argv);
