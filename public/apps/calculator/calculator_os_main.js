// src/apps/calculator/calculator_os_main.js — Calculator with safe container injection

import { IntentSelect } from '../skins/components.js';
import { updateWire, imprintPreview, forgeImprint } from './xenoFrame.js';

window.CalculatorSkin = function () {
  const root = document.getElementById('root');
  if (!root) {
    console.error('FATAL: #root not found');
    return;
  }

  // Clear only inside root — never touch body
  root.innerHTML = '';

  // Main container for the entire skin
  const container = document.createElement('div');
  container.style.cssText = 'position:relative; width:100%; height:100%; top:30px';

  // NAX BACKGROUND — inside container
  const background = document.createElement('div');
  background.className = 'naxBackground';
  container.appendChild(background);

  // Main card
  const card = document.createElement('div');
  card.className = 'card_medium';
  container.appendChild(card);

  // MAIN CARD IS THE CENTER VIEW
  
  // Title
  const title = document.createElement('div');
  title.textContent = 'App: Calculator';
  title.className = 'naxTitle';
  card.appendChild(title);

  // Row + 2 columns
  const row = document.createElement('div');
  row.className = 'polygon_row';

  // Column A — wireA
  const colA = document.createElement('div');
  colA.className = 'polygon_col polygon_col_2';
  colA.innerHTML = '<label style="color:white;font:24px monospace;">A</label>';
  const wireA = document.createElement('input');
  wireA.type = 'number';
  wireA.placeholder = 'Set';
  wireA.value = '';
  wireA.style.cssText = 'width:100%;padding:15px;background:#000;color:white;border:2px solid rgba(0, 225, 255, 1);font:30px monospace;text-align:center;border-radius:8px;';
  wireA.addEventListener('input', (e) => updateWire('a', e.target.value));
  colA.appendChild(wireA);
  row.appendChild(colA);

  // Column B — wireB
  const colB = document.createElement('div');
  colB.className = 'polygon_col polygon_col_2';
  colB.innerHTML = '<label style="color:white;font:24px monospace;">B</label>';
  const wireB = document.createElement('input');
  wireB.type = 'number';
  wireB.placeholder = 'Push|Pull';
  wireB.value = '';
  wireB.style.cssText = wireA.style.cssText;
  wireB.addEventListener('input', (e) => updateWire('b', e.target.value));
  colB.appendChild(wireB);
  row.appendChild(colB);

  card.appendChild(row);

  // Intent button group
  const intentComponent = IntentSelect('add', (intent) => updateWire('intent', intent));
  card.appendChild(intentComponent);

  // Live preview
  const preview = document.createElement('div');
  preview.className = 'exoprint_preview';
  preview.textContent = 'Live Imprint: —';
  preview.style.opacity = '0.6'; // Dim until result
  card.appendChild(preview);

  const updatePreview = () => {
    preview.textContent = imprintPreview();
  };

  wireA.addEventListener('input', updatePreview);
  wireB.addEventListener('input', updatePreview);

  updatePreview();

  // Calculate button
  const calculateBtn = document.createElement('button');
  calculateBtn.textContent = 'CALCULATE';
  calculateBtn.className = 'os_btn';
  calculateBtn.style.marginTop = '40px';
  calculateBtn.addEventListener('click', () => forgeImprint());
  card.appendChild(calculateBtn);
  // After forgeImprint() or on 'exoprint' event
  document.addEventListener('exoprint', (e) => {
    const exoprint = e.detail;

    const preview = document.querySelector('.exoprint_preview');
    if (preview) {
      preview.textContent = `EXOPRINT : ${exoprint.value}`;
      preview.style.opacity = '1';
      preview.style.transition = 'opacity 0.5s ease';
    }

    console.log('%cEXOPRINT RECEIVED — DISPLAYED', 'color: #ff00ff; font-weight: bold;', exoprint);
  });

  // Close button — fixed, high z-index
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

  // Inject entire container into root
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

window.dispatchEvent(new Event('calculator_os_ready'));