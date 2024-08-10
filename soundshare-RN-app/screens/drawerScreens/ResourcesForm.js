import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  View,
  Animated,
  Easing,
  Pressable,
  Dimensions,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';

import { createRef, useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

import { useContextStore } from '../../store/useContext';
import Loader from '../Loader';
import React from 'react';
import axios from 'axios';
import url from '../../utils/url';
import YouTubeThumbnail from '../../components/youtubeThumbnail';
import defaultThumbnail from '../../assets/soundshare-blue.jpg';

const CreateResourcesForm = ({ navigation }) => {
  const signedUser = useContextStore((state) => state.signedUser);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceLink, setResourceLink] = useState(null);
  const [image, setImage] = useState(null);
  const [customPreview, setCustomPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isCreationSuccess, setIsCreationSuccess] = useState(false);

  const descriptionInputRef = createRef();
  const titleInputRef = createRef();
  const imageInputRef = createRef();
  const resourceLinkInputRef = createRef();

  const scaleValueImage = useRef(new Animated.Value(1)).current;
  const scaleValueSubmit = useRef(new Animated.Value(1)).current;

  //TODO: fix submit button & blur input

  const getThumbnailUrl = (url) => {
    let videoId = '';

    // Vérifiez si le lien est un lien court (https://youtu.be/...)
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0]; // Extraire l'ID après "youtu.be/" et avant "?" s'il y a des paramètres
    }
    // Vérifiez si le lien est un lien long (https://www.youtube.com/watch?v=...)
    else if (url.includes('youtube.com/watch')) {
        videoId = url.split('v=')[1].split('&')[0]; // Extraire l'ID après "v=" et avant "&" s'il y a des paramètres
    }

    if (videoId) {
      // Construire l'URL de la miniature
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  };

  useEffect(() => {
    if (resourceLink?.includes('youtu')) {
      const thumbnailUrl = getThumbnailUrl(resourceLink);
      setImage(thumbnailUrl);
    } else {
      setImage(null);
    }
  }, [resourceLink]);

  const selectImageFile = async () => {
    try {
        const pickResponse = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: true,
        });
        if (pickResponse) {
            setImage(pickResponse.assets[0].uri);
            setCustomPreview(true);
        } else {
            console.log("DocumentPicker cancelled or failed");
        }
    } catch (err) {
        console.error("Error selecting image file:", err);
    }
  };

  const handleSubmitButton = () => {
    setErrortext('');
    if (!title || !description || !resourceLink) {
      alert('Please fill all the fields and select a music file');
      return;
    }

    const dataToSend = {
      title,
      description,
      image: customPreview ? image : resourceLink?.includes('youtu') ? image : null,
      resourceLink,
      UserId: signedUser.user.id,
    };

    console.log("user to create (frontside): ", dataToSend);
    axios.post(`${url.baseUrl}:${url.portBack}/api/v1/resources`, dataToSend, {
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
            setResourceLink('');
            navigation.navigate("resourcesScreen");
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
          <Image
                source={image ? {uri: image} : defaultThumbnail}
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
            />
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

            <View style={styles.inputContainer}>
              <ImageBackground
                source={{ uri: "https://www.transparenttextures.com/patterns/green-dust-and-scratches.png" }}
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

            <View style={styles.inputContainer}>
              <ImageBackground
                source={{ uri: "https://www.transparenttextures.com/patterns/green-dust-and-scratches.png" }}
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

            <View style={styles.inputContainer}>
              <ImageBackground
                source={{ uri: "https://www.transparenttextures.com/patterns/green-dust-and-scratches.png" }}
                resizeMode="cover"
                style={styles.inputButtonStyle}
              >
                <TextInput
                  value={resourceLink}
                  onChangeText={setResourceLink}
                  placeholder="Copy the resource link"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() => resourceLinkInputRef.current.focus()}
                  blurOnSubmit={false}
                  style={styles.inputText}
                />
              </ImageBackground>
            </View>


            {resourceLink?.includes('youtu') ? <YouTubeThumbnail videoUrl={image} /> : null}
            {console.log("Resource Link:", resourceLink)}
            {console.log("Image URL:", image)}
            {!resourceLink?.includes('youtu') ? <View>
              <Image
                    source={customPreview ? {uri: image} : defaultThumbnail}
                    style={{
                        height: 150,
                        width: 150,
                        resizeMode: 'contain',
                        borderRadius: 10,
                        borderWidth: 3,
                        borderStyle: 'solid',
                        alignSelf: 'center'
                    }}
                />
                
            </View> : null }  
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
                            <Text style={styles.buttonTextStyle}>Modify image preview</Text>
                        </ImageBackground>
                    </Animated.View>
                </Pressable>
            {errortext !== '' && (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            )}

            <Pressable
              onPress={() => {
                animateButton(scaleValueSubmit);
                handleSubmitButton();
              }}
            >
              <Animated.View style={{ transform: [{ scale: scaleValueSubmit }] }}>
                <ImageBackground
                  source={{ uri: "https://www.transparenttextures.com/patterns/crossword.png" }}
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
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: '5%', // Pourcentage au lieu de marges fixes
  },
  inputButtonStyle: {
    backgroundColor: '#273036',
    borderColor: '#ffff',
    borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    width: '100%', // Largeur responsive
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default CreateResourcesForm;
