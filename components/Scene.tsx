import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

import CustomButton from './CustomButton'
import SharedScreen from './SharedScreen'
import Countdown from './Countdown'

import home from '@/assets/buttons/home.png'
import bg from '@/assets/main-game/bg-default.png'

const Scene = () => {
  const router = useRouter()
  const [darkened, setDarkened] = useState(true)
  const [isStartGame, setStartGame] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)

  const handleHomeClick = () => {
    router.push('/menu')
  }

  const handleRestart = () => {
    setStartGame(false)
    setDarkened(true)
    setShowGameOver(false)
  }

  const handleGameOver = () => {
    setShowGameOver(true)
    setDarkened(true)
  }

  return (
    <SharedScreen isDarkened={darkened} image={bg}>
      <View className='flex-1 justify-center items-center'>
        {/* {!isStartGame && (
          // <Animated.Image
          //   source={countdownImages[Math.min(2, Math.floor(countdownIndex.value))]}
          //   style={[animatedStyle, { width: 128, height: 128 }]}
          //   resizeMode='contain'
          // />
          // <Countdown isStartGame={isStartGame} setStartGame={setStartGame} setDarkened={setDarkened} />
        )} */}
        {/* {!isStartGame && !showGameOver && <Text className='text-4xl text-white font-bold'>Start game!</Text>} */}
        <CustomButton
          image={home}
          onPress={handleHomeClick}
          containerStyles='absolute top-5 left-0 z-10'
          buttonStyles={'max-h-[36px] max-w-[36px]'}
        />
        {/* {!isStartGame && !showGameOver && (
          <CustomButton title='End Game' onPress={handleGameOver} containerStyles='mt-4' />
        )}
        {showGameOver && (
          <View className='bg-black bg-opacity-50 p-4 rounded-lg'>
            <Text className='text-4xl text-white font-bold mb-4'>Game Over</Text>
            <CustomButton title='Restart' onPress={handleRestart} containerStyles='mt-4' />
          </View>
        )} */}
      </View>
    </SharedScreen>
  )
}

export default Scene
