// src/apps/calculator/calculator_os_main.js — Calculator with XENO frame wiring

import { IntentSelect } from '../skins/components.js';
import { updateWire, imprintPreview, forgeImprint } from './xenoFrame.js';

function CalculatorSkin() {
  document.body.innerHTML = '';
  console.log('%cXENOFRAME → FRAME TYPE : [MATH]', 'color: red; font-weight: bold; background: grey; padding: 1px 3px;');
  // NAX BACKGROUND
  const background = document.createElement('div');
  background.className = 'naxBackground';
  document.body.appendChild(background);

  // Main card
  const card = document.createElement('div');
  card.className = 'card_medium';
  document.body.appendChild(card);

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
  colA.innerHTML = '<label style="color:#0f0;font:24px monospace;">A</label>';
  const wireA = document.createElement('input');
  wireA.type = 'number';
  wireA.placeholder = 'Set';
  wireA.value = '';
  wireA.style.cssText = 'width:100%;padding:15px;background:#000;color:#0f0;border:2px solid #0f0;font:30px monospace;text-align:center;border-radius:8px;';
  wireA.addEventListener('input', (e) => updateWire('a', e.target.value));
  colA.appendChild(wireA);
  row.appendChild(colA);

  // Column B — wireB
  const colB = document.createElement('div');
  colB.className = 'polygon_col polygon_col_2';
  colB.innerHTML = '<label style="color:#0f0;font:24px monospace;">B</label>';
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
  preview.style.cssText = 'margin-top: 40px; font-size: 1.4rem; color: aqua;';
  card.appendChild(preview);


  // Define updatePreview ONCE
  const updatePreview = () => {
  preview.textContent = imprintPreview();  // Correct name
  };

  // Then call it wherever needed
  wireA.addEventListener('input', updatePreview);
  wireB.addEventListener('input', updatePreview);
  intentComponent.addEventListener('change', updatePreview); // if needed

  // Initial call
  updatePreview();

  // Calculate button
  const calculateBtn = document.createElement('button');
  calculateBtn.textContent = 'CALCULATE';
  calculateBtn.className = 'os_btn';
  calculateBtn.style.marginTop = '40px';
  calculateBtn.addEventListener('click', () => {
    forgeImprint();  // xenoFrame forges and dispatches
  });
  card.appendChild(calculateBtn);

  // POLYGON SUMMON — never leave out
  fetch('http://localhost:3000/POLYGON/polygon.css')
    .then(r => r.text())
    .then(css => {
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    })
    .catch(() => {});

    // Add a close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '× CLOSE';
    closeBtn.className = 'os_btn';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '60px';
    closeBtn.style.right = '20px';
    closeBtn.addEventListener('click', () => {
      window.killApp();  // Kills current app, returns to VaporView
    });
    card.appendChild(closeBtn);
}

// Expose for reactor
window.CalculatorSkin = CalculatorSkin;
window.dispatchEvent(new Event('calculator_os_ready'));