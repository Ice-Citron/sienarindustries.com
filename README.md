# sienarindustries.com

My personal portfolio website.

**Live site:** [sienarindustries.com](https://sienarindustries.com)

> **Work in progress (08 October 2026):** Some project pages, images, and
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
- gray-matter for YAML front matter in content files
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

## Credits and license

This site started from
[react-portfolio](https://github.com/ubaimutl/react-portfolio) by Ubai Mutl,
under the MIT License. See [LICENSE](LICENSE).

The MIT License covers the code. My own text, photos, videos, and documents
are © Shi Hao Ng, all rights reserved.
