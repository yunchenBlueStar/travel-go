const client = require("../config/client");
const path = require("path");
const fs = require("fs");
const cp = require("child_process");
const handleImage = async (message, replyToken) => {
  try {
    let getContent;
    if (message.contentProvider.type === "line") {
      const downloadPath = path.join(
        path.resolve("./"),
        "downloaded",
        `${message.id}.jpg`
      );
      const previewPath = path.join(
        path.resolve("./"),
        "downloaded",
        `${message.id}-preview.jpg`
      );

      getContent = downloadContent(message.id, downloadPath)
        .then((downloadPath) => {
          // ImageMagick is needed here to run 'convert'
          // Please consider about security and performance by yourself
          cp.execSync(
            `convert -resize 240x jpeg:${downloadPath} jpeg:${previewPath}`
          );

          return {
            originalContentUrl:
              path.resolve("./") + "/downloaded/" + path.basename(downloadPath),
            previewImageUrl:
              path.resolve("./") + "/downloaded/" + path.basename(previewPath),
          };
        })
        .catch(console.log);
    } else if (message.contentProvider.type === "external") {
      getContent = Promise.resolve(message.contentProvider);
    }

    return getContent.then(({ originalContentUrl, previewImageUrl }) => {
      return client.replyMessage(replyToken, {
        type: "image",
        originalContentUrl,
        previewImageUrl,
      });
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

function downloadContent(messageId, downloadPath) {
  return client.getMessageContent(messageId).then(
    (stream) =>
      new Promise((resolve, reject) => {
        const writable = fs.createWriteStream(downloadPath);
        stream.pipe(writable);
        stream.on("end", () => resolve(downloadPath));
        stream.on("error", reject);
      })
  );
}

module.exports = handleImage;
