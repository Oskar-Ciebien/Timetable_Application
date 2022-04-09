import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth, database, ref } from "../firebase";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";

const DeleteAccountScreen = () => {
  const navigation = useNavigation();

  const user = auth.currentUser;

  const [pass, setPass] = useState("");
  const [showBox, setShowBox] = useState(true);

  let userAuthenticated = false;

  // Re-authentication
  const reauthenticate = (pass) => {
    console.log(pass);

    const credential = EmailAuthProvider.credential(user.email, pass);
    const uid = user.uid;

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

        // Alert about authentication error
        alert(
          "There was a problem with Authentication. Please try again",
          error.message
        );

        userAuthenticated = false;
      });
  };

  const deleteAccount = () => {
    console.log(pass);

    console.log("Deleting account: " + user);

    console.log(userAuthenticated);

    if (userAuthenticated == true) {
      deleteUser(user)
        .then(async () => {
          // User deleted.
          console.log("Deleted Account - Successful");

          // Remove user from database

          // database.ref("/users/" + user.uid).remove();

          // ref(database, "users/" + user.uid).remove();

          // await database()
          //   .ref("/users/" + uid)
          //   .remove();

          console.log("Deleted User's Timetable - Successful");

          // Navigate back to Login Screen
          navigation.replace("Login");
        })
        .catch((error) => {
          // An error ocurred
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error: ", errorCode, errorMessage);

          // Display different error messages to the user
          if (errorCode == "auth/invalid-password") {
            alert("Please provide a password with at least 6 characters.");
          } else if (errorCode == "auth/weak-password") {
            alert("Please provide a password with at least 6 characters.");
          } else {
            alert(errorMessage);
          }
        });
    } else {
      console.log("Account has not been deleted.");
    }
  };

  // Reauthenticate
  const checkAccount = () => {
    reauthenticate(pass);
  };

  // User Confirmation on Deletion of Account
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

  // Go Back to Settings
  const goBack = () => {
    console.log("Pressed Go Back");
    navigation.navigate("HomeTabs", { screen: "Settings" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Top Heading */}
      <View>
        <Text style={styles.text}>Delete Account</Text>
        <Text style={styles.text}>Your Email: {auth.currentUser?.email}</Text>
      </View>

      {/* Current Password */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Current Password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Confirm */}
      <TouchableOpacity onPress={checkAccount} style={styles.buttonContainer}>
        <View>
          <Text style={styles.buttonText}>Confirm</Text>
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
