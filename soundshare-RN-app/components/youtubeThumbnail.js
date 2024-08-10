import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

const YouTubeThumbnail = ({ videoUrl }) => {
    console.log("check thumbnail : ", videoUrl)
    return (
        <View style={styles.container}>
            {videoUrl ? (
        <Image
          source={{ uri: videoUrl }}
          style={{ height: 150, width: 150, resizeMode: 'cover', borderRadius: 10 }}
        />
      ) : (
        <Text>Thumbnail not available</Text>
      )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    thumbnail: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 3,
        borderStyle: 'solid',
        alignSelf: 'center'
    },
});

export default YouTubeThumbnail;