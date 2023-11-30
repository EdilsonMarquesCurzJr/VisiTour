import { Pressable, StyleSheet, View, Text } from "react-native";
import { RedirectButton } from "../../components/RedirectButton/RedirectButton";
import { AntDesign } from '@expo/vector-icons';
import Input from "../../components/Input/input";
import React, { useState, useEffect } from "react";
export default function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirm, setSenhaConfirm] = useState('');

    const [isSenhaValida, setIsSenhaValida] = useState(true);
    const [senhaValidaLabel, setSenhaValidaLabel] = useState(null);

    useEffect(() => {
        var senhaLength = senha.length;
        if (senhaLength > 0 && senhaLength < 8) {
            setIsSenhaValida(false);
            setSenhaValidaLabel('Senha de no mínimo 8 dígitos.')
        } else {
            setIsSenhaValida(true);
            setSenhaValidaLabel(null);
        }
    }, [senha]);


    return (
        <View style={styles.container}>

            <RedirectButton href="/" asChild>
                <Pressable style={styles.returnButton}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </Pressable>
            </RedirectButton>
            <Text style={styles.title}>Cadastro</Text>
            <Input label="Nome" value={nome} onChangeText={setNome} placeholder="Informe seu nome" />
            <Input label="Email" value={email} onChangeText={setEmail} placeholder="Digite seu email" />
            <Input label="Senha" invalidLabel={!isSenhaValida ? senhaValidaLabel : null} value={senha} onChangeText={setSenha} secureTextEntry={true} placeholder="Digite uma senha" />
            <Input value={senhaConfirm} onChangeText={setSenhaConfirm} secureTextEntry={true} placeholder="Confirme sua senha" />

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
    }
});