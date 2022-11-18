# City Explorer API

**Author**: Jason Christopher  
**Version**: 5.0.4

## Overview / Getting Started

This app allows the user to input a city name and the LocationIQ API will select find a best match. That best match city will be displayed in a card with a static Google map image of the city. The user may then click on the "Today's Weather" button to display a modal with today's weather, the "3-Day Forecast" to display a modal with a carousel that shows three days-worth of weather, or the "Find Movies" button to display a modal with matching movies that include the name of the input city.

## Architecture

The client inputs the name of the desired city. Then the app passes that query as a string to the locationIQ API that returns 10 matches. Only the best match is used and the latitude and longitude is passed again to the LocationIQ API to produce the static image of the city map and the city name is used in the card header. The app passes the city's latitude and longitude to the server which contacts the WeatherBit API and returns three days of weather information in an array. That weather is then passed to the Forecast.js file where it is extracted and displayed in a modal or carousel, depending on if the user wants today's weather or a 3-day forecast. The app also passes the input city name to the server which contacts The Movie DB API and returns movies that have the input city's name in the title. The server extracts the top 6 matches and passes that information to a separate "Movie" component to display in a modal. Both the weather and movie modules on the server have a cache that stores previous query information for 10 seconds (for testing purposes), but would be 6 hours for weather and 1 week for movies when the app is in operation.

### Lab 7

![WRRC](./public/images/WRRC-Lab7.png)

### Lab 8

![WRRC](./public/images/WRRC-Lab8.png)

### Lab 9

![WRRC](./public/images/WRRC-Lab9.png)

### Lab 10

![WRRC](./public/images/WRRC-Lab10.png)

## Change Log

* 11-15-2022 10:34pm - Application now successfully communicates with the server API to display the matching city's weather data.  
* 11-16-2022 4:44pm - Server now successfully communicates with the WeatherBit and Movie DB APIs to provide live data to the app. Movie information is now displayed.
* 11-17-2022 10:22pm - Server is now modulized and a daily forecast was added to the app.
* 11-18-2022 5:16pm - Server now holds a 10-second cache of previous movie/weather query data.

## Time Estimation

### Name of feature: Custom Servers with Node and Express

* Estimate of time needed to complete: 3 hours
* Start time: 4pm
* Finish time: 8pm
* Actual time needed to complete: 4 hours

### Name of feature: Live Weather and Movie Data

* Estimate of time needed to complete: 3 hours
* Start time: 2pm
* Finish time: 4pm
* Actual time needed to complete: 2 hours

### Name of feature: Refactoring into Modules

* Estimate of time needed to complete: 3 hours
* Start time: 6pm
* Finish time: 10pm
* Actual time needed to complete: 4 hours

### Name of feature: Caches

* Estimate of time needed to complete: 3 hours
* Start time: 4pm
* Finish time: 5pm
* Actual time needed to complete: 1 hour
