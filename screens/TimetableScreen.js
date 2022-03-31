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
  let data = "";
  let email = "";
  let name = "";
  let startTime = "";
  let endTime = "";
  let day = "";

  // Add To Timetable
  const addTimetable = () => {
    console.log("Pressed Add Timetable");
    navigation.replace("AddTimetable");
  };

  // User Reference for Real-Time
  const usersRealTimeRef = ref(database, "users/" + user.uid);

  // Classes Reference for Real-Time
  const classRealTimeRef = ref(database, "classes/" + user.uid);

  // onValue - Real-Time
  onValue(usersRealTimeRef, (snapshot) => {
    // Set data from database to variables
    data = snapshot.val();
    email = snapshot.val().email;

    // Print out Data from Database
    console.log("[Real-Time] Data " + data);
    console.log("[Real-Time] Email " + email);
  });

  // onValue - Real-Time
  onValue(classRealTimeRef, (snapshot) => {
    // Set data from database to variables
    name = snapshot.val().className;
    startTime = snapshot.val().classStartTime;
    endTime = snapshot.val().classEndTime;
    day = snapshot.val().classDay;

    // Print out Data from Database
    console.log("[Real-Time] Name " + name);
    console.log("[Real-Time] Start Time " + startTime);
    console.log("[Real-Time] End Time " + endTime);
    console.log("[Real-Time] Day " + day);
  });

  // User Reference for Once
  const databaseOnceRef = ref(database);

  // Read - Once
  get(child(databaseOnceRef, `users/${user.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Set data from database to variables
        data = snapshot.val();
        email = snapshot.val().email;

        // Print out Data from Database
        console.log("[Real-Time] Data " + data);
        console.log("[Real-Time] Email " + email);
      } else {
        console.log("[Once] No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  // Read - Once
  get(child(databaseOnceRef, `classes/${user.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Set data from database to variables
        name = snapshot.val().className;
        startTime = snapshot.val().classStartTime;
        endTime = snapshot.val().classEndTime;
        day = snapshot.val().classDay;

        // Print out Data from Database
        console.log("[Real-Time] Name " + name);
        console.log("[Real-Time] Start Time " + startTime);
        console.log("[Real-Time] End Time " + endTime);
        console.log("[Real-Time] Day " + day);
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

      <Text>{`${data}`}</Text>
      <Text>{`${email}`}</Text>
      <Text>{`${name}`}</Text>
      <Text>{`${startTime}`}</Text>
      <Text>{`${endTime}`}</Text>
      <Text>{`${day}`}</Text>

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
