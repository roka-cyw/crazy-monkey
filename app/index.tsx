import React from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import { useRouter } from 'expo-router'

import SharedScreen from '@/components/SharedScreen'

import logoBig from '@/assets/logo-big.png'
import tapScreen from '@/assets/tap-screen.png'

const App = () => {
  const router = useRouter()

  const handleButtonClick = () => router.push('/daily-bonus')

  return (
    <SharedScreen isDarkened={false}>
      <TouchableWithoutFeedback onPress={handleButtonClick}>
        <View className='flex-1 justify-between items-center'>
          <Image source={logoBig} resizeMode='cover' className='mt-14' />
          <Image source={tapScreen} resizeMode='cover' />
        </View>
      </TouchableWithoutFeedback>
    </SharedScreen>
  )
}

export default App
