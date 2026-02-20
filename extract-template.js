// Template Extraction Script
// Run this in the browser console on the old website to extract template data

(function() {
  console.log('=== Template Extractor ===');
  
  // Try to find template data in various places
  const extractors = [
    () => {
      // Check window state
      if (window.__INITIAL_STATE__) {
        return window.__INITIAL_STATE__;
      }
      if (window.__NEXT_DATA__) {
        return window.__NEXT_DATA__;
      }
      if (window.appState) {
        return window.appState;
      }
      return null;
    },
    () => {
      // Check React/Redux state
      const reactRoot = document.querySelector('#root, #__next, [data-reactroot]');
      if (reactRoot && reactRoot._reactInternalInstance) {
        return reactRoot._reactInternalInstance;
      }
      return null;
    },
    () => {
      // Try to find template data in script tags
      const scripts = document.querySelectorAll('script[type="application/json"]');
      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent);
          if (data.template || data.slides || data.project) {
            return data;
          }
        } catch (e) {}
      }
      return null;
    }
  ];
  
  let templateData = null;
  for (const extractor of extractors) {
    try {
      const data = extractor();
      if (data) {
        templateData = data;
        break;
      }
    } catch (e) {
      console.error('Extractor error:', e);
    }
  }
  
  if (templateData) {
    console.log('Found template data:', templateData);
    console.log('\n=== Copy this JSON ===');
    console.log(JSON.stringify(templateData, null, 2));
  } else {
    console.log('Could not find template data automatically.');
    console.log('Please manually inspect:');
    console.log('1. Open DevTools > Application > Local Storage');
    console.log('2. Look for template/project data');
    console.log('3. Or check Network tab for API responses');
  }
  
  // Also try to extract from visible elements
  console.log('\n=== Visible Template Info ===');
  const textElements = document.querySelectorAll('h1, h2, h3, [class*="title"], [class*="text"]');
  const colors = new Set();
  const texts = [];
  
  textElements.forEach(el => {
    const text = el.textContent?.trim();
    const bg = window.getComputedStyle(el).backgroundColor;
    const color = window.getComputedStyle(el).color;
    
    if (text && text.length < 100) {
      texts.push(text);
    }
    if (bg && bg !== 'rgba(0, 0, 0, 0)') colors.add(bg);
    if (color && color !== 'rgba(0, 0, 0, 0)') colors.add(color);
  });
  
  console.log('Found texts:', texts.slice(0, 20));
  console.log('Found colors:', Array.from(colors).slice(0, 10));
  
  return templateData;
})();
