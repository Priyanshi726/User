import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from ' react-native-paper'


export default function SignupScreen({ navigation }) {


  const { progress, setprogress } = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadurl, setDownloadurl] = useState();
  const [curr, setCurr] = useState("");
  const [userData, setUserData] = useState();


    var t = new Date();
    var hours = t.getHours();
    var minutes = t.getMinutes();
    var newformat = t.getHours() >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var formatted =
    (t.toString().split(' ')[0])
    + ', ' + ('0' + t.getDate()).slice(-2)
    + '/' + ('0' + (t.getMonth() + 1)).slice(-2)
    + '/' + (t.getFullYear())
    + ' - ' + ('0' + t.getHours()).slice(-2)
    + ':' + ('0' + t.getMinutes()).slice(-2)
    + ' ' + newformat;

  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('userData')
      let val = JSON.parse(data)
      setUserData(val)
    }
    getData()
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !image || !name) {
      alert("please add all the field");
      return;
    }
    try {
    const result = await auth().createUserWithEmailAndPassword(
        email,password
      );

      firestore().collection("users").doc(result.user.uid).set({
        uid: result.user.uid,
        pic: image,
        status: "online",
      });
      setLoading(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, (fileobj) => {
      console.log(fileobj.assets[0])

  const uploadTask = storage()
        .ref()
        .child(`/uploadimages/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(snapshot);
          console.log("progess is ", progress)
          if (progress == 100) alert("Image uploaded successfully on" + formatted);
        },
        (error) => {
          alert("error uploading image", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setDownloadurl(downloadURL);
          });
        }
      );
    })
      .then(() => { createImage(downloadurl) })
  };


  const createImage = () => {
    let itemsRef = database().ref(`/Users/${userData.id}/pictures`).push();
    itemsRef.set({
      picture: downloadurl
    }
    ).then(() => console.log('images updated'));

  }
  const videoUpload = () => {
    launchImageLibrary({ mediaType: "video" }, (fileobj) => {

      const uploadTask = storage()
        .ref()
        .child(`/uploadVideos/${Date.now()}`)
        .putFile(fileobj?.assets[0]?.uri);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert("Video uploaded successfully");
        },
        (error) => {
          alert("error uploading video", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("url data", downloadURL)
            setDownloadurl(downloadURL);
          })

        }
      );
    })
      .then(() => { createUser(downloadurl) })
      .catch(err => { console.log(err) })

      .catch(err => { console.log("Error message ", err) })
  };
  const createUser = () => {
    let itemsRef = database().ref(`/Users/${userData.id}/vedios`).push();
    itemsRef.set({
      vedio: downloadurl
    }
    ).then(() => console.log('Data updated.'));
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.box2}>

          {showNext ? (
            <>
              <Button
                color="#27612d"
                mode="contained"
                onPress={() => pickImageAndUpload()}
              >
                select Images
              </Button>
            </>
          ) : (
            <Button
              color="#27612d"
              mode="contained"


              onPress={() => setShowNext(true)}
            >
              Gallery
            </Button>
          )}


          <Image
            style={{ height: "50%", width: "50%", borderWidth: 2 }}
            source={{ uri: downloadurl }}
          />
        </View>
        <Button
          color="#27612d"
          style={styles.uploadbtn}
          mode="contained"
          onPress={() => {
            videoUpload();
          }}
        >
          Upload Video
        </Button>

        <Button
          mode="contained"
          color="#27612d"
          style={styles.uploadbtn}
          onPress={() => navigation.navigate("List")}
        >
          Video List
        </Button>

        <Button
          mode="contained"
          color="#27612d"
          style={styles.uploadbtn}
          onPress={() => navigation.navigate("Images")}
        >
          Images List
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff7c6",
  },
  text: {
    fontSize: 22,
    color: "black",
  },
  uploadbtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 98,
  },

  box2: {
    // paddingHorizontal: 40,
    justifyContent: "space-evenly",
    backgroundColor: "#dff7c6",
    marginHorizontal: 98,
  },
});


