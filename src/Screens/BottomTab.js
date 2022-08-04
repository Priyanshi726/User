import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import EditProfile from './EditProfile'
import Profile from './Profile'
import Uploadfile from './Uploadfile'
import ForgotPassword from './ForgotPassword';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = () => {
    return (

        <NavigationContainer independent={true}>
            <Stack.Navigator >
                <Stack.Screen name='EditProfile' component={EditProfile}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name='ForgotPassword' component={ForgotPassword}
                    options={{
                        headerShown: false,
                    }}
                />
        </Stack.Navigator>
        </NavigationContainer>
        )}
    const Tabnavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'green',
            tabBarStyle: { position: 'absolute' },
            }} >
            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarIcon: () => (
                    <Image source={require("./../../Image/profile.png")} style={{ width: 20, height: 20 }} />
                )
            }}/>
            <Tab.Screen name='EditProfile' component={HomeStack} options={{
                tabBarIcon: () => (
                    <Image source={require("./../../Image/edit.png")} style={{ width: 25, height: 22 }} />

                )
            }} />
               <Tab.Screen name='ForgotPassword' component={ForgotPassword} options={{
                tabBarIcon: () => (
                    <Image source={require("./../../Image/forgot.png")} style={{ width: 25, height: 22 }} />

                )
            }} />

            <Tab.Screen name='UploadFile' component={Uploadfile}
                options={{
                    tabBarIcon: () => (
                        <Image source={require("./../../Image/file.png")} style={{ width: 20, height: 20 }} />
                    )
                }} />
                  </Tab.Navigator>
    );
};
export default Tabnavigator;



