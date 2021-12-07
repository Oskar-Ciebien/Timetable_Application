// React
import React, { useState } from "react";

// React-Native
import { View, Switch, StyleSheet, Text } from "react-native";

// Navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// Screens
import TimetableScreen from "./screens/Timetable";
import SettingsScreen from "./screens/Settings";
import AboutUsScreen from "./screens/AboutUs";

// Drawer Items
import DrawerItems from "./constants/DrawerItems";

const Drawer = createDrawerNavigator();

function App() {
  return (
    //<PaperProvider theme={PaperDarkTheme}>
    <NavigationContainer /*theme={DarkTheme}*/>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Profile"
        screenOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 10 },
        }}
      >
        {DrawerItems.map((drawer) => (
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              drawerIcon: ({ focused }) =>
                drawer.iconType === "Material" ? (
                  <MaterialCommunityIcons
                    name={drawer.iconName}
                    size={24}
                    color={focused ? "#005bab" : "black"}
                  />
                ) : drawer.iconType === "Feather" ? (
                  <Feather
                    name={drawer.iconName}
                    size={24}
                    color={focused ? "#005bab" : "black"}
                  />
                ) : (
                  <FontAwesome5
                    name={drawer.iconName}
                    size={24}
                    color={focused ? "#ab6100" : "black"}
                  />
                ),
              // headerShown: true,
              // header: ({ scene }) => {
              //   const { options } = scene.descriptor;
              //   const title =
              //     options.headerTitle !== undefined
              //       ? options.headerTitle
              //       : options.title !== undefined
              //       ? options.title
              //       : scene.route.name;

              //   return <Header screen={title} />;
              // },
            }}
            component={
              drawer.name === "Settings"
                ? SettingsScreen
                : drawer.name === "AboutUs"
                ? AboutUsScreen
                : TimetableScreen
            }
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
