import React from 'react'
import { View, ImageBackground, SafeAreaView, ImageSourcePropType } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import bg from '@/assets/bg-port.png'
interface Props {
  image?: ImageSourcePropType
  children: React.ReactElement
  isDarkened: boolean
}

const SharedScreen: React.FC<Props> = ({ image, children, isDarkened }) => {
  const colors = isDarkened ? ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)'] : ['transparent']

  return (
    <View className='flex-1'>
      <ImageBackground source={image ? image : bg} resizeMode='cover' className='flex-1'>
        <LinearGradient colors={colors} className='flex-1'>
          <SafeAreaView className='flex-1'>{children}</SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default SharedScreen
