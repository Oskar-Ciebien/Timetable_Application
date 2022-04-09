// Imports
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";

// Firebase
import {
  database,
  auth,
  ref,
  onValue,
  query,
  orderByChild,
  remove,
  child,
} from "./firebase.js";

import TimetableScreen from "./screens/TimetableScreen.js";

export default function Class({ todo }) {
  // Current User
  const user = auth.currentUser;

  // Remove a Class
  const removeClass = (todo) => {
    console.log("Pressed Remove Class");

    // console.log(todo);

    // const classRef = ref(database, "classes/" + user.uid).child(todo.id);

    // classRef.remove();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  classTable: {
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  class: {
    padding: 2,
    fontFamily: "monospace",
    fontSize: 16,
  },
  deleteButton: {
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    backgroundColor: "red",
  },
});
