// Imports
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TimetableScreen from "./screens/TimetableScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ChangeEmailScreen from "./screens/ChangeEmailScreen";
import DeleteAccountScreen from "./screens/DeleteAccountScreen";
import AddTimetableScreen from "./screens/AddTimetableScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs
function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          // position: "absolute",
          // marginBottom: 40,
          // marginLeft: 30,
          // marginRight: 30,
          // borderRadius: 15,
          // height: 200,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 0,
              }}
            >
              <Image
                source={require("./assets/icons/homepage.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#2b7eba" : "grey",
                }}
              />
              <Text
                style={{ color: focused ? "#2b7eba" : "grey", fontSize: 14 }}
              >
                Home Page
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Timetable"
        component={TimetableScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 0,
              }}
            >
              <Image
                source={require("./assets/icons/timetable.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#2b7eba" : "grey",
                }}
              />
              <Text
                style={{ color: focused ? "#2b7eba" : "grey", fontSize: 14 }}
              >
                Timetable
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 0,
              }}
            >
              <Image
                source={require("./assets/icons/settings.png")}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? "#2b7eba" : "grey",
                }}
              />
              <Text
                style={{ color: focused ? "#2b7eba" : "grey", fontSize: 14 }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeTabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen
          name="TimetableTabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{ headerShown: false }}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false }}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="ChangeEmail"
          options={{ headerShown: false }}
          component={ChangeEmailScreen}
        />
        <Stack.Screen
          name="DeleteAccount"
          options={{ headerShown: false }}
          component={DeleteAccountScreen}
        />
        <Stack.Screen
          name="AddTimetable"
          options={{ headerShown: false }}
          component={AddTimetableScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
