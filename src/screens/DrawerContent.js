import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../components/context';
import {LocalizationContext} from './Translations';
// import jwtdecode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';



export const  DrawerContent = ({props, navigation}) => {
    const [userDetail, setUserDetail] = React.useState(null);
    // useEffect(() => {
    //     setTimeout(async() => {
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

    console.disableYellowBox = true;
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    // console.log('user Detail: ', userDetail);
    return(
        <View style={{flex:1, backgroundColor: '#00B2B6'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons.Button color={'#ffffff'} onPress={() => navigation.closeDrawer()} backgroundColor="#00B2B6" name="ios-arrow-back"/>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Avatar.Image  source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }}  size={50} />
                            <Entypo.Button color={'#ffffff'} backgroundColor="#00B2B6" name="edit"/>
                        </View>

                        <View>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                Chetan Wagh
                            </Paragraph>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                       
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="file"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations["Language"]}
                            labelStyle={{color: '#ffffff'}}
                            
                        />
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="power-standby"  
                                color={'#ffffff'}
                                size={size}
                                />
                            )}
                            label={translations['logout']}
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {signOut()}}
                        />
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    label={translations["ABOUT_APPLICATION"]}
                    labelStyle={{color: '#ffffff'}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color: '#ffffff'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      textAlign:'center',
      width:'100%',
      marginTop:5    
    },
    row: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      color: '#ffffff',
      textAlign:'center',
      width:'100%'
    },
    drawerSection: {
      marginTop: 5,
    },
    bottomDrawerSection: {
        borderTopColor: '#00CBCC',
        borderTopWidth: 2
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    pickerContainer: {
        
    }
  });