function Haversine(lat1, lon1, lat2, lon2) {
  //Haversine 半正弦
  //lat 緯度 lon 經度
  var R = 6371;
  function rad(x) {
    return (x * Math.PI) / 180;
  }
  var dLat = rad(lat2 - lat1);

  var dLong = rad(lon2 - lon1);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;

  return d;
}

module.exports = Haversine;
