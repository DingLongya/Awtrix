# Awtrix

- 官网 https://awtrixdocs.blueforcer.de/
- 参考 UP 三三三三三文啊 视频：https://www.bilibili.com/video/BV1764y1f7pc
- 教程 https://bbs.iobroker.cn/t/topic/3888

## 成品展示

B 站演示地址：

这是还没有加外壳，3D打印外壳很贵很贵，想自己用木板做

![](/images/11.jpg)

![](/images/12.jpg)

![](/images/13.jpg)

![](/images/15.jpg)

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

## 按键

左按键

![](/images/l.jpg)

中间按键

![](/images/m.jpg)

右按键

![](/images/r.jpg)

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

## 烧录

​	**1.** 启动 **ESP8266Flasher.exe** ，在“Config”选项卡中打开固件（点击齿轮选择固件） 

​	**2.** 如果未自动检测到，请返回“操作”选项卡并设置正确的 Com-Port。 

​	**3.** 单击“Flash”并等待该过程完成且左下角出现绿色复选标记。 

![](/images/gj.jpg)

## 无线

首先给awtrix通电，没有连接到wifi的情况下会进入热点模式，使用手机或电脑搜索wifi，找到AWTRIX Controller这个ssid并加入，密码为awtrixxx

![](/images/4.png)

此时应该会弹出一个web页面， 要是没有弹出，请使用浏览器打开地址172.217.28.1，并选择Configure Controller

![](/images/5.png)

切记不要勾选MatrixType 2，Matrix Port是连接服务器的端口号，默认是7001，不是7000，7000端口是web的端口，依次输入无线网名称，无线网密码，服务器的地址，然后点击Save，此时awtrix的设置都已经完成

## 服务器

安装JAVA环境后在 CMD 中运行如下命令（先`cd`到指定到 awtrix.jar 所在的文件夹下），执行`Host`文件夹的文件，开启服务器

`java -jar awtrix.jar`

![](/images/fwq.jpg)

`http:// [HOST-IP]:7000/` ： HOST-IP 主机本地连接的 IP，IP获取 CMD 输入 ipconfig

![](/images/zx.jpg)

## 外壳

3D打印外壳太贵了，所以自己买木板做一个外壳，格栅和亚力克板是买的现成的，相关木板尺寸在文件夹 5.3D 中。
