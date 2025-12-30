// src/apps/calculator/xenoFrame.js — XenoFrame: intent wireframe + imprint preview

let currentState = {
  intent: 'add',
  a: 0,
  b: 0
};

// Update state from wires (called by skin inputs)
export function updateWire(name, value) {
  if (name === 'a') currentState.a = parseFloat(value) || 0;
  if (name === 'b') currentState.b = parseFloat(value) || 0;
  if (name === 'intent') currentState.intent = value;

  // SACRED LIVE CONSOLE LOG — updates on every wire change
  const op = currentState.intent === 'add' ? '+' : 
             currentState.intent === 'sub' ? '-' : 
             currentState.intent === 'mul' ? '×' : '÷';

  console.log('%cCURRENT IMPRINT STATE', 'color: red; font-weight: bold; background: white; padding: 1px 3px;', {
    a: currentState.a,
    operation: currentState.intent,
    b: currentState.b,
    full: `${currentState.a} ${op} ${currentState.b}`
  });
}

// Get live preview string — called by skin
export function imprintPreview() {
  const { a, b, intent } = currentState;
  const opSymbol = intent === 'add' ? '+' : intent === 'sub' ? '-' : intent === 'mul' ? '×' : '÷';
  return `Live Imprint: A: ${a} OP: ${opSymbol} B: ${b}`;
}

// Forge final imprint on calculate — called by skin
export function forgeImprint() {
  const imprint = {
    app: 'calculator',
    intent: currentState.intent,
    a: currentState.a,
    b: currentState.b,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  };

  console.log('%cXENOFRAME → FINAL IMPRINT FORGED', 'color: red; font-weight: bold; background: grey; padding: 1px 3px;', imprint);

  // Dispatch for XENO matrix
  document.dispatchEvent(new CustomEvent('imprint', { detail: imprint }));

  return imprint;
}

export function getCurrentImprint() {
  return { ...currentState };
}

// Optional: get full state
export function getState() {
  return { ...currentState };
}