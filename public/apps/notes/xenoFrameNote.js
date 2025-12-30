// src/apps/notes/xenoFrame.js

let currentNote = {
  title: '',
  content: '',
  id: null,
  timestamp: null
};

export function updateNote(field, value) {
  if (field === 'title') currentNote.title = value;
  if (field === 'content') currentNote.content = value;
}

// EXPORT THIS — this is the missing piece
export function forgeTextImprint() {
  const imprint = {
    app: 'notes',
    intent: 'save-note',
    title: currentNote.title,
    content: currentNote.content,
    id: currentNote.id || crypto.randomUUID(),
    timestamp: Date.now()
  };

  console.log('%cNOTES XENOFRAME → TEXT IMPRINT FORGED', 'color: #ff00ff; font-weight: bold;', imprint);

  return imprint;
}