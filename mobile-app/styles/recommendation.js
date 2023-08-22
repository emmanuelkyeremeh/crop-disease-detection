import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  listHeading: {
    padding: 10,
  },
  listHeadingText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 0.9,
  },
  buttonContainer: {
    flex: 0.1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBody: {
    padding: 10,
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "green",
    width: "100%",
  },
  buttonText: {
    color: "green",
    fontSize: 20,
    textAlign: "center",
  },
  itemStyle: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  itemText: {
    fontSize: 20,
    color: "black",
    paddingLeft: 2,
  },
});

export default styles;
