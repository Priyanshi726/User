
// Import React in our code
import React, { useState, useEffect } from "react";

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";

import storage from "@react-native-firebase/storage";

const FilesListingScreen = () => {

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listFilesAndDirectories("");
  }, []);

  const listFilesAndDirectories = (pageToken) => {
    const reference = storage().ref("uploadVideos/");

    reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {

      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(
          reference,
          result.nextPageToken
        );
      }
      setListData(result.items);
      setLoading(false);
    });
  };
    const ItemView = ({ item }) => {
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
    return (
         <View style={{ padding: 10, color: 'black' }}>
        <Text
          style={styles.item}>
             Timestamp : {item.name}
        </Text>

        <Text style={styles.formatted}>
          date : {formatted}
        </Text>

           <TouchableOpacity
          onPress={() => getItem(item.fullPath)}
          style={styles.button}>
          <Text style={{ color: "#ffff" }}>Click Here</Text>

        </TouchableOpacity>

      </View>
    );
  };
      const ItemSeparatorView = () => {
    return (

      <View
        style={{
          height: 3,
          width: 1000,
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = async (fullPath) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch((e) => {
      console.error(e);
      });
    Linking.openURL(url);
    console.log(url);
  };

  return (
    <SafeAreaView style={styles.container}>

      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={listData}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

    </SafeAreaView>
  );
};

export default FilesListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    backgroundColor: "#dff7c6",

  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: 'black'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '40%',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#53B175',
    marginLeft: 25,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
  },
  item: {
    color: 'black'
  },
  formatted: {
    color: 'black'

  }
});