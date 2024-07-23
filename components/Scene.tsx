import React, { useEffect, useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Canvas } from '@shopify/react-native-skia'

import Countdown from './Countdown'
import Grounds from './Grounds'
import Monkey from './Monkey'

interface Props {
  width: number
  height: number
}

const Scene: React.FC<Props> = ({ width, height }) => {
  const router = useRouter()
  const [isStartGame, setStartGame] = useState(false)
  const [countdownWasShowed, setCountdownWasShowed] = useState(false)

  const [gameOver, setGameOver] = useState(false)

  const [darkened, setDarkened] = useState(true)
  const [showGameOver, setShowGameOver] = useState(false)
  const [coins, setCoins] = useState(0)

  useEffect(() => {
    return () => handleRestart()
  }, [])

  const gesture = Gesture.Tap().onStart(() => {
    // if (gameOver.value) {
    if (gameOver) {
      restartGame()
    } else {
      console.log('start animation')
    }
  })

  const restartGame = () => console.log('RESTART GAME')

  // const handleHomeClick = () => {
  //   router.push('/menu')
  // }

  const handleRestart = () => {
    setStartGame(false)
    setCountdownWasShowed(false)
    setShowGameOver(false)
  }

  const handleGameOver = () => {
    setShowGameOver(true)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {!countdownWasShowed && !isStartGame && (
            <Countdown width={width} height={height} setStartGame={setStartGame} setCountdownWasShowed={setCountdownWasShowed} />
          )}

          <Grounds width={width} height={height} isStartGame={isStartGame} />
          <Monkey width={width} height={height} isStartGame={isStartGame} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default Scene
