import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

const SettingsScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Log Out
  const goBack = () => {};
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>

      {/* <TouchableOpacity onPress={goBack} style={styles.button}> */}
      <Text style={styles.buttonText}>Go Back Home</Text>
      {/* </TouchableOpacity> */}
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
  button: {
    alignItems: "center",
    backgroundColor: "red",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    marginTop: 60,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
