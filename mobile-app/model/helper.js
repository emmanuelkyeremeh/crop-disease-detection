import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

export const modelJSON = require("./model.json");
export const modelWeights = require("./group1-shard1of1.bin");
export const class_names = [
  "Bacterial spot of bell Pepper",
  "Healthy Bell Pepper",
  "Bacterial spot of Tomato",
  "Early blight of Tomato",
  "Late blight of Tomato",
  "Leaf mold of Tomato",
  "Septoria leaf spot of Tomato",
  "Spider mites or Two-spotted spider mite of Tomato",
  "Target Spot of Tomato",
  "Yellow leaf curl virus of Tomato",
  "Mosaic virus of Tomato",
  "Healthy Tomato",
];

export const loadModel = async () => {
  try {
    const model = await tf.loadGraphModel(
      bundleResourceIO(modelJSON, modelWeights)
    );
    return model;
  } catch (error) {
    console.log(`Error loading model ${error}`);
  }
};

export const getPredictions = async (uri) => {
  try {
    await tf.ready();
    const img64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
    const raw = new Uint8Array(imgBuffer);
    let imgTensor = decodeJpeg(raw);

    const scalar = tf.scalar(255);

    imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [224, 224]);

    const tensorScaled = imgTensor.div(scalar);

    const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);

    const model = await loadModel();
    const result = model.predict(img);
    const prediction = await result.data();
    let max = prediction[0];
    let idx = 0;

    for (let i = 0; i < prediction.length; i++) {
      if (prediction[i] > max) {
        max = prediction[i];
        idx = i;
      }
    }
    console.log(`Prediction is ${class_names[idx]}`);
    console.log(`Confidence is ${max}`);
  } catch (error) {
    console.log(`The Error is: ${error}`);
  }
};

// export const management = {
//   "Bacterial spot of bell Pepper": {

//   }
//   "Healthy Bell Pepper",
//   "Bacterial spot of Tomato",
//   "Early blight of Tomato",
//   "Late blight of Tomato",
//   "Leaf mold of Tomato",
//   "Septoria leaf spot of Tomato",
//   "Spider mites or Two-spotted spider mite of Tomato",
//   "Target Spot of Tomato",
//   "Yellow leaf curl virus of Tomato",
//   "Mosaic virus of Tomato",
//   "Healthy Tomato",
// }
