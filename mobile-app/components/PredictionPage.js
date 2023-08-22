import React, { useState } from "react";
import BacterialSpotOfPepper from "../assets/bacterial-spot-of-pepper.jpg";
import HeathyBellPepper from "../assets/healthy-bell-pepper.jpg";
import BacterialSpotOfTomato from "../assets/bacterial_spot_of_tomato.jpg";
import EarlyBlightOfTomato from "../assets/Early-blight-of-tomato.jpg";
import LateBlightOfTomato from "../assets/late-blight-of-tomato.jpg";
import LeafMoldOfTomato from "../assets/tomato-leaf-mold.jpg";
import SeptoriaLeafSpotOfTomato from "../assets/septoria-leaf-spot-of-tomato.jpg";
import SpiderMiteOrTwoSpottedSpiderMiteOfTomato from "../assets/spider-mite-or-two-spotted-spider-mite-of-tomato.jpg";
import TargetSpotOfTomato from "../assets/target-spot-of-tomato.jpg";
import YellowLeafCurlVirusOfTomato from "../assets/Yellow-leaf-curl-virus-of-tomato.jpg";
import MosaicVirusOfTomato from "../assets/mosaic-virus-of-tomato.jpg";
import HealthyTomato from "../assets/healthy-tomato-leaf.jpg";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/prediction";
import { Image } from "expo-image";
import Recommendation from "./RecommendationPage";

const prediction = ({ prediction, confidence, setShowPrediction }) => {
  const [showRecommendation, setShowRecommendation] = useState(false);

  const predictionManagement = {
    "Bacterial spot of bell Pepper": {
      image: BacterialSpotOfPepper,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Cultural Practices: Remove and destroy infected plants and debris. Practice crop rotation, avoiding planting peppers and tomatoes in the same location for consecutive seasons. Provide adequate spacing between plants for air circulation.",
        },
        {
          id: 2,
          data: "Irrigation: Avoid overhead irrigation to prevent water splashing, which can spread the bacteria. Use drip irrigation or soaker hoses instead.",
        },
        {
          id: 3,
          data: "Fungicides: Apply copper-based fungicides during early stages of the disease, following recommended application rates and schedules. Copper helps to control bacterial growth.",
        },
      ],
    },

    "Healthy Bell Pepper": {
      image: HeathyBellPepper,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Crop Rotation: Rotate the location of your pepper and tomato plants each growing season to reduce the buildup of soil-borne pathogens.",
        },
        {
          id: 2,
          data: "Soil Health: Ensure well-draining soil with proper pH levels for optimal nutrient uptake. Incorporate organic matter to improve soil structure and fertility.",
        },
        {
          id: 3,
          data: "Proper Watering: Water consistently, avoiding both overwatering and underwatering. Use drip irrigation or soaker hoses to deliver water directly to the root zone.",
        },
        {
          id: 4,
          data: "Mulching: Apply organic mulch around plants to retain soil moisture, suppress weeds, and regulate soil temperature.",
        },
        {
          id: 5,
          data: "Fertilization: Provide balanced fertilization based on soil test results. Avoid excessive nitrogen, as it can promote lush growth susceptible to diseases.",
        },
        {
          id: 6,
          data: "Staking and Pruning: Support plants with stakes or cages to keep them off the ground, reducing the risk of disease transmission from soil contact. Prune for proper air circulation.",
        },
        {
          id: 7,
          data: "Scouting: Regularly inspect plants for signs of pests and diseases. Early detection allows for timely intervention.",
        },
        {
          id: 8,
          data: "Sanitation: Keep the growing area clean and free of debris to reduce disease sources.",
        },
      ],
    },
    "Bacterial spot of Tomato": {
      image: BacterialSpotOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Cultural Practices: Remove and destroy infected plants and debris. Practice crop rotation, avoiding planting peppers and tomatoes in the same location for consecutive seasons. Provide adequate spacing between plants for air circulation.",
        },
        {
          id: 2,
          data: "Irrigation: Avoid overhead irrigation to prevent water splashing, which can spread the bacteria. Use drip irrigation or soaker hoses instead.",
        },
        {
          id: 3,
          data: "Fungicides: Apply copper-based fungicides during early stages of the disease, following recommended application rates and schedules. Copper helps to control bacterial growth.",
        },
      ],
    },
    "Early blight of Tomato": {
      image: EarlyBlightOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Sanitation: Remove infected leaves at the first sign of symptoms, and dispose of them properly. This reduces the source of inoculum.",
        },
        {
          id: 2,
          data: "Mulching: Apply organic mulch around plants to prevent soil splashing onto leaves, which can spread the fungus.",
        },
        {
          id: 3,
          data: "Fungicides: Apply fungicides containing chlorothalonil or mancozeb according to the recommended intervals. Begin applications before symptoms appear for preventive control.",
        },
      ],
    },
    "Late blight of Tomato": {
      image: LateBlightOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Resistant Varieties: Plant tomato varieties that are resistant to late blight, if available in your region.",
        },
        {
          id: 2,
          data: "Spacing and Pruning: Ensure proper plant spacing and prune for good air circulation to reduce humidity around plants.",
        },
        {
          id: 3,
          data: "Fungicides: Apply fungicides containing mancozeb, copper, or fungicides with systemic activity. Begin applications preventively and continue during periods of high humidity.",
        },
      ],
    },
    "Leaf mold of Tomato": {
      image: LeafMoldOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Ventilation: Ensure good airflow in the greenhouse or growing area to reduce humidity levels.",
        },
        {
          id: 2,
          data: "Cultural Practices: Space plants adequately and avoid overhead watering to minimize leaf wetness.",
        },
        {
          id: 3,
          data: "Fungicides: Apply fungicides with protective action, such as chlorothalonil or mancozeb, following recommended application intervals.",
        },
      ],
    },
    "Septoria leaf spot of Tomato": {
      image: SeptoriaLeafSpotOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Sanitation: Remove infected leaves from the bottom of the plant and destroy them to reduce disease spread.",
        },
        {
          id: 2,
          data: "Mulching: Apply mulch to prevent soil splash onto lower leaves.",
        },
        {
          id: 3,
          data: "Fungicides: Apply fungicides containing chlorothalonil, copper, or other recommended products. Begin treatments at the first sign of symptoms and continue on a regular schedule.",
        },
      ],
    },
    "Spider mites or Two-spotted spider mite of Tomato": {
      image: SpiderMiteOrTwoSpottedSpiderMiteOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Predatory Insects: Introduce natural predators such as predatory mites, ladybugs, or lacewings to control spider mite populations.",
        },
        {
          id: 2,
          data: "Cultural Practices: Increase humidity around plants to discourage mite proliferation.",
        },
        {
          id: 3,
          data: "Miticides: Apply horticultural oils or insecticidal soaps to suffocate mites. Neem oil can also be effective.",
        },
      ],
    },
    "Target Spot of Tomato": {
      image: TargetSpotOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Sanitation: Remove and destroy infected plant material to reduce disease pressure.",
        },
        {
          id: 2,
          data: "Fungicides: Apply fungicides containing chlorothalonil, azoxystrobin, or other recommended products. Begin treatments preventively and continue on a regular schedule.",
        },
      ],
    },
    "Yellow leaf curl virus of Tomato": {
      image: YellowLeafCurlVirusOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Resistant Varieties: Plant tomato varieties bred for resistance to the yellow leaf curl virus if available.",
        },
        {
          id: 2,
          data: "Whitefly Control: Implement measures to control whitefly populations, such as using sticky traps, applying reflective mulch, and introducing natural enemies like parasitic wasps.",
        },
        {
          id: 3,
          data: "Sanitation: Remove and destroy infected plants to prevent the virus from spreading to healthy plants",
        },
      ],
    },
    "Mosaic virus of Tomato": {
      image: MosaicVirusOfTomato,
      isRecommendationRequired: true,
      recommendations: [
        {
          id: 1,
          data: "Resistant Varieties: Choose tomato varieties that are resistant to mosaic viruses if available.",
        },
        {
          id: 2,
          data: "Aphid Control: Manage aphid populations with insecticidal soaps, neem oil, or introducing natural predators.",
        },
        {
          id: 3,
          data: "Sanitation: Remove and destroy infected plants to prevent further spread of the virus.",
        },
      ],
    },
    "Healthy Tomato": {
      image: HealthyTomato,
      isRecommendationRequired: false,
      recommendations: [
        {
          id: 1,
          data: "Crop Rotation: Rotate the location of your pepper and tomato plants each growing season to reduce the buildup of soil-borne pathogens.",
        },
        {
          id: 2,
          data: "Soil Health: Ensure well-draining soil with proper pH levels for optimal nutrient uptake. Incorporate organic matter to improve soil structure and fertility.",
        },
        {
          id: 3,
          data: "Proper Watering: Water consistently, avoiding both overwatering and underwatering. Use drip irrigation or soaker hoses to deliver water directly to the root zone.",
        },
        {
          id: 4,
          data: "Mulching: Apply organic mulch around plants to retain soil moisture, suppress weeds, and regulate soil temperature.",
        },
        {
          id: 5,
          data: "Fertilization: Provide balanced fertilization based on soil test results. Avoid excessive nitrogen, as it can promote lush growth susceptible to diseases.",
        },
        {
          id: 6,
          data: "Staking and Pruning: Support plants with stakes or cages to keep them off the ground, reducing the risk of disease transmission from soil contact. Prune for proper air circulation.",
        },
        {
          id: 7,
          data: "Scouting: Regularly inspect plants for signs of pests and diseases. Early detection allows for timely intervention.",
        },
        {
          id: 8,
          data: "Sanitation: Keep the growing area clean and free of debris to reduce disease sources.",
        },
      ],
    },
  };

  if (!showRecommendation) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={predictionManagement[`${prediction}`].image}
            placeholder="image"
            contentFit="cover"
            transition={1000}
          />
        </View>
        <View style={styles.predictionTextContainer}>
          <View style={styles.predictionText}>
            <Text style={styles.predictionTextInfo}>
              Prediction: {prediction}
            </Text>
            <Text style={styles.predictionTextInfo}>
              Confidence: {confidence}
            </Text>
          </View>
          <View style={styles.predictionButtons}>
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => setShowRecommendation(true)}
              >
                View Recommendations
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowPrediction(false)}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <Recommendation
        info={predictionManagement[`${prediction}`].recommendations}
        setShowRecommendation={setShowRecommendation}
      />
    );
  }
};

export default prediction;
