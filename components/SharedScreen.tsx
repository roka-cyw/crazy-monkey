import React from 'react'
import { View, ImageBackground, SafeAreaView, ImageSourcePropType } from 'react-native'

interface Props {
  bg: ImageSourcePropType
  children: React.ReactElement
}

const SharedScreen: React.FC<Props> = ({ children, bg }) => {
  return (
    <View className='flex-1'>
      <ImageBackground source={bg} resizeMode='cover' className='flex-1'>
        <SafeAreaView className='flex-1'>{children}</SafeAreaView>
      </ImageBackground>
    </View>
  )
}

export default SharedScreen
