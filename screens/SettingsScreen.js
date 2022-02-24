// Imports
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const SettingsScreen = () => {
  // Navigation
  const navigation = useNavigation();

  // Change Password
  const changePassword = () => {
    console.log("Pressed Change Password");
    navigation.replace("ChangePassword");
  };

  // Change Email
  const changeEmail = () => {
    console.log("Pressed Change Email");
    navigation.replace("ChangeEmail");
  };

  // Forgot Password
  const forgotPassword = () => {
    console.log("Pressed Forgot Password");
    navigation.replace("ForgotPassword");
  };

  // Delete Account
  const deleteAccount = () => {
    console.log("Pressed Delete Account");
    navigation.replace("DeleteAccount");
  };

  // Log Out
  const logOut = () => {
    console.log("Pressed Log Out");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", error.code, error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={changePassword}>
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Change Password</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={changeEmail}>
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Change Email</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={forgotPassword}>
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Forgot Password</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={deleteAccount}>
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={(styles.menuText, styles.deleteAccountText)}>
              Delete Account
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.logOutArea}>
        <TouchableOpacity onPress={logOut} style={styles.logOutButton}>
          <Text style={styles.logOutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    marginLeft: -10,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "grey",
  },
  menuText: {
    color: "black",
    marginLeft: 25,
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 27,
  },
  deleteAccountText: {
    color: "red",
    marginLeft: 25,
    fontWeight: "900",
    fontSize: 26,
    lineHeight: 27,
  },
  logOutArea: {
    alignItems: "center",
  },
  logOutButton: {
    backgroundColor: "#eb912d",
    width: "60%",
    borderRadius: 30,
    marginTop: 50,
    alignItems: "center",
  },
  logOutButtonText: {
    color: "white",
    padding: 8,
    fontWeight: "700",
    fontSize: 22,
  },
});
