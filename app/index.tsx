import React from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import { useRouter } from 'expo-router'

import SharedScreen from '@/components/SharedScreen'
import { usePortraitOrientation } from '@/hooks/useOrientation'

import logo from '@/assets/logo.png'
import tapScreen from '@/assets/tap-screen.png'

const App = () => {
  usePortraitOrientation()
  const router = useRouter()

  const handleButtonClick = () => router.push('/daily-bonus')

  return (
    <SharedScreen isDarkened={false}>
      <TouchableWithoutFeedback onPress={handleButtonClick}>
        <View className='flex-1 justify-between items-center'>
          <Image source={logo} resizeMode='cover' className='mt-14 max-h-[294px] max-w-[294px]' />
          <Image source={tapScreen} resizeMode='cover' className='max-w-64 max-h-12' />
        </View>
      </TouchableWithoutFeedback>
    </SharedScreen>
  )
}

export default App
