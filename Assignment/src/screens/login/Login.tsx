import React from 'react';
import { View , StyleSheet} from 'react-native';
import { TextInput,Button } from 'react-native-paper';

 function Login() {
  const [text, setText] = React.useState("");
    return(
    <View style={styles.container}>
      <View style={styles.emailText}>
        <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
      </View>
    
    <View style={styles.passwordText}>
        <TextInput
      label="Password"
      value={text}
      onChangeText={text => setText(text)}
    />
      </View>
<View style={styles.buttonText}>
       <Button  mode="contained" onPress={() => console.log('Pressed')}>
    LOGIN
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
emailText:{
height:44,
marginHorizontal:16
},
passwordText:{
  height:44,
  marginHorizontal:16,
  marginTop:32
},
buttonText:{
  height:44,
  marginHorizontal:16,
  marginTop:60
},

});




export default Login;
