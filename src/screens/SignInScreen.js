import React, {useContext, useState, useEffect} from 'react';
import { View, Text,  TouchableOpacity,  TextInput, ScrollView,SafeAreaView } from 'react-native';
import { useTheme, DarkTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import { useDispatch } from 'react-redux'
import {LocalizationContext} from './Translations';


import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../assets/style.js';
import Geolocation from "@react-native-community/geolocation";



import { Animated } from 'react-native';
import { Neomorph,Shadow } from 'react-native-neomorph-shadows';

const AnimatedNeomorph = Animated.createAnimatedComponent(Neomorph);



const SignInScreen = ({navigation}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    const dispatch = useDispatch();

    const [data, setData] = React.useState({
        username: 'chetan123@gmail.com',
        password: '123123',
        check_input: true,
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        submit: false
    });
    console.disableYellowBox = true;

    const [error, setError] = useState("");
    const [position, setPosition] = React.useState({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
          pos => {
            setError("");
            setPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            });
          },
          e => setError(e.message)
        );
        return () => Geolocation.clearWatch(watchId);
    }, []);


    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password, position) => {

        let user = {
            token: "cshjbvjsnkvsdvsh87ysv8dhveiyv8weivwiev",
            name: "User"
        }
        signIn(user) 
    }

    const changeType = (type) => {
        setData({
                ...data,
                check_input: !type
            })
    }


    const NeuMorph = ({children,size,style}) => {
        return(
            
                
                    <View 
                            style={[ styles.inner, styles.bottomShadow,styles.topShadow ,{ width:size || 150, height:size|| 50, borderRadius: size/2 || 40 /2}]}>
                            {children}
                    </View>
                
            
        )
    }
    
    return (
        
            <View style={styles.container}>
                <SafeAreaView style={{alignSelf:"stretch"}}>

                    <View style={styles.contentInRow}>
                        <Text>{translations['Login']}</Text>
                    </View>

                    <View style={styles.contentInColumnCenter}>

                            {
                                data.check_input ?
                                <React.Fragment>
                                
                                    <View>

                                    <Neomorph
                                        inner 
                                        style={[styles.appNeoMorpInputBox,styles.contentInRow]}
                                    >
                                                <FontAwesome 
                                                    name="user-o"
                                                    color="grey"
                                                    size={20}
                                                />
                                                <TextInput 
                                                    placeholder={translations['Email']}
                                                    placeholderTextColor="#666666"
                                                    name="email"
                                                    autoCapitalize="none"
                                                    onChangeText={(val) => textInputChange(val)}
                                                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                                                />
                                                {
                                                data.check_textInputChange ? 
                                                    <Feather 
                                                        name="check-circle"
                                                        color="green"
                                                        size={20}
                                                    />
                                                
                                                : null
                                                }

                                        </Neomorph>

                                    </View>

                                    { 
                                        data.isValidUser ? null : 
                                        <Text>{translations['email_validation']}</Text>
                                    }

                                </React.Fragment>

                                :   

                                <React.Fragment>
                                
                                    <View>


                                            <FontAwesome 
                                                name="user-o"
                                                color="grey"
                                                size={20}
                                            />
                                            <TextInput 
                                                placeholder={translations['Phone_Number']}
                                                placeholderTextColor="#666666"
                                                name="phone"
                                                autoCapitalize="none"
                                                onChangeText={(val) => textInputChange(val)}
                                                onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                                            />
                                            {
                                            data.check_textInputChange ? 
                                                <Feather 
                                                    name="check-circle"
                                                    color="green"
                                                    size={20}
                                                />
                                            : 
                                            null
                                            }

                                        
                                    </View>

                                    { 
                                        data.isValidUser ? 
                                        null 
                                        : 
                                        <Text>{translations['phone_validation']}</Text>
                                    }
                                </React.Fragment>
                            }

                            {/* Password Text box start */}
                            <View>

                                <Neomorph
                                    inner 
                                    style={[styles.appNeoMorpInputBox,styles.contentInRow]}
                                >
                                        <Feather 
                                            name="lock"
                                            color="grey"
                                            size={20}
                                        />

                                        <TextInput 
                                            placeholder={translations['Password']}
                                            placeholderTextColor="#666666"
                                            secureTextEntry={data.secureTextEntry ? true : false}
                                            autoCapitalize="none"
                                            onChangeText={(val) => handlePasswordChange(val)}
                                        />

                                        <TouchableOpacity
                                            onPress={updateSecureTextEntry}
                                        >
                                        {

                                        data.secureTextEntry ? 

                                        <Feather 
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />

                                        :

                                        <Feather 
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />

                                        }
                                        </TouchableOpacity>
                                </Neomorph>
                                        
                            </View>
                            
                            { 
                                data.isValidPassword ? 
                                null 
                                : 
                                <Text>{translations['password_validation']}</Text>
                            }

                    </View>
                    
                    <View style={styles.contentInRow}>
                        <Text onPress={() => navigation.navigate('ForgotPassword')}>{translations['Forgot_Password']}</Text>
                    </View>
                    
                    <View>
                        <Text onPress={() => changeType(data.check_input)} >  { !data.check_input ? translations['Email'] : translations['OTP'] } </Text>
                    </View>

                    <View style={styles.contentInRow}>
                        <View>
                            <Neomorph
                                style={styles.appNeoMorpButtom}
                            >
                                <Text onPress={() => {loginHandle( data.username, data.password, position )}} >{ translations['Login'] }</Text>
                            </Neomorph>
                        </View>

                        <View>
                            <Neomorph
                                style={styles.appNeoMorpButtom}
                            >
                                <Text onPress={() => navigation.navigate('SignUpScreen')}>{ translations['Sign_Up'] }</Text>
                            </Neomorph>
                        </View>
                    </View>

                </SafeAreaView>
            
            </View>
                
        
    );
};

export default SignInScreen;
