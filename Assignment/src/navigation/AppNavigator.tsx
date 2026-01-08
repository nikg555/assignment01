import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Home from '../screens/home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); 

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        const value = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(value === 'true');
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen name="Home">
                        {props => (
                            <Home {...props} setIsLoggedIn={setIsLoggedIn} />
                        )}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name="Login">
                            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
