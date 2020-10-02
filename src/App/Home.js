import React from 'react';
import {  View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
  createDrawerNavigator
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Text,
  TouchableRipple,
  Switch,
  Drawer
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dashboard} from '../components/Dashboard/Dashboard';


function DrawerMenu() {
  return (
    <DrawerContentScrollView >  
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>Dawid Urbaniak</Title>
          <Caption style={styles.caption}>@trensik</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Preferences"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Bookmarks"
            onPress={() => {}}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}



const Home = () => {
  const Drawers = createDrawerNavigator();
  return (
    <Drawers.Navigator 
          initialRouteName="Dashboard" 
          drawerType={'slide'} 
          drawerStyle={{ 
                        backgroundColor: '#1d346d',
                      }} 
          drawerContentOptions={{
                                  activeTintColor: '#fff',
                                  activeBackgroundColor :'#a9b9e2',
                                  inactiveTintColor :'#fff',
                                }}
          >
          
          <Drawers.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{ 
                      drawerLabel: 'Dashboard',
                                    
                    }}
            />

    </Drawers.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});