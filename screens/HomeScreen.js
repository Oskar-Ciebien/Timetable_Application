import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { auth } from "../firebase";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Greeting */}
      <View style={styles.greetingBox}>
        <Text style={(styles.text, styles.greetingText)}>
          Welcome: {auth.currentUser?.email}
        </Text>
      </View>

      {/* Guidance Box */}
      <View style={styles.guidanceBox}>
        <Text style={styles.text}>
          Head over to Timetable to add or to see your classes.
        </Text>

        <Text style={styles.text}>
          Press on the Settings tab for some additional settings and account
          help.
        </Text>
      </View>

      {/* Appreciation Box */}
      <View style={styles.authorBox}>
        <Text style={styles.text}>Thank you for using this application.</Text>
      </View>

      {/* Author Box */}
      <View style={styles.authorBox}>
        <Text style={styles.text}>
          This application has been developed by: Oskar Ciebien
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  greetingBox: {
    marginBottom: 130,
  },
  guidanceBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 100,
  },
  authorBox: {
    marginTop: 50,
  },
  text: {
    textAlign: "center",
    color: "black",
    padding: 4,
    fontSize: 15,
    fontFamily: "monospace",
  },
  greetingText: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "monospace",
  },
});
