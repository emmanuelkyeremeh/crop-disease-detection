import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
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
// import Tflite from "tflite-react-native";

const Home = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);
  const predictionRoute = "http://192.168.45.90:8080/predict";

  // let tflite = new Tflite();

  // let model_tflite = require("../model/model_version_1.tflite");
  // let labels_file = require("../model/model_version_1.txt");

  // tflite.loadModel(
  //   {
  //     model: model_tflite, // required
  //     labels: labels_file, // required
  //     numThreads: 1, // defaults to 1
  //   },
  //   (err, res) => {
  //     if (err) console.log(err);
  //     else console.log(res);
  //   }
  // );

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

      // tflite.runModelOnImage(
      //   {
      //     path: uri, // required
      //   },
      //   (err, res) => {
      //     if (err) console.log(err);
      //     else console.log(res);
      //   }
      // );
      try {
        const res = await FileSystem.uploadAsync(predictionRoute, uri, {
          fieldName: "file",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        });
        let predictionObject = JSON.parse(res.body);
        let accuracy = parseFloat(predictionObject.confidence) * 100.0;

        setConfidence(`${accuracy.toFixed(2)}%`);
        setPrediction(predictionObject.class);
        setLoading(false);
        setShowPrediction(true);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
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

    try {
      const res = await FileSystem.uploadAsync(predictionRoute, photo.uri, {
        fieldName: "file",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      });
      let predictionObject = JSON.parse(res.body);
      let accuracy = parseFloat(predictionObject.confidence) * 100.0;

      setConfidence(`${accuracy.toFixed(2)}%`);
      setPrediction(predictionObject.class);
      setLoading(false);
      setShowPrediction(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
