## How to Add Your Real Photos to the Portfolio

### Method 1: Simple Copy & Paste (Recommended)

1. **Open File Explorer** and navigate to:
   `C:\Users\Administrator\Desktop\MyWebsite\images\`

2. **Save your photos** in this folder with these exact names:
   - First photo (light blue shirt): `profile-main.jpg`
   - Second photo (suit/conference): `profile-professional.jpg`

3. **Update the HTML file**:
   - Open `index.html` in VS Code
   - Find line with: `https://via.placeholder.com/400x400/667eea/ffffff?text=Jason+Profile`
   - Replace with: `images/profile-main.jpg`
   - Find line with: `https://via.placeholder.com/300x400/764ba2/ffffff?text=Professional+Photo`
   - Replace with: `images/profile-professional.jpg`

4. **Refresh your browser** to see your real photos!

### Method 2: Using PowerShell (Alternative)

1. Save your photos to Desktop first as `photo1.jpg` and `photo2.jpg`
2. Run these commands in PowerShell:
   ```
   Copy-Item "C:\Users\Administrator\Desktop\photo1.jpg" "C:\Users\Administrator\Desktop\MyWebsite\images\profile-main.jpg"
   Copy-Item "C:\Users\Administrator\Desktop\photo2.jpg" "C:\Users\Administrator\Desktop\MyWebsite\images\profile-professional.jpg"
   ```

### Photo Requirements:
- Format: JPG or PNG
- Size: Any size (will be automatically resized)
- Names: Exactly as specified above

Your portfolio is currently showing placeholder images that match your color scheme. Once you add your real photos using the above steps, they'll replace the placeholders!