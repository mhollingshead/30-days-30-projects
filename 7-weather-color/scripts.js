// Keep track of intervals
const intervals = { time: null, render: null }

const getLocationData = () => fetch(LOCATION_API_URL).then(res => res.json()).catch(() => LOCATION_DEFAULTS);
const getWeatherData = (options) => fetch(`${WEATHER_API_URL}${options}`).then(res => res.json()).catch(() => ({}));

const getWeatherOptions = (latitude, longitude, timezone) => {
    return (
        '?hourly=apparent_temperature,weathercode'
        + '&daily=sunrise,sunset'
        + `&latitude=${latitude}`
        + `&longitude=${longitude}`
        + `&timezone=${timezone}`
    );
};

const getData = async () => {
    // Gather geolocation data
    const locationData = await getLocationData();
    // Gather weather data for the current location
    const options = getWeatherOptions(locationData.latitude, locationData.longitude, locationData.timezone || 'GMT');
    const weatherData = await getWeatherData(options);
    // Return the necessary data
    return {
        city: locationData.city,
        region: locationData.region,
        country: locationData.country,
        timezone: locationData.timezone,
        daily: weatherData.daily,
        hourly: weatherData.hourly
    }
};

const extractHourlyData = (hourly, date) => {
    // Convert the date we're searching for to locale string
    const searchString = date.toLocaleString();
    // Convert the dates we're searching through to locale string
    const localeTimes = hourly.time.map(time => new Date(time).toLocaleString());
    // Find the index of the data we're interested in
    const index = localeTimes.indexOf(searchString) - 1;
    // Return the correct data
    return {
        temperature: hourly.apparent_temperature[index],
        weathercode: hourly.weathercode[index]
    }
};

const extractDailyData = (daily, date) => {
    // Convert the date we're searching for to locale string
    const searchString = date.toLocaleDateString();
    // Convert the dates we're searching through to locale string
    const localeDates = daily.time.map(time => new Date(time).toLocaleDateString());
    // Find the index of the data we're interested in
    const index = localeDates.indexOf(searchString) - 1;
    // Return the correct data
    return {
        sunrise: daily.sunrise[index],
        sunset: daily.sunset[index]
    }
};

const getWeatherColors = (temperature, weathercode) => {
    // Get the temperature color using HSL hue
    const temperatureColor = tinycolor({ h: 30 + 240 * (30 - temperature) / 60, s: .5, l: .5 });
    // Use the weathercode to determine the current weather and the current weather intensity
    const { weather, intensity } = weatherCodes[weathercode];
    // Get the color that represents the current weather
    const weatherColor = tinycolor(weatherColors[weather]);
    // Get the intesity mixes used to generate the color array
    const intensityMix = intensityMixes[intensity];
    // Generate the weather colors by mixing the weather color and temperature color
    const colors = intensityMix.map(mix => {
        // Mix the two colors depending on the intensity and convert to hex
        return tinycolor.mix(temperatureColor, weatherColor, mix).toHexString();
    });
    return colors;
};

const setGradient = (temperature, weathercode) => {
    // Get the weather color array
    const colors = getWeatherColors(temperature, weathercode);
    // Create the stripe-gradient
    new Gradient({
        canvas: '.gradient',
        colors: colors,
        density: [0.1, 0.3]
    });
};

const setBrightness = (sunrise, sunset, timezone) => {
    // Get the current date and time, adjusted to the current timezone (for VPN users)
    const date = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
    // Set the sunrise start to be ~105 minutes before the sunrise end
    const sunriseStart = new Date(sunrise);
    sunriseStart.setMinutes(sunriseStart.getMinutes() - 105);
    // Initialize the sunrise end as a date
    const sunriseEnd = new Date(sunrise);
    // Set the sunset start to be ~105 minutes before the sunset end
    const sunsetStart = new Date(sunset);
    sunsetStart.setMinutes(sunsetStart.getMinutes() - 105);
    // Initialize the sunset end as a date
    const sunsetEnd = new Date(sunset);
    // The weight indicates where on the light / dark spectrum the current time should fall
    let weight;
    // If the time is before the start of today's sunrise, it's still dark
    if (date <= sunriseStart) {
        weight = 0;
    // If today's sunrise has started but hasn't ended yet, the sun is rising
    } else if (date <= sunriseEnd) {
        weight = ((date - sunriseStart) / (sunriseEnd - sunriseStart));
    // If today's sunset hasn't started yet, it's day time
    } else if (date <= sunsetStart) {
        weight = 1;
    // If today's sunset has started but hasn't ended yet, the sun is setting
    } else if (date <= sunsetEnd) {
        weight = 1 - ((date - sunsetStart) / (sunsetEnd - sunsetStart));
    // Otherwise, the sun has set and it's dark
    } else weight = 0;
    // Use weight to determine the brightness (ranging between 0.25 and 1)
    const brightness = (1 - .25) * weight + .25;
    // Set the brightness of the gradient
    document.querySelector('.gradient').style.filter = `brightness(${brightness})`;
};

const renderClock = (timezone) => {
    // Get the current time
    const date = new Date();
    // Set formatting options
    const options = { timeZone: timezone, hour12: false };
    // Update the component
    document.querySelector('.time').innerHTML = date.toLocaleTimeString('en-US', options).slice(0, 5);
};

const renderLocation = (city, region, country) => {
    // Determine what location data we have available by filtering any null values
    const availableData = [city, region, country].filter(data => !!data);
    // Update the component
    document.querySelector('.location').innerHTML = availableData.join(', ');
};

const renderWeather = (temperature, weathercode) => {
    // Format the weather data and update the components
    document.querySelector('.temperature').innerHTML = `${temperature.toFixed(0)}˚C`;
    document.querySelector('.forecast').innerHTML = `, ${weatherCodes[weathercode].toText}`;
}

const render = data => {
    // Get the current date and time
    const date = new Date();
    // Clear any minutes, seconds, and ms since we're only interested in hours
    date.setMinutes(0, 0, 0);
    // Extract the necessary weather data
    const { temperature, weathercode } = extractHourlyData(data.hourly, date);
    const { sunrise, sunset } = extractDailyData(data.daily, date);
    // Generate the gradient
    setGradient(temperature, weathercode);
    // Adjust the brightness depending on time of day
    setBrightness(sunrise, sunset, data.timezone);
    // Clear the time interval if one already exists
    if (intervals.time) clearInterval(intervals.time);
    // Every second, update the clock component and brightness
    intervals.time = setInterval(() => {
        // Render the clock component
        renderClock(data.timezone);
        // Update the brightness
        setBrightness(sunrise, sunset, data.timezone);
    }, 1000);
    // Render the clock, location, and weather components
    renderClock(data.timezone);
    renderLocation(data.city, data.region, data.country);
    renderWeather(temperature, weathercode);
};

addEventListener('load', () => {
    // The initial render
    getData().then(render);
    // Set an interval to rerender every 10 minutes
    setInterval(() => getData().then(render), 600000);
});