## 准备工作：

先使用dajia-springboot-archetype创建项目，例如：dajia-vuedemo

目录树大致如下：

``` bash
.
|____dajia-vuedemo
| |____dajia-vuedemo-api
| |____dajia-vuedemo-provider
| |____pom.xml
| |____README.md
| |____dajia-vuedemo-consumer
```

## 新建web工程：

1.使用idea打开dajia-vuedemo工程

2.打开Terminal工具栏，当前终端应该处在dajia-vuedemo目录下

3.通常情况下我们将web工程命名为{projectName}-web，在这里应该是dajia-vuedemo-web
  当前路径下执行vue init HUI-UI/vue-starter#develop dajia-vuedemo-web 命令行提示大致如下：
  
``` bash
localhost:dajia-vuedemo lihuanzhong$ vue init ~/Documents/workspace/dajia-vue-skeleton/vue-starter/ dajia-vuedemo-web

? Project name dajia-vuedemo-web
? Debug Web Service Name dajia-vuedemo-consumer
? Project description 大家社区Vue前端工程Demo
? Author lihuanzhong <terence_lee100@hotmail.com>

     vue-cli · Generated "dajia-vuedemo-web".

     To get started:
 
     cd dajia-vuedemo-web
     npm install
     npm run dev

     Documentation can be found at https://vuejs-templates.github.io/webpack
```

注意：其中需要着重说明一下的是Debug Web Service Name提示的输入dajia-vuedemo-consumer，这是联调/发布用的web service工程名，工程骨架会将dajia-vuedemo-consumer/src/main/resources/目录作为联调以及发布的目录，当前实例使用dajia-springboot-archetype创建，所以dajia-vuedemo-consumer/src/main/resources/目录必然存在

## 开发/联调/发布前准备：

1.在Terminal工具栏中进入dajia-vuedemo-web目录

  由于chromedriver默认从https://chromedriver.storage.googleapis.com/2.33/chromedriver_mac64.zip安装，但是国内方位这个地址很慢所以我们先执行下述命令：

``` bash
  npm install chromedriver --chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
```

2.然后再执行下述命令：

``` bash
  npm install
```

  此时大多数情况下都能正常安装完成，如果出现失败的情况可以根据错误提示去问下度娘，大多都能解决

## web工程开发/联调/发布：

  1.在Terminal工具栏中进入dajia-vuedemo-web目录

  2.前端开发态可以使用npm run dev，这里不做多说，比较简单

  3.与Web Service联调，使用npm run debug

    **提示：此时会将生成的html文件拷贝到dajia-vuedemo-consumer/src/main/resources/html/vue/目录下，静态资源会拷贝到dajia-vuedemo-consumer/src/main/resources/static/vue/目录下
    在Controller中加载html页与其他html没有任何区别**

  4.发布工程使用npm run build，此时会将html文件拷贝到dajia-vuedemo-consumer/src/main/resources/html/vue/目录下，而静态资源文件会上传到cdn上，同时html中引用的也是cdn服务器中的静态资源