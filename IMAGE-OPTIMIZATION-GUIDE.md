# Image Optimization Guide for DevsDoc

## ✅ Good News: No Package Installation Needed!

Astro v5 has **built-in image optimization** - no additional packages required!

## 📸 Image Optimization Options

### Option 1: Use Astro's Built-in Image Component (Recommended)

For images in `src/assets/` or imported images:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero-img.png';
---

<Image 
  src={heroImage} 
  alt="Hero image description"
  width={1200}
  height={630}
  loading="lazy"
  format="webp"
/>
```

**Benefits**:
- Automatic WebP conversion
- Lazy loading
- Responsive images
- Automatic optimization

### Option 2: Optimize Public Folder Images (Current Setup)

Since you're using images from `/public/assets/images/`, you can:

#### A. Manual Optimization (Quick)
1. Use online tools:
   - **TinyPNG** (https://tinypng.com) - Compress PNG/JPG
   - **Squoosh** (https://squoosh.app) - Convert to WebP
   - **ImageOptim** (Mac app) - Batch optimization

2. Optimize your images:
   ```bash
   # Example: Compress all images
   # Use TinyPNG API or Squoosh CLI
   ```

#### B. Use Sharp for Build-Time Optimization

Install Sharp (optional, for advanced optimization):
```bash
npm install -D sharp
```

Then create an Astro script to optimize images during build.

### Option 3: Move Images to src/assets/ (Best for SEO)

1. Move images from `public/assets/images/` to `src/assets/images/`
2. Use Astro's Image component
3. Get automatic optimization

**Example**:
```astro
---
import { Image } from 'astro:assets';
import serviceIcon from '../../assets/images/ser-icon9.png';
---

<Image 
  src={serviceIcon} 
  alt="Web Development Services Icon"
  width={100}
  height={100}
/>
```

## 🎯 Recommended Approach for Your Site

Since you have many images in `/public/assets/images/`, I recommend:

1. **Keep current setup** for now (it works fine)
2. **Manually optimize** key images:
   - Hero images
   - Service icons
   - Logo files
   - OG image (when created)

3. **Use online tools**:
   - Compress PNGs with TinyPNG
   - Convert to WebP with Squoosh
   - Target: < 100KB per image

## 📊 Image Optimization Checklist

- [ ] Compress all PNG images (aim for < 50KB)
- [ ] Compress all JPG images (aim for < 100KB)
- [ ] Convert hero images to WebP format
- [ ] Add proper alt text (✅ Already done!)
- [ ] Use lazy loading for below-fold images
- [ ] Create optimized OG image (1200x630px, < 200KB)

## 🚀 Quick Win: Optimize Key Images Now

Run these optimizations on your most important images:

1. **Hero background** (`hero-bg3.jpg`)
2. **Service icons** (`ser-icon*.png`)
3. **Logo files** (`dd-logo.png`, `logo-dd-w.png`)
4. **Testimonial images** (`testi-*.jpg`)

Use: https://tinypng.com or https://squoosh.app

## 💡 Performance Tips

1. **Use WebP format** for photos (30% smaller than JPG)
2. **Use SVG** for icons when possible
3. **Lazy load** images below the fold
4. **Compress** before uploading
5. **Responsive images** for different screen sizes

## 🔧 No Installation Needed!

Your current setup is fine. Just optimize images manually using free online tools, and you'll see great performance improvements!

---

**Note**: The `@astrojs/image` package is deprecated and incompatible with Astro v5. Astro's built-in image handling is better and requires no installation! ✨
