import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";

// Firebase
import {
  auth,
  database,
  ref,
  set,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
  // getRedirectResult,
  // signInWithRedirect,
} from "../firebase";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User logged in
        const uid = user.uid;

        // Save user under users in database
        set(ref(database, "users/" + uid), {
          // Save the users email
          email: user.email,
        });

        // Move to home screen
        navigation.replace("HomeTabs");
      } else {
        // User is logged out
      }
    });

    // getRedirectResult(auth)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access Google APIs.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;

    //     // The signed-in user info.
    //     const user = result.user;
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  }, []);

  // Register
  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Register user
        const user = userCredential.user;
        console.log("Register: ", user.email, user.pass);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorCode, errorMessage);

        // Display different error messages to the user
        if (errorCode == "auth/email-already-exists") {
          alert("This email is already in use.");
        } else if (errorCode == "auth/invalid-email") {
          alert("Please provide a real email address.");
        } else if (errorCode == "auth/invalid-password") {
          alert("Please provide a password with at least 6 characters.");
        } else if (errorCode == "auth/weak-password") {
          alert("Please provide a password with at least 6 characters.");
        } else {
          alert(errorMessage);
        }
      });
  };

  // Login
  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Logged in
        const user = userCredential.user;
        console.log("Login: ", user.email, user.pass);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", error.code, error.message);

        // Display different error messages to the user
        if (errorCode == "auth/user-not-found") {
          alert(
            "There is no such email or password associated with an existing account."
          );
        } else if (errorCode == "auth/invalid-email") {
          alert("Please provide a real email address.");
        } else if (errorCode == "auth/invalid-password") {
          alert("Please provide a password with at least 6 characters.");
        } else if (errorCode == "auth/weak-password") {
          alert("Please provide a password with at least 6 characters.");
        } else {
          alert(errorMessage);
        }
      });
  };

  const provider = new GoogleAuthProvider();

  // Login with Google
  const loginUserGoogle = async () => {
    signInWithRedirect(auth, provider);

    //   signInWithPopup(auth, provider)
    //     .then((result) => {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       const token = credential.accessToken;
    //       // The signed-in user info.
    //       const user = result.user;
    //     })
    //     .catch((error) => {
    //       // Handle Errors here.
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // The email of the user's account used.
    //       const email = error.email;
    //       // The AuthCredential type that was used.
    //       const credential = GoogleAuthProvider.credentialFromError(error);
    //     });
  };

  // forgotPassword
  const forgotPassword = () => {
    console.log("Pressed Forgot Password");
    navigation.replace("ForgotPassword");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={pass}
          onChangeText={(text) => setPass(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          onPress={registerUser}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        {/* Login with Google Button */}
        <TouchableOpacity
          onPress={loginUserGoogle}
          style={(styles.button, styles.googleLogin)}
        >
          <Text style={styles.buttonOutlineText}>Login with Google</Text>
        </TouchableOpacity>

        {/* Forgot Password Button */}
        <TouchableOpacity onPress={forgotPassword} style={[styles.forgotText]}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#646a6e",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "#2b7eba",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: "grey",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  forgotText: {
    marginTop: 30,
    color: "black",
    fontWeight: "600",
    fontSize: 14,
  },
  googleLogin: {
    marginTop: 15,
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
});
