import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ModalAccount } from '../ModalAccount/Modal';
import { StateButton } from '../StateButton/StateButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import PasswordInput from '../PasswordInput/PasswordInput';
import Input from '../Input/input';
export const Login = () => {
    const [state, setState] = useState({
        email: '',
        senha: '',
        senhaValidaLabel: '',
        modalVisibility: false,
        isLoggingIn: false,
        isInfoVisible: false,
        isSenhaValida: null,
    });
    const handleEmailChange = (novoEmail) => {
        setState(prevState => ({
            ...prevState,
            email: novoEmail
        }))
    }
    const handleModalChange = (modalVisibility) => {
        setState(prevState => ({
            ...prevState,
            modalVisibility: modalVisibility
        }))
    }
    const handlePasswordChange = (novoPassword) => {
        setState(prevState => ({
            ...prevState,
            senha: novoPassword
        }))
    }

    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    const changeModalState = () => {
        setState(prevState => ({
            ...prevState,
            modalVisibility: true
        }));
    }
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            isSenhaValida: true,
            senhaValidaLabel: null
        }))
    }, [state.senha])
    useEffect(() => {
        const loadEmail = async () => {
            const userEmail = await AsyncStorage.getItem('user_email');
            setState(prevState => ({
                ...prevState,
                email: userEmail || ''
            }));
        };
        loadEmail();
    }, []);
    const validaSenha = () => {
        const senha = state.senha;
        if (senha.length <= 0) {
            setState(prevState => ({
                ...prevState,
                isSenhaValida: false,
                senhaValidaLabel: 'Digite uma senha válida'
            }));
            return false;
        } else {
            setState(prevState => ({
                ...prevState,
                isSenhaValida: true
            }))
            return true;
        }
    }
    const login = async () => {
        if (!validaSenha()) { return }
        setState(prevState => ({
            ...prevState,
            isLoggingIn: true
        }))
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
                        email: state.email,
                        reqPassword: state.senha
                    });
                    loginToken = response.data.token;
                    await AsyncStorage.setItem('login_token', loginToken);
                }

                const userInfo = response.data.user;
                const isLoginValid = response.data.valid;

                if (isLoginValid) {
                    await AsyncStorage.setItem('user_email', response.data.user.email);
                    await AsyncStorage.setItem('user_pass', state.senha);
                    router.replace({
                        pathname: '/home/[id]',
                        params: {
                            id: userInfo.id,
                            name: userInfo.name,
                            email: userInfo.email,
                            isAdmin: userInfo.isAdmin,
                            createdAt: userInfo.createdAt,
                            password: state.senha
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
                    setState(prevState => ({
                        ...prevState,
                        isLoggingIn: false
                    }))
                    break;
                }
            }
        }
        setState(prevState => ({
            ...prevState,
            isLoggingIn: false
        }))
    };
    return (
        <ImageBackground
            source={require('../../assets/images/azulejos-background.jpg')} // Adicione o caminho da sua imagem de fundo
            style={styles.backgroundImage}
        >
            <View style={styles.container}>

                <>
                    <Text style={styles.textLogin}>VisiTour</Text>
                    <Input label="Email" value={state.email} onChangeText={handleEmailChange} placeholder="Digite seu email" autoCapitalize="none" keyboardType='email-address' />
                    <PasswordInput label="Senha" value={state.senha} onChangeText={handlePasswordChange} placeholder="Digite sua sena" autoCapitalize="none" invalidLabel={!state.isSenhaValida === true ? state.senhaValidaLabel : null} />

                    {state.isLoggingIn === true ? (
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
                    <ModalAccount modalVisibility={state.modalVisibility} setModalVisibility={handleModalChange} />
                </>

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