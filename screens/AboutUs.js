import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutUsScreen() {
  return (
    // <View style={styles.heading}>

    //   <Text>About Us</Text>
    //   <View style={styles.container}>
    //     <Text>Our Goal</Text>
    //   </View>
    // </View>
    <View style={styles.heading}>
      <View style={{ flex: 1, backgroundColor: "#256188" }}>
        <Text
          style={{
            textAlign: "center",
            //justifyContent: "center",
            //alignItems: "center",
            textAlignVertical: "center",
            fontSize: 28,
            paddingTop: 25,
          }}
        >
          About Us
        </Text>
      </View>
      <View style={{ flex: 4, backgroundColor: "white" }}>
        <Text style={{ textAlign: "center", fontSize: 28, marginTop: 20 }}>
          Our Goal:{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#256188",
  },
  container: {
    flex: 1,
  },
});
