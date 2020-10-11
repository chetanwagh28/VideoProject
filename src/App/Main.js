import * as React from 'react';
import { Alert, AsyncStorage, View, Button, ScrollView, StyleSheet, Platform, Linking } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { configConstants } from '../constant';

import VersionNumber from 'react-native-version-number';


import {SplashScreen} from '../components/SplashScreen';

//AFTER LOGIN 

import Home from './Home';


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      route: "Home",
      auth: false,
      show: false
    };
    console.disableYellowBox = true;
  }

  async componentWillMount(){

    fetch(configConstants.API_BASE_PATH + "welcome/get_version")
      .then(res => res.json())
      .then(
        (result) => {
          if(result.data !== null){
          console.log("result",result)
            if(Platform.OS === "ios"){
              // console.log("result.data.ios_version",result.data.ios_version)
              if(parseFloat(result.data.ios_version) > parseFloat(VersionNumber.appVersion)){
                // ios_url
                Alert.alert(
                  "Update",
                  "There is a newer version of this app available",
                  [
                    {
                      text: "Later",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Update", onPress: () => Linking.openURL(result.data.ios_url) }
                  ],
                  {cancelable: false},
                );
              }
            }else if(Platform.OS === "android"){
              if(parseFloat(result.data.andriod_version) > parseFloat(VersionNumber.appVersion)){
                // andriod_url
                console.log("and")
                Alert.alert(
                  "Update",
                  "There is a newer version of this app available",
                  [
                    {
                      text: "Later",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Update", onPress: () => Linking.openURL(result.data.andriod_url) }
                  ],
                  {cancelable: false},
                );
              }
            }
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    await AsyncStorage.getItem(configConstants.AUTHENTICATE, (err, result) => {
        if(result !== null){
          var res = JSON.parse(result);
          this.setState({auth: res, route: 'Home', isLoading: false})
        }else{
          this.setState({isLoading: false})
        }
    });
  }
  

  render() {
    const Stack = createStackNavigator();
    
    return (
     
         
            
            this.state.isLoading ? (<SplashScreen />) :
                <Stack.Navigator headerMode="none" initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home}/>   
                 
                </Stack.Navigator>
            
          
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});
export default Main;
