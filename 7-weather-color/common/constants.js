const weatherCodes = {
    0: { weather: 'clear', intensity: 'none', toText: 'Clear' },
    1: { weather: 'overcast', intensity: 'very light', toText: 'Mostly Clear' },
    2: { weather: 'overcast', intensity: 'moderate', toText: 'Partly Cloudy' },
    3: { weather: 'overcast', intensity: 'dense', toText: 'Overcast' },
    45: { weather: 'fog', intensity: 'moderate', toText: 'Moderate Fog' },
    48: { weather: 'fog', intensity: 'dense', toText: 'Dense Fog' },
    51: { weather: 'drizzle', intensity: 'light', toText: 'Light Drizzle' },
    53: { weather: 'drizzle', intensity: 'moderate', toText: 'Moderate Drizzle' },
    55: { weather: 'drizzle', intensity: 'dense', toText: 'Dense Drizzle' },
    56: { weather: 'freezing drizzle', intensity: 'light', toText: 'Light Freezing Drizzle' },
    57: { weather: 'freezing drizzle', intensity: 'dense', toText: 'Dense Freezing Drizzle' },
    61: { weather: 'rain', intensity: 'light', toText: 'Light Rain' },
    63: { weather: 'rain', intensity: 'moderate', toText: 'Moderate Rain' },
    65: { weather: 'rain', intensity: 'dense', toText: 'Heavy Rain' },
    66: { weather: 'freezing rain', intensity: 'light', toText: 'Light Freezing Rain' },
    67: { weather: 'freezing rain', intensity: 'dense', toText: 'Heavy Freezing Rain' },
    71: { weather: 'snow', intensity: 'light', toText: 'Light Snowfall' },
    73: { weather: 'snow', intensity: 'moderate', toText: 'Moderate Snowfall' },
    75: { weather: 'snow', intensity: 'dense', toText: 'Heavy Snowfall' },
    77: { weather: 'snow grains', intensity: 'moderate', toText: 'Snow Grains' },
    80: { weather: 'rain showers', intensity: 'light', toText: 'Light Rain Showers' },
    81: { weather: 'rain showers', intensity: 'moderate', toText: 'Moderate Rain Showers' },
    82: { weather: 'rain showers', intensity: 'violent', toText: 'Violent Rain Showers' },
    85: { weather: 'snow showers', intensity: 'light', toText: 'Light Snow Showers' },
    86: { weather: 'snow showers', intensity: 'dense', toText: 'Heavy Snow Showers' },
    95: { weather: 'thunderstorm', intensity: 'dense', toText: 'Thunderstorms' },
    96: { weather: 'hail', intensity: 'light', toText: 'Thunderstorms, Light Hail' },
    99: { weather: 'hail', intensity: 'violent', toText: 'Thunderstorms, Heavy Hail' }
};
const weatherColors = {
    'clear': '#ffffff',
    'overcast': '#757A7B',
    'fog': '#8A8F94',
    'drizzle': '#7a93a0',
    'freezing drizzle': '#919394',
    'rain': '#547b88',
    'freezing rain': '#709fa9',
    'snow': '#e3faff',
    'snow grains': '#9BBBD6',
    'rain showers': '#566684',
    'snow showers': '#ffffff',
    'thunderstorm': '#3c3855',
    'hail': '#74756D'
}
const intensityMixes = {
    'none': [0, 10],
    'very light': [0, 25],
    'light': [0, 25, 50],
    'moderate': [10, 25, 50, 75],
    'dense': [50, 75, 80, 90],
    'violent': [70, 80, 99]
}
const LOCATION_DEFAULTS = {
    country: 'Canada',
    region: 'Ontario',
    city: 'Toronto',
    latitude: 43.651070,
    longitude: -79.347015,
    timezone: 'America/Toronto'
};

const LOCATION_API_URL = 'https://get.geojs.io/v1/ip/geo.json'
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';