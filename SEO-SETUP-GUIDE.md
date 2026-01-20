# SEO Setup Guide - DevsDoc

## Post-Deployment SEO Setup Checklist

### 1. Google Search Console Setup
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (https://devsdoc.com)
3. Verify ownership using one of these methods:
   - HTML file upload (recommended)
   - HTML tag in head
   - Google Analytics
   - Domain name provider
4. Submit your sitemap: `https://devsdoc.com/sitemap.xml`

### 2. Google Analytics 4 Setup
1. Create GA4 property at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add this code to BaseLayout.astro before closing `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add and verify your site
3. Submit sitemap: `https://devsdoc.com/sitemap.xml`
4. Import settings from Google Search Console (if available)

### 4. Create Social Media OG Image
Create an image at `/public/assets/images/og-image.jpg`:
- Dimensions: 1200 x 630 pixels
- Format: JPG or PNG
- Include: Company logo, tagline, and key services
- Keep text large and readable
- Optimize file size (under 1MB)

### 5. Update Domain URLs
Once your domain is live, update these files:
- `public/sitemap.xml` - Replace all "https://devsdoc.com" with your actual domain
- `src/layouts/BaseLayout.astro` - Update JSON-LD schema URLs

### 6. Performance Optimization

#### Image Optimization
**Note**: Astro v5 has built-in image optimization - no package installation needed!

**For images in `/public` folder** (current setup):
- Use online tools: TinyPNG, Squoosh, or ImageOptim
- Compress PNGs: Target < 50KB
- Compress JPGs: Target < 100KB
- Convert to WebP: 30% smaller file sizes

**For images in `/src/assets`**:
- Use Astro's built-in `<Image>` component
- Automatic optimization, lazy loading, WebP conversion
- See `IMAGE-OPTIMIZATION-GUIDE.md` for details

#### Enable Service Worker (Optional)
For PWA and offline support, consider adding Astro PWA integration.

### 7. Monitoring & Analytics

#### Set Up Goals in GA4
- Contact form submissions
- Button clicks ("Let's Chat", "Get Started")
- Page scroll depth
- Outbound link clicks

#### Search Console Monitoring
Check weekly for:
- Index coverage issues
- Mobile usability problems
- Security issues
- Manual actions
- Core Web Vitals

### 8. Local SEO (If Applicable)

#### Google Business Profile
1. Claim or create your business listing
2. Add complete business information
3. Upload photos
4. Get reviews from clients
5. Post regular updates

#### Local Citations
List your business on:
- Yelp
- Yellow Pages
- Industry-specific directories
- LinkedIn Company Page
- Clutch.co (for B2B tech companies)

### 9. Content Strategy

#### Blog Topics to Consider
1. "How to Choose Between Native and Cross-Platform Mobile Development"
2. "Data Engineering Best Practices for Startups"
3. "5 Signs Your Business Needs AI Implementation"
4. "Cloud Migration Checklist: A Step-by-Step Guide"
5. "DevOps vs Traditional Development: Which is Right for You?"

#### Case Studies
Create detailed case studies for:
- Successful web app projects
- Mobile app launches
- Data engineering transformations
- Cloud migration successes

### 10. Link Building Strategy

#### Get Listed On
- Clutch.co
- GoodFirms
- TrustRadius
- Crunchbase
- AngelList

#### Guest Posting Opportunities
- Dev.to
- Medium
- Hashnode
- Industry-specific publications

### 11. Regular Maintenance

#### Weekly
- Check Google Search Console for errors
- Monitor website uptime
- Review analytics for anomalies

#### Monthly
- Update sitemap if new pages added
- Check for broken links
- Review and refresh old content
- Monitor competitor rankings

#### Quarterly
- Comprehensive SEO audit
- Update service pages with new case studies
- Review and update meta descriptions
- Refresh blog content

### 12. Technical Checklist

- [ ] SSL certificate installed (HTTPS)
- [ ] WWW vs non-WWW redirect set up
- [ ] 404 page created and styled
- [ ] Site speed optimized (aim for < 3s load time)
- [ ] Mobile responsiveness verified
- [ ] All forms tested and working
- [ ] Contact information updated and accurate
- [ ] Social media links point to correct profiles
- [ ] Favicon displays correctly
- [ ] Console errors fixed

### 13. Schema Markup Validation

Test your structured data:
1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your homepage URL
3. Verify Organization schema is detected
4. Check for any errors or warnings
5. Fix any issues found

### 14. Page Speed Optimization

Test with:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Target scores:
- PageSpeed: 90+ (both mobile and desktop)
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.9s
- Cumulative Layout Shift: < 0.1

### 15. Accessibility Check

Use these tools:
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome Lighthouse Accessibility Audit

Ensure:
- All images have alt text ✓
- Proper heading hierarchy ✓
- Sufficient color contrast
- Keyboard navigation works ✓
- Form labels are properly associated
- ARIA labels where needed ✓

## Quick Wins for Immediate Impact

1. ✅ **Complete**: All core SEO optimizations done
2. **Submit to Search Engines**: Google, Bing (1 hour)
3. **Create OG Image**: Design and upload (2 hours)
4. **Set Up Analytics**: GA4 and Search Console (1 hour)
5. **Claim Social Profiles**: LinkedIn, Twitter, etc. (2 hours)
6. **Get First Reviews**: From past clients (ongoing)

## Expected Timeline for Results

- **Week 1-2**: Pages indexed by Google
- **Month 1**: Brand name searches start appearing
- **Month 2-3**: Long-tail keywords begin ranking
- **Month 3-6**: Increased organic traffic
- **Month 6-12**: Competitive keyword rankings

## Support Resources

- [Google Search Central](https://developers.google.com/search)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Ahrefs Academy](https://ahrefs.com/academy)
- [SEMrush Blog](https://www.semrush.com/blog/)

---

**Note**: This is a living document. Update it as you complete tasks and discover new opportunities.
