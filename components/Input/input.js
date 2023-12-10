import React from 'react';
import { TextInput, View, Text, Appearance, StyleSheet } from 'react-native';
import { inputStyles } from './inputStyles';

const Input = ({ value, onChangeText, label, invalidLabel, ...props }) => {
    return (
        <View>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            {invalidLabel && <Text style={styles.invalidLabel}>{invalidLabel}</Text>}
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={value}
                    onChangeText={text => onChangeText(text)}
                    {...props}
                />
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        borderRadius: 25,
        backgroundColor: '#fff',

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
    input: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: "90%",


    }
});
export default Input;