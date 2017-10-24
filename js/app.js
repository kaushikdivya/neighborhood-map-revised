var neighborhoodMapApp = {

    // Macy's store locations
    storeLocations: [
        {
            title: "Macys SFO",
            location: {lat: 37.786799, lng: -122.407396},
            streetAddress: "170 O'Farrell St",
            cityStateZipCode: "San Francisco, CA 94102",
            id: "store0"
        },
        {
            title: "Macys Daly City",
            location: {lat: 37.673510, lng: -122.470751},
            streetAddress: "1 Serramonte Center",
            cityStateZipCode: "Daly City, CA 94015-2345",
            id: "store1"
        },
        {
            title: "Macys San Mateo",
            location: {lat: 37.537462, lng: -122.299842},
            streetAddress: "301 E Sailer Dr",
            cityStateZipCode: "San Mateo, CA 94403",
            id: 'store2'
        },
        {
            title: "Macys Palo Alto",
            location: {lat: 37.442198, lng: -122.171642},
            streetAddress: "300 Stanford Shopping Center",
            cityStateZipCode: "Palo Alto, CA 94304",
            id: "store3"
        },
        {
            title: "Macys Sunnyvale",
            location: {lat: 37.375753, lng: -122.031632},
            streetAddress: "200 W Washington Ave",
            cityStateZipCode: "Sunnyvale, CA 94086",
            id: "store4"
        },
        {
            title: "Macys Santa Clara",
            location: {lat: 37.324180, lng: -121.948368},
            streetAddress: "2801 Stevens Creek Blvd",
            cityStateZipCode: "Santa Clara, CA 95050",
            id: "store5"
        },
        {
            title: "Macys San Jose",
            location: {lat: 37.253498, lng: -121.863317},
            streetAddress: "5411 Thornwood Dr",
            cityStateZipCode: "San Jose, CA 95123",
            id: "store6"
        },
        {
            title: "Macys San Jose",
            location: {lat: 37.327784, lng: -121.817787},
            streetAddress: "2210 Tully Rd",
            cityStateZipCode: "San Jose, CA 95122",
            id: "store7"
        },
        {
            title: "Macys Newark",
            location: {lat: 37.525462, lng: -122.001455},
            streetAddress: "200 Newpark Mall",
            cityStateZipCode: "Newark, CA 94560",
            id: "store8"
        },
        {
            title: "Macys Hayward",
            location: {lat: 37.650172, lng: -122.104354},
            streetAddress: "800 Southland Mall Drive",
            cityStateZipCode: "Hayward, CA 94545",
            id: "store9"
        },
        {
            title: "Macys San Leandro",
            location: {lat: 37.702945, lng: -122.125960},
            streetAddress: "15555 E. 14th Street",
            cityStateZipCode: "San Leandro, CA 94578",
            id: "store10"
        },
        {
            title: "Macys Pleasanton",
            location: {lat: 37.693580, lng: -121.928217},
            streetAddress: "1300 Stoneridge Mall Rd",
            cityStateZipCode: "Pleasanton, CA 94588",
            id: "store11"
        },
        {
            title: "Macys Walnut Creek",
            location: {lat: 37.895163, lng: -122.058294},
            streetAddress: "1301 Broadway Plaza",
            cityStateZipCode: "Walnut Creek, CA 94596",
            id: "store12"
        }
    ],

    // Function to return map object
    createMap: function() {
        var self = this;
        var uluru = {lat: 37.5483, lng: -122.2128};
        var mapOptions = {
            center: uluru,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            disableDefaultUI: true
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        return map;
    },

    // Google API callback function
    initMap: function() {
        var self = this;
        var map = self.createMap();
        var trigger = $('.hamburger');
        var isClosed;

        // Set map Zoom as per the screen size
        if ($(window).width() < 768) {
            isClosed = false;
            map.setZoom(9);
        } else {
            isClosed = true;
            $('#wrapper').toggleClass('toggled');
            map.setZoom(10);
        }

        var moveHamburger = function () {
            if (isClosed === true) {
                $(".main").addClass('remove-left-margin');
                isClosed = false;
            } else {
                $(".main").addClass('add-left-margin');
                isClosed = true;
            }
        };

        trigger.click(function () {
            moveHamburger();
        });

        $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
        });

        // Added listener on window resize
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
            if (($(window).width() > 768) && (!isClosed)) {
                isClosed = true;
                map.setZoom(10);
                $('#wrapper').toggleClass('toggled');
            } else if(($(window).width() < 768) && (isClosed)) {
                isClosed = false;
                $('#wrapper').toggleClass('toggled');
                map.setZoom(9);
            }
        });

        ko.applyBindings(self.viewModel(map));
    },

    viewModel: function(map) {
        var module = this;
        function ViewModel() {
            // TODO:
            var self = this;
            self.map = map;
            var infowindow = new google.maps.InfoWindow();
            var bounds = new google.maps.LatLngBounds();

            // Add street photo, weather and location details to the infowindow
            var populateInfoWindow = function(marker) {
                if (infowindow.marker != marker) {
                    infowindow.setContent('');
                    infowindow.marker = marker;
                }
                var streetViewService = new google.maps.StreetViewService();
                var radius = 50;
                var temp_f;
                var icon_url;
                var icon;
                var weather_data;
                var url = "http://api.wunderground.com/api/4609de5ed8f9692d/geolookup/conditions/q/" +
                          marker.position.lat() + "," + marker.position.lng() + ".json";

                var getStreetView = function(data, status) {
                  if (status == google.maps.StreetViewStatus.OK) {
                    var contentString = '<div id="pano"></div><br><hr style="margin-bottom: 5px"><strong>' +
                                    marker.title +
                                    '</strong><br><p>' +
                                    marker.streetAddress +
                                    '<br>' + marker.cityStateZipCode + '<br></p>' +
                                    weather_data;

                    var nearStreetViewLocation = data.location.latLng;

                    var heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation, marker.position
                    );

                    infowindow.setContent(contentString);

                    var panoramaOptions = {
                        position: nearStreetViewLocation,
                        pov: {
                            heading: 20,
                            pitch: 20
                        }
                    };
                    var panorama = new google.maps.StreetViewPanorama(
                      document.getElementById('pano'), panoramaOptions
                    );
                  } else {
                    infowindow.setContent(
                        '<div>No Street View Found</div>' +
                        '</div><br><hr style="margin-bottom: 5px"><strong>' +
                        marker.title +
                        '</strong><br><p>' +
                        marker.streetAddress +
                        '<br>' + marker.cityStateZipCode + '<br></p>' +
                        weather_data
                    );
                  }
                }; // End of getStreetView

                // Weather underground API call
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    success: function(data) {
                        temp_f = data.current_observation.temp_f;
                        icon_url = data.current_observation.icon_url;
                        icon = data.current_observation.icon;
                        weather_data = '<ul style="padding: 0; margin: 0"><li style="padding: 0">' +
                                    'Temp: ' + temp_f +
                                    '° F <img style="width: 25px" src=' +
                                    icon_url + '>' + icon +
                                    '<img style="width: 50px" src=images/wundergroundLogo_4c.jpg>' +
                                    '</li></ul>';
                    streetViewService.getPanoramaByLocation(marker.position,
                        radius, getStreetView);
                  },
                    fail: function(error) {
                        weather_data = "Weather API can't be loaded";
                  }
                });
            };

            var createInfoWindow = function(marker) {
                return function() {
                    if (infowindow) {
                        infowindow.close();
                    }
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        setTimer(marker);
                    }
                    populateInfoWindow(marker);
                    infowindow.open(map, marker);
                    map.setCenter(marker.getPosition());
                    map.setZoom(13);
                    google.maps.event.addListener(infowindow,'closeclick',function(){
                        marker.setAnimation(google.maps.Animation.drop);
                        map.fitBounds(bounds);
                    });
                };
            };

            var setTimer = function(marker) {
                window.setTimeout(function() {
                    marker.setAnimation(null);
                }, 1400)
            }

            var createMarkers = function() {
                var storeLocations = module.storeLocations;
                for (var i = 0; i < storeLocations.length; i++) {
                    var position = new google.maps.LatLng(
                        storeLocations[i].location.lat,
                    storeLocations[i].location.lng);
                    bounds.extend(position);
                    storeLocations[i].marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: storeLocations[i].title,
                        streetAddress: storeLocations[i].streetAddress,
                        cityStateZipCode: storeLocations[i].cityStateZipCode,
                        animation: google.maps.Animation.DROP
                    });

                    new google.maps.event.addListener(
                        storeLocations[i].marker,
                        'click',
                        createInfoWindow(storeLocations[i].marker)
                    );

                  map.fitBounds(bounds);
                }
            };

            createMarkers();

            self.locations = ko.observableArray(module.storeLocations);

            self.query = ko.observable('');

            // Return search query results and make markers in the result visible.
            self.searchResults = ko.computed(function() {
                infowindow.close();
                map.fitBounds(bounds);
                var q = self.query().toLowerCase();
                return self.locations().filter(function(location) {
                    if (!self.query() || location.title.toLowerCase().indexOf(q) >= 0) {
                        location.marker.setVisible(true);
                        if (self.query()) {
                            if (location.marker.getAnimation !== null) {
                                location.marker.setAnimation(null);
                            }
                            location.marker.setAnimation(google.maps.Animation.BOUNCE);
                            setTimer(location.marker);
                        } else {
                            location.marker.setAnimation(google.maps.Animation.DROP);
                        }
                        return true;
                    } else {
                        location.marker.setVisible(false);
                        location.marker.setAnimation(null);
                        return false;
                    }
                });
            });

            // Open infowindow on clicking locations on side nav
            self.sideNavClick = function() {
                createInfoWindow(this.marker)();
            };
        }
        return new ViewModel(map);
    }

};


function mapErrorHandler() {
    alert("Map can't be loaded.");
}
