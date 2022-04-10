import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

// Firebase
import { auth, database, ref, remove, update, child } from "./firebase";

// Firebase Display code adapted and modified from: https://github.com/Chensokheng/crud-item-app

export default function Class({ item }) {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Update a Class
  const updateClass = () => {
    console.log("Pressed Update Class");

    console.log("Class ID: " + item.id);

    // Name
    if (name != "") {
      console.log("New Class Name - " + name);

      update(ref(database, "classes/" + user.uid + "/" + item.id), {
        className: name,
      });

      setName("");
    } else {
      console.log("Name was empty - Nothing has been updated!");
    }

    // Day
    if (day != "") {
      console.log("New Class Day - " + day);

      update(ref(database, "classes/" + user.uid + "/" + item.id), {
        classDay: day,
      });

      setDay("");
    } else {
      console.log("Day was empty - Nothing has been updated!");
    }

    // Start Time
    if (startTime != "") {
      console.log("New Class Start Time - " + startTime);

      update(ref(database, "classes/" + user.uid + "/" + item.id), {
        classStartTime: startTime,
      });

      setStartTime("");
    } else {
      console.log("Start Time was empty - Nothing has been updated!");
    }

    // End Time
    if (endTime != "") {
      console.log("New Class End Time - " + endTime);

      // Update In Database
      update(ref(database, "classes/" + user.uid + "/" + item.id), {
        classEndTime: endTime,
      });

      setEndTime("");
    } else {
      console.log("End Time was empty - Nothing has been updated!");
    }

    console.log("Class has been updated!");
  };

  // Remove a Class
  const removeClass = () => {
    console.log("Pressed Remove Class");

    console.log("Item ID: " + item.id);

    // Class Reference
    const classRef = ref(database, "classes/" + user.uid + "/" + item.id);

    console.log("Class Reference: " + classRef);

    // Remove class from database
    remove(classRef);

    console.log("Class has been removed!");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.classTable}>
        <Text style={styles.class}>{item.className}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        ></TextInput>

        <Text style={styles.class}>{item.classDay}</Text>
        <TextInput
          style={styles.input}
          value={day}
          onChangeText={(text) => setDay(text)}
        ></TextInput>

        <Text style={styles.class}>{item.classStartTime}</Text>
        <TextInput
          style={styles.input}
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
        ></TextInput>

        <Text style={styles.class}>{item.classEndTime}</Text>
        <TextInput
          style={styles.input}
          value={endTime}
          onChangeText={(text) => setEndTime(text)}
        ></TextInput>
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity onPress={removeClass} style={styles.deleteButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateClass} style={styles.updateButton}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: "yellow",
    flexGrow: 1,
  },
  classTable: {
    paddingBottom: 20,
  },
  buttonBox: {
    marginBottom: 20,
  },
  class: {
    flexGrow: 0,
    justifyContent: "space-between",
    fontFamily: "monospace",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
  },
  deleteButton: {
    borderRadius: 30,
    borderColor: "black",
    padding: 12,
    borderWidth: 2,
    backgroundColor: "red",
    textAlign: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  updateButton: {
    borderRadius: 30,
    borderColor: "black",
    padding: 12,
    borderWidth: 2,
    backgroundColor: "green",
    textAlign: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "lightgray",
    padding: 3,
    flexGrow: 0,
    marginBottom: 10,
  },
});
