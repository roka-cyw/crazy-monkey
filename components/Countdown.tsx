import React, { useCallback, useEffect } from 'react'
import { Group, Image, useImage } from '@shopify/react-native-skia'
import { useDerivedValue, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated'

interface Props {
  width: number
  height: number
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>
  setCountdownWasShowed: React.Dispatch<React.SetStateAction<boolean>>
  onFinish?: () => void
}

const Countdown: React.FC<Props> = ({ width, height, setStartGame, setCountdownWasShowed, onFinish }) => {
  const number3 = useImage(require('../assets/countdown/3.png'))
  const number2 = useImage(require('../assets/countdown/2.png'))
  const number1 = useImage(require('../assets/countdown/1.png'))

  const countdownValue = useSharedValue(3)
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)

  const imageWidth = width / 3
  const imageHeight = height / 3

  const currentImage = useDerivedValue(() => {
    if (countdownValue.value === 3) return number3
    if (countdownValue.value === 2) return number2
    return number1
  }, [countdownValue, number1, number2, number3])

  const transform = useDerivedValue(() => [{ scale: scale.value }], [scale])

  const updateCountdown = useCallback(() => {
    opacity.value = withTiming(0, { duration: 250 })
    scale.value = withTiming(0.8, { duration: 250 }, finished => {
      if (finished) {
        if (countdownValue.value > 1) {
          // Fade in and grow
          countdownValue.value -= 1
          opacity.value = withTiming(1, { duration: 250 })
          scale.value = withTiming(1, { duration: 250 }, finished => {
            // Schedule next update
            if (finished) {
              runOnJS(setTimeout)(updateCountdown, 500)
            }
          })
        } else {
          if (onFinish) runOnJS(onFinish)()

          runOnJS(setStartGame)(true)
          runOnJS(setCountdownWasShowed)(true)
        }
      }
    })
  }, [countdownValue, onFinish, opacity, scale, setCountdownWasShowed, setStartGame])

  useEffect(() => {
    setTimeout(updateCountdown, 1000)
  }, [updateCountdown])

  return (
    <Group transform={transform} origin={{ x: width / 2, y: height / 3 }}>
      <Image
        image={currentImage}
        x={(width - imageWidth) / 2}
        y={(height - imageHeight) / 3}
        width={imageWidth}
        height={imageHeight}
        opacity={opacity}
      />
    </Group>
  )
}

export default Countdown
