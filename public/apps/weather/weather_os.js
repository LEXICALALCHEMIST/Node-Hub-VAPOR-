// src/apps/weather/weather_os.js — Weather app skin with killApp button

import { naxList } from "../skins/components.js";

window.WeatherSkin = function () {
  const root = document.getElementById('root');
  if (!root) {
    console.error('FATAL: #root not found');
    return;
  }

  root.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'naxContainer';

  const background = document.createElement('div');
  background.className = 'naxBackground';
  container.appendChild(background);

  const card = document.createElement('div');
  card.className = 'os_card';
  card.style.cssText = 'max-width: 900px; margin: 80px auto; padding: 60px; position: relative;';

  const title = document.createElement('div');
  title.textContent = 'WEATHER';
  title.className = 'naxTitle';
  root.appendChild(title);

  const wrapper = document.createElement('div');
  wrapper.className = 'naxWrapper';

  // Example: 25% height card
  const card25 = document.createElement('div');
  card25.className = 'naxCard_25';
  wrapper.appendChild(card25);

  const currentWeather = document.createElement('div');
  currentWeather.id = 'currentWeather';
  currentWeather.textContent = 'Loading weather...';
  currentWeather.style.cssText = `
    font-size: 1.8rem;
    color: aqua;
    text-shadow: 0 0 20px aqua;
    text-align: center;
  `;

  card25.appendChild(currentWeather);
  wrapper.appendChild(card25);

  // Example: 50% height card
  const card50 = document.createElement('div');
  card50.className = 'naxCard_50';
  wrapper.appendChild(card50);

  const forecastList = naxList([
  { a: 'Today', b: '22°C' },
  { a: 'Tomorrow', b: '19°C' },
  { a: 'Wednesday', b: '25°C' },
  { a: 'Thursday', b: '18°C' }
  ]);

  card50.appendChild(forecastList);
  wrapper.appendChild(card50);

  container.appendChild(wrapper);


  // CLOSE BUTTON — kills app, returns to VaporView
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '×';
  closeBtn.className = 'os_btn';
  closeBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    font-size: 2rem;
    padding: 8px 16px;
    background: #000;
    border: 2px solid aqua;
    color: aqua;
  `;
  closeBtn.addEventListener('click', () => {
    console.log('%cWEATHER → KILL COMMAND', 'color: #ff0044; font-weight: bold;');
    window.killApp();
  });
  container.appendChild(closeBtn);
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

window.dispatchEvent(new Event('weather_os_ready'));