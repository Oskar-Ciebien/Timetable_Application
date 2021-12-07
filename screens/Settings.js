import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

function SettingsScreen() {
  // DarkMode Text

  // DarkMode Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#cccccc", true: "#cccccc" }}
          thumbColor={isEnabled ? "#1350ab" : "#000000"}
          ios_backgroundColor="#cccccc"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  content: {
    paddingTop: 50,
    justifyContent: "space-evenly",
    textAlign: "center",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexWrap: "wrap",
    position: "relative",
  },
  text: {
    fontSize: 20,
    paddingRight: 20,
  },
});

export default SettingsScreen;
