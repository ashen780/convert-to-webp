// const imagemin = require("imagemin");
// const imageminWebp = require("imagemin-webp");
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import fs from "fs";
import path from "path";

const inputFolder = "./ImagesInput";
const outputFolder = "./ImagesOutput/";

fs.readdir(inputFolder, async (err, files) => {
  for (const file of files) {
    //check extention
    const ext = path.extname(file);
    // console.log(ext);
    if (ext === ".jpg" || ext === ".png") {
      const contents = await convert(file);
      //console.log(contents);
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
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.log(err);
      });
  });
};
