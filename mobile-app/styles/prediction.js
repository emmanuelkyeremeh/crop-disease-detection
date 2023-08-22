import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    color: "black",
  },
  imageContainer: {
    flex: 0.8,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  predictionTextContainer: {
    flex: 0.2,
  },
  predictionText: {
    flex: 1,
    padding: 10,
  },
  predictionTextInfo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  predictionButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    borderColor: "green",
    borderRadius: 10,
    padding: 10,
    fontSize: 40,
    backgroundColor: "white",
    borderWidth: 2,
  },
  buttonText: {
    color: "green",
  },
});

export default styles;
