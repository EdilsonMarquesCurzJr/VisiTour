import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ModalAccount } from '../ModalAccount/Modal';
import { StateButton } from '../StateButton/StateButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import PasswordInput from '../PasswordInput/PasswordInput';
import Input from '../Input/input';
export const Login = () => {
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [modalVisibility, setModalVisibility] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [isSenhaValida, setIsSenhaValida] = useState(null);
    const [senhaValidaLabel, setSenhaValidaLabel] = useState('');

    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    const changeModalState = () => {
        setModalVisibility(true);
    }
    useEffect(() => {
        setIsSenhaValida(true);
        setSenhaValidaLabel(null);
    }, [senha])
    useEffect(() => {
        const loadEmail = async () => {
            const userEmail = await AsyncStorage.getItem('user_email');
            setEmail(userEmail || '');
        };

        loadEmail();
    }, []);
    const validaSenha = () => {
        if (senha.length <= 0) {
            setIsSenhaValida(false);
            setSenhaValidaLabel('Digite uma senha válida');
            return false;
        } else {
            setIsSenhaValida(true);
            return true;
        }
    }
    const login = async () => {
        if (!validaSenha()) { return }
        setIsLoggingIn(true);
        let loginToken = await AsyncStorage.getItem('login_token');
        const app = axios.create({
            baseURL: apiURL
        });

        let isLoggedIn = false;
        while (!isLoggedIn) {
            try {
                let response;
                if (loginToken) {
                    response = await app.post('/user-login-token', null, {
                        headers: {
                            Authorization: `Bearer ${loginToken}`
                        }
                    });
                } else {
                    response = await app.post('/user-login', {
                        email: email,
                        reqPassword: senha
                    });
                    loginToken = response.data.token;
                    await AsyncStorage.setItem('login_token', loginToken);
                }

                const userInfo = response.data.user;
                const isLoginValid = response.data.valid;

                if (isLoginValid) {
                    await AsyncStorage.setItem('user_email', response.data.user.email);
                    router.replace({
                        pathname: '/home/[id]',
                        params: {
                            id: userInfo.id,
                            name: userInfo.name,
                            email: userInfo.email,
                            isAdmin: userInfo.isAdmin,
                            createdAt: userInfo.createdAt,
                        }
                    });
                    isLoggedIn = true;
                } else {
                    console.log('Login inválido');
                }
            } catch (error) {
                const errorData = error.response.data;
                if (errorData.type === "token_invalid") {
                    await AsyncStorage.removeItem('login_token');
                    loginToken = null;
                } else if (errorData.type === "no_token") {
                    await AsyncStorage.removeItem('login_token');
                    loginToken = null;
                } else {
                    console.error(errorData);
                    break;
                }
            }
        }
        setIsLoggingIn(false);
    };
    return (
        <ImageBackground
            source={require('../../assets/images/azulejos-background.jpg')} // Adicione o caminho da sua imagem de fundo
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.textLogin}>VisiTour</Text>
                <Input label="Email" value={email} onChangeText={setEmail} placeholder="Digite seu email" autoCapitalize="none" keyboardType='email-address' />
                <PasswordInput label="Senha" value={senha} onChangeText={setSenha} placeholder="Digite sua sena" autoCapitalize="none" invalidLabel={!isSenhaValida === true ? senhaValidaLabel : null} />

                {isLoggingIn === true ? (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>

                ) : (
                    <StateButton style={styles.button} onPress={login}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </StateButton>

                )}

                <StateButton onPress={changeModalState} style={styles.trocarOuCriarButton}>
                    <Text style={styles.trocarOuCriarText} className="text-black underline">
                        Trocar ou criar conta
                    </Text>
                </StateButton>
                <ModalAccount modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff56',
        rowGap: 10
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
        fontWeight: '700',
        fontSize: 16
    },
    trocarOuCriarText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#031211',
    },
    trocarOuCriarButton: {
        position: 'absolute',
        bottom: 30
    },
    loader: {
        backgroundColor: "#3F3F3F",
        width: "90%",
        padding: 10,
        borderRadius: 25

    }
});

const modalStyles = StyleSheet.create({

});