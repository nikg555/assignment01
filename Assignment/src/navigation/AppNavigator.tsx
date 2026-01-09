import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Home from '../screens/home/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_CONSTANTS, ROUTES} from '../utils/constants';
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
        const value = await AsyncStorage.getItem(APP_CONSTANTS.IS_USER_LOGGED_IN);
        setIsLoggedIn(value === 'true');
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen name={ROUTES.Home}>
                        {props => (
                            <Home {...props} setIsLoggedIn={setIsLoggedIn} />
                        )}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name={ROUTES.Login}>
                            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                        <Stack.Screen name={ROUTES.Register} component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
