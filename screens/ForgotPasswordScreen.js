import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  // Forgot Password
  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("Password reset email has been sent to: ", email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorCode, errorMessage);
      });
  };

  // Go Back to Settings
  const goBack = () => {
    console.log("Pressed Go Back");
    navigation.navigate("HomeTabs", { screen: "Settings" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Top Heading */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Your email: {auth.currentUser?.email}</Text>
      </View>

      {/* Current Email */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      {/* Send Reset Email */}
      <TouchableOpacity onPress={forgotPassword} style={styles.buttonContainer}>
        <View>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </View>
      </TouchableOpacity>

      {/* Go Back */}
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <View>
          <Text style={styles.backButtonText}>Go Back</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 10,
  },
  text: {
    color: "black",
    fontSize: 22,
  },
  backButton: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 22,
  },
  buttonContainer: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  input: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#646a6e",
  },
});
