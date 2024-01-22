import {SafeAreaView, Text, View} from 'react-native';

import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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

export default HomeScreen;