#!/bin/bash

# 指定要删除文件的路径
target_directory="/Users/develop/Desktop/PluginCollect/platforms/android/app/build/outputs/apk"
apkReleasePath="/Users/develop/Desktop/PluginCollect/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
signedApkPath="plugins.apk"
keystorePath="plugins.keystore"
keystorePassword="f5c919ffe6ecbb5190841e3cf9feebf3"

# 判断执行的是iOS还是Android打包命令
if [ "$1" = "android" ]; then
	# 使用rm命令删除目标路径下的文件
	# 你可以根据需要使用通配符来匹配特定文件类型，例如*.txt表示删除所有txt文件
	rm -f "$target_directory"/debug/app-debug.apk
	echo "删除app-debug成功"
elif [ "$1" = "android-release" ]; then
	rm -f $apkReleasePath
	rm -f $signedApkPath
	echo "删除app-release成功"
fi

if [ "$1" = "android" ]; then
	# 执行 Ionic 打包命令
	ionic cordova build android --prod
elif [ "$1" = "ios" ]; then
	ionic cordova build ios --prod
elif [ "$1" = "android-release" ]; then
	ionic cordova build android --prod --release "--" "--" --packageType=apk
	jarsigner -verbose -keystore $keystorePath -storepass $keystorePassword -signedjar $signedApkPath $apkReleasePath $keystorePath
fi

# 检查打包是否成功
if [ $? -eq 0 ]; then
	echo "$1 打包成功"
	if [ "$1" = "android" ]; then
		# 打开目录
		open "$target_directory"
	fi
else
	echo "$1 打包失败，请检查错误"
fi