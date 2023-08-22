import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../styles/recommendation.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const Recommendation = ({ info, setShowRecommendation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.listHeading}>
          <Text style={styles.listHeadingText}>Recommendations</Text>
        </View>
        <FlatList
          data={info}
          renderItem={({ item }) => (
            <View style={styles.itemStyle}>
              <FontAwesome name="circle" size={10} color="black" />
              <Text style={styles.itemText}>{item.data}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonBody}
          onPress={() => setShowRecommendation(false)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Recommendation;
