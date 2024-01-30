import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check with zustand if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      /*
      if (result !== null) {
        // We have data!!
        navigation.replace(
          result === null ? 'Auth' : 'DrawerNavigationRoutes'
        )
      } else if (err !== null){
        // Error retrieving data
      }
      */
    navigation.replace("Auth")
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/soundshare-blue.jpg')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});