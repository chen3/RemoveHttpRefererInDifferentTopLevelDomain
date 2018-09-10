# RemoveHttpRefererInDifferentTopLevelDomain
在访问不同的主域名时移除请求头中的referer。
例如从www.baidu.com跳转到www.bilibili.com时，从http头中移除referer。
# 编译Build
```
git clone https://github.com/chen3/RemoveHttpRefererInDifferentTopLevelDomain.git
cd RemoveHttpRefererInDifferentTopLevelDomain
npm install
webpack
```
编译后的文件在dist文件夹内
