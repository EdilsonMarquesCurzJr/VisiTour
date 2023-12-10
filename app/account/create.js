import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Input from "../../components/Input/input";
import { RedirectButton } from "../../components/RedirectButton/RedirectButton";
import { StateButton } from "../../components/StateButton/StateButton";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirm, setSenhaConfirm] = useState('');

    const [isSenhaValida, setIsSenhaValida] = useState(null);
    const [senhaValidaLabel, setSenhaValidaLabel] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [isEmailValidLabel, setIsEmailValidLabel] = useState(null)
    const [isSenhaDiff, setIsSenhaDiff] = useState(null);
    const [isSenhaDiffLabel, setIsSenhaDiffLabel] = useState(null);
    const [isNomeValid, setIsNomeValid] = useState(null);
    const [isNomeValidLabel, setIsNomeValidLabel] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const apiURL = 'http://192.168.1.12:5000/';
    useEffect(() => {
        var senhaLength = senha.length;
        if (senhaLength > 0 && senhaLength < 8) {
            setIsSenhaValida(false);
            setSenhaValidaLabel('Senha de no mínimo 8 dígitos.')
        } else {
            setIsSenhaValida(true);
            setSenhaValidaLabel(null);
        }
        if (email.length > 0) {
            let regex = /[@]/g;
            let match = email.match(regex);
            if (match !== null && match.length === 1) {
                setIsEmailValid(true);
            } else {
                setIsEmailValid(false);
                setIsEmailValidLabel('Email Inválido.');
            }

        } else {
            setIsEmailValid(null);
            setIsEmailValidLabel(null);
        }
        setIsNomeValid(null);
        setIsSenhaDiff(null);
    }, [senha, email, nome]);
    const createAccount = async () => {
        const isCredenciaisValid = validateData();
        if (isCredenciaisValid) {
            setIsCreating(true);
            const app = axios.create({
                baseURL: apiURL
            });
            const dataSend = {
                name: nome,
                email,
                password: senha
            }
            try {
                const response = await app.post('/user-create', dataSend);
                const { status, data } = response;
                if (status === 201) {
                    const token = data.token
                    const user = data.user;
                    AsyncStorage.setItem('login_token', token);
                    AsyncStorage.setItem('user_email', user.email);
                    AsyncStorage.setItem('user_id', String(user.id));
                    router.replace({
                        pathname: '/account/preferences',
                        params: user
                    });
                }
            } catch (error) {
                const errorData = error.response.data;
                if (errorData.type === 'db_process') {
                    console.error('Erro ao criar a conta')
                }
            }

        }
        setIsCreating(false);
    };

    const validateData = () => {
        if (nome.length === 0) {
            setIsNomeValid(false);
            setIsNomeValidLabel('Campo obrigatório');
            return false;
        }
        if (!isEmailValid === true) {
            setIsEmailValid(false);
            setIsEmailValidLabel('Email inválido');
            return false;
        }

        if (senhaConfirm.length === 0) {
            setIsSenhaDiff(true);
            setIsSenhaDiffLabel('Este campo é obrigatório');
            return false;
        }
        if (senhaConfirm !== senha) {
            setIsSenhaValida(false);
            setSenhaValidaLabel('As senhas estão diferentes');
            setSenhaConfirm('');
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>

            <RedirectButton href="/" asChild replace={true}>
                <Pressable style={styles.returnButton}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </Pressable>
            </RedirectButton>
            <Text style={styles.title}>Cadastro</Text>
            <Input label="Nome" value={nome} onChangeText={setNome} placeholder="Informe seu nome" invalidLabel={isNomeValid === false ? isNomeValidLabel : null} />
            <Input label="Email" value={email} onChangeText={setEmail} placeholder="Digite seu email" invalidLabel={isEmailValid === false ? isEmailValidLabel : null} autoCapitalize="none" keyboardType='email-address' />
            <PasswordInput label="Senha" value={senha} onChangeText={setSenha} placeholder="Digite uma senha" invalidLabel={!isSenhaValida === true ? senhaValidaLabel : null} autoCapitalize="none" />
            <PasswordInput value={senhaConfirm} onChangeText={setSenhaConfirm} hasShow={false} placeholder="Confirme sua senha" invalidLabel={isSenhaDiff === true ? isSenhaDiffLabel : null} autoCapitalize="none" />

            {isCreating === true ? (
                <View style={styles.createLoader}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : (
                <StateButton style={styles.createButton} onPress={createAccount}>
                    <Text style={styles.createButtonText}>
                        Criar
                    </Text>
                </StateButton>

            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        rowGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2D5D8',
    },
    returnButton: {
        position: 'absolute',
        left: 20,
        top: 60
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000'
    },
    createButton: {
        padding: 15,
        width: 227,
        backgroundColor: '#252526',
        borderRadius: 25
    },
    createButtonText: {
        textAlign: "center",
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    createLoader: {
        width: 227,
        backgroundColor: '#252526',
        borderRadius: 25,
        padding: 8,

    }

});