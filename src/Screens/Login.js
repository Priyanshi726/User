import { useState, useEffect, createRef } from "react";
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";




import AsyncStorage from '@react-native-async-storage/async-storage';
import database from "@react-native-firebase/database";
let itemsRef = database().ref('/Users');

const LoginScreen = ({ navigation }) => {

  console.log(navigation.navigate)


  
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const [itemsArray, setItemsArray] = React.useState([]);
  React.useEffect(() => {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);
  const passwordInputRef = createRef();
  const handleSubmitPress = async () => {

    if (itemsArray.length > 0) {

      itemsArray.map(item => {
        if (item.email === userEmail && item.password === userPassword) {
          AsyncStorage.setItem("userData", JSON.stringify(item));
          navigation.navigate('BottomTab')
        }
      })
     }
    else {
      console.log('could not found')
    }

  }

  return (
    <SafeAreaView style={styles.mainBody}>

      <Image style={styles.avatar}
        source={require("../../Image/applogo.png")} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>

            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email"
                placeholderTextColor="#141414"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password"
                placeholderTextColor="#141414"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>
                {" "}
                {errortext}{" "}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}

            >
              <Text style={styles.buttonTextStyle}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() =>
                navigation.navigate("ForgotPassword")
              }
            >
              Forgot Password ?
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "white",
        }}
      >

      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "white",
        }}
      >
      </Text>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e7f0c2",
    alignContent: "center",
  },
  
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginTop: 10
  },

  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },

  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },

  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#141414",

  },

  registerTextStyle: {
    color: "#141414",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },

  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  }
}
)