import { View, Text, StyleSheet, Alert, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons} from '@expo/vector-icons'

import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'
import GuessLogItem from '../components/game/GuessLogItem'

function genarateRandomBetween(min, max, exclude) {
  const rndNumber = Math.floor(Math.random() * (max - min) + min)

  if (rndNumber === exclude) {
    return genarateRandomBetween(min, max, exclude)
  } else
    return rndNumber
}

let minBoundary = 1
let maxBoundary = 100

export default function GameScreen({ userNumber, onGameOver }) {
  const initGuess = genarateRandomBetween(minBoundary, maxBoundary, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initGuess)
  const [guessRounds, setGuessRounds] = useState([initGuess])

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length)
    }
  }, [currentGuess, userNumber, onGameOver])

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [])
  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }
    console.log(minBoundary, maxBoundary)
    const newRndNumber = genarateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRndNumber)
    setGuessRounds(prev => [newRndNumber, ...prev])
  }

  const guessRoundListLength = guessRounds.length

  return (
    <View style={styles.screen}>
      <Title>Oppnent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name='md-remove' size={24} color="white"/>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name='md-add' size={24} color="white"/>
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundListLength - itemData.index} guess={itemData.item}/>}
          keyExtractor={(item => item)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 35
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  instructionText: {
    marginBottom: 12
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
})