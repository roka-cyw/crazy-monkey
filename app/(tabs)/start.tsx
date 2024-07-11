import React from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

import { useLandscapeOrientation } from '@/hooks/useOrientation'

import home from '@/assets/buttons/home.png'
import CustomButton from '@/components/CustomButton'

const Start = () => {
  useLandscapeOrientation()

  const router = useRouter()

  const handleHomeClick = () => router.push(`/menu`)

  return (
    <View className='flex-1 justify-center items-center'>
      <View>
        <CustomButton
          image={home}
          onPress={handleHomeClick}
          containerStyles='absolute top-4 left-4 z-10'
          buttonStyles={'max-h-[36px] max-w-[36px]'}
        />
      </View>
      <Text>Start</Text>
    </View>
  )
}

export default Start
