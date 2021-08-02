// const imagemin = require("imagemin");
// const imageminWebp = require("imagemin-webp");
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";
import log from "simple-node-logger";

const inputFolder = "./ImagesInput";
const outputFolder = "./ImagesOutput/";

const logInfo = log.createSimpleLogger(`${inputFolder}-info.log`);
const logError = log.createSimpleLogger(`${inputFolder}-error.log`);
const testLogger = log.createSimpleLogger(`${inputFolder}-test.log`);

fs.readdir(inputFolder, async (err, files) => {
  for (const file of files) {
    //check extention
    const ext = path.extname(file);
    // console.log(ext);
    if (
      ext === ".jpg" ||
      ext === ".png" ||
      ext === ".webp" ||
      ext === ".jpeg"
    ) {
      try {
        const contents = await convert(file);
        //console.log(contents);
        continue;
      } catch (error) {
        continue;
      }
    }
  }
});

const convert = (imageName) => {
  return new Promise((resolve, reject) => {
    imagemin([`${inputFolder}/${imageName}`], {
      destination: `${outputFolder}`,
      plugins: [
        imageminWebp({
          quality: 100,
        }),
      ],
    })
      .then((res) => {
        // console.log("Images Converted Successfully!!!");
        resolve("Successfully!!");
        console.log("Successfully!!" + Math.floor(Math.random() * 100));
        //testLogger.info("Successfully filename " + imageName);
      })
      .catch((err) => {
        reject("reject filename " + imageName);
        //log to file
        logInfo.info("reject filename " + imageName);
        logError.info("Error" + err);
        console.log(err, imageName);
      });
  });
};
