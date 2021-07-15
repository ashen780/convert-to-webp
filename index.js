// const imagemin = require("imagemin");
// const imageminWebp = require("imagemin-webp");
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const inputFolder = "./ImagesInput";
const outputFolder = "./ImagesOutput/";

imagemin([`${inputFolder}/*.{jpg,png}`], {
  destination: `${outputFolder}`,
  plugins: [
    imageminWebp({
      quality: 100,
    }),
  ],
}).then(() => {
  console.log("Images Converted Successfully!!!");
});
