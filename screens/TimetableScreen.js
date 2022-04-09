// Imports
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";

// Navigation
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import {
  database,
  auth,
  ref,
  onValue,
  query,
  orderByChild,
  remove,
  child,
} from "../firebase";

import Class from "../Class.js";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const TimetableScreen = () => {
  // Navigation
  const navigation = useNavigation();

  //
  const [todoList, setTodoList] = useState();

  // Current User
  const user = auth.currentUser;

  // Database Variables
  // let email = "";
  let name = "";
  let startTime = "";
  let endTime = "";
  let day = "";
  let iD = "";

  // const classRealTimeRefAllClasses = query(
  //   ref(database, "classes/" + user.uid),
  //   orderByChild("classDay")
  // );

  // onValue - Real-Time - All Classes
  // onValue(
  //   classRealTimeRefAllClasses,
  //   (snapshot) => {
  //     const todos = snapshot.val();
  //     const todoList = [];

  //     for (let id in todos) {
  //       todoList.push(todos[id]);
  //     }

  //     console.log(todos);

  //     setTodoList(todoList);

  //     snapshot.forEach((childSnapshot) => {
  //       snapshot.hasChildren;
  //       iD = childSnapshot.key;
  //       name = childSnapshot.val().className;
  //       startTime = childSnapshot.val().classStartTime;
  //       endTime = childSnapshot.val().classEndTime;
  //       day = childSnapshot.val().classDay;

  //       // Print out Data from Database
  //       console.log("[Real-Time All Class] ID " + iD);
  //       console.log("[Real-Time All Class] Name " + name);
  //       console.log("[Real-Time All Class] Start Time " + startTime);
  //       console.log("[Real-Time All Class] End Time " + endTime);
  //       console.log("[Real-Time All Class] Day " + day);
  //     });
  //   },
  //   {
  //     onlyOnce: false,
  //   }
  // );

  // onValue - Real-Time - All Classes
  // onValue(
  //   classRealTimeRefAllClasses,
  //   (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       snapshot.hasChildren;
  //       iD = childSnapshot.key;
  //       name = childSnapshot.val().className;
  //       startTime = childSnapshot.val().classStartTime;
  //       endTime = childSnapshot.val().classEndTime;
  //       day = childSnapshot.val().classDay;

  //       // Print out Data from Database
  //       console.log("[Real-Time All Class] ID " + iD);
  //       console.log("[Real-Time All Class] Name " + name);
  //       console.log("[Real-Time All Class] Start Time " + startTime);
  //       console.log("[Real-Time All Class] End Time " + endTime);
  //       console.log("[Real-Time All Class] Day " + day);
  //     });
  //   },
  //   {
  //     onlyOnce: false,
  //   }
  // );

  // // User Reference for Real-Time
  // const usersRealTimeRef = ref(database, "users/" + user.uid);

  // // Classes Reference for Real-Time
  // const classRealTimeRef = ref(database, "classes/" + user.uid);

  // // onValue - Real-Time
  // onValue(usersRealTimeRef, (snapshot) => {
  //   // Set data from database to variables
  //   data = snapshot.val();
  //   email = snapshot.val().email;

  //   // Print out Data from Database
  //   console.log("[Real-Time] Data " + data);
  //   console.log("[Real-Time] Email " + email);
  // });

  // // onValue - Real-Time
  // onValue(classRealTimeRef, (snapshot) => {
  //   // Set data from database to variables
  //   name = snapshot.val().className;
  //   startTime = snapshot.val().classStartTime;
  //   endTime = snapshot.val().classEndTime;
  //   day = snapshot.val().classDay;

  //   // Print out Data from Database
  //   console.log("[Real-Time] Name " + name);
  //   console.log("[Real-Time] Start Time " + startTime);
  //   console.log("[Real-Time] End Time " + endTime);
  //   console.log("[Real-Time] Day " + day);
  // });

  // // User Reference for Once
  // const databaseOnceRef = ref(database);

  // // Read - Once
  // get(child(databaseOnceRef, `users/${user.uid}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       // Set data from database to variables
  //       data = snapshot.val();
  //       email = snapshot.val().email;

  //       // Print out Data from Database
  //       console.log("[Real-Time] Data " + data);
  //       console.log("[Real-Time] Email " + email);
  //     } else {
  //       console.log("[Once] No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // Read - Once
  // get(child(databaseOnceRef, `classes/${user.uid}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       // Set data from database to variables
  //       name = snapshot.val().className;
  //       startTime = snapshot.val().classStartTime;
  //       endTime = snapshot.val().classEndTime;
  //       day = snapshot.val().classDay;

  //       // Print out Data from Database
  //       console.log("[Real-Time] Name " + name);
  //       console.log("[Real-Time] Start Time " + startTime);
  //       console.log("[Real-Time] End Time " + endTime);
  //       console.log("[Real-Time] Day " + day);
  //     } else {
  //       console.log("[Once] No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  useEffect(() => {
    const classRealTimeRefAllClasses = query(
      ref(database, "classes/" + user.uid),
      orderByChild("classDay")
    );

    onValue(
      classRealTimeRefAllClasses,
      (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];

        for (let id in todos) {
          todoList.push(todos[id]);
          // todoList.push({ id, ...todos[id] });
        }

        setTodoList(todoList);

        console.log("List: " + todoList);

        snapshot.forEach((childSnapshot) => {
          snapshot.hasChildren;
          iD = childSnapshot.key;
          name = childSnapshot.val().className;
          startTime = childSnapshot.val().classStartTime;
          endTime = childSnapshot.val().classEndTime;
          day = childSnapshot.val().classDay;

          // Print out Data from Database
          console.log("[Real-Time All Class] ID " + iD);
          console.log("[Real-Time All Class] Name " + name);
          console.log("[Real-Time All Class] Start Time " + startTime);
          console.log("[Real-Time All Class] End Time " + endTime);
          console.log("[Real-Time All Class] Day " + day);
        });
      },
      {
        onlyOnce: false,
      }
    );
  }, []);

  // Remove a Class
  const removeClass = (todo) => {
    console.log("Pressed Remove Class");

    console.log(todo);

    // const classRef = ref(database, "classes/" + user.uid + "/").getChildren();
  };

  // Add To Timetable
  const addTimetable = () => {
    console.log("Pressed Add Timetable");
    navigation.replace("AddTimetable");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Timetable Screen</Text>

      {/* <Text>{`${data}`}</Text>
      <Text>{`${email}`}</Text>
      <Text>{`${name}`}</Text>
      <Text>{`${startTime}`}</Text>
      <Text>{`${endTime}`}</Text>
      <Text>{`${day}`}</Text> */}

      <View>
        {/* {todoList ? (
          todoList.map(
            (todo, index) => <Class todo={todo} key={index} />
              <Text>{todo.classDay}</Text>
              <Text>{todo.startTime}</Text>
              <Text>{todo.endTime}</Text>
              <Text>{todo.day}</Text>
          )
        ) : (
          <Text>""</Text>
        )} */}

        {/* {todoList ? (
          todoList.map((todo) => <Text>{todo.classDay}</Text>)
        ) : (
          <Text>""</Text>
        )} */}

        {todoList ? (
          todoList.map((todo, index) => (
            <Class todo={todo} key={index} />

            /* <View style={styles.classes} key={index}> */
            /* <Text>{todo.classDay}</Text>
              <Text>{todo.className}</Text>
              <Text>{todo.classStartTime}</Text>
              <Text>{todo.classEndTime}</Text> */
            /*{ /* <Button onPress={(todo)} title="Delete"></Button>  }*/
            /* </View> */
          ))
        ) : (
          <Text>""</Text>
        )}
      </View>

      <TouchableOpacity onPress={addTimetable} style={styles.addButton}>
        <Image
          source={require(".././assets/icons/plus_icon.png")}
          resizeMode="contain"
          style={[styles.addButtonIcon, { tintColor: "orange" }]}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TimetableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  addButtonIcon: {
    tintColor: "black",
    width: 60,
    height: 60,
  },
  classes: {
    padding: 20,
  },
});
