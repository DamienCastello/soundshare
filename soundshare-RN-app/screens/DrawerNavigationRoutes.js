import CustomSidebarMenu from './components/customSidebarMenu';
import DetailsScreen from './drawerScreens/details';
import HomeScreen from './drawerScreens/home';
import AboutScreen from './drawerScreens/aboutUs';
import NavigationDrawerHeader from './components/navigationDrawerHeader';
import React from 'react';
import ResourcesScreen from './drawerScreens/resources';
import SettingsScreen from './drawerScreens/settings';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: true}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="Home"
        options={{drawerLabel: 'Home Screen'}}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Resources"
        options={{drawerLabel: 'Resources Screen'}}
        component={ResourcesScreen}
      />
      <Drawer.Screen
        name="Settings"
        options={{drawerLabel: 'Setting Screen'}}
        component={SettingsScreen}
      />
      <Drawer.Screen
        name="About Us"
        options={{drawerLabel: 'About Screen'}}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;