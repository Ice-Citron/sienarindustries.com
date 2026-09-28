# sienarindustries.com

My personal portfolio website.

**Live site:** [sienarindustries.com](https://sienarindustries.com)

> **Work in progress (28 September 2026):** Some project pages, images, and
> videos are still missing. I am adding them one project at a time.

## About me

I'm Shi Hao Ng, a Second Year Computing (AI/ML) student at Imperial College 
London. I work on robot perception, Deep Learning models trained from scratch, 
and hardware projects such as FPV drones and an electromagnetic railgun. The
[portfolio page](https://sienarindustries.com/portfolio) has the full list.

## Tech stack

- React 18 on Create React App (`react-scripts` 5), configured with CRACO
- React Router 6 for pages and `/project/<slug>` routes
- Bootstrap 5 and React-Bootstrap for layout
- MDX project pages, compiled in the browser with `@mdx-js/mdx`
- `gray-matter` for YAML front matter in content files
- EmailJS for the contact form

## Repository layout

```
.
├── config/
│   └── craco.config.js        # CRACO overrides (dev-server error overlay)
├── public/
│   ├── .htaccess              # Apache rules: SPA fallback, caching
│   ├── assets/
│   │   ├── Shi-Hao-Ng__Resume.pdf
│   │   └── images/thumbnails/<Category>/<Project>/   # project card images
│   └── content/portfolio/<category>/                  # all portfolio content
├── scripts/
│   └── validate_images.py     # checks image and video files for corruption
└── src/
    ├── app/                   # App.js: router and routes
    ├── components/            # portfolio grid, project page, carousel, tabs
    ├── header/                # top navigation
    ├── hooks/                 # withRouter, animated cursor
    ├── pages/                 # home, about, portfolio, contact
    └── content_option.js      # text for home, about, timeline, skills, contact
```

## How the content works

The site has no backend. All content is stored in regular files:

| What | Where |
|---|---|
| Home, About, work timeline, skills, contact details | `src/content_option.js` |
| Portfolio tabs | `src/components/portfolio/PortfolioNav.jsx` |
| Sections of a tab (Ongoing, Year 2025, ...) | `public/content/portfolio/<category>/index.md` |
| Project cards in a section | the section's `.md` file, `projects:` list |
| Project page | `public/content/portfolio/<category>/projects/<slug>/index.mdx` |
| "Source Code" button on a project page | `GITHUB_REPOS` in `src/components/portfolio/ProjectDetail.jsx` |
| Resume tab | `public/assets/Shi-Hao-Ng__Resume.pdf` |
| MIT Portfolio tab | `public/content/portfolio/video-summary/index.md` |

Category folders: `computer-science` (the Computing tab), `engineering`,
`academic`, `electronic-art`, and `miscellaneous`.

### Add a project

1. Put the card image in `public/assets/images/thumbnails/<Category>/<Project>/`.
2. Add a card to a section file, for example
   `public/content/portfolio/engineering/ongoing.md`:

   ```yaml
   projects:
     - title: "Project Name"
       description: "One-line summary"
       technologies: ["Python", "ROS 2"]
       image: "/assets/images/thumbnails/Engineering/Project Name/thumbnail.jpg"
       slug: "project-name"
       featured: true
   ```

3. Create the page at
   `public/content/portfolio/<category>/projects/project-name/index.mdx`.
   The folder name must match the slug. Slugs must be unique across all
   categories, because the page loader searches every category for the slug.
4. Optional: add `'project-name': 'https://github.com/...'` to `GITHUB_REPOS`
   for a "Source Code" button.

A page can start with optional front matter: `title`, `summary`, and `pdfUrl`
(embeds a PDF under the header).

### MDX components

Project pages can use these components without an import:

- `<MyCarousel slides={[...]} />`: image slides are `{ src, caption }`; video
  slides are `{ type: "video", src }`.
- `<DocumentLink href title description icon />`: a link box (`icon="💻"`
  shows the GitHub icon).
- `<PDFViewer url="..." />`: an embedded PDF.
- `<GoogleSlides url="..." />`: an embedded Google Slides deck.

```mdx
<DocumentLink
  href="https://github.com/Ice-Citron/<repo>"
  title="GitHub Repository"
  description="Source code"
  icon="💻"
/>
```

## Deployment

`npm run build` creates a static site in `build/`. The host uses Apache
(Hostinger). The build copies `public/.htaccess` into `build/`. That file:

- sends unknown paths to `index.html`, so `/project/<slug>` URLs work
- serves `.md` and `.mdx` files as plain text, so the site can fetch them
- sets the cache headers

## Tools

- `python3 scripts/validate_images.py [directory]` checks JPEG, PNG, and video
  files for corruption before you add them to a page.

## Credits and license

This site started from
[react-portfolio](https://github.com/ubaimutl/react-portfolio) by Ubai Mutl,
under the MIT License. See [LICENSE](LICENSE).

The MIT License covers the code. My own text, photos, videos, and documents
are © Shi Hao Ng, all rights reserved.
