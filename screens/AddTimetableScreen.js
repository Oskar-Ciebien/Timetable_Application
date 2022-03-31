import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Picker,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth, database, set, ref } from "../firebase";

const AddTimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Consts for class details
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");

  // UID of current user
  const uid = auth.currentUser.uid;

  // Save timetable details under user's id
  const saveClassToDatabase = () => {
    // Save under classes under user uid
    set(ref(database, "classes/" + uid), {
      className: name,
      classStartTime: startTime,
      classEndTime: endTime,
      classDay: day,
    });

    // Navigate back to Timetable Screen
    navigation.navigate("HomeTabs", { screen: "Timetable" });
  };

  // Back to Home Tabs
  const goTimetable = () => {
    console.log("Pressed Go Timetable Tabs");
    navigation.navigate("HomeTabs", { screen: "Timetable" });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Adding new Class</Text>
        {/* <Text style={styles.text}>Your email: {auth.currentUser?.email}</Text> */}
      </View>

      <View style={styles.textContainer}>
        <Text>Name:</Text>
        <TextInput
          placeholder="Name of Class"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />

        <Picker
          selectedValue={day}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
        >
          <Picker.Item label="Monday" value="monday" />
          <Picker.Item label="Tuesday" value="tuesday" />
          <Picker.Item label="Wednesday" value="wednesday" />
          <Picker.Item label="Thursday" value="thursday" />
          <Picker.Item label="Friday" value="friday" />
          <Picker.Item label="Saturday" value="saturday" />
          <Picker.Item label="Sunday" value="sunday" />
        </Picker>

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
      </View>

      <TouchableOpacity
        onPress={saveClassToDatabase}
        style={styles.submitButton}
      >
        <View>
          <Text style={styles.submitButtonText}>
            Add this Class to Timetable
          </Text>
        </View>
      </TouchableOpacity>

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
  submitButton: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 22,
  },
  timetableButton: {
    marginTop: 50,
    fontSize: 22,
    backgroundColor: "red",
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
    width: 200,
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#646a6e",
  },
});
