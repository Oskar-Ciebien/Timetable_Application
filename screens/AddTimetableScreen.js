import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Picker,
  Button,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth, database, set, ref } from "../firebase";

// DataTimePicker
import DateTimePicker from "@react-native-community/datetimepicker";

// UUID
import uuid from "react-native-uuid";

// Variables for times
let isStartTime = false;
let isEndTime = false;
let startTime = "";
let endTime = "";

const AddTimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Time/Date Picker Variables
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  // onChange - Time/Date Picker
  const onChange = (event, selectedDate) => {
    // Set current Date to the selected date
    const currentDate = selectedDate;

    // Disable clock
    setShow(false);

    // Set Date to current date
    setDate(currentDate);

    // If start time is true
    if (isStartTime === true) {
      // Set startTime to the hours and minutes picked by user
      startTime = currentDate.getHours() + ":" + currentDate.getMinutes();

      // Set boolean back to false
      isStartTime = false;
    } else if (isEndTime === true) {
      // Set endTime to the hours and minutes picked by user
      endTime = currentDate.getHours() + ":" + currentDate.getMinutes();

      // Set boolean back to false
      isEndTime = false;
    }
  };

  // showStartTimePicker - Time/Date Picker
  const showStartTimePicker = () => {
    // Set boolean to true
    isStartTime = true;

    // Open the clock window
    setShow(true);
    setMode("time");
  };

  //showEndTimePicker - Time/Date Picker
  const showEndTimePicker = () => {
    // Set boolean to true
    isEndTime = true;

    // Open the clock window
    setShow(true);
    setMode("time");
  };

  // Consts for class details
  const [name, setName] = useState("");
  const [day, setDay] = useState("");

  // UID of current user
  const uid = auth.currentUser.uid;

  // Save timetable details under user's id
  const saveClassToDatabase = () => {
    // Create a new class ID
    const classUID = uuid.v4();

    // Save under classes under user and class UID
    set(ref(database, "classes/" + uid + "/" + classUID), {
      classId: classUID,
      className: name,
      classStartTime: startTime,
      classEndTime: endTime,
      classDay: day,
    });

    console.log("Class saved with ID: " + classUID);

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

        <Text>Start Time : {startTime}</Text>
        <Button onPress={showStartTimePicker} title="Start Time!" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <Text>End Time : {endTime}</Text>

        <Button onPress={showEndTimePicker} title="End Time!" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
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
