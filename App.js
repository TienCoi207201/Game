import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import colors from './contants/colors';
import GameOverScreen from './screens/GameOverScreen';
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen
      userNumber={userNumber}
      roundsNumber={guessRounds}
      onStartNewGame={startNewGameHandler}
    />
  }
  return (
    <LinearGradient colors={[colors.primary700, colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={{ opacity: 0.15 }}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  }
});