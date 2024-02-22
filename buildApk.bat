@echo off
echo packaging apk......
del plugins.apk
del D:\Desktop\test\PluginsCollect\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
@call ionic cordova build android --prod --release "--" "--" --packageType=apk

echo signing apk......
@call jarsigner -verbose -keystore plugins.keystore -storepass f5c919ffe6ecbb5190841e3cf9feebf3 -signedjar plugins.apk platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk plugins.keystore

echo signed apk stored in ./plugins.apk