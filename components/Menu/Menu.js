import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Hamb } from "../Hamb/Hamb";
const Stack = createStackNavigator();

const CustomHeaderButton = (props) => (
  <HeaderButtons {...props} IconComponent={Ionicons} iconSize={23} color="white" />
);

const MenuScreen = ({ navigation }) => {
  const [texto, setTexto] = useState("");
  const [hamb, setHamb] = React.useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela do Menu</Text>
    </View>
  );
};


export const Menu = () => {
    const [texto, setTexto] = useState("");
    const [hamb, setHamb] = useState(false)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#808080",
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
          title: "", // Definindo o título como uma string vazia para remover completamente
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Pesquisa"
                iconName="search"
                onPress={() => {
                  setHamb(!hamb)
                  console.log("hamb:", hamb); // Verifica o valor de hamb no console

                }}
              />
              <Image source={require("../../assets/3line.png")} style={styles.imageIcon} />
            </HeaderButtons>
          ),
          headerRight: () => (
            <View style={[styles.headerButtonContainer, { marginRight: 15 }]}>
              <TextInput
                style={styles.searchTextInput}
                placeholder="busca"
                placeholderTextColor="white"
              />

              <Ionicons name="search" size={23} color="white" />
            </View>
          ),
        })}
        
      />
      {hamb && <Hamb />}
    
    
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 18,
    },
    headerButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    imageIcon: {
    marginRight: -40,
      width: 30,
      height: 30,
    },
    searchTextInput: {
      flex: 1, // Ocupa toda a largura disponível
      height: 40,
      borderColor: "white",
      borderRadius: 25,
      borderWidth: 1,
      marginLeft: 10,
      paddingHorizontal: 10,
      color: "white",
      marginRight: 4,
    },
  });
  
