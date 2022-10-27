<h1 align="center">Weather Color</h1>

*A single-page weather app that generates a gradient animation using the weather, temperature, and time of day in the user's current location.*

<img src="assets/img/sample.gif" style="width: 100%; border-radius: 4px;" />

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/7-weather-color)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="16" height="16" /> HTML
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="16" height="16" /> CSS
* [stripe-gradient.js](https://www.jqueryscript.net/animation/stripe-gradient-animation.html)
* [TinyColor](https://github.com/bgrins/TinyColor)
* [GeoJS](https://www.geojs.io/)
* [Open-Mateo](https://open-meteo.com/en)

## Implementation

### Obtaining the Necessary Data

For this app to work, we need to obtain quite a bit of data:

* The **geolocation** of the user's IP
    * The coordinates of the user's IP
    * The city, region, and country of the user's IP
    * The timezone of the user's IP
* The **weather** in the user's location
    * Temperature
    * Weather Code
    * Sunrise
    * Sunset

To get this data, we use two fantastic APIs: [GeoJS](https://www.geojs.io/) for geolocation and [Open-Mateo](https://open-meteo.com/en) for weather. Both APIs are free to use, with no rate-limits, API keys, or sign-ups required.

#### Geolocation

First, we make a request to GeoJS, who will receive the client IP address and return geolocational data. 

We keep keep the coordinates (for use in the weather API), city/region/country names (to display within the app), and timezone (to send to the weather API so that we can easily determine the weather data for the time right now). We also use the timezone to ensure the clock is displaying the proper time (in case of VPN users or users with differing system timezones).

#### Weather

Next, we make a request to Open-Mateo. We need to supply the API with the coordinates of our current location, as well as the timezone. We also specify what data we would like to receive, which in this case is:

* `apparent_temperature`,
* `weathercode`,
* `sunrise`, and
* `sunset`.

`apparent_temperature` and `weathercode` are returned in hourly forecasts while `sunrise` and `sunset` are returned in daily forcasts.

Once we receive the data, we search through the hourly and daily data to find the indices that correspond to the current time. From there, we render the components and send the necessary weather data to the gradient generator.

Lastly, we set an interval that will refresh this data every 10 minutes to ensure that the hourly data is up to date.

### Generating the Gradient

The main component of the app is the gradient animation, which is handled by [stripe-gradient.js](https://www.jqueryscript.net/animation/stripe-gradient-animation.html). stripe-gradient uses a `canvas` element to create a cool gradient animation, it just needs to be supplied with a list of colors that the gradient should use.

The colors that we supply to stripe-gradient are dynamically generated using data about the user's current location. The following methods are used to obtain the necessary colors:

#### Temperature Color

First, we use the **current temperature** of the user's location to generate the `temperatureColor`. We generate an `HSL` color, using the current temperature to adjust the hue such that cold temperatures map to cool colors and hot temperatures map to warm colors:

```javascript
const temperatureColor = tinycolor({ h: 30 + 240 * (30 - temperature) / 60, s: .5, l: .5 });
```

We use [TinyColor](https://github.com/bgrins/TinyColor) to simplify color conversions and mutations. Given the formula above, and temperatures generally ranging from -30˚C to 30˚C, we get a color range of **purple** (freezing) -> **blue** (cold) -> **green** (cool) -> **yellow** (warm) -> **orange** (hot) -> **red** (very hot).

#### Weather Color

Next, we use **WMO Weather interpretation codes** to determine a color that represents the weather in the user's current location. Each code is mapped to a certain weather interpretation (i.e. **0** maps to **clear sky**, **63** maps to **moderate rain**, etc.). 

For the weather color, we're only interested in the actual weather, not the intensity. For example, codes **71**, **73** and **75** map to **light snowfall**, **moderate snowfall**, and **heavy snowfall**, but in this step we only care about **snowfall** (the intensities will be important later).

We map each weather type to a color. For this, I used Alex Beals's [colorize](https://alexbeals.com/projects/colorize/), a website that turns any word or phrase into a hex color by using a search engine to find image results for the word or phrase and finding the average color across the image results.

For example, putting **rain** through the colorizer will return the average color of the top image results for 'rain'. This is repeated for all possible weather types across the weather interpretation codes.

Once the map is created, obtaining the color is as easy as

```javascript
const weatherColor = tinycolor(weatherColors[weather]);
```

#### Intensity Mixes

Again, we use the WMO Weather codes, but this time we extract only the intensities (i.e. light, moderate, heavy, etc.). This time, we map each intensity to a group of values that represent the intensity.

The colors of our gradient are all combinations of the `temperatureColor` and `weatherColor`, each one with a different amount of mixing between the two. The intensity values are indicative of the intensity of the weather. For example, **light** might map to `[[0, 25, 50]]` while **dense** might map to `[50, 75, 80, 90]`.

Given a weather code mapping to **light rain**, our first color would be a mix of 100% `temperatureColor` and 0% `weatherColor`, our second would be a mix of 75% `temperatureColor` and 25% `weatherColor`, and our third color would be a mix of 50% `temperatureColor` and 50% `weatherColor`.

In general, we obtain the gradient colors like so:

```javascript
const intensityMix = intensityMixes[intensity];
// Generate the weather colors by mixing the weather color and temperature color
const colors = intensityMix.map(mix => {
    // Mix the two colors depending on the intensity and convert to hex
    return tinycolor.mix(temperatureColor, weatherColor, mix).toHexString();
});
```

This is where TinyColor comes in handy, as it does the complicated color-mixing work for us.

#### Brightness

In addition to the colors in the gradient, we also represent the time of day by adjusting the brightness of the `canvas`. We obtain the **sunrise** and **sunset** times in the user's current date / location and check them to see if it is currently light or dark outside.

The brightness ranges from `0.25` (the sun is fully down) to `1` (the sun is fully up). If the sun is currently rising, we determine how far between the start of the sunrise and end of the sunrise we currently are, then map that value to the correct brightness within our range (same goes for sunsets).

We determine where in the sunrise we are (the `weight`) with:

```javascript
weight = (date - sunriseStart) / (sunriseEnd - sunriseStart);
```

For sunsets, we simply invert this value. Next we determine the brightness within our range with:

```javascript
const brightness = (1 - .25) * weight + .25;
```

On average, sunrises and sunsets last for 70-140 minutes. For simplicity, we assume that all sunrises and sunsets start 105 minutes before they end.

For example, if a sunrise started at 6:00 and ended at 7:45, and it is currently 6:21, our weight is `(6:21 - 6:00) / (7:45 - 6:00) = 0.2`. So, our brightness is `(1 - 0.25) * 0.2 + 0.25 = 0.4`.