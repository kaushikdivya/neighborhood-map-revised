var storeLocations = [
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
    },
    {
      title: "MAcys Antioch",
      location: {lat: 38.000083, lng: -121.841820},
      streetAddress: "2500 Somersville Rd",
      cityStateZipCode: "Antioch, CA 94509",
      id: "store13"
    },
    {
      title: "Macys Tracy",
      location: {lat: 37.761864, lng: -121.458828},
      streetAddress: "3400 Naglee Road",
      cityStateZipCode: "Tracy, CA 95304",
      id: "store14"
    }
];

// Function to initialize the map within the map div
function initMap() {

  var map = createMap()


  // populateInfoWindow()

  // Create marker




function setUpMap() {
  for (var i=0; i < storeLocations.length; i++) {
    if (storeLocations[i].showMarker === true) {
      storeLocations[i].marker.setMap(map);
    } else {
      storeLocations[i].marker.setMap(null);
    }
  }
}



  var trigger = $('.hamburger')

  function buttonSwitch() {
    if (isClosed === true) {
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        $(".main").addClass('remove-left-margin');
        isClosed = false;
    } else {
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        $(".main").addClass('add-left-margin');
        isClosed = true;
    }
  }

  trigger.click(function () {
      buttonSwitch();
  });

  if ($(window).width() > 850) {
    console.log("greater than 850")
    isClosed = true;
  } else {
    console.log("less than 850")
    isClosed = false;
    $('#wrapper').toggleClass('toggled');
  }

  $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });





ko.applyBindings(new viewModel(map));

} // End of initMap

function createMap(){
  var uluru = {lat: 37.5483, lng: -122.2128};
  var mapOptions = {
    center: uluru,
    zoom: 10,
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  return map
}


var viewModel = function(map){

  var self = this
  self.map = map
  var infowindow = new google.maps.InfoWindow();



  createMarkers()

  function createInfoWindow(marker) {
    console.log("####");
    console.log(marker)
    return function(){
      populateInfoWindow(marker)
      infowindow.open(map, marker);
      map.setCenter(marker.getPosition());
      map.setZoom(13);
    }
  }

  function populateInfoWindow(marker) {
    // Add streetview and content to the infowindow
    console.log("$$$$$")
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;

    var getStreetView = function (data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        contentString = '<div id="pano"></div><br><hr style="margin-bottom: 5px"><strong>' +
                        marker.title +
                        '</strong><br><p>' +
                        marker.streetAddress +
                        '<br>' + marker.cityStateZipCode + '<br></p>';
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
        infowindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }; // End of getStreetView

    streetViewService.getPanoramaByLocation(marker.position,
        radius, getStreetView);
    infowindow.open(map, marker);
      map.setCenter(marker.getPosition());
      map.setZoom(13);
  };

  function createMarkers(){
    for (i=0; i<storeLocations.length; i++){
      storeLocations[i].marker = new google.maps.Marker({
        position: new google.maps.LatLng(storeLocations[i].location.lat,
                storeLocations[i].location.lng),
        map: map,
        title: storeLocations[i].title,
        streetAddress: storeLocations[i].streetAddress,
        cityStateZipCode: storeLocations[i].cityStateZipCode
      });

      new google.maps.event.addListener(storeLocations[i].marker,
                                        'click',
                                        createInfoWindow(storeLocations[i].marker));
    };
  };

  self.locations = storeLocations

  self.query = ko.observable('');

  self.searchResults = ko.computed(function(){
    var q = self.query().toLowerCase();
    console.log(q)
    return self.locations.filter(function(location){
      return location.title.toLowerCase().indexOf(q) >= 0;
    });
  })

self.sideNavClick = function (){
    alert("I am clicked");
    console.log(this.marker);
    //sideNavPopulateInfoWindow(this.marker)
    createInfoWindow(this.marker)();
  }
}








// for (var i = 0; i < storeLocations.length; i++) {
// $('#store' + i).click(function() {
//       alert("I am clicked")
//       // multi = new initMap();
//       // console.log(this.marker)
//       // multi.createInfoWindow(this.marker);
//     })
//   }






