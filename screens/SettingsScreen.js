// Imports
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

const SettingsScreen = () => {
  // Navigation
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
