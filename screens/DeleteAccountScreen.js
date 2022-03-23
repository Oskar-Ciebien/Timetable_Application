import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Button,
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
  const [showBox, setShowBox] = useState(true);

  let userAuthenticated = false;

  // Re-authentication
  const reauthenticate = (pass) => {
    console.log(pass);

    const credential = EmailAuthProvider.credential(user.email, pass);

    console.log(credential);
    console.log(userAuthenticated);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        console.log("Authentication passed, user: ", credential);

        console.log(userAuthenticated);
        userAuthenticated = true;
        console.log(userAuthenticated);

        confirmDelete();
      })
      .catch((error) => {
        // An error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error with re-authentication: ", errorCode, errorMessage);

        userAuthenticated = false;
        // ...
      });
  };

  const deleteAccount = () => {
    console.log(pass);

    console.log("Deleting account: " + user);

    console.log(userAuthenticated);

    if (userAuthenticated == true) {
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
    } else {
      console.log("Account has not been deleted.");
    }
  };

  const checkAccount = () => {
    reauthenticate(pass);
  };

  const confirmDelete = () => {
    Alert.alert("Are you sure?", "Should we delete your account?", [
      {
        text: "Yes",
        onPress: () => {
          console.log("Yes Pressed!");
          deleteAccount();
        },
      },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);
  };

  // Go Home
  const goHome = () => {
    console.log("Pressed Go Home");
    navigation.replace("HomeTabs");
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

      <TouchableOpacity onPress={checkAccount} style={styles.buttonContainer}>
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
