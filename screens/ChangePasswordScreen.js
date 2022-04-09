import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth } from "../firebase";
import { updatePassword, reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const user = auth.currentUser;

  const [email, setEmail] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  // Re-authentication
  reauthenticate = (oldPass) => {
    console.log(oldPass);

    const credential = EmailAuthProvider.credential(user.email, oldPass);

    console.log(credential);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        console.log("Authentication passed, user: ", credential);
      })
      .catch((error) => {
        // An error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;

        // Alert about authentication error
        alert(
          "There was a problem with Authentication. Please try again",
          error.message
        );

        console.log("Error with re-authentication: ", errorCode, errorMessage);
      });
  };

  // Change Password
  const changePassword = () => {
    console.log(oldPass);

    reauthenticate(oldPass);

    updatePassword(auth.currentUser, newPass)
      .then(() => {
        // Update successful.
        console.log("Password has been changed to: ", newPass);
      })
      .catch((error) => {
        // An error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error with changing password: ", errorCode, errorMessage);

        // Display different error messages to the user
        if (errorCode == "auth/user-not-found") {
          alert(
            "There is no such email or password associated with an existing account."
          );
        } else if (errorCode == "auth/invalid-email") {
          alert("Please provide a real email address.");
        } else if (errorCode == "auth/invalid-password") {
          alert("Please provide a password with at least 6 characters.");
        } else if (errorCode == "auth/weak-password") {
          alert("Please provide a password with at least 6 characters.");
        } else {
          alert(errorMessage);
        }
      });
  };

  // Go Back to Settings
  const goBack = () => {
    console.log("Pressed Go Back");
    navigation.navigate("HomeTabs", { screen: "Settings" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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

      {/* Current Password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Current Password"
          value={oldPass}
          onChangeText={(text) => setOldPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter New Password"
          value={newPass}
          onChangeText={(text) => setNewPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Submit */}
      <TouchableOpacity onPress={changePassword} style={styles.buttonContainer}>
        <View>
          <Text style={styles.buttonText}>Change Password</Text>
        </View>
      </TouchableOpacity>

      {/* Move Back */}
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <View>
          <Text style={styles.backButtonText}>Go Back</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

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
