// Imports
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import {
  database,
  auth,
  ref,
  onValue,
  get,
  child,
  query,
  orderByChild,
} from "../firebase";

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
  let iD = "";

  // Add To Timetable
  const addTimetable = () => {
    console.log("Pressed Add Timetable");
    navigation.replace("AddTimetable");
  };

  const classRealTimeRefAllClasses = query(
    ref(database, "classes/" + user.uid),
    orderByChild("classDay")
  );

  // onValue - Real-Time - All Classes
  onValue(
    classRealTimeRefAllClasses,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        iD = childSnapshot.key;
        name = childSnapshot.val().className;
        startTime = childSnapshot.val().classStartTime;
        endTime = childSnapshot.val().classEndTime;
        day = childSnapshot.val().classDay;

        // Print out Data from Database
        console.log("[Real-Time All Class] ID " + iD);
        console.log("[Real-Time All Class] Name " + name);
        console.log("[Real-Time All Class] Start Time " + startTime);
        console.log("[Real-Time All Class] End Time " + endTime);
        console.log("[Real-Time All Class] Day " + day);
      });
    },
    {
      onlyOnce: false,
    }
  );

  // // User Reference for Real-Time
  // const usersRealTimeRef = ref(database, "users/" + user.uid);

  // // Classes Reference for Real-Time
  // const classRealTimeRef = ref(database, "classes/" + user.uid);

  // // onValue - Real-Time
  // onValue(usersRealTimeRef, (snapshot) => {
  //   // Set data from database to variables
  //   data = snapshot.val();
  //   email = snapshot.val().email;

  //   // Print out Data from Database
  //   console.log("[Real-Time] Data " + data);
  //   console.log("[Real-Time] Email " + email);
  // });

  // // onValue - Real-Time
  // onValue(classRealTimeRef, (snapshot) => {
  //   // Set data from database to variables
  //   name = snapshot.val().className;
  //   startTime = snapshot.val().classStartTime;
  //   endTime = snapshot.val().classEndTime;
  //   day = snapshot.val().classDay;

  //   // Print out Data from Database
  //   console.log("[Real-Time] Name " + name);
  //   console.log("[Real-Time] Start Time " + startTime);
  //   console.log("[Real-Time] End Time " + endTime);
  //   console.log("[Real-Time] Day " + day);
  // });

  // // User Reference for Once
  // const databaseOnceRef = ref(database);

  // // Read - Once
  // get(child(databaseOnceRef, `users/${user.uid}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       // Set data from database to variables
  //       data = snapshot.val();
  //       email = snapshot.val().email;

  //       // Print out Data from Database
  //       console.log("[Real-Time] Data " + data);
  //       console.log("[Real-Time] Email " + email);
  //     } else {
  //       console.log("[Once] No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // Read - Once
  // get(child(databaseOnceRef, `classes/${user.uid}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       // Set data from database to variables
  //       name = snapshot.val().className;
  //       startTime = snapshot.val().classStartTime;
  //       endTime = snapshot.val().classEndTime;
  //       day = snapshot.val().classDay;

  //       // Print out Data from Database
  //       console.log("[Real-Time] Name " + name);
  //       console.log("[Real-Time] Start Time " + startTime);
  //       console.log("[Real-Time] End Time " + endTime);
  //       console.log("[Real-Time] Day " + day);
  //     } else {
  //       console.log("[Once] No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

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
