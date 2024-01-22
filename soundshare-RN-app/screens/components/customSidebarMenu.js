import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import React from 'react';
import { useContextStore } from '../../store/useContext';

const CustomSidebarMenu = (props) => {
const isModalOpen = useContextStore((state) => state.isModalOpen)
const setIsModalOpen = useContextStore((state) => state.setIsModalOpen);


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#307ecc'}}>
            {'Soundshare'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>
          Soundshare
        </Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem 
            onPress={() => {
              console.log("check before : ", isModalOpen);
              setIsModalOpen(isModalOpen); // Utilisez la valeur actuelle pour inverser
              console.log("check after : ", isModalOpen);

            }}
            label={() => 
              <Text style={{color: 'black'}}>
                Partager
              </Text>
            }
        />
        <DrawerItem
          label={() => 
            <Text style={{color: 'black'}}>
              Logout
            </Text>
          }
          onPress={() => {
            // TODO: delete this code when Alert is fixed 
            // TODO: clear zustand user token
            props.navigation.toggleDrawer();
            props.navigation.navigate('Auth');
            
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    // TODO: clear zustand user token
                    props.navigation.toggleDrawer();
                    props.navigation.navigate('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
            //props.navigation.toggleDrawer();

          }}
        />
      </DrawerContentScrollView>
    </View>
    </SafeAreaView>
  );
}

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#647a8f',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#647a8f',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});