import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createRef, useEffect, useState } from 'react';

import Loader from './Loader';
import React from 'react';
import axios from 'axios';
import url from '../../utils/url';
import { useContextStore } from '../../store/useContext';


const CreateResourcesForm = ({ navigation}) => {
  const signedUser = useContextStore((state) => state.signedUser)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isCreationSuccess,
    setIsCreationSuccess
  ] = useState(false);
  
  const descriptionInputRef = createRef();
  const imageInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!title) {
      alert('Please fill Title');
      return;
    }
    if (!description) {
      alert('Please fill Description');
      return;
    }

    //Show Loader
    setLoading(true);
    const dataToSend = {
        title: title,
        description: description,
        image: image,
        UserId: signedUser.user.id
    };

    //TODO: Encrypt password with JWT
    console.log("user to create (frontside): ", dataToSend)
    axios.post(`${url.baseUrl}:${url.portBack}/api/v1/resources`, dataToSend, { headers: {
      //Header Defination
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //TODO: Improve validation
      'Accept': '*/*'
    }})
   
      .then((response) => {
        // If server response message same as Data Matched
        console.log("check response.status", response.status)
        if (response.status === 200) {
          //Hide Loader
          setLoading(false);
          //TODO: replace by toast
          setIsCreationSuccess(true)
          setTimeout(() => {
            setIsCreationSuccess(false)
            setTitle('')
            setDescription('')
            navigation.navigate("resourcesScreen")
            }, 5000);
        } else {
          setErrortext(response.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
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
      <View style={{flex: 1, backgroundColor: '#307ecc'}}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(title) => setTitle(title)}
                underlineColorAndroid="#f000"
                placeholder="Enter Title"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  descriptionInputRef.current && descriptionInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(description) => setDescription(description)}
                underlineColorAndroid="#f000"
                placeholder="Enter Description"
                placeholderTextColor="#8b9cb5"
                ref={descriptionInputRef}
                returnKeyType="next"
                multiline={true}
                onSubmitEditing={() =>
                  imageInputRef.current &&
                  imageInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            
            <View style={styles.SectionStyle}>
             {/* Add expo image picker */}
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>Create Resource</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
export default CreateResourcesForm;