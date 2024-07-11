import React from 'react'
import { View, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'

import SharedScreen from '@/components/SharedScreen'
import CustomButton from '@/components/CustomButton'

import logo from '@/assets/logo.png'
import settings from '@/assets/buttons/settings.png'

const Menu = () => {
  const router = useRouter()

  const btns = ['start', 'crazy-lians', 'shop', 'rules']

  const images = [
    require('@/assets/buttons/start.png'),
    require('@/assets/buttons/crazy-lians.png'),
    require('@/assets/buttons/shop.png'),
    require('@/assets/buttons/rules.png')
  ]

  // const handleButtonClick = item => router.push(`/${item}`)

  return (
    <SharedScreen isDarkened={false}>
      <View className='flex-1'>
        {/* <Pressable onPress={() => console.log('pres setings')}> */}
        <CustomButton
          image={settings}
          onPress={() => console.log('pres setings')}
          containerStyles='absolute top-4 left-4 z-10'
        />
        {/* </Pressable> */}
        <View className='flex-1 justify-between items-center'>
          <Image source={logo} resizeMode='cover' className='mt-16 ' style={{ width: 200, height: 200 }} />
        </View>

        <View className='flex-1 justify-around items-center bottom-1'>
          {btns.map((item, index) => (
            <CustomButton
              key={item.toString()}
              image={images[index]}
              // onPress={handleButtonClick(item)}
              onPress={() => console.log(item)}
            />
          ))}
        </View>
      </View>
    </SharedScreen>
  )
}

export default Menu
