import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';

import axios from 'axios';
import url from '../../utils/url';

const TrackShow = ({ navigation, route }) => {
    const { musicId, artist } = route.params;
    const [loading, setLoading] = useState(false);
    const [sound, setSound] = useState();
    const [data, setData] = useState({});

    useEffect(() => {
        if (!loading) {
        setLoading(true);
        axios(`${url.baseUrl}:${url.portBack}/api/v1/tracks/${musicId}`)
            .then((responseJson) => {
                console.log('check track : ', JSON.stringify(responseJson.data.track, null, 2));
                    setData(responseJson.data.track);
                    setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
        }
    }, [])

    useEffect(() => {
        console.log("data", data)
    }, [data])

    const playSound = async () => {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            { uri: data.music }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <SafeAreaView style={styles.container}>
            {!loading ? <View>
                <View style={styles.view}>
                    <Text style={styles.itemStyle}>{artist}</Text>
                    <Text style={styles.itemStyle}>{data.title}</Text>
                </View>
                <Text style={styles.description}>{data.description}</Text>
                <Pressable style={styles.buttonStyle} onPress={playSound}>
                    <Text style={styles.buttonTextStyle}>Play sound</Text>
                </Pressable>
            </View> : null}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        flex: 1,
        height: 600,
        margin: 20,
        backgroundColor: '#ffe'
      },
      view: {
        display: 'flex',
        flexDirection: 'row'
      },
      itemStyle: {
        padding: 10,
        fontSize: 22,
      },
      description: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center'
      },
      buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default TrackShow;