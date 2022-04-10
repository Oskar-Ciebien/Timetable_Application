// Imports
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { database, auth, ref, onValue, query, orderByChild } from "../firebase";

// Class Import
import Class from "../Class.js";

const TimetableScreen = () => {
  const navigation = useNavigation();

  const [classList, setclassList] = useState();

  const user = auth.currentUser;

  // Database Variables
  let name = "";
  let startTime = "";
  let endTime = "";
  let day = "";
  let iD = "";

  // Firebase Display code adapted and modified from: https://github.com/Chensokheng/crud-item-app
  useEffect(() => {
    const classRealTimeRefAllClasses = query(
      ref(database, "classes/" + user.uid),
      orderByChild("classDay")
    );

    onValue(
      classRealTimeRefAllClasses,
      (snapshot) => {
        const classes = snapshot.val();
        const classList = [];

        for (let id in classes) {
          // classList.push(classes[id]);
          classList.push({ id, ...classes[id] });
        }

        setclassList(classList);

        console.log("List: " + classList);

        snapshot.forEach((childSnapshot) => {
          snapshot.hasChildren;
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
  }, []);

  // Add To Timetable
  const addTimetable = () => {
    console.log("Pressed Add Timetable");
    navigation.navigate("AddTimetable");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Send Map to Class.js */}
        <View>
          {classList ? (
            classList.map((item, index) => <Class item={item} key={index} />)
          ) : (
            /* Otherwise Display Nothing */
            <Text>""</Text>
          )}
        </View>
      </ScrollView>

      {/* Add To Timetable */}
      <TouchableOpacity onPress={addTimetable} style={styles.addButton}>
        <Image
          source={require(".././assets/icons/plus_icon.png")}
          resizeMode="contain"
          style={[styles.addButtonIcon, { tintColor: "orange" }]}
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
    paddingHorizontal: 40,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  addButtonIcon: {
    tintColor: "black",
    width: 60,
    height: 60,
  },
  classes: {
    padding: 20,
  },
});
