import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type LoginScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'Login'>;

function Login({setIsLoggedIn}:{setIsLoggedIn: (value: boolean) => void}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDetailValid, setIsDetailValid] = useState(false);
  const [checkEmailValidation, setCheckEmailValidation] = useState(false);
  const [checkPasswordValidation, setCheckPasswordValidation] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', `true`);
       setIsLoggedIn(true)
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setIsDetailValid(checkEmailValidation && checkPasswordValidation)
  }, [checkEmailValidation, checkPasswordValidation])

  return (
    <View style={styles.container}>
      <View style={styles.emailText}>
        <TextInput
          error={checkEmailValidation && email === ''}
          label="Email"
          value={email}
          onChangeText={text => {
            setCheckEmailValidation(true)
            setEmail(text)
          }}
        />
      </View>

      <View style={styles.passwordText}>
        <TextInput
          error={checkPasswordValidation && password === ''}
          label="Password"
          value={password}
          onChangeText={text => {
            setCheckPasswordValidation(true)
            setPassword(text)
          }}
        />

      </View>
      <View style={styles.buttonText}>
        <Button disabled={!isDetailValid} mode="contained" onPress={saveData}>
          LOGIN
        </Button>
      </View>
      <View style={styles.registerTextContainer}>
        <Text onPress={() => navigation.navigate('Register')} style={styles.registerText}>Register</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  emailText: {
    height: 44,
    marginHorizontal: 16
  },
  passwordText: {
    height: 44,
    marginHorizontal: 16,
    marginTop: 32
  },
  buttonText: {
    height: 44,
    marginHorizontal: 16,
    marginTop: 60
  },
  registerTextContainer: {
    marginTop: 16,
    alignItems: 'center'
  },
  registerText: { textDecorationLine: 'underline' }

});




export default Login;
