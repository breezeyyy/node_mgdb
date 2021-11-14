
<br />

## 目录
  - [目录](#目录)
    - [部署](#部署)
    - [开发前的配置要求](#开发前的配置要求)
    - [**安装步骤**](#安装步骤)
    - [快速入门](#快速入门)
    - [项目架构](#项目架构)
    - [使用到的框架](#使用到的框架)
    - [如何参与开源项目](#如何参与开源项目)
    - [版本控制](#版本控制)
    - [作者](#作者)
    - [版权说明](#版权说明)


### 部署
- 该项目仅为node后台
- 在线演示地址：[客户端](http://101.35.125.222)
- 在线演示地址：[管理端](http://101.35.125.222/admin)

### 开发前的配置要求

- Nodejs: `14.17.5`
- express: `4.17.1`
- mongoDB: `5.0.3`
- 其余第三方node模块请查阅[package.json](https://github.com/breezeyyy/node_mgdb/blob/master/package.json)
  
### 安装步骤

**Clone这个地址： `https://github.com/breezeyyy/node_mgdb.git`**
- [本项目客户端地址](https://github.com/breezeyyy/news)
  - 客户端`npm run build`后生成的Dist内容放至 `public/template/`
- [本项目管理端地址](https://github.com/breezeyyy/newsAdmin)
  - 管理端`npm run build`后生成的Dist内容放至 `public/admin/`

### 快速入门

- 安装依赖：`npm install`
- 数据库数据在 `sql`目录内，使用`mongoimport`命令导入
- 数据库配置请查看[global配置](https://github.com/breezeyyy/node_mgdb/blob/master/config/global.js)
- 执行`npm start`，
  - 本地客户端访问：[localhost](http://localhost)
  - 本地管理端访问：[localhost/admin](http://localhost/admin)

### 项目架构

- 前后以及管理端分离
- 前端/管理端： 使用vue cli 脚手架方式搭建
- 后端： 使用node express 脚手架搭建

### 使用到的框架

- 使用express脚手架搭建后台服务器

### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。您所作的任何贡献都是**非常感谢**的。


1. Fork这个项目
2. 创建您的单独分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 上传到您的分支中 (`git push origin feature/AmazingFeature`)
5. 打开拉取请求



### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

### 作者

breezeye@foxmail.com

qq:2806626008  

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE.txt](https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt)


<!-- links -->
[your-project-path]:breezeyyy/node_mgdb
[contributors-shield]: https://img.shields.io/github/contributors/breezeyyy/node_mgdb.svg?style=flat-square
[contributors-url]: https://github.com/breezeyyy/node_mgdb/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/breezeyyy/node_mgdb.svg?style=flat-square
[forks-url]: https://github.com/breezeyyy/node_mgdb/network/members
[stars-shield]: https://img.shields.io/github/stars/breezeyyy/node_mgdb.svg?style=flat-square
[stars-url]: https://github.com/breezeyyy/node_mgdb/stargazers
[issues-shield]: https://img.shields.io/github/issues/breezeyyy/node_mgdb.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/breezeyyy/node_mgdb.svg
[license-shield]: https://img.shields.io/github/license/breezeyyy/node_mgdb.svg?style=flat-square
[license-url]: https://github.com/breezeyyy/node_mgdb/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
