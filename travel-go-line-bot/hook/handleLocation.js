/* const handleLocation = async (message, replyToken) => {
  const mapApiconfig = {
    token: "AIzaSyAee8zZhNBTeGuHNIClNS7ZSPqxG-a3Wgo",
  };
  const lat = message.latitude;
  const lon = message.longitude;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${mapApiconfig}`
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
    });
};

module.exports = handleLocation;
 */
