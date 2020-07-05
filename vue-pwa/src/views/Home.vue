<template>
  <div class="home">
    <div id="map" style="width:100%;height:400px;"></div>
  </div>
</template>

<script>

//function that gets the location and returns it
function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geo Location not supported by browser");
  }
}
//function that retrieves the position
function showPosition(position) {
  var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  }
  console.log(location);
  /*
  map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(location.latitude, location.longitude),
      zoom: 15
  });*/
  alert(`${location.longitude}, ${location.latitude}`);
}

export default {
  name: 'Home',
  setup() {
    //request for location
    getLocation();
  }
}
</script>
