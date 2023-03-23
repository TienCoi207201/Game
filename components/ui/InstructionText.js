import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../contants/colors'

export default function InstructionText({ children, style }) {
  return (
    <Text style={[styles.instructionText, style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: colors.accent500,
    fontSize: 24
  },
})