# PowerShell script to help save your professional photos
# Run this script to set up your image files

Write-Host "Setting up Jason's professional photos..."

# Create the images directory if it doesn't exist
$imagesDir = "C:\Users\Administrator\Desktop\MyWebsite\images"
if (!(Test-Path $imagesDir)) {
    New-Item -Path $imagesDir -ItemType Directory
    Write-Host "Created images directory"
}

Write-Host ""
Write-Host "Please save your photos as follows:"
Write-Host "1. Save the first photo (light blue shirt, gray background) as:"
Write-Host "   $imagesDir\profile-main.jpg"
Write-Host ""
Write-Host "2. Save the second photo (full suit, conference hall) as:"
Write-Host "   $imagesDir\profile-professional.jpg"
Write-Host ""
Write-Host "After saving both images, refresh your browser to see the updated portfolio!"

# Check if images exist
if (Test-Path "$imagesDir\profile-main.jpg") {
    Write-Host "✓ profile-main.jpg found"
} else {
    Write-Host "✗ profile-main.jpg missing"
}

if (Test-Path "$imagesDir\profile-professional.jpg") {
    Write-Host "✓ profile-professional.jpg found"
} else {
    Write-Host "✗ profile-professional.jpg missing"
}