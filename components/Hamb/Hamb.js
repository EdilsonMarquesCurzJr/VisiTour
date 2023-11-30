import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Hamb = () => {
  return (
    <View style={styles.container}>
      <Ionicons style={styles.userIcon} name="md-person" size={24} color="black" />
      <Text>Usuário</Text>
      <View style= {styles.options}> 
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:"center",
    backgroundColor: "gray",
    width: "50%",
    height: "100%",
    zIndex: 1,
    marginLeft: 0,
    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    
  },
  userIcon: {
    justifyContent:"center",
    verticalAlign: "middle",
    textAlign:"center",
    borderBottomColor: "#000",
    borderWidth: 5,
    width: 50, // Defina a largura desejada (pode ser ajustada conforme necessário)
    height: 50, // Defina a altura desejada (pode ser ajustada conforme necessário)
    borderRadius: 25, // Use a metade da largura ou altura para obter bordas circulares
    marginTop: -500,
  },
});
