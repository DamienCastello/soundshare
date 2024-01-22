import {SafeAreaView, Text, View} from 'react-native';

import React from 'react';

const AboutScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, padding: 16}}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 16,
                        }}>
                        Ce projet a pour objectif de regrouper des ressources intéressantes pour les compositeurs amateurs ou professionnels.
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginBottom: 16,
                        }}>
                        Son but est aussi de proposer aux artistes de publier leurs sons en cours de production pour avoir des feedbacks d'autres utilisateurs.
                    </Text>
                    <Text style={{
                        color: '#FFFFFF',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 14,
                        alignSelf: 'center',
                        padding: 10,
                    }}
                          onPress={() => navigation.navigate('AboutScreen')}>
                        GO Resource
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    Splash, Login and Register Example{'\n'}React Native
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: 'grey',
                    }}>
                    www.aboutreact.com
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default AboutScreen;