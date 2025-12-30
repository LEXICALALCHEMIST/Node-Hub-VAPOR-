// src/apps/notes/notes_os.js — Notes app with XENO frame + forge button

import { updateNote, forgeTextImprint } from './xenoFrameNote.js';
import { save } from '../../DataDragon/dataDragon.js';

window.NotesSkin = function () {

  document.body.innerHTML = '';

  // NAX BACKGROUND
  const background = document.createElement('div');
  background.className = 'naxBackground';
  document.body.appendChild(background);

  // Main card
  const card = document.createElement('div');
  card.className = 'card_medium';
  card.style.cssText = 'max-width: 900px; margin: 40px auto; padding: 40px;';

  // Title
  const title = document.createElement('div');
  title.textContent = 'NOTE PAD';
  title.className = 'naxTitle';
  card.appendChild(title);

  // Large textarea
  const textarea = document.createElement('textarea');
  textarea.className = 'naxTextInput';
  textarea.placeholder = 'Begin your note...';
  textarea.addEventListener('input', (e) => {
    updateNote('content', e.target.value);
  });
  card.appendChild(textarea);

  // FORGE IMPRINT button — logs final imprint once
  // SAVE button — forges imprint and prepares for DataDragon
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'SAVE';
  saveBtn.className = 'os_btn';
  saveBtn.style.cssText = 'margin-top: 40px; font-size: 1.2rem; padding: 12px 30px;';

  saveBtn.addEventListener('click', () => {
    const finalImprint = forgeTextImprint();  // From xenoFrame

    console.log('%cSAVE → IMPRINT FORGED (ready for DataDragon)', 'color: #ff00ff; font-weight: bold; background: #000; padding: 8px 16px; border-radius: 8px;', finalImprint);

    // Future: pass to DataDragon
     save(finalImprint);
  });

  card.appendChild(saveBtn);
  

  document.body.appendChild(card);

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