
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useContext, useEffect } from 'react';
import { View, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
// import jwtdecode from 'jwt-decode'
import SplashScreen from 'react-native-splash-screen'
// import Permissions from 'react-native-permissions'
import axios from 'axios'; 

import { DrawerContent } from '../screens/DrawerContent';
import MainTabScreen from '../screens/MainTabScreen';

import { AuthContext } from '../components/context';
import RootStackScreen from '../screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {LocalizationProvider, LocalizationContext} from '../screens/Translations';




const Drawer = createDrawerNavigator();

const App = () => {

  console.disableYellowBox = true;
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authReducers = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(authReducers, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(userInfo) => {
      // let data = jwtdecode(userInfo.token)
      setUserToken(userInfo);
      setIsLoading(false);
      
      try {
        await AsyncStorage.setItem('userToken', userInfo.token);
        // await AsyncStorage.setItem('userDetail', JSON.stringify(data));

      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', token: userInfo.token});
    },
    signOut: async() => {
      setUserToken(null);
      setIsLoading(false);
      try {
        await AsyncStorage.clear();
        console.log("logout")        
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
      
    },
    signUp: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  
  useEffect(() => {
      SplashScreen.hide();
      
      checkState();
      requestLocationPermission(); // function call
    

      return () => {
          setIsLoading(false);
        }
  }, []);

  
  
  const checkState = async () => {
    var userToken = null;
    var userDetail = null;
      
      try {

        userToken = await AsyncStorage.getItem('userToken');
        userDetail = await AsyncStorage.getItem('userDetail');
        
        if(userDetail){
          // console.log('===')
          axios.defaults.headers.common['Authorization'] = userToken;
        }
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
  }
  
  //Location permission
  const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) 
        {
          // WHAT TODO WHEN PERMISSION IS GRANTED
        } else {
          // WHAT TODO WHEN PERMISSION IS NOT GRANTED
          this.requestLocationPermission(); 
      }
    } catch (err) {
      // log(err);
    }
  }

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  console.log('user loginState: ', loginState);
 
  return (
    <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <LocalizationProvider>
              <NavigationContainer theme={theme}>
              { (loginState.userToken !== null) ? 
                  (  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                      <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
                    </Drawer.Navigator>
                  )
                 
              :
                <RootStackScreen/>
              }
              </NavigationContainer>
          </LocalizationProvider>  
        </AuthContext.Provider>
      
    </PaperProvider>
  );
}

export default App;