import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth } from "../firebase";

const ChangePasswordScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Change Password
  const goHome = () => {
    console.log("Pressed Go Home");
    navigation.replace("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Change Password</Text>
        <Text style={styles.text}>Your Email: {auth.currentUser?.email}</Text>
      </View>

      <TouchableOpacity onPress={goHome} style={styles.button}>
        <View>
          <Text style={styles.buttonText}>Go Home</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 22,
    marginTop: 10,
  },
  button: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
});
