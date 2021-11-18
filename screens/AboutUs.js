import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Us Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  heading: {
    borderWidth: 4,
    borderRadius: 6,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
