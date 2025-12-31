// src/apps/notes/notes_os.js — Notes app with safe container injection

import { updateNote, forgeTextImprint } from './xenoFrameNote.js';
import { save } from '../../DataDragon/dataDragon.js';

window.NotesSkin = function () {
  const root = document.getElementById('root');
  if (!root) {
    console.error('FATAL: #root not found');
    return;
  }

  // Clear only inside #root
  root.innerHTML = '';

  // Main container — all skin content goes here
  const container = document.createElement('div');
  container.className = 'naxContainer';

  // NAX BACKGROUND
  const background = document.createElement('div');
  background.className = 'naxBackground';
  container.appendChild(background);

  // Main card
  const card = document.createElement('div');
  card.className = 'card_medium';
  container.appendChild(card);

  // Title
  const title = document.createElement('div');
  title.textContent = 'NOTE PAD';
  title.className = 'naxTitle';
  root.appendChild(title);

  // Large textarea
  const textarea = document.createElement('textarea');
  textarea.className = 'naxTextInput';
  textarea.placeholder = 'Begin your note...';
  textarea.addEventListener('input', (e) => updateNote('content', e.target.value));
  card.appendChild(textarea);

  // SAVE button
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'SAVE';
  saveBtn.className = 'os_btn';
  saveBtn.style.cssText = 'margin-top: 30px; font-size: 1.2rem; padding: 12px 10px;';
  saveBtn.addEventListener('click', () => {
    const imprint = forgeTextImprint();
    save(imprint);
  });
  card.appendChild(saveBtn);

  // CLOSE button — fixed, high z-index
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '× CLOSE';
  closeBtn.className = 'os_btn';
  closeBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 99999;
    font-size: 1.4rem;
    padding: 8px 16px;
  `;
  closeBtn.addEventListener('click', () => window.killApp());
  container.appendChild(closeBtn);

  // Inject container into root
  root.appendChild(container);

    // POLYGON SUMMON
  fetch('http://localhost:3000/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    })
    .catch(() => {});
};

window.dispatchEvent(new Event('notes_os_ready'));