import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Input from "../../components/Input/input";
import { RedirectButton } from "../../components/RedirectButton/RedirectButton";
import { StateButton } from "../../components/StateButton/StateButton";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
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
        setIsSenhaDiff(null);
    }, [senha, email, senhaConfirm]);

    const validateData = () => {
        if (!isEmailValid === true) {
            setIsEmailValid(false);
            setIsEmailValidLabel('Email inválido');
            return;
        }


        if (senhaConfirm.length === 0) {
            setIsSenhaDiff(true);
            setIsSenhaDiffLabel('Este campo é obrigatório');
            return;
        }
        if (senhaConfirm !== senha) {
            setIsSenhaValida(false);
            setSenhaValidaLabel('As senhas estão diferentes');
            setSenhaConfirm('');
            return;
        }
        if (isSenhaValida === true) {
            console.log("Validado");
        }
    }

    return (
        <View style={styles.container}>

            <RedirectButton href="/" asChild>
                <Pressable style={styles.returnButton}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </Pressable>
            </RedirectButton>
            <Text style={styles.title}>Cadastro</Text>
            <Input label="Nome" value={nome} onChangeText={setNome} placeholder="Informe seu nome" />
            <Input label="Email" value={email} onChangeText={setEmail} placeholder="Digite seu email" invalidLabel={isEmailValid === false ? isEmailValidLabel : null} />
            <PasswordInput label="Senha" value={senha} onChangeText={setSenha} placeholder="Digite uma senha" invalidLabel={!isSenhaValida === true ? senhaValidaLabel : null} />
            <PasswordInput value={senhaConfirm} onChangeText={setSenhaConfirm} hasShow={false} placeholder="Confirme sua senha" invalidLabel={isSenhaDiff === true ? isSenhaDiffLabel : null} />

            <StateButton style={styles.createButton} onPress={validateData}>
                <Text style={styles.createButtonText}>
                    Criar
                </Text>
            </StateButton>

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
    }
});