import React, { useEffect, useState } from 'react'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import { useImage } from '@shopify/react-native-skia'
import { Image, View } from 'react-native'

import count3 from '@/assets/countdown/3.png'
import count2 from '@/assets/countdown/2.png'
import count1 from '@/assets/countdown/1.png'
import tapScreen from '@/assets/tap-screen.png'

interface Props {
  isStartGame: boolean
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>
  setDarkened: React.Dispatch<React.SetStateAction<boolean>>
}

const Countdown: React.FC<Props> = ({ isStartGame, setStartGame, setDarkened }) => {
  const countdownImages = [count3, count2, count1]
  const opacity = useSharedValue(1)
  const countdownIndex = useSharedValue(0)

  const digits = [
    useImage(require('@/assets/countdown/3.png')),
    useImage(require('@/assets/countdown/2.png')),
    useImage(require('@/assets/countdown/1.png'))
  ]

  //   const imageIndex = useDerivedValue(() => )

  //   const [darkened, setDarkened] = useState(true)
  //   const [isStartGame, setStartGame] = useState(false)
  //   const [showGameOver, setShowGameOver] = useState(false)

  //   useEffect(() => {
  //     if (!isStartGame) {
  //       startCountdown()
  //     }
  //   }, [isStartGame])

  //   const animatedStyle = useAnimatedStyle(() => {
  //     return {
  //       opacity: opacity.value,
  //       transform: [{ scale: opacity.value }]
  //     }
  //   })

  //   const startCountdown = () => {
  //     countdownIndex.value = 0
  //     opacity.value = 1

  //     const animateNumber = () => {
  //       opacity.value = withSequence(withTiming(1, { duration: 300 }), withTiming(0, { duration: 700 }))

  //       countdownIndex.value = withTiming(countdownIndex.value + 1, { duration: 1000 }, finished => {
  //         if (finished && countdownIndex.value < 3) {
  //             // countdownIndex.value = prevValue
  //           runOnJS(animateNumber)()
  //         } else if (finished) {
  //           runOnJS(setStartGame)(false)
  //           runOnJS(setDarkened)(false)
  //         }
  //       })
  //     }

  //     animateNumber()
  //   }

  //   const startCountdown = () => {
  //     countdownIndex.value = 0
  //     opacity.value = 1

  //     const animateNumber = () => {
  //       const currentIndex = Math.floor(countdownIndex.value)

  //       opacity.value = withSequence(
  //         withTiming(1, { duration: 300 }),
  //         withTiming(1, { duration: 400 }), // Hold the number visible
  //         withTiming(0, { duration: 300 })
  //       )

  //       countdownIndex.value = withTiming(currentIndex + 1, { duration: 1000 }, finished => {
  //         if (finished) {
  //           if (currentIndex < 2) {
  //             // Change this to 2 to show 3 numbers (0, 1, 2)
  //             runOnJS(animateNumber)()
  //           } else {
  //             runOnJS(setStartGame)(false)
  //             runOnJS(setDarkened)(false)
  //           }
  //         }
  //       })
  //     }

  //     animateNumber()
  //   }

  return (
    <View className='flex-1 justify-center items-center'>
      <Image source={tapScreen} resizeMode='contain' className='max-w-64 max-h-12' />
    </View>
  )
  // <Animated.Image
  //   //   source={countdownImages[]}
  //   source={countdownImages[Math.min(2, Math.floor(countdownIndex.value))]}
  //   style={[animatedStyle, { width: 128, height: 128 }]}
  //   resizeMode='contain'
  // />
}

export default Countdown
