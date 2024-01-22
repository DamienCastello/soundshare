import React, { useEffect } from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import axios from 'axios';

const ResourcesScreen = ({navigation}) => {
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/resources")
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
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
              I'm in Resources !
          </Text>
        
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResourcesScreen;