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
import {
  auth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "../firebase";

const ChangeEmailScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Re-authentication
  reauthenticate = (pass) => {
    console.log(pass);

    const credential = EmailAuthProvider.credential(user.email, pass);

    console.log(credential);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        console.log("Authentication passed, user: ", credential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error with re-authentication: ", errorCode, errorMessage);
      });
  };

  // Change Email
  const changeEmail = () => {
    console.log(pass);

    reauthenticate(pass);

    updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
        console.log("Email has been changed to: ", email);
      })
      .catch((error) => {
        // An error occurred
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("Error with changing email: ", errorCode, errorMessage);

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

  // Go Back to Settings Screen
  const goBack = () => {
    console.log("Pressed Go Back");
    navigation.navigate("HomeTabs", { screen: "Settings" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Top Heading */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Your current Email: {auth.currentUser?.email}
        </Text>
      </View>

      {/* New Email */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="New Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your Password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Submit */}
      <TouchableOpacity onPress={changeEmail} style={styles.buttonContainer}>
        <View>
          <Text style={styles.buttonText}>Change Email</Text>
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

export default ChangeEmailScreen;

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
