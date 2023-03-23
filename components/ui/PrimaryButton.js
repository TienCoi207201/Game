import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../contants/colors'

export default function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => pressed
          ? [styles.buttonInnerContainer, styles.pressed]
          : styles.buttonInnerContainer}
        onPress={onPress}
        android_ripple={{ color: colors.primary600 }}
      >
        <Text style={styles.button}>{children}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,
    borderRadius: 28,
    overflow: 'hidden'
  },
  buttonInnerContainer: {
    backgroundColor: colors.primary500,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    margin: 4
  },
  button: {
    color: 'white',
    textAlign: 'center'
  },
  pressed: {
    opacity: 0.75
  }
})