# Tibzee APK Build Package Creator
Write-Host "🔧 Creating Tibzee APK Build Package..." -ForegroundColor Green

# Create build directory
$buildDir = "tibzee-app-build"
if (Test-Path $buildDir) {
    Remove-Item -Recurse -Force $buildDir
    Write-Host "✅ Cleaned existing build directory" -ForegroundColor Yellow
}
New-Item -ItemType Directory -Name $buildDir | Out-Null

# Build the React app first
Write-Host "📦 Building React app..." -ForegroundColor Blue
npm run build

# Copy necessary files
Write-Host "📁 Copying files..." -ForegroundColor Blue

# Copy dist folder
if (Test-Path "dist") {
    Copy-Item -Recurse "dist" "$buildDir/"
    Write-Host "✅ Copied dist folder" -ForegroundColor Green
} else {
    Write-Host "❌ dist folder not found. Run 'npm run build' first." -ForegroundColor Red
    exit 1
}

# Copy public folder
if (Test-Path "public") {
    Copy-Item -Recurse "public" "$buildDir/"
    Write-Host "✅ Copied public folder" -ForegroundColor Green
} else {
    Write-Host "⚠️ public folder not found" -ForegroundColor Yellow
}

# Copy config.xml
if (Test-Path "config.xml") {
    Copy-Item "config.xml" "$buildDir/"
    Write-Host "✅ Copied config.xml" -ForegroundColor Green
} else {
    Write-Host "❌ config.xml not found" -ForegroundColor Red
    exit 1
}

# Create index.html in root if it doesn't exist
if (!(Test-Path "$buildDir/index.html")) {
    if (Test-Path "$buildDir/dist/index.html") {
        Copy-Item "$buildDir/dist/index.html" "$buildDir/"
        Write-Host "✅ Copied index.html to root" -ForegroundColor Green
    }
}

# Create ZIP file
Write-Host "🗜️ Creating ZIP file..." -ForegroundColor Blue
$zipPath = "tibzee-app-build.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($buildDir, $zipPath)

Write-Host "🎉 Build package created successfully!" -ForegroundColor Green
Write-Host "📦 ZIP file: $zipPath" -ForegroundColor Cyan
Write-Host "📁 Build folder: $buildDir" -ForegroundColor Cyan

Write-Host ""
Write-Host "📱 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Upload 'tibzee-app-build.zip' to any online APK builder"
Write-Host "2. Recommended: https://www.apkonline.net/"
Write-Host "3. App Details:"
Write-Host "   - Name: Tibzee"
Write-Host "   - Package: com.tibzee.app"
Write-Host "   - Version: 1.0.0"
Write-Host ""
Write-Host "🚀 Your APK will be ready in 2-5 minutes!" -ForegroundColor Green
