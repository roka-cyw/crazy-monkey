import React from 'react'
import { View, Text, ImageBackground } from 'react-native'

import bg from '@/assets/bg-port.png'

const App = () => {
  return (
    <View className='flex-1'>
      <ImageBackground source={bg} resizeMode='cover' className='flex-1'></ImageBackground>

      {/* <Image></Image> */}
      {/* <Image></Image> */}
    </View>
  )
}

export default App
