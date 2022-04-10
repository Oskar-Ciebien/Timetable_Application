import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";

import TimetableScreen from "./screens/TimetableScreen.js";

// Firebase Display code adapted and modified from: https://github.com/Chensokheng/crud-item-app

export default function Class({ item }) {
  // Remove a Class
  const removeClass = (item) => {
    console.log("Pressed Remove Class");

    // console.log(item);

    // const classRef = ref(database, "classes/" + user.uid).child(item.id);

    // classRef.remove();
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
