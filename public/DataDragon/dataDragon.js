// public/DataDragon/dataDragon.js — Local file save via File System Access API

export async function save(imprint) {
  console.log('%cDataDragon Loaded - Inherit Imprint', 'background: #2d2d2d; color: #e0e0e0; font-size: 8px; padding: 4px 8px; border-radius: 4px; font-family: monospace;');

  if (!imprint || !imprint.id) {
    console.error('DataDragon: Invalid imprint — no id');
    return;
  }

  try {
    // Trigger file save dialog
    const handle = await window.showSaveFilePicker({
      suggestedName: `${imprint.id || 'note'}.json`,
      types: [{
        description: 'NAXUS Note',
        accept: { 'application/json': ['.json'] }
      }]
    });

    const writable = await handle.createWritable();
    await writable.write(JSON.stringify(imprint, null, 2));
    await writable.close();

    console.log('%cDataDragon → LOCAL FILE SAVE SUCCESS', 'color: #00ff9f; font-weight: bold;', imprint.id);
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('DataDragon → LOCAL FILE SAVE FAILED', err);
    } else {
      console.log('DataDragon → Save cancelled by user');
    }
  }
}