# DOCKER

### 三个概念

快速入门命令解读

```dockerfile
docker run -d \
 --name mysql  \                               \符号表示换行
 -p 3306:3306 \
 -e TZ=Asia/Shanghai \
 mysql
 
 docker run : 创建并运行 一个容器 -d 是让容器在后台运行
 --name  mysql : 给容器起个名字，必须唯一
 -p3306:3306 :设置端口映射 前者映射到 后者 端口  宿主机 映射到 容器
 -e KEY=VALUE : 是设置 环境变量的
 mysql : 指定 运行  指定容器       镜像名称一般分为两部分组成:[repository]:[tag]
 							其中repository就是镜像名 tag 是指镜像的版本 
 							比如mysql:5.7
 							在没有指定tag时，默认是latest，代表最新版本的镜像
```

### docker基础

##### 流程

![process_control](C:\Users\admin\Desktop\docker\images\process_control.png)

##### 命令

命令就是操作镜像，容器的命令，详细见官方文档：https://docs.docker.com/reference/

##### 常见命令

| 命令                  | **Description**：描述                                      |                                                            | **Aliases**：别名                                            |
| --------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| docker image pull     | Docker Hub包含许多预构建的映像，可以进行下载               | docker image pull [OPTIONS]    NAME[:TAG@DIGEST]           | `docker pull`                                                |
| docker image push     | 上传镜像                                                   | docker image push [OPTIONS] NAME[:TAG]                     | `docker push`                                                |
| docker image rm       | 删除一个或多个图像                                         | docker image rm [OPTIONS] IMAGE [IMAGE...]                 | `docker image remove ` `docker rmi`                          |
| docker image ls       | 镜像列表                                                   | docker image ls [OPTIONS] [REPOSITORY[:TAG]]               | ` docker image ls` `docker images`                           |
| docker image save     | 将一个或多个图像保存到 tar 归档文件(默认情况下流到 STDOUT) | docker image save [OPTIONS] IMAGE [IMAGE...]               | `docker save`                                                |
| docker image load     | 从 tar 归档文件或 STDIN 加载映像                           | docker image load [OPTIONS]                                | `docker load`                                                |
| docker buildx build   | 构建镜像                                                   | docker buildx build [OPTIONS] PATH \|url \| -              | `docker build` ``docker builder build`  `docker image build` `docker buildx b` |
| docker container run  | 从映像创建并运行一个新容器                                 | docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]    | `docker run`                                                 |
| docker ps -a          | 查看容器 状态                                              | docker ps --no-trunc                                       |                                                              |
| docker container logs | 获取容器的日志                                             | docker container logs [OPTIONS] CONTAINER                  | `docker logs`                                                |
| docker container rm   | 移除一个或多个容器                                         | docker container rm [OPTIONS] CONTAINER [CONTAINER...]     | `docker container remove`  `docker rm`                       |
| docker container exec | 在运行的容器中执行命令                                     | docker container exec [OPTIONS] CONTAINER COMMAND [ARG...] | `docker exec`                                                |

##### tips:

```
docker container run -d  //创建一个容器 并且在后台运行
```



##### 数据卷(volume)

是一个虚拟目录，是容器内目录与宿机目录之间映射的桥梁,通过修改宿主机 文件 进而 修改 容器内的目录，在创建容器是 如果数据卷不存在，就会自动创建

创建数据卷   需要注意的是 只有在创建容器的时候根据falgs 决定是否创建 对应数据 数据卷

![volume](C:\Users\admin\Desktop\docker\images\volume.png)

| 命令                  | Description : 描述             | **Usage**：使用                                    | **Aliases**：别名    |
| --------------------- | ------------------------------ | -------------------------------------------------- | -------------------- |
| docker volume ls      | 数据卷列表                     | docker volume ls [OPTIONS]                         | `docker volume list` |
| docker volume inspect | 显示一个或多个卷的详细信息     | docker volume inspect [OPTIONS] VOLUME [VOLUME...] |                      |
| docker inspect        | 返回关于 Docker 对象的底层信息 | docker inspect [OPTIONS] NAME\|ID [NAME\|ID...]    |                      |

##### tips

```
docker run  -d --name containerName - port:port -v html: 容器数据卷目录    创建容器的同时 创建 数据 卷   一般默认创建数据卷
```

### Image  镜像

容器映像是一个标准化软件包，其中包括运行容器所需的所有文件、二进制文件、库和配置。

图像有两个重要的原则：

1. 图像是不可变的。映像创建后，无法对其进行修改。您只能制作新图像或在其上添加更改。
2. 容器映像由层组成。每个层表示一组用于添加、删除或修改文件的文件系统更改。

##### Dockerfile

Docker可以根据Dockerfile帮我们构建镜像。常见指令如下:
Dockerfile是一个文本文件，其中包含一个个的指令(Instruction)，用指令来说明要执行什么操作来构建镜像。

| 指令                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| FORM <image>        | 定义图像的基础。                                             |
| RUN <command>       | 执行当前图像顶部新层中的任何命令并提交结果。RUN 还有一个用于运行命令的 shell 表单。 |
| WORKDIR <directory> | 在 Dockerfile 中设置任何运行、 CMD、 ENTRYPOINT、 COPY 和 ADD 指令的工作目录。 |
| COPY <src> <dest>   | 从 < src > 复制新的文件或目录，并将它们添加到路径 < dest> 的容器的文件系统中。 |
| CMD <command>       | 使您可以根据此图像定义在启动容器后运行的默认程序。每个 Dockerfile 只有一个 CMD，并且在存在多个 CMD 时只尊重最后一个 CMD 实例。 |

##### tips

```
docker builld -t myImage:1.0   .    -t:是给镜像起名，格式依然是repository：tag的是个 不指定tag时，默认为latest

.:是指dockerfile所在目录，如果就在当前目录，则指定 为 .
```



##### 自定义镜像

镜像就是包含了应用程序，程序运行的系统函数哭，运行配置等文件的文件包。构建镜像的过程其实就是把上述文件打包的过程

##### 层layer

添加安装包，依赖，配置等，每次操作都形成新的一层。

##### 基础镜像BaseImage

应用依赖的系统函数库，环境，配置，文件等。

##### 入口Entrypoint

镜像运行入口，一般是程序启动的脚本和参数

### Container / 容器

容器是应用程序每个组件的隔离进程。每个组件（前端 React 应用程序、Python API 引擎和数据库）都在自己的隔离环境中运行，与计算机上的其他所有内容完全隔离。

容器包括：

- 自包含。每个容器都拥有运行所需的一切，无需依赖主机上任何预安装的依赖项。
- 孤立。由于容器是独立运行的，因此它们对主机和其他容器的影响最小，从而提高了应用程序的安全性。
- 独立。每个容器都是独立管理的。删除一个容器不会影响任何其他容器。
- 便携式。容器可以在任何地方运行！在开发计算机上运行的容器在数据中心或云中的任何位置都将以相同的方式工作！

##### 网络

默认情况下，所有容器都是以bridge方式连接到Docker的一个虚拟网桥上：

![network](C:\Users\admin\Desktop\docker\images\network.jpg)



##### 自定义网络

加入自定义网络的容器才可以通过容器名相互访问，docker的网络操作命令如下：

| 命令                      | 说明                           | usage                                                 | **Aliases**             |
| ------------------------- | ------------------------------ | ----------------------------------------------------- | ----------------------- |
| docker network create     | 创建网络                       | docker network create [OPTIONS] NETWORK               |                         |
| docker network ls         | 网络列表                       | docker network ls [OPTIONS]                           | `docket networl ls`     |
| docker network rm         | 移除一个或者多个网络           | docker network rm NETWORK [NETWORK...]                | `docker network remove` |
| docker network prune      | 删除所有未使用的网络           | docker network prune [OPTIONS]                        |                         |
| docker network connect    | 将容器连接到网络               | docker network connect [OPTIONS] NETWORK CONTAINER    |                         |
| docker network disconnect | 从网络断开容器                 | docker network disconnect [OPTIONS] NETWORK CONTAINER |                         |
| docker network inspect    | 在一个或多个网络上显示详细信息 | docker network inspect [OPTIONS] NETWORK [NETWORK...] |                         |



##### 容器互联



##### dockerCompose

通过一个单独的**docker-compose.yml**模板文件(YAML格式)来定义一组相关联的应用容器，帮助我们实现**多个相互关联的Docker容器的快速部署**

##### 命令部署

docker copose [OPTIONS] [COMMAND]

### dockerfile

Docker 可以通过读取 Dockerfile 中的指令来自动构建镜像。Dockerfile 是一个文本文档，其中包含用户可以在命令行上调用来组装镜像的所有命令。

##### 指令

| 操作说明      | 描述                             |
| ------------- | -------------------------------- |
| `ADD`         | 添加本地或远程文件和目录。       |
| `ARG`         | 使用构建时变量。                 |
| `CMD`         | 指定默认命令。                   |
| `COPY`        | 复制文件和目录。                 |
| `ENTRYPOINT`  | 指定默认可执行文件。             |
| `ENV`         | 设置环境变量。                   |
| `EXPOSE`      | 描述应用程序正在监听哪些端口。   |
| `FROM`        | 从基础图像创建一个新的构建阶段。 |
| `HEALTHCHECK` | 在启动时检查容器的健康状况。     |
| `LABEL`       | 向图像添加元数据。               |
| `MAINTAINER`  | 指定图像的作者。                 |
| `ONBUILD`     | 指定在构建中使用映像的说明。     |
| `RUN`         | 执行构建命令。                   |
| `SHELL`       | 设置图像的默认外壳。             |
| `STOPSIGNAL`  | 指定退出容器的系统调用信号。     |
| `USER`        | 设置用户和组ID。                 |
| `VOLUME`      | 创建卷装。                       |
| `WORKDIR`     | 更改工作目录。                   |



指令不区分大小写。但是，惯例是将它们大写，以便更容易地将它们与参数区分开来。

Docker 按顺序运行 Dockerfile 中的指令。Dockerfile必须以**指令** **开头`FROM`**。每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

FROM`指令指定 您正在构建的[父镜像]`FROM`。只能在一个或多个指令之前，这些指令声明在 Dockerfile 中的行`ARG`中使用的参数。`

##### FROM指定基础镜像

定制镜像，那一定是以一个镜像为基础，在其上进行定制。基础镜像是必须指定的。而 `FROM` 就是指定 **基础镜像**，因此一个 `Dockerfile` 中 `FROM` 是必备的指令，并且必须是第一条指令。

除了选择现有镜像为基础镜像外，Docker 还存在一个特殊的镜像，名为 `scratch`。这个镜像是虚拟的概念，并不实际存在，它表示一个空白的镜像。

```dockerfile
FROM scratch
...
```

如果以 `scratch` 为基础镜像的话，意味着你不以任何镜像为基础，接下来所写的指令将作为镜像第一层开始存在。

不以任何系统为基础，直接将可执行文件复制进镜像的做法并不罕见，对于 Linux 下静态编译的程序来说，并不需要有操作系统提供运行时支持，所需的一切库都已经在可执行文件里了，因此直接 `FROM scratch` 会让镜像体积更加小巧。使用 (Go 语言) 开发的应用很多会使用这种方式来制作镜像，这也是有人认为 Go 是特别适合容器微服务架构的语言的原因之一。

##### RUN执行命令

`RUN` 指令是用来执行命令行命令的。`RUN` 指令在定制镜像时是最常用的指令之一。其格式有两种：

- *shell* 格式：`RUN <命令>`。

  ```dockerfile
  RUN echo '<h1> hello docker </h1>' /usr/share/nginx/html/index.html
  ```

- *exec* 格式：`RUN ["可执行文件", "参数1", "参数2"]`，这更像是函数调用中的格式。

##### 构建dockerfile

```
docker build [选项] <上下文路径/URL/-> 
```

##### 镜像构建上下文（Context）

如果注意，会看到 `docker build` 命令最后有一个 `.`。`.` 表示当前目录，而 `Dockerfile` 就在当前目录，这是在指定 **上下文路径**。

##### docker build 工作原理

Docker 在运行时分为 Docker 引擎（也就是服务端守护进程）和客户端工具。Docker 的引擎提供了一组 REST API，被称为docker remote api 而如 `docker` 命令这样的客户端工具，则是通过这组 API 与 Docker 引擎交互，从而完成各种功能。因此，虽然表面上我像是在本机执行各种 `docker` 功能，但实际上，一切都是使用的远程调用形式在服务端（Docker 引擎）完成。也因为这种 C/S 设计，操作远程服务器的 Docker 引擎变得轻而易举。

进行镜像构建的时候，并非所有定制都会通过 `RUN` 指令完成，经常会需要将一些本地文件复制进镜像，比如通过 `COPY` 指令、`ADD` 指令等。而 `docker build` 命令构建镜像，其实并非在本地构建，而是在服务端，也就是 Docker 引擎中构建的。那么在这种客户端/服务端的架构中，如何才能让服务端获得本地文件呢？

当构建的时候，用户会指定构建镜像上下文的路径，`docker build` 命令得知这个路径后，会将路径下的所有内容打包，然后上传给 Docker 引擎。这样 Docker 引擎收到这个上下文包后，展开就会获得构建镜像所需的一切文件。

如果在 `Dockerfile` 中这么写：

```
COPY ./package.json /app/
```

这并不是要复制执行 `docker build` 命令所在的目录下的 `package.json`，也不是复制 `Dockerfile` 所在目录下的 `package.json`，而是复制 **上下文（context）** 目录下的 `package.json`。

例如命令 `docker build -t nginx:v3 .` 中的这个 `.`，实际上是在指定上下文的目录，`docker build` 命令会将该目录下的内容打包交给 Docker 引擎以帮助构建镜像。

一般来说，应该会将 `Dockerfile` 置于一个空目录下，或者项目根目录下。如果该目录下没有所需文件，那么应该把所需文件复制一份过来。如果目录下有些东西确实不希望构建时传给 Docker 引擎，那么可以用 `.gitignore` 一样的语法写一个 `.dockerignore`，该文件是用于剔除不需要作为上下文传递给 Docker 引擎的。

那么为什么会有人误以为 `.` 是指定 `Dockerfile` 所在目录呢？这是因为在默认情况下，如果不额外指定 `Dockerfile` 的话，会将上下文目录下的名为 `Dockerfile` 的文件作为 Dockerfile。

这只是默认行为，实际上 `Dockerfile` 的文件名并不要求必须为 `Dockerfile`，而且并不要求必须位于上下文目录中，比如可以用 `-f ../Dockerfile.php` 参数指定某个文件作为 `Dockerfile`。

当然，一般大家习惯性的会使用默认的文件名 `Dockerfile`，以及会将其置于镜像构建上下文目录中

```bash
docker run -d 	--name postgres 	-e POSTGRES_PASSWORD=Hhu123456& -e PGDATA=/var/lib/postgresql/data/pgdata 	-v E:\arcgis\pgsql:/var/lib/postgresql/data \
	postgres
	
	
	
	docker run -d --name gispgsql -e POSTGRES_PASSWORD=pgsql -p 5433:5432 -e PGDATA=/var/lib/postgresql/data/pgdata -v E:\arcgis\postgis:/var/lib/postgresql/data corpusops/postgis:9.4
	
	
	
	
	
	docker docker run -d --name=arcgisServer --hostname=arcgisserver --net=arcgis.lan -p 6080:6080 -p 6443:6443-v E:\arcgis\arcgisserver\config-store:/arcgis/server/usr/config-store -v E:\arcgis\arcgisserver\directories:/arcgis/server/usr/directories davidocean/arcgisserver:10.3.1

```
