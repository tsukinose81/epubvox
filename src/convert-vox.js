const { app } = require("electron");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { createDirectory } = require("./utils");

const convertVox = async (target, text, chapter, lineIndex) => {
  let requestJSON = await audioQuery(text);

  // edit json
  requestJSON.speedScale = 1.5;

  await synthesis(target, requestJSON, chapter, lineIndex);
  return true;
};

const audioQuery = async (text) => {
  const url = `http://127.0.0.1:50021/audio_query?text=${text}&speaker=1`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  };
  try {
    const res = await fetch(url, options).catch((e) => console.log(e));
    if (res.ok) {
      return res.json();
    } else {
      console.error("audioQueryでエラーが発生しました。", res);
    }
  } catch (e) {
    console.error("エラーが発生しました", e);
  }
};

const synthesis = async (target, requestJSON, chapter, lineIndex) => {
  const url =
    "http://127.0.0.1:50021/synthesis?speaker=1&enable_interrogative_upspeak=true";
  const options = {
    method: "POST",
    headers: {
      accept: "audio/wav",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJSON),
  };

  try {
    const res = await fetch(url, options).catch((e) => console.log(e));

    const audioData = await res.buffer(); // レスポンスデータをBufferに変換

    const destinationDirectory = path.join(app.getPath("music"), target.name);
    createDirectory(destinationDirectory);

    const destination = path.join(
      destinationDirectory,
      `${chapter}-${lineIndex}.wav`
    );
    fs.writeFileSync(destination, audioData);

    console.log("saved.");
  } catch (e) {
    console.error("エラーが発生しました", e);
  }
};

module.exports = { convertVox };
