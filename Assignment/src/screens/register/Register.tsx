import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { APP_CONSTANTS, LABELS } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type LoginScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'Register'>;

function Register() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isDetailValid, setIsDetailValid] = useState(false);
    const [checkNameValidation, setCheckNameValidation] = useState(false)
    const [checkEmailValidation, setCheckEmailValidation] = useState(false);
    const [checkPasswordValidation, setCheckPasswordValidation] = useState(false);

    const {SUCCESS, REGISTERATION_SUCCESSFUL, OK} = APP_CONSTANTS
    useEffect(() => {
        if (checkEmailValidation && checkPasswordValidation && checkNameValidation) {
            setIsDetailValid(email !== '' && name !== '' && password !== '')
        }
    }, [checkEmailValidation, checkPasswordValidation, checkNameValidation, name, email, password])

    const onRegisterCLick = () => {
        Alert.alert(
            SUCCESS,
            REGISTERATION_SUCCESSFUL,
            [

                { text: OK, onPress: () => navigation.pop() },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.nameText}>
                <TextInput
                    error={checkNameValidation && name === ''}
                    label="Name"
                    value={name}
                    onChangeText={text => {
                        setCheckNameValidation(true)
                        setName(text)
                    }}
                />
            </View>

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
                <Button disabled={!isDetailValid} mode="contained" onPress={onRegisterCLick}>
                    {LABELS.REGISTER}
                </Button>
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
    nameText: {
        height: 44,
        marginHorizontal: 16
    },
    emailText: {
        marginTop: 32,
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

});




export default Register;
