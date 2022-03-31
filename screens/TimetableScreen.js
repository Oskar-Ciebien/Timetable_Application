// Imports
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { database, auth, ref, onValue, get, child } from "../firebase";

const TimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Current User
  const user = auth.currentUser;

  // Database Variables
  let email = "";
  let data = "";

  // Add To Timetable
  const addTimetable = () => {
    console.log("Pressed Add Timetable");
    navigation.replace("AddTimetable");
  };

  // User Reference for Real-Time
  const usersRealTimeRef = ref(database, "users/" + user.uid);

  // onValue - Real-Time
  onValue(usersRealTimeRef, (snapshot) => {
    // Set data from database to variables
    email = snapshot.val().email;
    data = snapshot.val();

    // Print out Data from Database
    console.log("[Real-Time] Data " + data);
    console.log("[Real-Time] Email " + email);
  });

  // User Reference for Once
  const usersOnceRef = ref(database);

  // Read - Once
  get(child(usersOnceRef, `users/${user.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Set data from database to variables
        email = snapshot.val().email;
        data = snapshot.val();

        // Print out Data from Database
        console.log("[Once] Data " + data);
        console.log("[Once] Email " + email);
      } else {
        console.log("[Once] No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Timetable Screen</Text>

      <Text>{`${email}`}</Text>

      <TouchableOpacity onPress={addTimetable} style={styles.button}>
        <Image
          source={require(".././assets/icons/plus_icon.png")}
          resizeMode="contain"
          style={[styles.buttonIcon, { tintColor: "orange" }]}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TimetableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  buttonIcon: {
    tintColor: "black",
    width: 60,
    height: 60,
  },
});
