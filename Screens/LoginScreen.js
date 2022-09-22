import React from 'react'
import {useState} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import Home from './HomeScreen'

const LoginScreen = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const navigation = useNavigation();
    
    const handleSignUp=()=>{
        createUserWithEmailAndPassword(auth, email, password).then(userCredentials=>{
        const user = userCredentials.user;
        console.log(user.email);
      }).catch(error=> alert(error.message)) 
    } 

    const handleSignIn = () =>{
        signInWithEmailAndPassword(auth, email, password).then(userCredentials=>{
            const user = userCredentials.user;
            navigation.navigate("Home")
            console.log('User is:', user.email);
          }).catch(error=> alert(error.message)) 
    }

    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput placeholder="Email" value={email} onChangeText ={text=>setEmail(text)} style={styles.input}/>
                <TextInput placeholder="Password" value={password} onChangeText ={text=>setPassword(text)} style={styles.input} secureTextEntry/>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignIn} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'60%',
    },
    input:{
        backgroundColor:'lightgray',
        paddingHorizontal:15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        
    },
    buttonContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:40,
    },
    button:{
        backgroundColor:'lightblue',
        width:'40%',
        padding:15,
        borderRadius:10, 
        alignItems:'center',
    },
    buttonText:{
        color: 'white',
        fontWeight:'700',
        fontSize:16,
    },
    buttonOutline:{
        backgroundColor:'lightblue',
        marginTop: 5,
        borderColor: 'skyblue',
        borderWidth: 2,
    },
    buttonOutlineText:{
        color: 'white',
        fontWeight:'700',
        fontSize:16, 
    }

})