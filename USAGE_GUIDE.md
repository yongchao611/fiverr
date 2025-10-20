# 📖 Usage Guide - Fiverr Hub

## 🖼️ How to Add Images to Articles

### Method 1: Upload Local Image (Recommended)

1. Go to **Create Article** or **Edit Article** page
2. In the "Cover Image" section, click **"Upload Image"**
3. Select an image from your computer (JPG, PNG, WebP)
4. Maximum file size: 2MB
5. The image will be automatically embedded in your article

**Pros:**
- ✅ Easy and convenient
- ✅ No need for external hosting
- ✅ Works offline

**Cons:**
- ⚠️ Images are stored as base64 in database (larger database size)
- ⚠️ 2MB limit per image

---

### Method 2: Use Image URL

1. Upload your image to a free hosting service:
   - [Unsplash](https://unsplash.com) - Free stock photos
   - [ImgBB](https://imgbb.com) - Free image hosting
   - [Imgur](https://imgur.com) - Popular image host
   - [Cloudinary](https://cloudinary.com) - Professional CDN (free tier)

2. Click **"Image URL"** button
3. Paste the image URL
4. Click **"Add"**

**Pros:**
- ✅ Smaller database size
- ✅ No file size limit
- ✅ Better performance for large images

**Cons:**
- ⚠️ Requires external hosting
- ⚠️ Image may break if host removes it

---

## 📝 Article Content Tips

### ⚡ Quick Method: Plain Text + Auto Format (Easiest!)

**The easiest way to write articles:**

1. Write your content as plain text in the Content field
2. Use empty lines to separate paragraphs
3. Click the **"Auto Format"** button
4. Your plain text will be automatically converted to HTML!

**Example:**
```
Your account has now been created.
Once you've successfully created and activated your client account, you'll be able to create your freelancer account.

Activating your freelancer account
Before you activate your freelancer account, make sure that the e-mail of your Fiverr account is correct.

If it is not correct, you can change your email or Contact Support for assistance.
```

Click "Auto Format" → Gets converted to:
```html
<p>Your account has now been created.<br>Once you've successfully created and activated your client account, you'll be able to create your freelancer account.</p>

<p>Activating your freelancer account<br>Before you activate your freelancer account, make sure that the e-mail of your Fiverr account is correct.</p>

<p>If it is not correct, you can change your email or Contact Support for assistance.</p>
```

### Using HTML in Content (Advanced)

If you prefer more control, you can use HTML tags directly:

```html
<h2>Main Heading</h2>
<h3>Sub Heading</h3>

<p>Paragraph text goes here.</p>

<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>

<strong>Bold text</strong>
<em>Italic text</em>

<a href="https://www.fiverr.com" target="_blank">Link to Fiverr</a>

<blockquote>
  This is a quote or important callout
</blockquote>
```

### Adding Images in Content

**🎉 New Feature: Inline Image Upload Tool**

You'll now see an "Insert Image into Content" panel on the right side when creating/editing articles:

**How to use:**
1. Click **"Upload"** to upload an image from your computer (max 2MB)
2. Or click **"Image URL"** to use an online image
3. Preview the image
4. Click **"Insert to Content"** to add it automatically
5. Or click **"Copy HTML"** to paste it anywhere you want

The tool automatically generates the HTML code:
```html
<img src="IMAGE_URL_HERE" alt="Article image" class="rounded-xl shadow-lg my-6" />
```

---

## 🎨 Image Best Practices

### Cover Image
- **Recommended size:** 1200x630px (16:9 ratio)
- **Format:** JPG or PNG
- **File size:** Under 2MB for upload, any size for URL
- **Content:** Eye-catching, relevant to article topic

### Content Images
- Use descriptive alt text for SEO
- Optimize images before uploading
- Use consistent styling across articles

---

## 🚀 Publishing Workflow

### 1. Create Draft
1. Click **"Create New Article"**
2. Fill in title, excerpt, and content
3. Add cover image
4. Click **"Save as Draft"**

### 2. Review
1. Go to **Article Management**
2. Articles marked as "Draft" (gray badge)
3. Click edit icon to make changes

### 3. Publish
1. When ready, edit the article
2. Click **"Publish Article"** (green button)
3. Article will appear on the public site
4. Badge changes to "Published" (green)

### 4. Update
1. Edit published articles anytime
2. Changes are immediately visible
3. Updated date is automatically tracked

---

## 💡 Free Image Resources

### Stock Photos
- [Unsplash](https://unsplash.com) - High-quality free photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images and vectors

### Image Hosting
- [ImgBB](https://imgbb.com) - Simple, free hosting
- [Imgur](https://imgur.com) - Popular, reliable
- [Cloudinary](https://cloudinary.com) - Professional CDN

### Image Editing
- [Canva](https://canva.com) - Design tool
- [Photopea](https://photopea.com) - Online Photoshop alternative
- [TinyPNG](https://tinypng.com) - Compress images

---

## 🔧 Tips & Tricks

### SEO Optimization
- Use descriptive titles (50-60 characters)
- Write compelling excerpts (120-160 characters)
- Include relevant keywords naturally
- Add alt text to all images

### Writing Quality Content
- Break content into sections with headings
- Use bullet points for easy scanning
- Include relevant links to Fiverr
- Add images to break up text
- Keep paragraphs short and readable

### Performance
- Compress images before uploading
- Use WebP format when possible
- Keep article content focused
- Test on mobile devices

---

## ❓ Troubleshooting

### Image Won't Upload
- Check file size (must be under 2MB)
- Verify file format (JPG, PNG, WebP)
- Try a different browser
- Use Image URL method instead

### Image URL Not Working
- Verify URL is correct
- Check if image requires authentication
- Try right-clicking image and "Copy Image Address"
- Use a direct image link (ends in .jpg, .png, etc.)

### Article Not Showing
- Check if article is "Published" (not "Draft")
- Refresh the page
- Clear browser cache
- Check browser console for errors

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide first
2. Review the README.md file
3. Check the DEPLOYMENT.md for deployment issues
4. Ensure all dependencies are installed
5. Restart the development server

---

**Happy Writing! 🎉**

