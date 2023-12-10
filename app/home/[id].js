import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, ActivityIndicator, FlatList, ImageBackground } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Hamb } from "../../components/Hamb/Hamb";
import { Link, useLocalSearchParams } from "expo-router";
import { StateButton } from "../../components/StateButton/StateButton";
import { Octicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const CustomHeaderButton = (props) => (
    <HeaderButtons {...props} IconComponent={Ionicons} iconSize={23} color="white" />
);
const MenuScreen = ({ navigation }) => {
    const [isFetchingData, setIsFetchingData] = useState(false);
    const route = useRoute();

    const { params } = route;
    const data = [
        {
            name: 'Teatro artur azevedo',
            descricao: 'lorem epsum odor sailum',
        },
        {
            name: 'Palácio dos Leões',
            descricao: 'lorem epsum odor sailum',
        }
        // ... outros dados, se houver
    ];
    const renderCard = ({ item }) => {
        return (
            <TouchableOpacity style={MenuScreenStyles.cardContainerSinbling} onPress={() => console.log("OI")}>
                <ImageBackground
                    style={MenuScreenStyles.backgroundImage}
                    source={{ uri: 'https://www.voltologo.net/wp-content/uploads/2023/02/centro-historico-sao-luis-lugares-para-visitar.jpg' }}
                    borderRadius={20}
                >
                    <View style={MenuScreenStyles.cardContainer}>
                        <Text style={MenuScreenStyles.cardLabel}>{item.name}</Text>
                    </View>

                </ImageBackground>

            </TouchableOpacity>
        );
    };
    const dataArray = Object.values(data);
    return (
        <View style={MenuScreenStyles.container}>
            <View style={MenuScreenStyles.greetingContainer}>
                <Text style={MenuScreenStyles.greetings}>Olá, {params.name}!</Text>

            </View>
            <View style={MenuScreenStyles.feedContainer}>
                <Text style={MenuScreenStyles.recomendTitle}>Locais Recomendados!</Text>
                {isFetchingData === true ? (
                    <View style={MenuScreenStyles.feedLoader}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>

                ) : (
                    <FlatList
                        data={dataArray}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ width: "80%", borderRadius: 10 }}
                    />
                )}

            </View>

            {/* OBS: Coloquei só para poder voltar para a tela de login temporariamente */}
            <Link href="/" replace={true} style={{ backgroundColor: '#f4a4e4' }}>
                VOLTAR PARA A TELA DE LOGIN (APAGAR NO FINAL)
            </Link>
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

export default function Menu() {
    const params = useLocalSearchParams();
    const [texto, setTexto] = useState("");

    const [hambVisibility, setHambVisibility] = React.useState(false);

    const openHamb = () => {
        setHambVisibility(true);
    };

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        display: "none", // Oculta o título do cabeçalho
                    },
                }}
            >
                <Stack.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <StateButton style={componentsStyles.buttonIcon} onPress={openHamb}>
                                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                    <Item title="Pesquisa" iconName="search" onPress={openHamb} />
                                    <Octicons name="three-bars" size={27} color="black" />
                                    {/* <Image source={require("../../assets/3line.png")} style={styles.imageIcon} /> */}
                                </HeaderButtons>
                            </StateButton>
                        ),
                        headerRight: () => (
                            <View style={[componentsStyles.headerButtonContainer, { marginRight: 15 }]}>
                                <TextInput
                                    style={componentsStyles.searchTextInput}
                                    placeholder="Busca"
                                    placeholderTextColor="black"
                                />
                                <Ionicons name="search" size={23} color="black" />
                            </View>
                        ),
                    })}
                    initialParams={params}
                />
            </Stack.Navigator>
            <Hamb HambVisibility={hambVisibility} setHambVisibility={setHambVisibility} />
        </>
    );
};




const componentsStyles = StyleSheet.create({
    headerButtonContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 320

    },
    imageIcon: {
        marginRight: -40,
        width: 30,
        height: 30,
    },
    searchTextInput: {
        height: 40,
        borderColor: "black",
        borderRadius: 25,
        borderWidth: 1,
        paddingHorizontal: 15,
        color: "black",
        width: 290,

    },
    buttonIcon: {

    }
});

