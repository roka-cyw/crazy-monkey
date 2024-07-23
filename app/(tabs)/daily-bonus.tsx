import React from 'react'
import { View, Image } from 'react-native'
import { useRouter } from 'expo-router'

import SharedScreen from '@/components/SharedScreen'
import CustomButton from '@/components/CustomButton'

import bonusLogo from '@/assets/bonus-logo.png'
import bonus from '@/assets/bonus.png'
import getIt from '@/assets/buttons/get-it.png'

const DailyBonus = () => {
  const router = useRouter()

  const handleButtonClick = () => router.push('/menu')

  return (
    <SharedScreen isDarkened={true}>
      <View className="flex-1">
        <View className="flex-1 justify-start items-center">
          <Image source={bonusLogo} resizeMode="cover" className="mt-14 max-h-[180px] max-w-[308px]" />
          <Image source={bonus} resizeMode="cover" className="max-h-[64px] max-w-[244px]" />
        </View>
        <View>
          <CustomButton
            image={getIt}
            containerStyles={'bottom-10'}
            buttonStyles={'max-h-[68px] max-w-[182px]'}
            onPress={handleButtonClick}
          />
        </View>
      </View>
    </SharedScreen>
  )
}

export default DailyBonus
