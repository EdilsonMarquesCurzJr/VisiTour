import React, { useState } from 'react';
import { Button, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export const Login = () => {
    const [texto, setTexto] = React.useState('');
    const [senha, setSenha] = React.useState('');
    
    return (
        <ImageBackground
            source={require('../../../assets/image 6.png')} // Adicione o caminho da sua imagem de fundo
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.textLogin}>VisiTour</Text> 
                <View style={styles.inputers}>
                   <Text style = {styles.textInput}>Email</Text>
                    <TextInput style={styles.inputerContainer}
                        value={texto}
                        placeholder='Digite seu email'
                        onChangeText={(newText) => setTexto(newText)}
                    />
                    <Text style = {styles.textInput}>Senha</Text>
                    <TextInput style={styles.inputerContainer}
                        value={senha}
                        placeholder='Digite sua senha'
                        onChangeText={(newText) => setSenha(newText)}
                        secureTextEntry={true}
                    />
                </View>
                
                <Pressable style={styles.button}>
                    <Text style = {styles.textButton}>Entrar</Text>
                </Pressable>
                <Text style = {styles.trocarOuCriar}>Trocar ou criar conta</Text>
            </View>
            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#848EB9",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLogin: {
        fontWeight: '900',
        fontSize: 50,
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    inputers: {
        
        width: "100%",
    },
    inputerContainer: {
        marginLeft: 20,
        margin: 5,
        backgroundColor: "#FFFFFF", // Adicione um pouco de transparência
        padding: 15,
        borderRadius: 25,
        width: "90%",
        color: "#000", // Cor do texto dentro do TextInput
    },
    textInput: {
        marginLeft: 30,
    },
    button: {
        backgroundColor: "#3F3F3F",
        width: "90%",
        padding: 15,
        borderRadius: 25,
        marginTop: 20,
    },
    textButton: {
        color: "#FFFF",
        textAlign: 'center', // Adicione esta linha para centralizar horizontalmente
        textAlignVertical: 'center', // Adicione esta linha para centralizar verticalmente
    },
    trocarOuCriar:{
        marginTop: 40,
        textDecorationLine: 'underline'
    },
});
