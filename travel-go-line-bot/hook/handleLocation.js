const handleLocation = async (message, replyToken) => {
  const mapApiconfig = {
    token: "AIzaSyAee8zZhNBTeGuHNIClNS7ZSPqxG-a3Wgo",
  };
  const lat = message.latitude;
  const lon = message.longitude;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${mapApiconfig}`
  )
    .then((res) => {
      console.log(11, res.json());
    })
    .then((result) => {
      console.log(14, result);
    });
  return client.replyMessage(replyToken, {
    type: "text",
    text: `title: ${message.title}\naddress: ${message.address}\nlatitude: ${message.latitude}\nlongitude: ${message.longitude}`,
  });
};

module.exports = handleLocation;
