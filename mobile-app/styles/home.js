import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundContainer: {
    flex: 1,
    flexDirection: "column",
  },
  pageTitle: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flex: 0.7,
  },
  pageTitleText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  pageText: {
    fontSize: 20,
    color: "white",
    padding: 20,
    fontWeight: "bold",
  },
  pageIconsContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: "gray",
    opacity: 0.5,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 90,
  },
  loadingView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  spinnerTextStyle: {
    color: "black",
  },
  predictionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  buttonBack: {
    backgroundColor: "gray",
    padding: 3,
  },
  predbuttonText: {
    color: "black",
  },
});

export default styles;
