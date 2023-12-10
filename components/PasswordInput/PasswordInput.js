import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StateButton } from '../StateButton/StateButton';
const PasswordInput = ({ value, onChangeText, label, invalidLabel, hasShow = true, ...props }) => {
    const [isHidden, setIsHidden] = useState(true);
    return (
        <View>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            {invalidLabel && <Text style={styles.invalidLabel}>{invalidLabel}</Text>}
            <View style={styles.container}>
                {/* <Text>a</Text>s */}
                <TextInput
                    value={value}
                    onChangeText={text => onChangeText(text)}
                    secureTextEntry={isHidden}
                    {...props}
                    style={styles.input}
                />
                {hasShow === true && (
                    <>
                        {isHidden === true ? (
                            <StateButton onPress={() => setIsHidden(false)} style={styles.icon}>
                                <Feather name="eye-off" size={24} color="black" />
                            </StateButton>
                        ) : (
                            <StateButton onPress={() => setIsHidden(true)} style={styles.icon}>
                                <Feather name="eye" size={24} color="black" />
                            </StateButton>
                        )}
                    </>
                )}

            </View>

        </View>

    );


}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        borderRadius: 25,
        backgroundColor: '#fff'
    },
    input: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: "90%",
    },
    icon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        right: 10,
        // backgroundColor: '#165',

    },
    inputLabel: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',

    },
    invalidLabel: {
        fontSize: 16,
        fontWeight: '400',
        color: '#F01E2C'
    },
});



export default PasswordInput;