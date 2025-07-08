@echo off
echo 🔧 Building Tibzee APK...
echo.

echo ✅ Step 1: Building React app...
npm run build

echo.
echo ✅ Step 2: Syncing with Capacitor...
npx cap sync

echo.
echo ✅ Step 3: Building Android APK...
cd android
./gradlew assembleDebug

echo.
echo 🎉 APK built successfully!
echo 📱 APK location: android/app/build/outputs/apk/debug/app-debug.apk
echo.
echo 💡 To install on device:
echo    1. Enable Developer Options on your Android device
echo    2. Enable USB Debugging
echo    3. Copy APK to device and install
echo.
pause
