# City Explorer API

**Author**: Jason Christopher  
**Version**: 2.0.4

## Overview

This app allows the user to input a city name and the LocationIQ API will select find a best match. That best match city will be displayed in a card with a static Google map image of the city. The user may then click on the "Get Weather" button to display a modal with a carousel that shows three days-worth of weather.

## Getting Started

The user only needs to type a city name in the input field and click the "Explore!" button to display the resulting city map. Then the user may click the "Get Weather" in the corresponding card to display a modal of the weather data for 3 days.

## Architecture

The client inputs the name of the desired city. Then the app passes that query as a string to the locationIQ API that returns 10 matches. Only the best match is used and the latitude and longitude is passed again to the LocationIQ API to produce the static image of the city map and the city name is used in the card header. After clicking the "Get Weather" button, the app contacts the server to see if there is a match for the queried city and returns three days of weather information in an array in a JSON file. That weather is then passed to the Forecast.js file where it is extracted and displayed in a modal/carousel.

![WRRC](./public/images/WRRC-Lab7.png)

## Change Log

11-14-2022 7:21pm - Application now successfully calls the LocationIQ API to display the matching city name and map.
11-15-2022 10:34pm - Application now successfully communicates with the server API to display the matching city's weather data.

## Time Estimation

### Name of feature: Asynchronous code, and APIs

* Estimate of time needed to complete: 3 hours
* Start time: 3pm
* Finish time: 7pm
* Actual time needed to complete: 4 hours

### Name of feature: Custom Servers with Node and Express

* Estimate of time needed to complete: 3 hours
* Start time: 4pm
* Finish time: 8pm
* Actual time needed to complete: 4 hours
