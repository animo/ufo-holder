clean:
	./gradlew clean

assemble:
	./gradlew bundleRelease

build-apk:
	bundletool build-apks --bundle=app/build/outputs/bundle/release/app-release.aab --output=apps.apks --ks-key-alias=ufo-holder --ks-pass=pass:Asklaskl2! --ks=./app/ufo-holder.keystore

install-apk:
	bundletool install-apks --adb=/Users/beri/Library/Android/sdk/platform-tools/adb --apks=apps.apks

all: clean assemble build-apk install-apk
