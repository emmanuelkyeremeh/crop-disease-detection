import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack } from "expo-router";
import React, { useState } from "react";
import image from "../assets/background.jpg";
import styles from "../styles/home";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const [startCamera, setStartCamera] = useState(false);
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

    console.log(photo);
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
        <ImageBackground source={image} style={styles.backgroundContainer}>
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
            <TouchableOpacity style={styles.icon}>
              <Entypo name="image" size={55} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default Home;
