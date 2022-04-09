// Imports
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";

// Firebase
import { auth } from "./firebase.js";

import TimetableScreen from "./screens/TimetableScreen.js";

// Firebase codehttps://github.com/Chensokheng/crud-todo-app

export default function Class({ todo }) {
  // Remove a Class
  const removeClass = (todo) => {
    console.log("Pressed Remove Class");

    // console.log(todo);

    // const classRef = ref(database, "classes/" + user.uid).child(todo.id);

    // classRef.remove();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.classTable}>
        {/* <Text style={styles.class}>{todo.classId}</Text> */}
        <Text style={styles.class}>{todo.className}</Text>
        <Text style={styles.class}>{todo.classDay}</Text>
        <Text style={styles.class}>{todo.classStartTime}</Text>
        <Text style={styles.class}>{todo.classEndTime}</Text>

        <TouchableOpacity onPress={removeClass} style={styles.deleteButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginBottom: 40,
  },
  class: {
    flexGrow: 1,
    justifyContent: "space-between",

    fontFamily: "monospace",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
  },
  deleteButton: {
    marginTop: 10,

    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    backgroundColor: "red",
    textAlign: "center",
    alignItems: "center",
  },
});
