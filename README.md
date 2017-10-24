## Neighborhood Map Project

This neighborhood map project shows 13 Macy's store locations in SF bay area. Each Macy's location in the google map on click shows store address, street view and weather.

### APIs
- Google Maps API
- Weather underground API

### Functionality
- When the page is rendered, it shows all 13 Macy's locations on the Google Map with DROP animation on each marker.
- When the marker on the map is clicked, it shows stores location, street view and weather with BOUNCE animation.
- If the screen size is greater than 789 pixles, the side nav is shown by default. The side nav can be closed or open.
- On the side nav, all the 13 store locations are listed. The list is scrollable.
- There is search bar at the top of the side nav. As the locations are filtered, only the marker in the search result are shown on the map.
- Once the filter is removed, all the marker are visible on the map.
- If the screen size is smaller than 789 pixles, side nav is closed by default.
- The design of the project is responsive i.e it renders all the components of the project for all devices properly.

### Install
- Clone or download this project to your local. https://github.com/kaushikdivya/neighborhood-map-revised.git
- Open the index.html in your favorite browser.

### Sources
Knockout.js
- https://stackoverflow.com/questions/29667134/knockout-search-in-observable-array
- http://knockoutjs.com/documentation/click-binding.html
- https://stackoverflow.com/questions/45422066/set-marker-visible-with-knockout-js-ko-utils-arrayfilter
- https://stackoverflow.com/questions/42532494/filter-function-that-show-hide-markers-accordingly-when-filtering
- https://stackoverflow.com/questions/12508404/setting-the-id-attribute-with-knockoutjs-including-a-prefix

Google Maps
- https://stackoverflow.com/questions/32899466/using-knockout-js-and-google-maps-api
- https://stackoverflow.com/questions/1556921/google-map-api-v3-set-bounds-and-center
- https://stackoverflow.com/questions/18444161/google-maps-responsive-resize
- https://stackoverflow.com/questions/14687237/google-maps-api-async-loading
- https://www.w3schools.com/js/js_errors.asp

Weather Underground:
- https://www.wunderground.com/weather/api/d/docs?d=resources/code-samples

### https://kaushikdivya.github.io/neighborhood-map-revised/
