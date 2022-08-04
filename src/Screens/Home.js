import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from './Camera';
import EditProfile from './EditProfile'
import Profile from './Profile'
import Uploadfile from './Uploadfile'
import UpdateProfile from './UpdateProfile';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const stack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator >


      </Stack.Navigator>
    </NavigationContainer>
  );
}




const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer independent={true}>
      <Tab.Navigator

        screenOptions={({ route }) => ({

          tabBarIcon: ({ focused, color, size, padding }) => {

            let iconName;
            
            if (route.name === 'Profile') {
              iconName = focused ? 'users' : 'users-outline'
            }
            else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline'
            }
            else if (route.name === 'Edit Profile') {
              iconName = focused ? 'Edit Profile' : 'video-outline'
            }
            else if (route.name === 'Updloadfile') {
              iconName = focused ? 'Updloadfile' : 'Updloadfile-outline'



            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={{ paddingBottom: padding }
                } />
            );
          },


        })}


        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'grey',
          labelStyle: { fontSize: 16 },

        }}>



        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Edit Profile" component={EditProfile} />
        <Tab.Screen name="Uploadfile" component={Uploadfile} />
      </Tab.Navigator>

    </NavigationContainer>

  )
};


