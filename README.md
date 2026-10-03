# Karatas Global — V2 website

Static site: index.html, assets/css/styles.css, assets/js/main.js. No build step, no framework, no external requests. Open index.html in a browser to preview.

Status: published to GitHub Pages as a preview. The karatasglobal.com domain and DNS are not connected yet.

## Placeholder photography

Every photograph is a temporary free-licence placeholder from Pexels (Pexels licence: free for commercial use, modification allowed, attribution not required). None of them shows Karatas Global stock, a Karatas Global transaction or Granite & Lime work. Each is marked in index.html with a PLACEHOLDER comment.

| Slot | File prefix | Source |
|---|---|---|
| Hero | hero-yard, hero-yard-mobile | https://www.pexels.com/photo/trucks-parked-at-sunset-in-industrial-lot-35097902/ |
| What We Do | inspection | https://www.pexels.com/photo/man-in-blue-cap-and-working-uniform-sitting-beside-truck-wheel-and-reading-a-paper-6720537/ |
| Commercial Vehicles & Trailers | inventory, inventory-mobile | https://www.pexels.com/photo/view-of-parked-trucks-27099094/ |
| Supporting services | industrial, industrial-wide | https://www.pexels.com/photo/front-load-loader-beside-white-dump-truck-188679/ |
| Construction & Renovation | renovation | https://www.pexels.com/photo/wooden-floor-and-white-walls-inside-a-house-7587883/ |

The images are built by scripts/build_images.py (run by the GitHub workflow in .github/workflows). Originals are not stored in the repository. Exports are AVIF + WebP at several widths with one JPEG fallback each; all were cropped and lightly desaturated for a consistent grade.

Known limits of the placeholders: the hero yard is in Turkey (European tractor units; a haulier's name is on the darkened left-hand truck), and the refrigerated trailers are North American pattern. Replace with original photography when available.

## Things to confirm before deployment

- Granite & Lime link: Explore Granite & Lime currently points to #contact (marked TEMPORARY LINK in index.html).
- Open Graph share image (none yet).
- Legal entity details for the footer.
- The requirement form opens the visitor's email app or WhatsApp; nothing is stored.
