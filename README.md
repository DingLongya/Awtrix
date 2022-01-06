# Awtrix

- 参考 UP 三三三三三文啊 视频：https://www.bilibili.com/video/BV1764y1f7pc
- 教程 https://bbs.iobroker.cn/t/topic/3888
- 官网 https://awtrixdocs.blueforcer.de/

## PCB

板子的 Gerber 文件在文件夹中：

![](/images/1.png)

![](/images/2.png)

## 元件

可以参考下面：

![](/images/3.png)



## 焊接

焊接清单：

4个 1*8P 单母座（2.54） 注意是2.54的，不是2.0的

1个 10V/1000UF 8*12电解 1个

3个  1千欧的电阻

1个 100nF的电容

2个 1N4001（直插） 二极管

若干 单排针

![](/images/hj_1.jpg)

## 组装

1个 Mini MP3 Player模块

1个 BMP280 模块

1个 5528光敏电阻

3个 P223触摸模块

1个 3瓦4欧喇叭

1个 WS2812

若干 杜邦线

![](/images/zz_1.jpg)

## 声音

格式化 TF 卡，将 MP3 文件放在 TF 卡下

![](/images/6.png)

## 无线

首先给awtrix通电，没有连接到wifi的情况下会进入热点模式，使用手机或电脑搜索wifi，找到AWTRIX Controller这个ssid并加入，密码为awtrixxx

![](/images/4.png)

此时应该会弹出一个web页面， 要是没有弹出，请使用浏览器打开地址172.217.28.1，并选择Configure Controller

![](/images/5.png)

切记不要勾选MatrixType 2，Matrix Port是连接服务器的端口号，默认是7001，不是7000，7000端口是web的端口，依次输入无线网名称，无线网密码，服务器的地址，然后点击Save，此时awtrix的设置都已经完成

## 服务器

安装JAVA环境后在CMD中运行如下命令（先`cd`到指定到 awtrix.jar 所在的文件夹下），执行`Host`文件夹的文件，开启服务器

```c++
java -jar awtrix.jar
```

