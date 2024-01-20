import { Button, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import url from './utils/url';

export default function App() {
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
      <Text>Open up App.js to start working on your app!</Text>
      <Button
          style={styles.btn}
          title="FETCH"
          onPress={() => fetchUsers()}
        />
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
  btn: {
    width: '20px',
    height: "10px"
  }
});
