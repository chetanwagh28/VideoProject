import React, {useContext, useState} from 'react';
import {  View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image, ScrollView  } from 'react-native';
import {ListItem} from 'native-base';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import {LocalizationContext} from './Translations';
import heart from '../assets/images/heart.png';
import {utilityHelper} from '../helper/utilityHelper'


const SplashScreen = ({navigation}) => {
    // const {translations, initializeAppLanguage} = useContext(LocalizationContext);

    const {
        translations,
        appLanguage,
        setAppLanguage,
        initializeAppLanguage,
      } = useContext(LocalizationContext); // 1
      initializeAppLanguage(); // 2

    console.disableYellowBox = true;
    const { colors } = useTheme();
    
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#00B2B6' barStyle="light-content"/>
                <View style={styles.header}>
                    <Animatable.Image animation="fadeInUp" duraton="1500"
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="center"
                    />
                </View>

                <Animatable.View  style={[styles.footer, { backgroundColor: colors.background}]} animation="fadeInUp">
                    {translations.getAvailableLanguages().map((currentLang, i) => ( 
                         <ListItem 
                            key={i} 
                            title={utilityHelper.langExists(currentLang)} 
                            bottomDivider 
                            checkmark={appLanguage === currentLang} 
                            chevron={{ color: 'black' }}
                            onPress={() => { setAppLanguage(currentLang);
                            }} 
                        />
                    ))}
                    <View style={styles.button}>
                        <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                            <LinearGradient colors={['#00B2B6', '#00B2B6']}  style={styles.commonAppButton}>
                                <Text style={styles.commonAppButtonText}>Get Started</Text>
                                <MaterialIcons name="navigate-next" color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
        </ScrollView>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#00B2B6',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      paddingVertical: 30,
      paddingHorizontal: 30
  },
  logo: {
      width: 80,
      height: 80
  },
  title: {
      color: '#00B2B6',
      fontSize: 20,
      fontWeight: 'bold',
      width:'100%',
      textAlign:'center',
      marginBottom:20
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 30
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
      color: '#fff',
      fontSize:12
  },
  pageTitle:{
    fontWeight:'bold',
    fontSize:22,
    color:'#00B2B6',
    textAlign:'center',
    marginBottom:20
    },
});

