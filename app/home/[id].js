import React from "react";
import { useLocalSearchParams } from "expo-router";
import { createStackNavigator } from "@react-navigation/stack";
import PlaceDescPage from "../../components/PlaceDesc/PlaceDesc";

import { View, StyleSheet, TextInput } from "react-native";
import { Octicons } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { StateButton } from "../../components/StateButton/StateButton";
import { Hamb } from "../../components/Hamb/Hamb";

import Map from "../../components/Map/Map";
import Menu from "../../components/Menu/Menu";

const Stack = createStackNavigator();

const CustomHeaderButton = (props) => (
    <HeaderButtons {...props} IconComponent={Ionicons} iconSize={23} color="white" />
);


export default function Home() {
    const params = useLocalSearchParams();

    const [hambVisibility, setHambVisibility] = React.useState(false);

    const openHamb = () => {
        setHambVisibility(true);
    };

    return (
        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Menu"
                    component={Menu}
                    options={({ navigation }) => ({
                        title: "",
                        headerLeft: () => (
                            <StateButton style={componentsStyles.buttonIcon} onPress={openHamb}>
                                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                    <Item title="Pesquisa" iconName="search" onPress={openHamb} />
                                    <Octicons name="three-bars" size={27} color="black" />
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
                        headerStyle: {
                            backgroundColor: "#fff",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            display: "none",
                        },

                    })}
                    initialParams={params}
                />
                <Stack.Screen name="PlaceDesc" component={PlaceDescPage}
                    options={({ navigation }) => ({
                        headerShown: false
                    })}
                />
                <Stack.Screen name="Map" component={Map} />
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

