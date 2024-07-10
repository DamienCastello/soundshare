import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createRef, useEffect, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import MultiSelect from 'react-native-multiple-select';

import { useContextStore } from '../../store/useContext';
import Loader from './Loader';
import React from 'react';
import axios from 'axios';
import url from '../../utils/url';

const CreateTracksForm = ({ navigation }) => {
    const signedUser = useContextStore((state) => state.signedUser)
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

    useEffect(() => getGenres(), [])

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
                    setTitle('')
                    setDescription('')
                    setMusic('')
                    alert('Please select a .mp3 or .wav file');
                }
            } else {
                // Handle cancellation or other errors
                console.log("DocumentPicker cancelled or failed");
            }
        } catch (err) {
            console.error("Error selecting music file:", err);
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
            image: '', // Handle image later
            music,
            genres: selectedGenres,
            UserId: signedUser.user.id
        };

        // TODO: Encrypt password with JWT
        console.log("user to create (frontside): ", dataToSend);
        axios.post(`${url.baseUrl}:${url.portBack}/api/v1/tracks`, dataToSend, {
            headers: {
                // Header Definition
                'Content-Type': 'application/json',
                // TODO: Improve validation
                'Accept': '*/*',
            },
        })
            .then((response) => {
                // If server response message same as Data Matched
                console.log("check response.status", response.status);
                if (response.status === 200) {
                    // Hide Loader
                    setLoading(false);
                    // TODO: replace by toast
                    setIsCreationSuccess(true);
                    setTimeout(() => {
                        setIsCreationSuccess(false);
                        setTitle('');
                        setDescription('');
                        setMusic('');
                        navigation.navigate("tracksScreen");
                    }, 5000);
                } else {
                    setErrortext(response.msg);
                }
            })
            .catch((error) => {
                // Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

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
                {/* <Image
          source={image}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        /> */}
            </View>
        );
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.container}>
                <Loader loading={loading} />
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={selectMusicFile}>
                        <Text>Select Music File</Text>
                    </TouchableOpacity>
                    {music ? <View>
                        <Text style={styles.fileTextStyle}>Selected: {title}</Text> 
                        <Text style={styles.fileTextStyle}>Path: {music}</Text>
                    </View> : null}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter Title"
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() => titleInputRef.current.focus()}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={setDescription}
                        placeholder="Enter Description"
                        placeholderTextColor="#8b9cb5"
                        ref={descriptionInputRef}
                        returnKeyType="next"
                        multiline
                        onSubmitEditing={() => descriptionInputRef.current.focus()}
                        blurOnSubmit={false}
                    />
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
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
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
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitButton}
                >
                    <Text style={styles.buttonTextStyle}>Create Track</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#307ecc',
        padding: 20,
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputStyle: {
        height: 40,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
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