# Template Extraction Guide

Since I cannot directly access the template data from the old website's JavaScript-rendered content, here are ways to extract template information:

## Method 1: Browser Console Script

1. Open the old website template page
2. Open Browser DevTools (F12)
3. Go to Console tab
4. Copy and paste the code from `extract-template.js`
5. Press Enter
6. Copy the JSON output and share it with me

## Method 2: Manual Extraction

1. Open Browser DevTools (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for API calls that return template/project data
5. Right-click on the request → Copy → Copy Response
6. Share the JSON data with me

## Method 3: Local Storage

1. Open Browser DevTools (F12)
2. Go to **Application** tab → **Local Storage**
3. Look for keys containing "template", "project", or "slide"
4. Copy the values and share them

## Method 4: Describe the Template

If extraction doesn't work, please describe:
- Template name
- Background colors for each slide
- Text content for each slide
- Any badges, icons, or special elements
- Device positions/rotations

I'll recreate it exactly in your new website!
