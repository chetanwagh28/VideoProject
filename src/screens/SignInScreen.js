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
        phone: '',
        otp: '',
        check_input: true,
        check_textInputChange: false,
        showOTP: false,
        isValidphone: true,
        isValidotp: true,
        showProfile: false,
        name: '',
        email: '',
        isValidname: true,
        isValidemail: true,
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


    const sendOtp = (phone) => {
        if(phone.length < 9){
             setData({
                ...data,
                isValidphone: false
            });   
        }else{
            setData({
                ...data,
                isValidphone: true,
                showOTP: true
            })    
        }
        
    }

    const verifyOtp = (otp) => {
        if(otp === "1234"){
            // let user = {
            //     token: "cshjbvjsnkvsdvsh87ysv8dhveiyv8weivwiev",
            //     name: "user"
            // }
            // signIn(user)     
            setData({
                ...data,
                isValidotp: true,
                showProfile: true
            }) 
        }else{
            // console.log("mobile")
            setData({
                ...data,
                isValidotp: false
            })    
        }
    }

    const submit = (name, email) => {
        if(name !== "" && email !== ""){
            let user = {
                token: "cshjbvjsnkvsdvsh87ysv8dhveiyv8weivwiev",
                name: "user"
            }
            signIn(user)     
        }else if(name === ""){
            setData({
                ...data,
                isValidname: false
            })    
        }else if(email === ""){
            setData({
                ...data,
                isValidemail: false
            })    
        }
    }



    const NeuMorph = ({children,size,style}) => {
        return(
            <View 
                style={[ styles.inner, styles.bottomShadow,styles.topShadow ,{ width:size || 150, height:size|| 50, borderRadius: size/2 || 40 /2}]}>
                    {children}
            </View>
        )
    }
    
    console.log(data)
    return (
        
            <View style={styles.container}>
                <SafeAreaView style={{alignSelf:"stretch"}}>

                    <View style={styles.contentInRow}>
                        <Text>{translations['Login']}/{translations['Sign_Up']}</Text>
                    </View>

                    {!data.showProfile ?
                      <React.Fragment>
                        <View style={styles.contentInColumnCenter}>
                            <View>

                                <Neomorph
                                    inner 
                                    style={[styles.appNeoMorpInputBox,styles.contentInRow]}
                                >
                                        <TextInput 
                                            placeholder="Enter Mobile Number"
                                            placeholderTextColor="#666666"
                                            name="phone"
                                            autoCapitalize="none"
                                            onChangeText={(phone) => setData({...data,phone})}
                                        />

                                </Neomorph>

                            </View>

                            { 
                                data.isValidphone ? 
                                null 
                                : 
                                <Text>Enter Valid Mobile Number</Text>
                            }   
                        </View>
                        {!data.showOTP &&
                            <View style={styles.contentInRow}>
                                <View>
                                    <Neomorph
                                        style={styles.appNeoMorpButtom}
                                    >
                                        <Text onPress={() => {sendOtp( data.phone )}} >Send OTP</Text>
                                    </Neomorph>
                                </View>

                            </View>
                        }
              
                        {data.showOTP &&
                            <React.Fragment>
                                <View style={styles.contentInColumnCenter}>
                                {/* OTP Text box start */}
                                    <View>

                                        <Neomorph
                                            inner 
                                            style={[styles.appNeoMorpInputBox,styles.contentInRow]}
                                        >
                                                <TextInput 
                                                    placeholder={translations['mobile_otp']}
                                                    placeholderTextColor="#666666"
                                                    name="otp"
                                                    autoCapitalize="none"
                                                    onChangeText={(otp) => setData({...data,otp})}
                                                />

                                        </Neomorph>
                                                
                                    </View>
                                    
                                    { 
                                        data.isValidotp ? 
                                        null 
                                        : 
                                        <Text>Enter Valid OTP</Text>
                                    } 
                                </View>
                                <View style={styles.contentInRow}>
                                    <View>
                                        <Neomorph
                                            style={styles.appNeoMorpButtom}
                                        >
                                            <Text onPress={() => {verifyOtp( data.otp )}} >Confirm</Text>
                                        </Neomorph>
                                    </View>

                                </View>
                            </React.Fragment>
                        }
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <View style={styles.contentInColumnCenter}>
                            <View>

                                <Neomorph
                                    inner 
                                    style={[styles.appNeoMorpInputBox,styles.contentInRow]}
                                >
                                        <TextInput 
                                            placeholder="Name"
                                            placeholderTextColor="#666666"
                                            name="name"
                                            autoCapitalize="none"
                                            onChangeText={(name) => setData({...data,name})}
                                        />

                                </Neomorph>
                                        
                            </View>
                            
                            { 
                                data.isValidname ? 
                                null 
                                : 
                                <Text>Enter Name</Text>
                            } 
                        </View>

                        <View style={styles.contentInColumnCenter}>
                            <View>

                                <Neomorph
                                    inner 
                                    style={[styles.appNeoMorpInputBox,styles.contentInRow]}
                                >
                                        <TextInput 
                                            placeholder="Email"
                                            placeholderTextColor="#666666"
                                            name="email"
                                            autoCapitalize="none"
                                            onChangeText={(email) => setData({...data,email})}
                                        />

                                </Neomorph>
                                        
                            </View>
                            
                            { 
                                data.isValidemail ? 
                                null 
                                : 
                                <Text>Enter Valid Email</Text>
                            } 
                        </View>
                        <View style={styles.contentInRow}>
                            <View>
                                <Neomorph
                                    style={styles.appNeoMorpButtom}
                                >
                                    <Text onPress={() => {submit( data.name, data.email )}} >Submit</Text>
                                </Neomorph>
                            </View>

                        </View>
                      </React.Fragment>
                    }
                    

                    

                </SafeAreaView>
            
            </View>
                
        
    );
};

export default SignInScreen;
