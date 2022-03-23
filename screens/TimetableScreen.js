// Imports
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const TimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Timetable Screen</Text>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require(".././assets/icons/plus_icon.png")}
          resizeMode="contain"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TimetableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  buttonIcon: {
    width: 60,
    height: 60,
  },
});
