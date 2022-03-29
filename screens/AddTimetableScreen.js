import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth, database } from "../firebase";

const AddTimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");

  // Back to Home Tabs
  const goTimetable = () => {
    console.log("Pressed Go Timetable Tabs");
    navigation.replace("TimetableTabs");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>You are on the Add To Timetable Screen</Text>
        <Text style={styles.text}>Your email: {auth.currentUser?.email}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text>Name:</Text>
        <TextInput
          placeholder="Name of Class"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <Text>Start Time:</Text>
        <TextInput
          placeholder="Start Time"
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
          style={styles.input}
        />
        <Text>End Time:</Text>
        <TextInput
          placeholder="End Time"
          value={endTime}
          onChangeText={(text) => setEndTime(text)}
          style={styles.input}
        />
        <Text>Date:</Text>
        <TextInput
          placeholder="Date"
          value={date}
          onChangeText={(text) => setDate(text)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={goTimetable} style={styles.timetableButton}>
        <View>
          <Text style={styles.timetableButtonText}>Go Back</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AddTimetableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 10,
  },
  text: {
    color: "black",
    fontSize: 22,
  },
  timetableButton: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  timetableButtonText: {
    color: "white",
    fontSize: 22,
  },
  buttonContainer: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  input: {
    width: "70%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#646a6e",
  },
});
