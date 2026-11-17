# Cyborg-Themed Landing Page

## About

A responsive, cyborg-themed landing page built for the **Techfest, IIT Bombay** task "Cyborg-Themed Landing Page Development". The design is a dark, editorial take on the human + machine idea: strong typography, a single cyan accent and restrained motion, with the hero and showcase visuals drawn in inline SVG.

## Features

- Futuristic cyborg-inspired design with one accent colour and an editorial layout
- Responsive layout for desktop, tablet and mobile (the mobile layout is a separate arrangement, not a shrunken desktop)
- Sticky navigation that gains a background on scroll and highlights the current section
- Smooth scrolling between sections
- Mobile hamburger menu
- Scroll-based reveal animations and a short page-load reveal
- Subtle parallax on the showcase visual
- Interactive feature list that expands on hover, focus or tap
- Hover states on buttons, technology rows and links
- Respects `prefers-reduced-motion` (animations, parallax and smooth scrolling are turned off)

## Technologies Used

- HTML5
- CSS3 (custom properties, grid, flexbox, media queries)
- JavaScript (ES6+)
- React 18 (production UMD build, included in `js/vendor/`; no build step or Node.js needed to run the project)
- Google Fonts (Space Grotesk, JetBrains Mono), loaded over the network

## Project Structure

```
cyborg-landing-page/
├── index.html      # Page shell and script/style references
├── css/
│   └── style.css   # All styling and responsive rules
├── js/
│   ├── main.js     # React components and page behaviour
│   └── vendor/     # React and ReactDOM production builds (MIT licensed)
├── README.md
└── .gitignore
```

The `assets/` folder is not needed: all visuals are CSS/SVG generated, and the only external resource is the Google Fonts stylesheet.

## How to Run

No build step is required.

1. Download or clone the repository.
2. Open `index.html` in a browser.

To use a local server instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Browser Support

Current versions of Google Chrome, Microsoft Edge, Firefox and Safari.
