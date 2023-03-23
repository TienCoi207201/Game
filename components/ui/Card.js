import { View, Text, StyleSheet } from 'react-native'
import colors from '../../contants/colors'
import React from 'react'

export default function Card({children}) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 40,
        padding: 16,
        backgroundColor: colors.primary700,
        borderRadius: 8,
        marginHorizontal: 24,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
})