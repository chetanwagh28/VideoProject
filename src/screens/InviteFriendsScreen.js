import React, { useContext } from 'react';
import { View, Text, Share, StyleSheet, FlatList,  Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Title, Left, Body, Tabs , Tab ,Right} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocalizationContext} from './Translations';
import { Avatar } from 'react-native-paper';

import shareImage from '../assets/images/share.png';

const InviteFriends = ({navigation}) => {
    const {translations} = useContext(LocalizationContext);

    const onShare = async () => {
    try {
      const result = await Share.share({
       title: 'App link',
          message: 'Please install this app and stay safe ', 
          url: ''
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              alert(error.message);
            }
          };

    
        const { goBack } = navigation;
      return (
        <Container>
          <Header style={styles.appHeader}>
            <Left style={{ flex:1,flexDirection:'row', justifyContent:'flex-start'}}>
               <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#00B2B6" onPress={() => goBack()}></Icon.Button>
            </Left>
            <Body style={{ flex:1,flexDirection:'row', justifyContent:'center'}}>
              <Title style={styles.logoText}>{translations['Invite_Friends']}</Title>
            </Body>
            <Right style={{ flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              
            </Right>            
          </Header>
          <Content style={styles.container}>

            <View style={styles.imageContainer}>
              <Image  source={shareImage} style={styles.profile_image}/>
              <Button onPress={onShare} title={translations['Share']} />
            </View>

          </Content>
        </Container>
      );
 
}

export default InviteFriends;

const styles = StyleSheet.create({
  imageContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  headerLogoContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  appHeader:{
    backgroundColor:'#00B2B6',
  },
  logoText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  searchHead: {
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 0,
    marginLeft: 10,
    marginTop:10,
    marginRight: 10,
    marginBottom:10,
    backgroundColor: '#ffffff',    
    borderColor:'#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    textAlign:'center',
    padding:5,
    borderRadius:10
  },
  categroyCard: {
    borderWidth: 0,
    marginLeft: 10,
    marginTop:10,
    marginRight: 10,
    marginBottom:10,
    height:'auto',
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
    textAlign:'center',
    padding:15,
    borderRadius:10
  },
  buttonS:{
    margin: 5,
    backgroundColor:'#00B2B6',
  },
  titleHeading:{
    width:'100%',
    textAlign:'center',
    fontWeight:'400',
    fontSize:20,
    marginTop:10
  },
  titleHeadingSubHeading:{
    width:'100%',
    textAlign:'center'
  },
  titleHeadingDescription:{
    width:'100%',
    textAlign:'center'
  },
  profile_image:{
    width:280,
    height:280,
    
  }
});
