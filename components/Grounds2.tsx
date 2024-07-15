import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
  useAnimatedStyle
} from 'react-native-reanimated'
import { Image, useImage } from '@shopify/react-native-skia'

const Ground2 = ({ width, height }: { width: number; height: number }) => {
  const GROUND_HEIGHT = 44
  const ANIMATION_DURATION = 6000
  const GROUND_WIDTH = 246

  // Calculate the number of images needed to cover the screen width plus one extra for seamless scrolling
  const numImages: number = Math.ceil(width / GROUND_WIDTH) + 2

  const ground = useImage(require('@/assets/main-game/ground2.png'))
  // const groundDef = useImage(require('@/assets/main-game/ground.png'))

  const animationProgress = useSharedValue(0)

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }),
      -1,
      false
    )
  }, [])

  // const calculatePosition = (index: number) => {
  //   return useDerivedValue(() => {
  //     const totalWidth = GROUND_WIDTH * numImages
  //     let position = (-totalWidth * animationProgress.value + index * GROUND_WIDTH) % totalWidth

  //     if (position < -GROUND_WIDTH) {
  //       position += totalWidth
  //     }

  //     return position
  //   })
  // }

  const calculatePosition = (index: number) => {
    return useDerivedValue(() => {
      const totalWidth = GROUND_WIDTH * 5
      const position = (-totalWidth * animationProgress.value + index * (GROUND_WIDTH - 40)) % totalWidth
      return position < -GROUND_WIDTH ? position + totalWidth : position
    })
  }

  const imagePositions = Array.from({ length: 6 }, (_, index) => calculatePosition(index))

  const im = calculatePosition(0)
  const im1 = calculatePosition(1)
  const im2 = calculatePosition(2)
  const im3 = calculatePosition(3)
  const im4 = calculatePosition(4)
  const im5 = calculatePosition(5)

  return (
    <>
      <Image image={ground} width={GROUND_WIDTH} height={GROUND_HEIGHT} x={im} y={2 * GROUND_HEIGHT} />
      <Image image={ground} width={GROUND_WIDTH} height={GROUND_HEIGHT} x={im1} y={2 * GROUND_HEIGHT} />
      <Image image={ground} width={GROUND_WIDTH} height={GROUND_HEIGHT} x={im2} y={2 * GROUND_HEIGHT} />
      <Image image={ground} width={GROUND_WIDTH} height={GROUND_HEIGHT} x={im3} y={2 * GROUND_HEIGHT} />
      <Image image={ground} width={GROUND_WIDTH} height={GROUND_HEIGHT} x={im4} y={2 * GROUND_HEIGHT} />
      <Image image={ground} width={GROUND_WIDTH} height={GROUND_HEIGHT} x={im5} y={2 * GROUND_HEIGHT} />
    </>
    // <>
    //   {ground &&
    //     imagePositions.map((xPosition, index) => (
    //       <Image
    //         key={index}
    //         image={ground}
    //         width={GROUND_WIDTH}
    //         height={GROUND_HEIGHT}
    //         x={xPosition}
    //         y={2 * GROUND_HEIGHT}
    //       />
    //     ))}
    // </>
  )
}

export default Ground2
