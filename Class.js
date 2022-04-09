// Imports
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
  SafeAreaView,
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

const Class = ({ todo }) => {
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
      <View style={styles.classes}>
        <Text>{todo.className}</Text>
        <Text>{todo.classDay}</Text>
        <Text>{todo.classStartTime}</Text>
        <Text>{todo.classEndTime}</Text>
        <TouchableOpacity onPress={removeClass}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Class;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  classes: {},
});
