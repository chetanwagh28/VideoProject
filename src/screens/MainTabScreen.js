import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './HomeScreen';




const HomeStack = createStackNavigator();
const MainTabScreen = ({navigation}) => {

   
    return (
    <HomeStack.Navigator
            headerMode="none"
         screenOptions={{
            headerStyle: {
                backgroundColor: '#00B2B6',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                width:'100%',
                textAlign:'center',
                fontSize:15
            }
        }}>

            {/* ### Start Dashboard Navigation Bar ### */}            
            <HomeStack.Screen name="Home" component={HomeScreen} />
            {/* ### End Dashboard Navigation Bar ### */}

    </HomeStack.Navigator>
    );
}
export default MainTabScreen;