# Applied Cogency Study Calendar

This repository contains a self‑contained static website for tracking a **seven‑year study program** in _Applied Cogency_.

## Overview

The site is intended to run as a **GitHub Pages** site.  It provides a clean, modern calendar interface built with [Bootstrap](https://getbootstrap.com/) and [FullCalendar](https://fullcalendar.io/).  All content from the user’s specification is wired into the site:

* A high‑level **overview** summarises the seven‑year arc and compound layering (each year cycling through the four quadrants: **I/We/It/Its**).
* A fully interactive **calendar** spans seven years (by default beginning on 1 January 2026, but you can change this value in `script.js`).  Each quarter is represented as an event, with clickable detail panels listing what is to be studied, the activities to be performed, the resources to use, why those activities matter, and when they are due.
* Dedicated sections cover **cadence**, **metrics**, **failure controls**, **gatekeeping**, **proof of learning**, **tooling**, and **self‑calibration prompts**.  Every list item in the specification is included verbatim and augmented with explanatory _why_ statements.
* Progress tracking: each calendar event displays a checklist of sub‑tasks; ticking items records your progress in **local storage** so that the site remembers your accomplishments between sessions.  High‑level progress bars on the year pages reflect overall completion percentages.

## File structure

```
applied-cogency-calendar/
├── index.html      # The main page and entry point
├── styles.css      # Custom styles layered on top of Bootstrap
├── script.js       # JavaScript for calendar setup, event details and progress tracking
└── README.md       # This file
```

## Running locally

You can preview the site locally using any static file server or by simply opening `index.html` in your browser.  For example, using Python’s built‑in HTTP server:

```bash
cd applied-cogency-calendar
python3 -m http.server
```

Then visit <http://localhost:8000> in your browser.

## Deploying to GitHub Pages

1. Create a new repository on GitHub and push the contents of this directory to it.
2. Enable GitHub Pages in the repository settings, pointing to the `main` branch and `/` root.
3. Wait a few minutes for the site to build.  Your calendar will be available at `https://<username>.github.io/<repository-name>/`.

## Customising

* **Start date** – The calendar defaults to `2026-01-01` as the start of Year 1.  To shift the schedule, open `script.js` and change the value of the `planStart` constant.  The quarter boundaries and due dates automatically adjust.
* **Appearance** – The neutral colour palette and typography are defined in `styles.css`.  You can tweak variables at the top of the file to adjust fonts and colours.
* **Additional data** – If you need to extend the calendar or modify the existing events, edit the `events` array in `script.js`.  Each object describes a quarter or a special deliverable.

This calendar is designed for **self‑directed study** and should not be considered an accredited degree program.  It is, however, comprehensive enough in breadth, depth and practice to approximate doctoral‑level training in the integrated field called **Applied Cogency**.
