// src/apps/weather/xenoFrameAPI.js — XENO Frame Type: API (weather)

let currentState = {
  city: 'London',  // Default city
  weatherData: null,
  loading: false,
  error: null
};

// Update wire from skin input
export function updateWire(name, value) {
  if (name === 'city') currentState.city = value.trim() || 'London';

  console.log('%cXENOFRAME API → Wire update', 'color: aqua;', currentState);
}

// Get live preview string
export function imprintPreview() {
  if (currentState.loading) return 'Fetching weather...';
  if (currentState.error) return `Error: ${currentState.error}`;
  if (!currentState.weatherData) return 'Enter city and fetch weather';

  const data = currentState.weatherData;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  return `Weather: ${currentState.city} — ${temp}°C, ${description}`;
}

// Forge imprint — call API
export async function forgeImprint() {
  currentState.loading = true;
  currentState.error = null;

  const imprint = {
    app: 'weather',
    intent: 'fetch-weather',
    city: currentState.city,
    id: crypto.randomUUID(),
    timestamp: Date.now()
  };

  try {
    // Use OpenWeatherMap (free API key needed)
    const apiKey = 'YOUR_API_KEY_HERE';  // Get free key at openweathermap.org
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentState.city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found or API error');

    currentState.weatherData = await response.json();

    console.log('%cXENOFRAME API → Weather fetched', 'color: #00ff9f;', currentState.weatherData);
  } catch (err) {
    currentState.error = err.message;
    console.error('%cXENOFRAME API → Fetch failed', 'color: #ff0044;', err);
  } finally {
    currentState.loading = false;
  }

  return currentState;
}

// Optional: get full state
export function getState() {
  return { ...currentState };
}