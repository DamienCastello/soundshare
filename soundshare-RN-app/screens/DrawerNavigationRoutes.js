import AboutScreen from './drawerScreens/aboutUs';
import CreateResourcesForm from './components/ResourcesForm';
import CustomSidebarMenu from './components/customSidebarMenu';
import DetailsScreen from './drawerScreens/details';
import HomeScreen from './drawerScreens/home';
import NavigationDrawerHeader from './components/navigationDrawerHeader';
import React from 'react';
import ResourcesScreen from './drawerScreens/resources';
import TracksScreen from './drawerScreens/tracks';
import {createDrawerNavigator} from '@react-navigation/drawer';

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
        name="homeScreen"
        options={{drawerLabel: 'Home Screen', headerStyle: {backgroundColor: '#647a8f'}}}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="resourcesScreen"
        options={{drawerLabel: 'Resources Screen', headerStyle: {backgroundColor: '#647a8f'}}}
        component={ResourcesScreen}
      />
      <Drawer.Screen
        name="tracksScreen"
        options={{drawerLabel: 'Tracks Screen', headerStyle: {backgroundColor: '#647a8f'}}}
        component={TracksScreen}
      />
      <Drawer.Screen
        name="aboutScreen"
        options={{drawerLabel: 'About Screen', headerStyle: {backgroundColor: '#647a8f'}}}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;