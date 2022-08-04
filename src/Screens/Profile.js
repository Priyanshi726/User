import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Button, style, TouchableOpacity, ImageBackground } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import database from "@react-native-firebase/database";

export default function App({ navigation, props }) {

  const [itemArray, setItemArray] = useState([])
  const [userData, setUserData] = useState();

  const LogOut = () => {

    firebase.auth().signOut()
    console.log('User signed out!');
    navigation.replace('LoginScreen');

  }
  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('userData')
      let val = JSON.parse(data)
      setUserData(val)

    }
    getData()


  }, [])

  console.log('data', userData)
if (userData) {
    return (
      <>
          <View style={styles.container} >

          <View >

            <Image style={styles.avatar}
            source={{ uri: userData.image }} />

            <Text style={styles.text}>Name:{userData.name}</Text>

            <Text style={styles.text}>Email Id:{userData.email}</Text>

            <Text style={styles.text}>Phone: {userData.phone}</Text>

           <TouchableOpacity style={styles.buttonContainer}>

              <Text style={styles.update} onPress={() => navigation.navigate('EditProfile')}>Update Profile</Text>

            </TouchableOpacity>
            </View>
            </View>

      </>
    );
  }
  else {
    
    return null;
  }
}
const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#dff7c6",

  },
  text: {

    fontWeight: 'bold',
    textAlign: 'left',
    padding: 10,
    marginTop: 15,
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 7,
    color: "black"
  },

update: {
  
    color: "#ffff"
  },
  text3: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 20,
    paddingLeft: 8,
    color: "black"
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    marginLeft: 40,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "#27612d",

  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginTop: 10,

  },
})

