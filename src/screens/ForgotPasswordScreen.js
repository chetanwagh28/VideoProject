import React, {useContext, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet , StatusBar, Alert, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import Users from '../model/users';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { loginActions } from '../action';
import {LocalizationContext} from './Translations';
import styles from '../assets/style.js';

const ForgotPassword = ({navigation}) => {

    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // console.log("----",translations)

    const dispatch = useDispatch();

    const [data, setData] = React.useState({
        username: 'user1',
        password: 'password',
        check_input: true,
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    console.disableYellowBox = true;

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

    const loginHandle = (userName, password) => {

        // const params = {
        //               "lang": "en",
        //               "email": userName,
        //               "password": password,
        //               "device_id": DeviceInfo.getUniqueId(),
        //               "device_type": Platform.OS,
        //               "notification_id": DeviceInfo.getUniqueId(),
        //               "notification": DeviceInfo.getUniqueId(),
        //               "app_version": DeviceInfo.getVersion(),
        //               "lat": "12.33",
        //               "lng": "12.44",
        //               "requested_by": "requested_by"
        //             }
        // console.log("-------",params)
        
        // dispatch(loginActions.login(params));
        const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );


        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
    }
    
    return (

            
                <View style={styles.container}>
                        <View>
                            <Animatable.Image source={require('../assets/images/logo.png')} resizeMode="center" />
                            <Text>{translations['Forgot_Password']}</Text>
                        </View>

                        {
                        data.check_input 
                        ?
                            <React.Fragment>
                            
                                <View>
                                    <FontAwesome 
                                        name="user-o"
                                        color={colors.text}
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
                                        data.check_textInputChange 
                                        ? 

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
                                        <Text>{translations['email_validation']}</Text>
                                }
                            </React.Fragment>
                            :    
                            <React.Fragment>
                                <View>
                                    <FontAwesome 
                                        name="user-o"
                                        color={colors.text}
                                        size={20}
                                    />
                                    <TextInput 
                                        placeholder={translations['Phone Number']}
                                        placeholderTextColor="#666666"
                                        name="username"
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
                                    data.isValidUser ? null : 
                                    <Text>{translations['email_validation']}</Text>
                                }

                            </React.Fragment>
                        }

                        <View>
                            <Text onPress={() => {}}>{translations['Submit']}</Text>
                            <Text onPress={() => navigation.goBack()}>{translations['Back']}</Text>
                        </View>
                    </View>
            
    );
};

// export default ForgotPassword;

function mapStateToProps(state) { 
  const { authenticated, errorMsg, submitted, closeForm, serverDown } = state.loginReducer;
  // console.log("errorMsg",errorMsg)
  return {
        authenticated,
        errorMsg,
        submitted,
        closeForm,
        serverDown
  };    
}
export default connect(mapStateToProps)(ForgotPassword);

