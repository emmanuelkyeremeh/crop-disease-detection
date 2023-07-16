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
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

const Home = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const modelJSON = require("../model/model.json");
  const modelWeights = require("../model/group1-shard1of1.bin");
  const class_names = [
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

  const loadModel = async () => {
    try {
      const model = await tf.loadGraphModel(
        bundleResourceIO(modelJSON, modelWeights)
      );
      return model;
    } catch (error) {
      console.log(error);
    }
  };

  const getPredictions = async (uri) => {
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
      setPrediction(class_names[idx]);
      setConfidence(max);
      console.log(`Prediction is ${class_names[idx]}`);
      console.log(`Confidence is ${max}`);
    } catch (error) {
      console.log(`The Error is: ${error}`);
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
      await getPredictions(result.assets[0].uri);
      setLoading(false);
      setShowPrediction(true);
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

    const photo = await camera.takePictureAsync();

    setStartCamera(false);
    setLoading(true);
    await getPredictions(photo.uri);
    setLoading(false);
    setShowPrediction(true);
  };

  const showHomeScreen = () => {
    setLoading(false);
    setShowPrediction(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {startCamera ? (
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
      ) : loading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator
            visible={loading}
            textStyle={styles.spinnerTextStyle}
          />
          <Text style={styles.spinnerTextStyle}>Loading Prediction</Text>
        </View>
      ) : showPrediction ? (
        <View style={styles.predictionView}>
          <Text>Prediction is: {prediction}</Text>
          <Text>Confidence is: {confidence}</Text>

          <TouchableOpacity onPress={showHomeScreen} style={styles.buttonBack}>
            <Text style={styles.predbuttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default Home;
