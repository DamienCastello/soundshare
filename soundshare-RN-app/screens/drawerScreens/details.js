import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Details Screen</Text>
        <Pressable style={styles.button} onPress = {() => navigation.navigate('Home')}> 
            <Text style={styles.text}>Go to Home</Text>
        </Pressable>
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
