import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";

// Firebase
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Log Out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", error.code, error.message);
      });
  };
  return (
    <View style={styles.container}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
