import { 
    KeyboardAvoidingView, 
    StyleSheet, 
    Text, 
    TextInput, 
    ImageBackground, 
    View, 
    Image,
    Animated,
    Easing,
    Pressable,
    Dimensions, 
    StatusBar,
    ScrollView, 
} from 'react-native';

import { createRef, useEffect, useState, useRef } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import MultiSelect from 'react-native-multiple-select';
import { LinearGradient } from 'expo-linear-gradient';

import { useContextStore } from '../../store/useContext';
import Loader from '../Loader';
import React from 'react';
import axios from 'axios';
import url from '../../utils/url';

const CreateTracksForm = ({ navigation }) => {
    const signedUser = useContextStore((state) => state.signedUser);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [music, setMusic] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [isCreationSuccess, setIsCreationSuccess] = useState(false);

    const descriptionInputRef = createRef();
    const titleInputRef = createRef();
    const imageInputRef = createRef();
    const scaleValueMusic = useRef(new Animated.Value(1)).current;
    const scaleValueImage = useRef(new Animated.Value(1)).current;
    const scaleValueSubmit = useRef(new Animated.Value(1)).current;

    //TODO: fix submit button & blur input

    useEffect(() => getGenres(), []);

    const getGenres = () => {
        if (!loading) {
            setLoading(true);
            axios(`${url.baseUrl}:${url.portBack}/api/v1/genres`, {})
                .then((responseJson) => {
                    setGenres(responseJson.data.genres);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    };

    const onSelectedItemsChange = selectedItems => {
        setSelectedGenres(selectedItems);
    };

    const selectMusicFile = async () => {
        try {
            const pickResponse = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
                copyToCacheDirectory: true,
            });
            if (pickResponse) {
                const fileType = pickResponse.assets[0].uri.split('.').pop();
                if (fileType === 'mp3' || fileType === 'wav') {
                    setMusic(pickResponse.assets[0].uri);
                    setTitle(pickResponse.assets[0].name);
                } else {
                    setTitle('');
                    setDescription('');
                    setMusic('');
                    alert('Please select a .mp3 or .wav file');
                }
            } else {
                console.log("DocumentPicker cancelled or failed");
            }
        } catch (err) {
            console.error("Error selecting music file:", err);
        }
    };

    const selectImageFile = async () => {
        try {
            const pickResponse = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
            });
            if (pickResponse) {
                setImage(pickResponse.assets[0].uri);
            } else {
                console.log("DocumentPicker cancelled or failed");
            }
        } catch (err) {
            console.error("Error selecting image file:", err);
        }
    };

    const handleSubmitButton = () => {
        setErrortext('');
        if (!title || !description || !music || !selectedGenres) {
            alert('Please fill all the fields and select a music file');
            return;
        }

        const dataToSend = {
            title,
            description,
            image,
            music,
            genres: selectedGenres,
            UserId: signedUser.user.id,
        };

        console.log("user to create (frontside): ", dataToSend);
        axios.post(`${url.baseUrl}:${url.portBack}/api/v1/tracks`, dataToSend, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setIsCreationSuccess(true);
                    setTimeout(() => {
                        setIsCreationSuccess(false);
                        setTitle('');
                        setDescription('');
                        setMusic('');
                        setImage('');
                        navigation.navigate("tracksScreen");
                    }, 5000);
                } else {
                    setErrortext(response.msg);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    const animateButton = (scaleValue, callback) => {
        scaleValue.setValue(1);
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            })
        ]).start(callback);
    }

    if (isCreationSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>

                <Text style={styles.successTextStyle}>
                    Creation Successful
                </Text>
                <Text style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                    alignSelf: 'center',
                    padding: 10,
                }}>
                    {title}
                </Text>
                <Text style={{
                    color: 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                    alignSelf: 'center',
                    padding: 10,
                }}>
                    {description}
                </Text>
                {image ? 
                <Image
                    source={{uri: image}}
                    style={{
                        height: 150,
                        width: 150,
                        resizeMode: 'contain',
                        borderRadius: 10,
                        borderWidth: 3,
                        borderStyle: 'solid',
                        alignSelf: 'center'
                    }}
                /> : null}
                
            </View>
        );
    }
    return (
        <View style={styles.outerContainer}>
            <StatusBar backgroundColor="#3f87a6" barStyle="light-content" />
            <View style={styles.topBar} />
            <LinearGradient
                    colors={['#3f87a6', '#ebf8e1', '#f69d3c']}
                    style={styles.linearGradient}
                >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                    <ScrollView style={styles.container}>
                        <Loader loading={loading} />
                        <View>
                            <Pressable 
                                onPress={() => {
                                    animateButton(scaleValueMusic, () => {
                                        setTimeout(selectMusicFile, 50);
                                    });
                                }}
                            >
                                <Animated.View style={{ transform: [{ scale: scaleValueMusic }] }}>
                                    <ImageBackground 
                                        source={{uri: "https://www.transparenttextures.com/patterns/crossword.png"}} 
                                        resizeMode="cover" 
                                        style={styles.buttonStyle}
                                    >
                                        <Text style={styles.buttonTextStyle}>Select Music File</Text>
                                    </ImageBackground>
                                </Animated.View>
                            </Pressable>
                            {music ? <View>
                                <Text style={styles.fileTextStyle}>Selected: {title}</Text> 
                            </View> : null}
                        </View>
                        <View>
                            <Pressable 
                                onPress={() => {
                                    animateButton(scaleValueImage, () => {
                                        setTimeout(selectImageFile, 50);
                                    });
                                }}
                            >
                                <Animated.View style={{ transform: [{ scale: scaleValueImage }] }}>
                                    <ImageBackground 
                                        source={{uri: "https://www.transparenttextures.com/patterns/crossword.png"}} 
                                        resizeMode="cover" 
                                        style={styles.buttonStyle}
                                    >
                                        <Text style={styles.buttonTextStyle}>Select image preview</Text>
                                    </ImageBackground>
                                </Animated.View>
                            </Pressable>
                            {image ? 
                            <Image
                                source={{uri: image}}
                                style={{
                                    height: 150,
                                    width: 150,
                                    resizeMode: 'contain',
                                    borderRadius: 10,
                                    borderWidth: 3,
                                    borderStyle: 'solid',
                                    alignSelf: 'center'
                                }}
                            /> : null }
                        </View>
                        <View>
                            <ImageBackground 
                                source={{uri: "https://www.transparenttextures.com/patterns/green-dust-and-scratches.png"}} 
                                resizeMode="cover" 
                                style={styles.inputButtonStyle}
                            >
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="Enter Title"
                                    placeholderTextColor="#8b9cb5"
                                    autoCapitalize="sentences"
                                    returnKeyType="next"
                                    onSubmitEditing={() => titleInputRef.current.focus()}
                                    blurOnSubmit={false}
                                    style={styles.inputText}
                                />
                            </ImageBackground>
                        </View>
                        <View>
                            <ImageBackground 
                                source={{uri: "https://www.transparenttextures.com/patterns/green-dust-and-scratches.png"}} 
                                resizeMode="cover" 
                                style={styles.inputButtonStyle}
                            >
                                <TextInput
                                    onChangeText={setDescription}
                                    placeholder="Enter Description"
                                    placeholderTextColor="#8b9cb5"
                                    ref={descriptionInputRef}
                                    returnKeyType="next"
                                    multiline
                                    onSubmitEditing={() => descriptionInputRef.current.focus()}
                                    blurOnSubmit={false}
                                    style={styles.inputText}
                                />
                            </ImageBackground>
                            
                        </View>
                        <View style={styles.multiSelectContainer}>
                            <MultiSelect
                                items={genres}
                                uniqueKey="id"
                                ref={(component) => { multiSelect = component; }}
                                onSelectedItemsChange={onSelectedItemsChange}
                                selectedItems={selectedGenres}
                                selectText="Pick Genres"
                                searchInputPlaceholderText="Search Genres..."
                                onChangeInput={(text) => console.log(text)}
                                tagRemoveIconColor="#CCC"
                                tagBorderColor=""
                                tagTextColor="#273036"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#CCC' }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                        </View>
                        {errortext !== '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <Pressable 
                            onPress={() => {
                                animateButton(scaleValueSubmit);
                                handleSubmitButton();
                            }}
                        >
                            <Animated.View style={{ transform: [{ scale: scaleValueSubmit }] }}>
                                <ImageBackground 
                                    source={{uri: "https://www.transparenttextures.com/patterns/crossword.png"}} 
                                    resizeMode="cover" 
                                    style={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonTextStyle}>Submit</Text>
                                </ImageBackground>
                            </Animated.View>
                        </Pressable>
                    </ScrollView>
                    
                </KeyboardAvoidingView>
                </LinearGradient>
        </View>
    );
};

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
    inputContainer: {
        marginBottom: 10,
    },
    inputStyle: {
        backgroundColor: '#273036',
        borderWidth: 2,
        color: 'white',
        borderColor: 'white',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
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
    inputButtonStyle: {
        backgroundColor: '#273036',
        borderColor: '#ffff',
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    inputText: {
        color: 'white',
        textAlign: 'center'
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    fileTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        padding: 10,
    },
    multiSelectContainer: {
        flex: 1,
        marginHorizontal: 35,
        marginBottom: 20,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
export default CreateTracksForm;
