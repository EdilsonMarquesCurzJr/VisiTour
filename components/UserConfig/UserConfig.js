import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../Input/input";
import Checkbox from "expo-checkbox";

export default function UserUpdate() {
    const app = axios.create({
        baseURL: process.env.EXPO_PUBLIC_API_URL
    });
    const [shouldRenderCheckBoxes, setShouldRenderCheckBoxes] = useState(true);
    const [state, setState] = useState({
        nome: '',
        senha: '',
        email: '',
        userId: null,
        error: false,
        fixedName: '',
        defaultName: '',
        isUpdating: false,
        userPreferences: [],
        isFetchingData: true,
        defaultPreferences: [],
        shouldUpdate: {
            name: false,
            email: false,
            senha: false,
        },
    });
    const [preferences, setPreferences] = useState({});
    const RowSection = ({ children, style, ...props }) => {
        return (
            <View {...props} style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', ...style }}>
                {children}
            </View>
        );
    }
    const atualizarEmail = novoEmail => {
        setState(prevState => ({
            ...prevState,
            email: novoEmail
        }));
    }
    const atualizarSenha = novaSenha => {
        setState(prevState => ({
            ...prevState,
            senha: novaSenha
        }));
    }
    const atualizarNome = novoNome => {
        setState(prevState => ({
            ...prevState,
            nome: novoNome
        }));
    }

    const handleChange = (key) => {
        setPreferences({
            ...preferences,
            [key]: !preferences[key]
        });
    };
    const renderCheckBoxes = () => {
        const CheckBox = ({ value, onChange, label = null, ...props }) => {
            return (
                <View style={styles.section}>
                    <Checkbox
                        {...props}
                        value={value}
                        onValueChange={onChange}
                        style={{ width: 25, height: 25, marginRight: 2 }}
                    />
                    <Text style={styles.paragraph}>{label}</Text>
                </View>
            );
        }
        const values = state.defaultPreferences;
        const flagPref = preferences;

        return values.map(pref => {
            const key = `is${pref.name.replace(/\s/g, '')}`

            return (
                <CheckBox value={flagPref[key]} style={styles.checkbox}
                    color={flagPref[key] ? '#252526' : undefined}
                    label={pref.name}
                    onChange={() => handleChange(key)}
                />
            )
        });
    }

    const fetchUserData = async () => {
        setShouldRenderCheckBoxes(false);
        setState(prevState => ({
            ...prevState,
            isFetchingData: true
        }));
        try {
            const email = await AsyncStorage.getItem("user_email");
            const password = await AsyncStorage.getItem("user_pass");
            const userResponse = await app.post('/fetch-user-data', { email, password });
            const prefsResponse = await app.get('/fetch-prefs-list');
            const { name, id, preferences } = userResponse.data.user;
            const prefs = prefsResponse.data.prefs;
            setState(prevState => ({
                ...prevState,
                nome: name,
                email: email,
                senha: password,
                userPreferences: preferences,
                defaultPreferences: prefs,
                error: false,
                userId: id,
                defaultName: name
            }));
        } catch (error) {
            console.error(error);
            setState(prevState => ({
                ...prevState,
                isFetchingData: false,
                error: true
            }));
        }
        setShouldRenderCheckBoxes(true);
        setState(prevState => ({
            ...prevState,
            isFetchingData: false
        }));
    }
    const updateInfo = async () => {
        setShouldRenderCheckBoxes(false);
        const email = await AsyncStorage.getItem('user_email');
        const senha = await AsyncStorage.getItem('user_pass');
        const addPrefs = [];
        const removePrefs = [];

        const userPreferences = state.userPreferences;
        const defaultPreferences = state.defaultPreferences;
        const flagPref = preferences;
        Object.entries(flagPref).forEach(([key, value]) => {

            let nameToCompare = key.replace(/^is/, '').replace(/_/g, '');
            const correspondingObj = defaultPreferences.find(obj => {
                const formattedObjName = obj.name.replace(/\s/g, '');
                return formattedObjName === nameToCompare;
            });

            if (correspondingObj) {
                if (value && !userPreferences.some(userObj => userObj.id === correspondingObj.id)) {
                    addPrefs.push(correspondingObj.name);
                } else if (!value && userPreferences.some(userObj => userObj.id === correspondingObj.id)) {
                    removePrefs.push(correspondingObj.name);
                }
            }
        });
        if (state.email !== email) {
            setState(prevState => ({
                shouldUpdate: {
                    ...prevState.shouldUpdate,
                    email: true
                }
            }));
        }
        if (state.senha !== senha) {
            setState(prevState => ({
                shouldUpdate: {
                    ...prevState.shouldUpdate,
                    senha: true
                }
            }));
        }
        if (state.nome !== state.defaultName) {
            setState(prevState => ({
                shouldUpdate: {
                    ...prevState.shouldUpdate,
                    name: true
                }
            }))
        }
        setState(prevState => ({
            ...prevState,
            isUpdating: true
        }));
        try {
            const nome = state.nome;
            const email = state.email;
            const senha = state.senha;
            const id = state.userId;
            const flags = state.shouldUpdate
            const response = await app.post('/update-user', {
                addPrefs,
                removePrefs,
                nome,
                email,
                senha,
                id,
                flags

            });
            const { message } = response.data;
            setState(prevState => ({
                ...prevState,
                isUpdating: false
            }));
            await AsyncStorage.setItem("user_email", email);
            await AsyncStorage.setItem("user_pass", senha);
            setState(prevState => ({
                ...prevState,
                defaultName: nome
            }))
            await fetchUserData();
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                isUpdating: false
            }));
            console.error(error);
        }
        setState(prevState => ({
            ...prevState,
            isUpdating: false
        }));
        setShouldRenderCheckBoxes(true);
    }
    useEffect(() => {
        if (state.defaultPreferences) {
            const initialPrefs = state.defaultPreferences.reduce((acc, pref) => {
                acc[`is${pref.name.replace(/\s/g, '_')}`] = state.userPreferences.some(
                    userPref => userPref.id === pref.id
                );
                return acc;
            }, {});
            setPreferences(initialPrefs);

        }
    }, [state.defaultPreferences, state.userPreferences]);
    useEffect(() => {
        fetchUserData();
    }, [])
    const ReloaderButton = () => {

        return (
            <TouchableOpacity onPress={fetchUserData} style={styles.reloaderButton}>
                <AntDesign name="reload1" size={25} color="white" />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Alterar dados da conta",
                    headerStyle: { backgroundColor: '#D2D5D8' },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerShown: true,
                    headerTransparent: true,

                }}
            />

            {state.isFetchingData === true ? (
                <View style={styles.feedLoader}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>

            ) : (
                <View style={styles.form}>
                    {state.error && !state.isFetchingData ? (
                        <ReloaderButton />
                    ) : (
                        <>
                            <Input label="Nome" onChangeText={atualizarNome} value={state.nome} />
                            <Input label="Email" onChangeText={atualizarEmail} value={state.email} />
                            <Input label="Senha" onChangeText={atualizarSenha} value={state.senha} />

                            {shouldRenderCheckBoxes && (
                                <RowSection>
                                    {renderCheckBoxes()}
                                </RowSection>
                            )}
                            {state.isUpdating === true ? (
                                <View style={styles.updateLoader}>
                                    <ActivityIndicator size="large" color="#fff" />
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.updateButton} onPress={updateInfo}>
                                    <Text style={styles.updateButtonText}>
                                        Atualizar
                                    </Text>
                                </TouchableOpacity>

                            )}
                        </>

                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D2D5D8",
    },
    feedLoader: {

        backgroundColor: "#4E4E4E",
        padding: 8,
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "10%"

    },
    form: {
        rowGap: 20,
        alignItems: "center"
    },
    updateButton: {
        padding: 15,
        width: 227,
        backgroundColor: '#252526',
        borderRadius: 25
    },
    updateButtonText: {
        textAlign: "center",
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    updateLoader: {
        padding: 8,
        width: 227,
        backgroundColor: '#252526',
        borderRadius: 25

    },
    reloaderButton: {
        backgroundColor: "#4E4E4E",
        padding: 8,
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        margin: 8
    },
    paragraph: {
        fontSize: 16,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4
    },
});