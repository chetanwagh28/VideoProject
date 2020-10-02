import React, {useContext, useState, useEffect} from 'react';
import { View, Text,  TouchableOpacity,  TextInput, Platform , StatusBar, Alert, Image , ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import Users from '../model/users';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions } from '../action';
import {LocalizationContext} from './Translations';
import styles from '../assets/style.js';
import Geolocation from "@react-native-community/geolocation";


const SignInScreen = ({navigation}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // console.log("----",translations)

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
        // setData({
        //     ...data,
        //     submit: true
        // });
        // const params = {
        //               "lang": "en",
        //               "email": userName,
        //               "password": password,
        //               "device_id": DeviceInfo.getUniqueId(),
        //               "device_type": Platform.OS,
        //               "notification_id": DeviceInfo.getUniqueId(),
        //               "notification": DeviceInfo.getUniqueId(),
        //               "app_version": DeviceInfo.getVersion(),
        //               "lat": position.latitude,
        //               "lng": position.longitude,
        //               "requested_by": "requested_by"
        //             }
        // // console.log("-------",params)
        
        // dispatch(loginActions.login(params))
        let user = {
            token: "cshjbvjsnkvsdvsh87ysv8dhveiyv8weivwiev",
            name: "User"
        }
        signIn(user) 
    }

    // const user = useSelector(state => ({ ...state.loginReducer}), shallowEqual)
    // if(user.authenticated && data.submit){
    //     // console.log(user)
    //     signIn(user.userInfo) 
    // }else if(user.errorMsg && data.submit){
    //     // console.log(user)
    //     Alert.alert(user.errorMsg, '', [
    //         {text: 'Okay'}
    //     ]);
    //     setData({
    //         ...data,
    //         submit: false
    //     });
    // }
    

    const changeType = (type) => {
        setData({
                ...data,
                check_input: !type
            })
    }
    // console.log("-------",DeviceInfo.getUniqueId())
    // // console.log("-Token------",DeviceInfo.deviceToken())
    // console.log("-------",DeviceInfo.getVersion())
    // console.log("-------",Platform.OS)
    return (
      <ScrollView  style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image animation="fadeInUp"
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="center"
                    />

                <Animatable.View animation="fadeInUp">
                    <Text style={styles.pageTitle}>{translations['Login']}</Text>
                </Animatable.View> 
            </View>

            <Animatable.View 
            animation="fadeInUp"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
        {data.check_input ?
            <React.Fragment>
            
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder={translations['Email']}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    name="email"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{translations['email_validation']}</Text>
            </Animatable.View>
            }
            </React.Fragment>
        :    
            <React.Fragment>
            
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder={translations['Phone_Number']}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    name="phone"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{translations['phone_validation']}</Text>
            </Animatable.View>
            }
            </React.Fragment>
        }

            
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder={translations['Password']}
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
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
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{translations['password_validation']}</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={{color: '#00B2B6', marginTop:15}}>{translations['Forgot_Password']}</Text>
            </TouchableOpacity>

            <Text style={styles.signUp}>{translations['Login_with']} 
                <Text style={[styles.textSign1, {
                    color: '#000'
                }]}
                 onPress={() => changeType(data.check_input)}
                > {!data.check_input ? translations['Email'] : translations['OTP']} </Text>
            </Text>

            <View style={styles.button}>
                <TouchableOpacity onPress={() => {loginHandle( data.username, data.password, position )}} >
                    <LinearGradient  colors={['#00B2B6', '#00B2B6']} style={styles.commonAppButton} >
                        <Text style={[styles.commonAppButtonText]}>{translations['Login']}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Text style={styles.signUp}>{translations['Create_New_Account']}
                    <Text style={[styles.textSign1, {
                        color: '#000'
                    }]}
                     onPress={() => navigation.navigate('SignUpScreen')}
                    > {translations['Sign_Up']}</Text>
            </Text>

        </Animatable.View>
      </ScrollView >
    );
};

export default SignInScreen;
