

## 创建Ionic项目流程

#### 1. 创建项目

```xml
ionic start xxx tabs
```

#### 2. 安装依赖

```
npm i cordova-android@^8.1.0 --save
npm i @ionic/cordova-builders@8.0.0 --save
npm i @awesome-cordova-plugins/core --save
npm i cordova-plugin-statusbar@3.0.0 --save
npm i @awesome-cordova-plugins/status-bar --save
npm i cordova-plugin-device --save
npm i @awesome-cordova-plugins/device --save
npm i cordova-plugin-splashscreen@5.0.2 --save
npm i @awesome-cordova-plugins/splash-screen --save
npm i cordova-plugin-ionic-webview --save
npm i @awesome-cordova-plugins/ionic-webview --save
npm i cordova-plugin-ionic-keyboard --save
npm i @awesome-cordova-plugins/keyboard --save
npm i cordova-plugin-whitelist --save
```

#### 3. 安装平台

```
ionic cordova platform add android
ionic cordova platform add ios
```

#### 4. 安装环境

```
ng add @ionic/cordova-builders
```

#### 5.生成带签名的Apk

1. 生成签名 keystore

```
keytool -genkey -v -keystore plugins.keystore -alias plugins.keystore -keyalg RSA -validity 36500
```

2. 签名apk

   ```
   @echo off
   echo packaging apk......
   del plugins.apk
   del D:\Desktop\test\ishare\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
   @call ionic cordova build android --prod --release
   
   echo signing apk......
   @call jarsigner -verbose -keystore plugins.keystore -storepass f5c919ffe6ecbb5190841e3cf9feebf3 -signedjar plugins.apk platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk plugins.keystore
   
   echo signed apk stored in ./plugins.apk
   
   密钥口令:f5c919ffe6ecbb5190841e3cf9feebf3
   ```


#### 6.自动生成icon/splash

```
cnpm i cordova-res-generator -g
cordova-res-generator
```

#### 7.安装插件

```
cnpm i cordova-plugin-app-weibosdk --save
ionic cordvoa plugin add cordova-plugin-app-weibosdk --variable WEIBO_APP_ID=641113858
```

