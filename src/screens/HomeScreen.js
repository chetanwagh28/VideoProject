import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView,StatusBar  } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import {LocalizationContext} from './Translations';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Communications from 'react-native-communications';
// import jwtdecode from 'jwt-decode'
import * as Animatable from 'react-native-animatable';


// class HomeScreen extends Component {
const HomeScreen = ({props, navigation}) => {

    console.disableYellowBox = true;
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);
    // const [userDetail, setUserDetail] = React.useState(null);
    // useEffect(() => {
    //     setTimeout(async() => {
    //       // setIsLoading(false);
    //       let userToken;
    //       userToken = null;
    //       try {
    //         userToken = await AsyncStorage.getItem('userToken');
    //         console.log(jwtdecode(userToken))
    //         setUserDetail(jwtdecode(userToken));
    //       } catch(e) {
    //         console.log(e);
    //       }
          
    //     }, 100);
    //   }, []);

    // const checkSOS = () => {
    //     if(userDetail !== null && userDetail.sos ){
    //         Communications.phonecall(userDetail.sos, true)
    //     }else{
    //         navigation.navigate('SOSScreen')    
    //     }
    // }

      // console.log("----",translations['home'])
      return (
        <React.Fragment>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.openDrawer()} />
            <Appbar.Content title="Title" subtitle="Subtitle" />
            <Appbar.Action icon="dots-vertical"  />
          </Appbar.Header>
        
        <View><Text>wecwe</Text></View>
        
        </React.Fragment>
       
      );
    
}

export default HomeScreen;

const styles = StyleSheet.create({
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  headerTitleText:{
    color:'#ffffff',
    fontSize:16,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection:'column',
  },
  containerView: {
    margin: 5,
    marginTop: 15,
  },
  heading:{
    fontSize:16,
    fontWeight: 'bold',
    width:'100%',
    textAlign:'center',
    color:'#000',
    textTransform:'uppercase'
  },
  categroy: {
    marginTop: 15,
    display:'flex',
    flexDirection:'column',
    textAlign:'center',
    justifyContent:'center',
  },
  categroyCard: {
    borderWidth: 0,
    marginLeft: 5,
    marginTop:5,
    marginRight: 5,
    marginBottom:5,

    backgroundColor: '#ffffff',    
    borderColor:'#00B2B6',
    shadowColor: '#00B2B6',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    
    padding:10,
    borderRadius:5,
    width:120,
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexWrap:'wrap',
    alignSelf:'center',
    alignContent:'center'



  },
  cardIcons:{
    width:80,
    height:80,
    marginBottom:5
  },
  titleView:{
    fontSize:14,
    textAlign:"center",
    color:'#000',
    flexWrap: 'wrap',

  },
  appLogo:{
    width:50,
    height:50,
    marginTop:0
  },

});
