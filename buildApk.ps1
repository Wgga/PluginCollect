$BuildType = $args[0]
$apkDebugPath = "D:\Desktop\test\PluginCollect\platforms\android\app\build\outputs\apk\debug\app-debug.apk"
$apkReleasePath = "D:\Desktop\test\PluginCollect\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk"
$signedApkPath = "plugins.apk"
$keystorePath = "plugins.keystore"
$keystorePassword = "f5c919ffe6ecbb5190841e3cf9feebf3"

# 根据构建类型执行不同的命令
if ($buildType -eq "prod") {
	# 删除APK文件
	if (Test-Path $apkDebugPath) {
		Remove-Item $apkDebugPath
		Write-Output "Removed debug APK successfully"
	}

	# 构建APK
	Write-Output "Starting build"
	ionic cordova build android --prod
	Write-Output "Build successful"

	# 打开APK文件夹
	Invoke-Item "D:\Desktop\test\PluginCollect\platforms\android\app\build\outputs\apk\debug"
}
elseif ($buildType -eq "release") {
	# 删除APK文件
	if (Test-Path $signedApkPath) {
		Remove-Item $signedApkPath
		Write-Output "Removed signed APK successfully"
	}
	if (Test-Path $apkReleasePath) {
		Remove-Item $apkReleasePath
		Write-Output "Removed release APK successfully"
	}

	# 构建APK
	Write-Output "Starting build"
	ionic cordova build android --prod --release "--" "--" --packageType=apk
	Write-Output "Build successful"

	# 签名APK
	Write-Output "Starting sign"
	jarsigner -verbose -keystore $keystorePath -storepass $keystorePassword -signedjar $signedApkPath $apkReleasePath $keystorePath
	Write-Output "Sign successful"

	# 打开APK文件夹
	Invoke-Item "D:\Desktop\test\PluginCollect"
}
# jarsigner -verbose -keystore plugins.keystore -storepass f5c919ffe6ecbb5190841e3cf9feebf3 -signedjar plugins.apk platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk plugins.keystore
