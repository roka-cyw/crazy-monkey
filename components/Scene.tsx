import React, { useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Canvas, useImage, Image, Circle } from '@shopify/react-native-skia'

import CustomButton from './CustomButton'
import SharedScreen from './SharedScreen'
import Countdown from './Countdown'
import Grounds from './Grounds'

import home from '@/assets/buttons/home.png'
import bg from '@/assets/main-game/bg-default.png'
import groundStart from '@/assets/main-game/ground-start.png'
import ground from '@/assets/main-game/ground.png'
// import monkey from '@/assets/main-game/monkey.png'

// import Ground from './Ground'

interface Props {
  width: number
  height: number
}

const Scene: React.FC<Props> = ({ width, height }) => {
  // const { width, height } = useWindowDimensions()

  const router = useRouter()
  // const [darkened, setDarkened] = useState(false)
  const [isStartGame, setStartGame] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)
  const [countdownWasShowed, setCountdownWasShowed] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [coins, setCoins] = useState(0)

  // const gameOver = useSharedValue(false)

  const monkey = useImage(require('@/assets/main-game/monkey.png'))

  // useEffect(() => {
  //   console.log('USEFECT')

  //   // return () => setCountdownWasShowed(false)
  // }, [countdownWasShowed])

  const gesture = Gesture.Tap().onStart(() => {
    // if (gameOver.value) {
    if (gameOver) {
      restartGame()
    } else {
      console.log('start animation')
    }
  })

  const restartGame = () => console.log('RESTART GAME')

  const handleHomeClick = () => {
    router.push('/menu')
  }

  // const handleRestart = () => {
  //   setStartGame(false)
  //   setDarkened(true)
  //   setShowGameOver(false)
  // }

  // const handleGameOver = () => {
  //   setShowGameOver(true)
  //   setDarkened(true)
  // }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* <SharedScreen isDarkened={darkened} image={bg}> */}
          {/* <View className='flex-1 justify-center items-center'> */}
          {/* <View>/ */}

          {/* // Monkey */}
          {/* <Image image={monkey} width={width / 2} height={height / 2} /> */}
          {/* <Image image={groundStart} width={164} height={32} /> */}
          {/* // Grounds */}
          {/* <Grounds2 width={width} height={height} /> */}
          {/* <Circle r={50} cx={100} cy={100} color='red' /> */}
          <Grounds width={width} height={height} />

          {/* <Text className='text-4xl text-white font-bold'>CANVAS</Text> */}
          {/* </View>/ */}
          {/* {!isStartGame && (
              <Countdown
                isStartGame={isStartGame}
                setStartGame={setStartGame}
                setDarkened={setDarkened}
                countdownWasShowed={countdownWasShowed}
              />
            )} */}
          {/* {!isStartGame && !showGameOver && <Text className='text-4xl text-white font-bold'>Start game!</Text>} */}

          {/* <Ground gameOver={gameOver} /> */}
          {/* {!isStartGame && !showGameOver && (
          <CustomButton title='End Game' onPress={handleGameOver} containerStyles='mt-4' />
        )}
        {showGameOver && (
          <View className='bg-black bg-opacity-50 p-4 rounded-lg'>
            <Text className='text-4xl text-white font-bold mb-4'>Game Over</Text>
            <CustomButton title='Restart' onPress={handleRestart} containerStyles='mt-4' />
          </View>
        )} */}
          {/* </View> */}
          {/* </SharedScreen> */}
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default Scene
