import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';

export default function Menu({ navigation }) {
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  const [state, setState] = useState({
    isFetchingFeed: true,
    feedData: [],
    isReloadingFeed: false
  });
  const route = useRoute();
  const { params } = route;
  const dataSend = {
    name: params.name,
    email: params.email,
    password: params.password
  }

  const fetchRecommendedPlaces = async () => {
    setState(prevState => ({
      ...prevState,
      isFetchingFeed: true
    }))
    const app = axios.create({
      baseURL: apiURL
    });
    try {
      const response = await app.post('/fetch-feed', dataSend);
      const data = response.data.pontosTuristicos;
      setState(prevState => ({
        ...prevState,
        feedData: data
      }))
    } catch (error) {
      console.log(error);
    }
    setState(prevState => ({
      ...prevState,
      isFetchingFeed: false
    }));
  }
  useEffect(() => {
    fetchRecommendedPlaces();
  }, []);
  const renderCard = ({ item }) => {

    const data = item;
    const placeData = {
      id: String(params.id),
      descricao: data.descricao,
      nome: data.nome,
      image: data.imageUrl,
      latitude: data.latitude,
      longitude: data.longitude,
    }
    const goToMap = () => {
      navigation.navigate('PlaceDesc', { placeData });
    }
    return (
      <TouchableOpacity style={MenuScreenStyles.cardContainerSinbling} onPress={goToMap}>
        <ImageBackground
          style={MenuScreenStyles.backgroundImage}
          source={{ uri: item.imageUrl }}
          borderRadius={20}
        >
          <View style={MenuScreenStyles.cardContainer}>
            <Text style={MenuScreenStyles.cardLabel}>{item.nome}</Text>
          </View>

        </ImageBackground>

      </TouchableOpacity >
    );
  };
  const ReloaderButton = () => {

    return (
      <TouchableOpacity onPress={fetchRecommendedPlaces} style={components.reloaderButton}>
        <AntDesign name="reload1" size={25} color="white" />
      </TouchableOpacity>
    )
  }
  const dataArray = Object.values(state.feedData);
  return (
    <View style={MenuScreenStyles.container}>
      <View style={MenuScreenStyles.greetingContainer}>
        <Text style={MenuScreenStyles.greetings}>Olá, {params.name}!</Text>

      </View>
      <View style={MenuScreenStyles.feedContainer}>
        {state.feedData ? (
          <Text style={MenuScreenStyles.recomendTitle}>Locais Recomendados!</Text>

        ) : (
          <Text style={MenuScreenStyles.recomendTitle}>Não encontramos locais, para lhe recomendar!</Text>

        )}
        {state.isFetchingFeed === true ? (
          <View style={MenuScreenStyles.feedLoader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>

        ) : (
          <>
            <FlatList
              data={dataArray}
              renderItem={renderCard}
              keyExtractor={(item, index) => index.toString()}
              style={{ width: "80%", borderRadius: 10 }}
              ListFooterComponent={ReloaderButton}
              ListFooterComponentStyle={{
                alignItems: 'center',
                justifyContent: "center"
              }}
            />
            <View style={{ elevation: 5, backgroundColor: "#000", width: "80%", height: 1, borderRadius: 100 }}></View>
          </>
        )}
      </View>
    </View>
  );
};



const MenuScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: '#fff'
  },
  greetings: {
    fontSize: 16,
  },
  greetingContainer: {
    marginLeft: "5%",
    marginTop: "10%"
  },
  feedContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
    height: '60%',
    marginTop: 10
  },
  feedLoader: {
    backgroundColor: "#4E4E4E",
    padding: 8,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "10%"
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    elevation: 20,
  },
  cardContainer: {
    height: 204,
    justifyContent: 'flex-end',
    // backgroundColor: '#000'
  },
  cardContainerSinbling: {
    marginTop: 5,
    padding: 10,
  },
  recomendTitle: {
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: '15%'
  },
  cardLabel: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: "6%",
    marginBottom: "3%",
    fontSize: 17
  }
});

const components = StyleSheet.create({
  reloaderButton: {
    backgroundColor: "#4E4E4E",
    padding: 8,
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})