import React, { useEffect, useState, useRef } from 'react';
import { 
    View, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    Pressable, 
    Image, 
    Dimensions, 
    StatusBar,
    ImageBackground,
    Animated,
    Easing 
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import axios from 'axios';
import url from '../utils/url';

const TrackShow = ({ navigation, route }) => {
    const { musicId, artist } = route.params;
    const [loading, setLoading] = useState(false);
    const [sound, setSound] = useState();
    const [data, setData] = useState({});
    const scaleValue = useRef(new Animated.Value(1)).current;

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

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true
            })
        ]).start();
    }

    return (
        <View style={styles.outerContainer}>
            <StatusBar backgroundColor="#3f87a6" barStyle="light-content" />
            <View style={styles.topBar} />
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={['#3f87a6', '#ebf8e1', '#f69d3c']}
                    style={styles.linearGradient}
                >
                    {!loading ? <View>
                        <View style={styles.view}>
                            <Text style={styles.title}>{data.title}</Text>
                            <Text style={styles.itemStyle}>By {artist}</Text>
                        </View>
                        {data.image ?
                            <Image
                                source={{ uri: data.image }}
                                style={{
                                    height: 300,
                                    width: 300,
                                    resizeMode: 'stretch',
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    borderWidth: 3,
                                    borderStyle: 'solid',
                                    alignSelf: 'center'
                                }}
                            /> : null}
                        <Text style={styles.itemStyle}>{data.description}</Text>
                        <Pressable 
                            onPress={() => {
                                animateButton();
                                playSound();
                            }}
                        >
                            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                                <ImageBackground 
                                    source={{uri: "https://www.transparenttextures.com/patterns/crossword.png"}} 
                                    resizeMode="cover" 
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonTextStyle}>Play sound</Text>
                                </ImageBackground>
                            </Animated.View>
                        </Pressable>
                    </View> : null}
                </LinearGradient>
            </SafeAreaView>
            <View style={styles.bottomBar} />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#3f87a6',
    },
    topBar: {
        height: StatusBar.currentHeight,
        backgroundColor: '#3f87a6', 
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        backgroundColor: '#f69d3c', 
    },
    container: {
        paddingTop: 0,
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    linearGradient: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    view: {
        alignItems: 'center',
        maxWidth: '95%'
    },
    title: {
        padding: 10,
        fontSize: 24,
        textAlign: 'center'
    },
    itemStyle: {
        padding: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#273036',
        borderWidth: 2,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
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
