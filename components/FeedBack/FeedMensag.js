

import { Text, TextInput, View } from "react-native"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useState } from "react";


export const FeedMensag = () => {
  const [texto, setTexto] = useState('');
  const sendFeedback = () => {
    setTexto('');
  }

  return (
    <>
      <Link href="/Feed/FeedOptions" style={styles.arromBack}>

        <Ionicons name="arrow-back" size={30} />
      </Link>
      <View style={styles.header}>
        <Text style={styles.textHeader}>FeedBack</Text>
      </View>
      <View style={styles.container}>


        <View style={styles.textAreaContainer} >
          <Text>FeedBack</Text>
          <TextInput
            onChangeText={(newText) => setTexto(newText)}
            value={texto}
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Tem algo que queira como melhoria?"
            placeholderTextColor="grey"

            multiline={true}
          />
        </View>
        <TouchableOpacity style={styles.buttonSubmit} onPress={sendFeedback}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  textAreaContainer: {

    marginTop: -150,
    padding: 5,

  },
  textArea: {

    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    width: 250,
    height: 150,
    justifyContent: "flex-start",
    paddingLeft: 8
  },
  buttonSubmit: {
    marginTop: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
    width: 250,
    padding: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: "gray",
  },
  header: {
    alignSelf: 'center',
  },
  textHeader: {
    marginTop: 65,
    fontSize: 20,
    textAlign: 'center', // centraliza horizontalmente
    textAlignVertical: 'center', // centraliza verticalmente
  },

  arromBack: {
    position: 'absolute',
    left: 20,
    top: 60
  },
})