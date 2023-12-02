import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { StateButton } from "../StateButton/StateButton";
import { RedirectButton } from "../RedirectButton/RedirectButton";
import React from "react";
export const ModalAccount = React.forwardRef(({ modalVisibility, setModalVisibility, ...props }, ref) => {


    return (
        <Modal
            animationType="slide"
            visible={modalVisibility}
            onRequestClose={() => {
                setModalVisibility(!modalVisibility);
            }}
            presentationStyle="overFullScreen"
            transparent={true}
            ref={ref}
        >
            <View className="flex-1 justify-center items-center bg-blackOpaque">
                <View style={styles.ModalContainer} className="items-center p-9 rounded-lg bg-black">
                    <Text style={styles.ModalHeader} className="text-white text-lg">O que você quer fazer?</Text>
                    <RedirectButton asChild href="/account/create" >
                        <Pressable onPress={() => setModalVisibility(false)} style={{ ...styles.pressable, marginBottom: 40 }} className="p-2 rounded-md bg-buttomBackground items-center justify-center">
                            <Text style={styles.buttonText} className="text-black">Criar Conta </Text>
                        </Pressable>
                    </RedirectButton>
                    <RedirectButton asChild href="/" >
                        <Pressable onPress={() => setModalVisibility(false)} style={styles.pressable} className="p-2 rounded-md bg-buttomBackground items-center justify-center">
                            <Text style={styles.buttonText} className="text-black">Trocar Conta</Text>
                        </Pressable>
                    </RedirectButton>
                    <StateButton style={styles.buttonReturn} onPress={() => setModalVisibility(false)}>
                        <Text style={styles.buttonText} className="text-white">Voltar</Text>
                    </StateButton>
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        fontWeight: '700'
    },
    pressable: {
        width: 200
    },
    ModalContainer: {
        width: 320,
        minHeight: 250

    },
    ModalHeader: {
        marginBottom: 16
    },
    buttonReturn: {
        marginTop: 10
    }
})
export default ModalAccount;