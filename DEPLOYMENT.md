# cPanel Deployment Guide for Remove BG

This guide will help you deploy your Remove BG application as a static website on your cPanel hosting platform.

## Prerequisites

- cPanel hosting account
- File Manager access or FTP access
- Node.js and pnpm installed locally (for building)

## Step 1: Build the Static Export

1. Open Command Prompt or PowerShell in your project directory
2. Run the deployment script:
   ```
   deploy.bat
   ```
   
   Or manually run:
   ```
   pnpm export
   ```

This will create a `deploy` folder with all the static files ready for upload.

## Step 2: Upload to cPanel

### Method A: Using cPanel File Manager (Recommended)

1. **Login to cPanel**
   - Access your hosting provider's cPanel
   - Login with your credentials

2. **Open File Manager**
   - Find and click "File Manager" in the Files section
   - Navigate to your domain's `public_html` folder

3. **Clear existing files (if needed)**
   - If this is a new deployment, you can skip this
   - If updating, remove old files first

4. **Upload the files**
   - Click "Upload" button
   - Select all files from your local `deploy` folder
   - Upload them to `public_html`
   - Make sure to include the `.htaccess` file

### Method B: Using ZIP Upload (Faster for many files)

1. **Create ZIP file**
   - Compress all contents of the `deploy` folder into a ZIP file
   - Do NOT zip the `deploy` folder itself, zip its contents

2. **Upload and Extract**
   - In cPanel File Manager, go to `public_html`
   - Upload the ZIP file
   - Right-click the ZIP file and select "Extract"
   - Delete the ZIP file after extraction

### Method C: Using FTP Client

1. **Connect via FTP**
   - Use an FTP client like FileZilla
   - Connect to your hosting server

2. **Upload files**
   - Navigate to the `public_html` directory
   - Upload all files from the `deploy` folder
   - Ensure all files transfer completely

## Step 3: Configure Domain (if needed)

1. **Domain Settings**
   - If deploying to a subdomain, make sure it points to the correct folder
   - For main domain, files should be in `public_html`
   - For subdomain, files might go in `public_html/subdomain`

2. **SSL Certificate**
   - Enable SSL certificate in cPanel if available
   - Your site will work better with HTTPS

## Step 4: Test Your Deployment

1. **Visit your website**
   - Go to your domain URL
   - Test the image upload functionality
   - Check that all pages load correctly

2. **Common issues and solutions**
   - **404 errors**: Make sure `.htaccess` file is uploaded
   - **Images not loading**: Check file permissions (755 for folders, 644 for files)
   - **Slow loading**: Enable compression in cPanel if available

## File Structure After Upload

Your `public_html` should contain:
```
public_html/
├── .htaccess
├── index.html
├── _next/
├── favicon.ico
└── ... (other exported files)
```

## Important Notes

- **Background Removal**: This app uses client-side processing, so it will work on static hosting
- **No Server Required**: The background removal happens in the browser using WebAssembly
- **Performance**: First load might be slower due to downloading the ML model
- **Browser Compatibility**: Works in modern browsers that support WebAssembly

## Updating Your Site

To update your deployed site:

1. Make changes to your local code
2. Run `deploy.bat` again
3. Upload the new files from the `deploy` folder
4. Clear browser cache to see changes

## Troubleshooting

**Site not loading:**
- Check if files are in the correct directory (`public_html`)
- Verify domain DNS settings
- Check file permissions

**Background removal not working:**
- Ensure the `_next` folder and all its contents uploaded correctly
- Check browser console for JavaScript errors
- Test in different browsers

**Slow performance:**
- Enable compression in cPanel
- Consider using a CDN
- Optimize images before deployment

## Support

If you encounter issues:
1. Check cPanel error logs
2. Test locally with `run.bat` first
3. Verify all files uploaded correctly
4. Contact your hosting provider for server-specific issues