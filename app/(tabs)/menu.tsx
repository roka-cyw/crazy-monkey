import React from 'react'
import { View, Image } from 'react-native'
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

  const handleButtonClick = (item: string) => () => router.push(`/${item}`)

  // It has to be modal
  const handleSettingsClick = () => router.push(`/settings`)

  return (
    <SharedScreen isDarkened={false}>
      <View className='flex-1'>
        <CustomButton
          image={settings}
          onPress={handleSettingsClick}
          containerStyles='absolute top-4 left-4 z-10'
          buttonStyles={'max-h-[36px] max-w-[36px]'}
        />
        <View className='flex-1 justify-between items-center'>
          <Image source={logo} resizeMode='cover' className='mt-16 max-h-[200px] max-w-[200px]' />
        </View>

        <View className='flex-1 justify-around items-center bottom-1'>
          {btns.map((item, index) => (
            <CustomButton
              key={item.toString()}
              image={images[index]}
              buttonStyles={'max-h-[68px] max-w-[182px]'}
              onPress={handleButtonClick(item)}
            />
          ))}
        </View>
      </View>
    </SharedScreen>
  )
}

export default Menu
