# 📸 How to Insert Images into Article Content

## 🎯 New Feature: Inline Image Upload Tool

When you create or edit an article, you'll see a special **"Insert Image into Content"** panel on the right side of the page.

---

## ✨ Quick Start

### Method 1: Upload Image (Recommended)

1. **Click "Upload" button** in the image tool panel
2. **Select an image** from your computer (JPG, PNG, WebP)
3. **Preview** appears automatically
4. **Click "Insert to Content"** - Done! 🎉

The image will be added to the end of your article content automatically.

---

### Method 2: Use Image URL

1. **Click "Image URL" button**
2. **Enter the image URL** (from Unsplash, ImgBB, etc.)
3. **Preview** appears
4. **Click "Insert to Content"** - Done! 🎉

---

### Method 3: Copy HTML (Advanced)

If you want to insert the image at a specific position:

1. Upload or add image URL
2. **Click "Copy HTML"** button
3. **Paste** the HTML code anywhere in your content where you want the image

---

## 📋 Step-by-Step Example

### Creating an Article with Images

**1. Write your text content:**
```
How to use Fiverr for your business

Fiverr is a great platform for finding freelancers.

Step 1: Create an account
First, visit Fiverr and sign up.

Step 2: Browse services
Look through the available categories.
```

**2. Add an image:**
- Use the **Image Insert Tool** on the right
- Upload a screenshot or use URL
- Click **"Insert to Content"**

**3. Result:**
```
How to use Fiverr for your business

Fiverr is a great platform for finding freelancers.

Step 1: Create an account
First, visit Fiverr and sign up.

<img src="..." alt="Article image" class="rounded-xl shadow-lg my-6" />

Step 2: Browse services
Look through the available categories.
```

**4. Click "Auto Format" button** to format your text into proper HTML paragraphs

**5. Publish!**

---

## 💡 Tips & Best Practices

### ✅ DO:
- **Use relevant images** that support your content
- **Keep file size under 2MB** for uploads
- **Use high-quality images** (at least 800px wide)
- **Add multiple images** to break up long text
- **Use descriptive file names** before uploading

### ⚠️ Recommendations:
- **Placement**: Add images every 2-3 paragraphs
- **Size**: 1200px x 800px is ideal
- **Format**: JPG for photos, PNG for graphics
- **Compression**: Use [TinyPNG](https://tinypng.com) before uploading

### ❌ DON'T:
- Don't use copyrighted images without permission
- Don't upload huge files (> 2MB)
- Don't use too many images (slows down page)
- Don't use low-quality or blurry images

---

## 🖼️ Where to Get Free Images

### Stock Photo Sites
- [Unsplash](https://unsplash.com) - High-quality, free photos
- [Pexels](https://pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images and vectors

### How to use Unsplash images:
1. Visit [Unsplash.com](https://unsplash.com)
2. Search for your topic (e.g., "business", "laptop", "office")
3. Click on an image you like
4. **Right-click** the image → **Copy Image Address**
5. Use this URL in the **Image URL** button
6. Click **Insert to Content**

---

## 🎨 Image Styling

Images inserted using the tool automatically have beautiful styling:

```html
<img src="YOUR_IMAGE_URL" alt="Article image" class="rounded-xl shadow-lg my-6" />
```

This gives you:
- ✅ Rounded corners (`rounded-xl`)
- ✅ Drop shadow (`shadow-lg`)
- ✅ Proper spacing above and below (`my-6`)
- ✅ Responsive sizing (fits any screen)

---

## 📐 Layout Example

Here's how your article editor looks:

```
┌─────────────────────────────────────────┬────────────────────┐
│ Article Information                      │ Insert Image       │
│                                          │ into Content       │
│ Title: [_________________________]       │                    │
│                                          │ [Upload] [URL]     │
│ Excerpt: [______________________]        │                    │
│          [______________________]        │ [Preview appears]  │
│                                          │                    │
│ Cover Image: [Upload or URL]            │ [Copy HTML]        │
│                                          │ [Insert to Content]│
│ Content:                                 │                    │
│ [________________________________]       │                    │
│ [________________________________]       │                    │
│ [________________________________]       │                    │
│ [Auto Format Button]                     │                    │
│                                          │                    │
│ [Cancel] [Save Draft] [Publish]          │                    │
└─────────────────────────────────────────┴────────────────────┘
```

The left side (2/3) is your main form, the right side (1/3) is the image tool.

---

## 🔧 Troubleshooting

### Image won't upload
- **Check file size** - Must be under 2MB
- **Check file type** - Only JPG, PNG, WebP, GIF
- **Try compressing** - Use TinyPNG before upload

### Image doesn't show
- **Check URL** - Make sure it's a direct image link
- **Check format** - URL should end in .jpg, .png, etc.
- **Try different source** - Some sites block hotlinking

### Image looks bad on mobile
- Images are automatically responsive
- But use at least 800px wide images
- Test on mobile after publishing

---

## 🎓 Complete Workflow Example

**Goal:** Create an article with 3 images

**Steps:**

1. **Write intro** (2-3 paragraphs)
2. **Insert Image 1** - Hero/header image
3. **Write main content** (4-5 paragraphs)
4. **Insert Image 2** - Supporting visual
5. **Write more content** (3-4 paragraphs)
6. **Insert Image 3** - Example or screenshot
7. **Write conclusion** (2-3 paragraphs)
8. **Click "Auto Format"** - Convert to HTML
9. **Preview** - Check how it looks
10. **Publish** - Share with the world!

---

## 📱 Mobile Editing

The image insert tool works on mobile too!
- Panel appears below the form on small screens
- Upload works via camera or gallery
- Same easy process

---

## 🚀 Pro Tips

### Speed up your workflow:
1. **Prepare images first** - Have all images ready before writing
2. **Use templates** - Save common image HTML patterns
3. **Batch upload** - Add all images, then arrange them
4. **Use keyboard shortcuts** - Ctrl+C to copy HTML code

### For better SEO:
1. **Use descriptive alt text** - Edit the `alt="Article image"` part
2. **Name files well** - Before uploading, rename to "fiverr-service-example.jpg"
3. **Compress images** - Faster loading = better SEO
4. **Add captions** - Wrap image in `<figure>` tags with `<figcaption>`

---

## 💬 Need Help?

If you encounter any issues:
1. Check this guide first
2. Review USAGE_GUIDE.md for general tips
3. Make sure images are under 2MB
4. Try a different browser if upload fails

---

**Happy Writing! 📝✨**

Your articles will look amazing with properly formatted images!



