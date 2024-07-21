import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { useRouter } from 'expo-router'

import { useLandscapeOrientation } from '@/hooks/useOrientation'
import SharedScreen from '@/components/SharedScreen'
import IconButton from '@/components/IconButton'
import Scene from '@/components/Scene'

import home from '@/assets/buttons/home.png'
import bg from '@/assets/main-game/bg-default.png'

const Start = () => {
  const router = useRouter()
  const { width, height } = useWindowDimensions()

  // UseEffect func
  useLandscapeOrientation()

  const handleHomeClick = () => router.push(`/menu`)

  return (
    <SharedScreen image={bg}>
      <View className='flex-1 justify-center items-center'>
        <IconButton
          image={home}
          onPress={handleHomeClick}
          containerStyles='absolute top-5 left-0 z-10'
          buttonStyles={'max-h-[36px] max-w-[36px]'}
        />

        <Scene width={width} height={height} />
      </View>
    </SharedScreen>
  )
}

export default Start
