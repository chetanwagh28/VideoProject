import React, {useContext, useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, TextInput, Platform, StyleSheet, ScrollView, StatusBar, Image, Alert } from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {LocalizationContext} from './Translations';
import { useTheme } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { loginActions } from '../action';
import Geolocation from "@react-native-community/geolocation";
import styles from '../assets/style.js';


const SignUpScreen = ({navigation}) => {

	const { colors } = useTheme();
	const {translations, initializeAppLanguage} = useContext(LocalizationContext);
	const dispatch = useDispatch();

	const [data, setData] = React.useState({
		name: '',
		email: '',
		contact_no: '',
		password: '',
		confirm_password: ''
	});
	const [check, setCheck] = React.useState({
		// errors:{},
		check_textInputChange: false,
		secureTextEntry: false,
		confirm_secureTextEntry: false,
		submit: false
	})

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


	const handlePasswordChange = (val) => {
		setData({
			...data,
			password: val
		});
	}

	const handleConfirmPasswordChange = (val) => {
		setData({
			...data,
			confirm_password: val
		});
	}

	const updateSecureTextEntry = () => {
		setCheck({
			...check,
			secureTextEntry: !check.secureTextEntry
		});
	}

	const updateConfirmSecureTextEntry = () => {
		setCheck({
			...check,
			confirm_secureTextEntry: !check.confirm_secureTextEntry
		});
	}

	const checkEmpty = (dataToCheck) => {
		let stopApicall = false
		let errors = {}
		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length === 0){
					// errors[key] = "Field can't be blank"
					stopApicall = true
					setCheck({
						...check,
						errors: {
							...errors,
							[key] : "Field can't be blank"
						}
					});
				}
				else{
					errors[key] = ""
				}
			}

		return stopApicall
	}

	const signUpHandle = (data, position) => {
		// console.log("data",!checkEmpty(data))

		if(!checkEmpty(data)){
			setCheck({
				...check,
				submit: true
			});
		
			// CM to inch and feet
			// converter.inch.value = document.converter.cm.value / 2.54
			// converter.feet.value = document.converter.cm.value / 30.48


			const params = {
					  "lang":"en",
					  "name":data.name,
					  "country_code":"+91",
					  "contact_no":data.contact_no,
					  "email":data.email,
					  "password":data.password,
					  "device_id": DeviceInfo.getUniqueId(),
                      "device_type": Platform.OS,
                      "notification_id": DeviceInfo.getUniqueId(),
                      "notification": DeviceInfo.getUniqueId(),
                      "app_version": DeviceInfo.getVersion(),
                      "lat": position.latitude,
                      "lng": position.longitude,
                      "requested_by": "requested_by",
					}
	        // console.log("-------",params)
	        
	        dispatch(loginActions.registration(params))
		}else {
			Alert.alert('All fields required!', '', [
	            {text: 'Okay'}
	        ]);
		}
    }

    const user = useSelector(state => ({ ...state.loginReducer}), shallowEqual)
    if(user.successMsg && check.submit){
        Alert.alert('Successfully Registration!', '', [
            {text: 'Okay'}
        ]);
        navigation.goBack();
    }else if(user.errorMsg && check.submit){
    	// console.log('error--',)
    	Alert.alert(user.errorMsg.data, '', [
            {text: 'Okay'}
        ]);
        setCheck({
			...check,
			submit: false
		});
    }
	// console.log('data', check)
	return (
			
				<View style={styles.container}>

				<View>
					<Animatable.Image source={require('../assets/images/logo.png')} resizeMode="center" />
					<Text>{translations['Sign_Up']}</Text>
				</View>

				<View>
					<Text style={styles.textStar}>*</Text>
					<TextInput
						placeholder={translations['Name']}
						autoCapitalize="none"
						onChangeText={(name) => setData({...data, name})}
					/>
					{
					data.name ?
					<Feather
					name="check-circle"
					color="green"
					size={20}
					/>
					: 
					null
					}
				</View>

				<View>
					<Text style={styles.textStar}>*</Text>
					<TextInput
						placeholder={translations['Email']}
						autoCapitalize="none"
						keyboardType="email-address"
						onChangeText={(email) => setData({...data,email})}
					/>
					{
					data.email ?
					<Feather
					name="check-circle"
					color="green"
					size={20}
					/>

					: null
					}
				</View>

				<View>
					<Text style={styles.textStar}>*</Text>
					<TextInput
						placeholder={translations['Phone Number']}
						autoCapitalize="none"
						keyboardType="phone-pad"
						onChangeText={(contact_no) => setData({...data,contact_no})}
					/>
					{
						data.contact_no ?
						<Feather
						name="check-circle"
						color="green"
						size={20}
						/>
						
						: 
						null
					}
				</View>

				<View>
					<Text style={styles.textStar}>*</Text>
					<TextInput
						placeholder={translations['Password']}
						secureTextEntry={!check.secureTextEntry}
						autoCapitalize="none"
						onChangeText={(val) => handlePasswordChange(val)}
					/>
					<TouchableOpacity onPress={updateSecureTextEntry}>
						{
						!check.secureTextEntry ?
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

				<View>
					<Text style={styles.textStar}>*</Text>
					<TextInput
						placeholder={translations['Confirm Password']}
						secureTextEntry={!check.confirm_secureTextEntry}
						autoCapitalize="none"
						onChangeText={(val) => handleConfirmPasswordChange(val)}
					/>

					<TouchableOpacity onPress={updateConfirmSecureTextEntry}>
						{!check.confirm_secureTextEntry ?
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

				<View>
					<Text onPress={() => {signUpHandle(data, position)}}>{translations['Sign_Up']}</Text>
					<Text onPress={() => navigation.goBack()}>{translations['Back']}</Text>
				</View>

			</View>
			
	);
};

export default SignUpScreen;
