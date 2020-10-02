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

        <ScrollView>
                <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image animation="fadeInUp"
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="center"
                    />

                <Animatable.View animation="fadeInUp">
                    <Text style={styles.pageTitle}>{translations['Forgot_Password']}</Text>
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
                    placeholder={translations['Phone Number']}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    name="username"
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
        }


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }}>
                <TouchableOpacity onPress={() => {}} >
                    <LinearGradient colors={['#00B2B6', '#00B2B6']} style={styles.commonAppButton} >
                        <Text style={[styles.commonAppButtonText]}>{translations['Submit']}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <LinearGradient colors={['#00B2B6', '#00B2B6']} style={styles.commonAppButton}>
                        <Text style={[styles.commonAppButtonText]}>{translations['Back']}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
        </ScrollView>
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

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    appLogo:{
        width:80,
        height:80,
    },
    pageTitle:{
        fontWeight:'bold',
        fontSize:22,
        color:'#00B2B6'
    },    
    footer: {
        flex: 1,
        backgroundColor: '#00B2B6',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 16,
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 15
    },
    commonAppButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 21,
        marginHorizontal:2,
        marginVertical:2,
    },
    commonAppButtonText: {
        color:'#fff',
        fontSize: 12,
    },
    signUp: {
        marginTop: 15,
        width:'100%',
        textAlign:"center"
    },
    textSign1: {
        fontSize: 16,
        fontWeight: 'bold',

    }
  });
