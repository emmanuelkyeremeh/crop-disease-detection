import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import backgroundPhoto from "../assets/background.jpg";
import styles from "../styles/home";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Prediction from "../components/PredictionPage";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";

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

export const modelJSON = require("../model/model.json");
export const modelWeights = require("../model/group1-shard1of1.bin");

const Home = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const predictionRoute = "http://192.168.45.90:8080/predict";

  const getPredictions = async (uri) => {
    try {
      await tf.ready();
      await tf.setBackend("cpu");
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

      let accuracy = parseFloat(max) * 100.0;

      setConfidence(`${accuracy.toFixed(2)}%`);
      setPrediction(class_names[idx]);
      setLoading(false);
      setShowPrediction(true);
    } catch (error) {
      console.log(`The Error is: ${error}`);
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);

      let uri = result.assets[0].uri;
      getPredictions(uri);

      // try {
      //   const res = await FileSystem.uploadAsync(predictionRoute, uri, {
      //     fieldName: "file",
      //     httpMethod: "POST",
      //     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      //   });
      //   let predictionObject = JSON.parse(res.body);
      //   let accuracy = parseFloat(predictionObject.confidence) * 100.0;

      //   setConfidence(`${accuracy.toFixed(2)}%`);
      //   setPrediction(predictionObject.class);
      //   setLoading(false);
      //   setShowPrediction(true);
      // } catch (error) {
      //   setLoading(false);
      //   console.log(error);
      // }
    }
  };

  let camera;

  const _startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access Denied");
    }
  };

  const _takePicture = async () => {
    if (!camera) return;
    await _startCamera();
    if (startCamera) {
      const photo = await camera.takePictureAsync();
      setStartCamera(false);
      setLoading(true);

      getPredictions(photo.uri);
    }
  };

  const showHomeScreen = () => {
    setLoading(false);
    setShowPrediction(false);
  };

  if (startCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Camera
          style={{ flex: 1, width: "100%" }}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.cameraIconContainer}>
            <TouchableOpacity style={styles.icon} onPress={_takePicture}>
              <MaterialIcons name="camera" size={55} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setStartCamera(false)}
            >
              <Ionicons name="close-outline" size={55} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    );
  } else if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View style={styles.loadingView}>
          <ActivityIndicator visible={loading} size="large" color="green" />
          <Text style={styles.spinnerTextStyle}>Loading Prediction</Text>
        </View>
      </SafeAreaView>
    );
  } else if (showPrediction) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Prediction
          prediction={prediction}
          confidence={confidence}
          setShowPrediction={setShowPrediction}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <ImageBackground
          source={backgroundPhoto}
          style={styles.backgroundContainer}
        >
          <View style={styles.pageTitle}>
            <Text style={styles.pageTitleText}>Crop Disease Detection</Text>
            <Text style={styles.pageText}>
              take a picture or upload an image to get started!
            </Text>
          </View>
          <View style={styles.pageIconsContainer}>
            <TouchableOpacity onPress={_startCamera} style={styles.icon}>
              <Feather name="camera" size={55} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.icon}>
              <Entypo name="image" size={55} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default Home;
