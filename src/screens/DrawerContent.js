import React, {useContext, useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Avatar, Title, Caption,  Paragraph, Drawer, Text, Switch } from 'react-native-paper';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../components/context';
import {LocalizationContext} from './Translations';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';



export const  DrawerContent = ({props, navigation}) => {
    const [userDetail, setUserDetail] = React.useState(null);
    console.disableYellowBox = true;
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);
    const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    // console.log('user Detail: ', userDetail);
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View>
                        <View>
                            <View>
                                <Ionicons.Button  onPress={() => navigation.closeDrawer()} name="ios-arrow-back"/>
                            </View>
                        </View>

                        <View>
                            <Avatar.Image  source={{ uri: 'https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png' }}  size={50} />
                        </View>

                        <View>
                            <Text>Chetan Wagh</Text>
                        </View>
                    </View>

                    <Drawer.Section>
                        <DrawerItem  icon={({size}) => ( <Icon  name="file"  size={size} /> )} label={translations["Language"]}  />
                        <DrawerItem  icon={({size}) => ( <Icon  name="power-standby" size={size} /> )} label={translations['logout']} onPress={() => {signOut()}} />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section>
                <DrawerItem  label={translations["ABOUT_APPLICATION"]} />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },

  });