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
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";

const DeleteAccountScreen = () => {
  // Navigation
  const navigation = useNavigation();

  const user = auth.currentUser;

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
        // An error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error with re-authentication: ", errorCode, errorMessage);
        // ...
      });
  };

  const deleteAccount = () => {
    console.log(pass);
    reauthenticate(pass);

    console.log("Deleting account: " + user);

    deleteUser(user)
      .then(() => {
        // User deleted.
        console.log("Deleted Account - Successful");
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorCode, errorMessage);
        // ...
      });
  };

  // Change Password
  const goHome = () => {
    console.log("Pressed Go Home");
    navigation.replace("Home");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Text style={styles.text}>Delete Account</Text>
        <Text style={styles.text}>Your Email: {auth.currentUser?.email}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Current Password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={deleteAccount} style={styles.buttonContainer}>
        <View>
          <Text style={styles.buttonText}>Confirm</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goHome} style={styles.homeButton}>
        <View>
          <Text style={styles.homeButtonText}>Go Back</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default DeleteAccountScreen;

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
  homeButton: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  homeButtonText: {
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
