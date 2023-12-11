import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { StateButton } from "../../components/StateButton/StateButton";
import { Stack, router, useLocalSearchParams } from "expo-router";
import axios from "axios";
export default function PreferencesPage() {
    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    const params = useLocalSearchParams();
    const [isCultural, setIsCultural] = useState(false);
    const [isLazer, setIsLazer] = useState(false);
    const [isFestas, setIsFestas] = useState(false);
    const [isReservado, setIsReservado] = useState(false);
    const [isLitoral, setIsLitoral] = useState(false);
    const [isNatureza, setIsNatureza] = useState(false);
    const [isCulinariaLocal, setIsCulinariaLocal] = useState(false);
    const [isTeatros, setIsTeatros] = useState(false);
    const [isSavingPrefs, setIsSavingPrefs] = useState(false);
    const ColumnSection = ({ children, style, ...props }) => {
        return (
            <View  {...props} style={{ flexDirection: 'column', ...style }}>
                {children}
            </View>
        );
    }
    const RowSection = ({ children, style, ...props }) => {
        return (
            <View {...props} style={{ flexDirection: 'row', justifyContent: 'center', ...style }}>
                {children}
            </View>
        );
    }
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
    const savePref = async () => {
        setIsSavingPrefs(true);
        const prefNames = [];
        if (isCultural) { prefNames.push('cultural'); }
        if (isLazer) { prefNames.push('lazer'); }
        if (isFestas) { prefNames.push('festas'); }
        if (isReservado) { prefNames.push('reservado'); }
        if (isLitoral) { prefNames.push('litoral'); }
        if (isNatureza) { prefNames.push('natureza'); }
        if (isCulinariaLocal) { prefNames.push('culinaria local'); }
        if (isTeatros) { prefNames.push('teatros'); }
        const app = axios.create({
            baseURL: apiURL
        });
        const dataSend = {
            userId: parseInt(params.id),
            prefNames
        }
        try {
            const response = await app.post('/user-prefs', dataSend);
            const { status, data } = response;
            if (status === 200) {
                router.replace({
                    pathname: '/home/[id]',
                    params: {
                        id: params.id,
                        name: params.name,
                        email: params.email,
                        isAdmin: params.isAdmin,
                        createdAt: params.createdAt,
                        password: params.password
                    }
                })
            } else {
                console.error("Ocorreu um erro ao tentar adicionar as preferências");
            }
        } catch (error) {
            const errorData = error.response.data;
            if (errorData.type === 'db_process') {
                console.error('Erro ao criar a conta');
                console.error(errorData.errors);
            }
        }
        setIsSavingPrefs(false);
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Selecione suas preferências',
                    headerStyle: { backgroundColor: '#D2D5D8' },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTitleAlign: 'left',
                    headerShown: true,
                    headerTransparent: true,

                }}
            />

            {/* <Text style={styles.pageTitle}>Escolha suas preferências</Text> */}
            <ColumnSection style={{ alignItems: 'center' }}>
                <RowSection>
                    <ColumnSection style={{ alignItems: 'flex-start' }}>
                        <CheckBox value={isCultural} onChange={setIsCultural} style={styles.checkbox}
                            color={isCultural ? '#252526' : undefined} label="Cultural" />

                        <CheckBox value={isLazer} onChange={setIsLazer} style={styles.checkbox}
                            color={isLazer ? '#252526' : undefined} label="Lazer" />

                        <CheckBox value={isFestas} onChange={setIsFestas} style={styles.checkbox}
                            color={isFestas ? '#252526' : undefined} label="Festas" />

                        <CheckBox value={isReservado} onChange={setIsReservado} style={styles.checkbox}
                            color={isReservado ? '#252526' : undefined} label="Reservado" />

                    </ColumnSection>
                    <ColumnSection style={{ marginLeft: 20, alignItems: 'flex-start' }}>
                        <CheckBox value={isLitoral} onChange={setIsLitoral} style={styles.checkbox}
                            color={isLitoral ? '#252526' : undefined} label="Litoral" />

                        <CheckBox value={isNatureza} onChange={setIsNatureza} style={styles.checkbox}
                            color={isNatureza ? '#252526' : undefined} label="Natureza" />

                        <CheckBox value={isCulinariaLocal} onChange={setIsCulinariaLocal} style={styles.checkbox}
                            color={isCulinariaLocal ? '#252526' : undefined} label="Culinára Local" />

                        <CheckBox value={isTeatros} onChange={setIsTeatros} style={styles.checkbox}
                            color={isTeatros ? '#252526' : undefined} label="Teatros" />


                    </ColumnSection>
                </RowSection>
                {isSavingPrefs === true ? (
                    <View style={styles.concludeLoader}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>

                ) : (
                    <StateButton style={styles.concludeButton} onPress={savePref}>
                        <Text style={styles.concludeButtonText}>Concluído</Text>
                    </StateButton>

                )}

            </ColumnSection>
        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f4a3b2'

    },
    pageTitle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 28
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4
    },
    paragraph: {
        fontSize: 18,
    },
    checkbox: {
        margin: 8,
    },
    header: {
        position: 'absolute',
        left: 20,
        top: 60
    },
    concludeButton: {
        padding: 15,
        width: 227,
        backgroundColor: '#252526',
        borderRadius: 25,
        marginTop: 10
    },
    concludeButtonText: {
        textAlign: "center",
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    concludeLoader: {
        padding: 8,
        width: 227,
        backgroundColor: '#252526',
        borderRadius: 25,
        marginTop: 10
    }
});