import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
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
  const [image, setImage] = useState(null);
  const modelJSON = require("../tf-js-2/model.json");
  const modelWeights = require("../tf-js-2/group1-shard1of1.bin");

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

  const transformImageToTensor = async (uri) => {
    try {
      await tf.ready();
      const img64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
      const raw = new Uint8Array(imgBuffer);
      let imgTensor = decodeJpeg(raw);

      const scalar = tf.scalar(255);

      imgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]);

      const tensorScaled = imgTensor.div(scalar);

      const model = await loadModel();

      console.log(model.predict(tensorScaled.expandDims()));
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
      setImage(result.assets[0].uri);
      transformImageToTensor(result.assets[0].uri);
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

    console.log(getPredictions(photo.uri)); //photo.
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
