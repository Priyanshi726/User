
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import Login from "./src/Screens/Login";

import BottomTab from "./src/Screens/BottomTab";
import Uploadfile from "./src/Screens/Uploadfile";
import ForgotPassword from "./src/Screens/ForgotPassword";
import List from "./src/Screens/List";
import Images from "./src/Screens/Images";



import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Uploadfile" component={Uploadfile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Images" component={Images} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  inputView: {
    backgroundColor: "blue",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "blue",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  Text: {
    fontSize: 50,
    fontWeight: "bold",
  },
});


