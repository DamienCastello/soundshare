import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';


import axios from 'axios';
import url from '../../utils/url';

const ResourcesScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => getData(), []);

  useFocusEffect(
    useCallback(() => {
      setOffset(0);
      setIsListEnd(false);
      setDataSource([]);
      getData();
    }, [])
  );

  const getData = () => {
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      axios(`${url.baseUrl}:${url.portBack}/api/v1/resources`, {
        params: {
          offset: offset,
          limit: 20,
        },
      })
        .then((responseJson) => {
          if (responseJson.data.resources.length > 0) {
            setDataSource([...dataSource, ...responseJson.data.resources]);
            setLoading(false);
            setOffset(offset + 20);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      <Text
        key={item.id}
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}.{item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  const getItem = (item) => {
    navigation.navigate('ResourceShow', {
      resourceId: item.id,
      user: item.User.name
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.1} // Ajustez cette valeur selon vos besoins
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    height: 600,
    margin: 20,
    backgroundColor: '#ffe'
  },
  itemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResourcesScreen;