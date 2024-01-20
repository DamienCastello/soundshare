import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import url from '../utils/url';

export default function HomeScreen({navigation}) {
    //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const fetchUsers = () => {
        axios.get(`${url.baseUrl}/users`, {})
        .then((response) => console.log(JSON.parse(JSON.stringify(response))))
        .catch((error) => console.log(JSON.parse(JSON.stringify(error))))
        .finally(function () {
        // always executed
        });
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Pressable style={styles.button} onPress = {() => fetchUsers()}> 
            <Text style={styles.text}>FETCH</Text>
        </Pressable>
        <Pressable style={styles.button} onPress = {() => navigation.navigate('Details')}> 
            <Text style={styles.text}>Go to Details</Text>
        </Pressable>
        <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3287a8',
        margin: 15
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });

