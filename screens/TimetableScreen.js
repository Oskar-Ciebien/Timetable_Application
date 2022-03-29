// Imports
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { database, auth, ref, onValue, get } from "../firebase";

const TimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Current User
  const user = auth.currentUser;

  // const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [data, setData] = useState();

  // const users = ref(db, "users/");

  // Add To Timetable
  const addTimetable = () => {
    console.log("Pressed Add Timetable");
    navigation.replace("AddTimetable");
  };

  // User Reference
  const usersRef = ref(database, "users/" + user.uid);

  // useEffect(() => {
  // onValue
  onValue(usersRef, (snapshot) => {
    this.email = snapshot.val().email;
    // Set data to values read from database
    this.data = snapshot.val();

    // Print out Data from Database
    console.log(data);
    console.log(email);

    setValues();
  });
  // }, []);

  const setValues = () => {
    setData(data);
    setEmail(email);
  };

  // // User Reference
  // const usersRef = ref(database());

  // get(child(usersRef, "users/" + user.uid))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Timetable Screen</Text>
      {/* <Text>{data}</Text> */}
      {/* <Text>{this.email}</Text> */}

      <Text>{`${email}`} </Text>

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
