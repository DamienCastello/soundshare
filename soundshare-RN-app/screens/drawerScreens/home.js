import {Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import { useContextStore } from '../../store/useContext';

const HomeScreen = ({navigation}) => {
  const isModalOpen = useContextStore((state) => state.isModalOpen)
  const setIsOpenModal = useContextStore((state) => state.setIsModalOpen);

  //TODO: Refacto to find better way to set modal top of app
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {
              isModalOpen ? <Modal
              animationType="slide"
              transparent={true}
              visible={isModalOpen}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setIsOpenModal(isModalOpen);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={{display: "flex", justifyContent: "flex-end"}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        setIsOpenModal(isModalOpen)
                    }}>
                    <Text style={styles.textStyle}>X</Text>
                  </Pressable>
                </View>
                  <Text style={styles.modalText}>What do you want upload ?</Text>
                  <View style={{display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: "center"}}>
                  <Pressable
                    style={[styles.button, styles.buttonChoice]}
                    onPress={() => {
                        navigation.navigate("CreateResourcesScreen");
                        setIsOpenModal(isModalOpen)
                    }}>
                    <Text style={styles.textStyle}>Resource</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonChoice]}
                    onPress={() => {
                       //TODO: navigate on entity form after user selection
                        navigation.navigate("CreateTracksScreen");
                        setIsOpenModal(isModalOpen)
                    }}>
                    <Text style={styles.textStyle}>Track</Text>
                  </Pressable>
                  </View>
                </View>
              </View>
            </Modal> : null
            }
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
              You are a music producer ?
          </Text>
          <Text style={{
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 14,
              alignSelf: 'center',
              padding: 10,
            }}
              onPress={() => navigation.navigate('resourcesScreen')}>
                GO Resource
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonChoice: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    position: 'relative',
    top: -35,
    right: -95,
    backgroundColor: 'gray',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HomeScreen;