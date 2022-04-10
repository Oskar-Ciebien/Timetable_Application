import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";

// Firebase
import { auth, database, ref, remove } from "./firebase";

// Firebase Display code adapted and modified from: https://github.com/Chensokheng/crud-item-app

export default function Class({ item }) {
  const user = auth.currentUser;

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
    <SafeAreaView style={styles.container}>
      <View style={styles.classTable}>
        {/* <Text style={styles.class}>{item.classId}</Text> */}
        <Text style={styles.class}>{item.className}</Text>
        <Text style={styles.class}>{item.classDay}</Text>
        <Text style={styles.class}>{item.classStartTime}</Text>
        <Text style={styles.class}>{item.classEndTime}</Text>
      </View>

      <View style={styles.buttonBox}>
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
  },
});
