function findDealer() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const mapsUrl = `https://www.google.com/maps/search/car+dealer/@${lat},${lon},14z`;
      window.open(mapsUrl, '_blank');
    });
  } else {
    alert("Geolocation not supported.");
  }
}
