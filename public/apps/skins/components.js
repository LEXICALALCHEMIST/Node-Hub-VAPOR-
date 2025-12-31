// ALL-MIND/public/NAXUS/skins/components.js — Dropdown with change callback

import { updateWire } from '../calculator/xenoFrame.js';  // Import updateWire

export function IntentSelect(initialValue = 'add') {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width:100%;text-align:center;margin-top:40px;';

  const label = document.createElement('label');
  label.textContent = 'Operation';
  label.style.cssText = 'color:aqua;font:1.8rem monospace;display:block;margin-bottom:15px;text-shadow:0 0 20px aqua;';
  wrapper.appendChild(label);

  const select = document.createElement('select');
  select.className = 'intent_selector';
  select.style.cssText = `
    background: #000;
    color: aqua;
    font-family: monospace;
    font-size: 1.6rem;
    padding: 12px 12px;
    border: 2px solid aqua;
    border-radius: 12px;
    min-width: 200px;
    cursor: pointer;
    box-shadow: 0 0 30px aqua;
    outline: none;
    appearance: none;
    text-align: center;
    transition: all 0.3s ease;
  `;

  // Hover/active glow
  select.addEventListener('mouseenter', () => {
    select.style.boxShadow = '0 0 40px aqua';
    select.style.borderColor = '#00ffff';
  });
  select.addEventListener('mouseleave', () => {
    select.style.boxShadow = '0 0 30px aqua';
    select.style.borderColor = 'aqua';
  });

  const operations = [
    { value: 'add', text: '+' },
    { value: 'sub', text: '-' },
    { value: 'mul', text: '×' },
    { value: 'div', text: '÷' }
  ];

  operations.forEach(op => {
    const option = document.createElement('option');
    option.value = op.value;
    option.textContent = op.text;
    if (op.value === initialValue) option.selected = true;
    select.appendChild(option);
  });

  // CRITICAL: Update xenoFrame on change
  select.addEventListener('change', (e) => {
    updateWire('intent', e.target.value);
  });

  wrapper.appendChild(select);

  return wrapper;
}

// ALL-MIND/public/NAXUS/skins/components.js — naxList with A / B columns

export function naxList(items = []) {
  const list = document.createElement('div');
  list.style.cssText = `
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
    background: rgba(0, 0, 0, 0.7); /* Ghost black */
    border: 1px solid rgba(0, 255, 159, 0.3);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 0 30px rgba(0, 255, 159, 0.2);
    font-family: monospace;
    color: #00ff9f;
    font-size: 1.2rem;
  `;

  items.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = `
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 255, 159, 0.2);
    `;

    const left = document.createElement('span');
    left.textContent = item.a || '—';
    left.style.cssText = 'opacity: 0.9;';

    const right = document.createElement('span');
    right.textContent = item.b || '—';
    right.style.cssText = 'font-weight: bold;';

    row.appendChild(left);
    row.appendChild(right);
    list.appendChild(row);
  });

  // Remove last border
  if (list.lastChild) {
    list.lastChild.style.borderBottom = 'none';
  }

  return list;
}