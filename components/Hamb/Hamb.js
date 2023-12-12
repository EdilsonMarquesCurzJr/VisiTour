import React from "react";
import { View, Text, Modal, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router, useNavigation } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

export const Hamb = React.forwardRef(({ HambVisibility, setHambVisibility, ...props }, ref) => {
    const navigation = useNavigation();  // Use o hook dentro do componente funcional
    const gotToLogin = () => {
        setHambVisibility(false);
        router.replace('/');
    }
    const goToConfig = () => {
        setHambVisibility(false);
        router.push('/account/config');
    }
    const goToFeedback = () => {
        setHambVisibility(false);
        router.push('/Feed/FeedOptions');
    }
    return (
        <Modal
            animationType="fade"
            visible={HambVisibility}
            onRequestClose={() => {
                setHambVisibility(!HambVisibility);
            }}
            presentationStyle="overFullScreen"
            transparent={true}
            ref={ref}
        >
            <View style={styles.container}>
                <Ionicons style={styles.userIcon} name="md-person" size={24} color="black" />
                <Text>Usuário</Text>
                <View style={styles.options}>
                    <TouchableOpacity onPress={goToConfig}>
                        <View style={styles.optionIcons}>
                            <Ionicons name="md-person" size={20} />
                            {/* <Ionicons name="settings" size={20} /> */}
                            <Text>Conta</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.optionIcons}>
                        <Ionicons name="md-person" size={20} />
                        <Text>Conta</Text>
                    </View> */}
                    <TouchableOpacity onPress={goToFeedback}>
                        <View style={styles.optionIcons}>
                            {/* <Ionicons name="md-person" size={20} /> */}
                            <MaterialIcons name="feedback" size={24} color="black" />
                            <Text>Feedback</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={gotToLogin}>
                        <View style={styles.optionIcons}>
                            <Ionicons name="exit" size={20} />
                            <Text>Sair</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Pressable onPress={() => { setHambVisibility(false) }} style={styles.backIcon}>
                    <Ionicons name="arrow-back" style={styles.backIcon} size={30} />
                </Pressable>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    container: {

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        width: "50%",
        height: "100%",
        zIndex: 1,
        marginLeft: 0,
        borderBottomEndRadius: 25,
        borderTopEndRadius: 25,
    },
    userIcon: {
        justifyContent: "center",
        verticalAlign: "middle",
        textAlign: "center",
        borderBottomColor: "#000",
        borderWidth: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: -300,
    },
    options: {
        position: "relative",
        top: 100,
        rowGap: 25,
        marginBottom: 80,
    },
    optionIcons: {
        flexDirection: "row",
        borderBottomWidth: 3,

    },
    backIcon: {
        position: 'absolute',
        top: 40,
        left: 10,

    },
});
