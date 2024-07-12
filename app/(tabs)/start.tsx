import React, { useState } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router'

import { useLandscapeOrientation } from '@/hooks/useOrientation'
import SharedScreen from '@/components/SharedScreen'
import CustomButton from '@/components/CustomButton'
import Scene from '@/components/Scene'

import home from '@/assets/buttons/home.png'
import bg from '@/assets/main-game/bg-default.png'

const Start = () => {
  const router = useRouter()

  // UseEffect func
  useLandscapeOrientation()

  const handleHomeClick = () => router.push(`/menu`)

  return <Scene />

  // <View className='flex-1 justify-center items-center'>
  {
    /* <View className=''> */
  }
  {
    /* <View>
          <Image source={coins} resizeMode='cover' />
          <Image source={health} resizeMode='cover' />
        </View> */
  }

  {
    /* HOME BUTTON */
  }
  {
    /* </View> */
  }

  {
    /* <SharedScreen isDarkened={false}></SharedScreen> */
  }

  {
    /* <View className='flex-1'>
        <ImageBackground source={bg} resizeMode='cover' className='flex-1'></ImageBackground>
        </View> */
  }

  {
    /* <View className='bg'></View>
      <View className='ground'></View>
      <View className='monkey'></View>
      <View className='obstacles'></View> */
  }

  {
    /* <View>
        <CustomButton
        image={home}
        onPress={handleHomeClick}
        containerStyles='absolute top-4 left-4 z-10'
        buttonStyles={'max-h-[36px] max-w-[36px]'}
        />
        <Text>Start</Text>
      </View> */
  }
  {
    /* </View> */
  }
  // )
}

export default Start
