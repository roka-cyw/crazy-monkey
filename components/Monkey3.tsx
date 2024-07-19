// Put in Scene

{
  /* <Canvas style={{ width, height }}>
  <SpriteAnimation
spriteSheet={require('../assets/monkey/run.png')}
frameWidth={200}
frameHeight={200}
totalFrames={60}
duration={20000}
/> 
</Canvas>*/
}

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Canvas, Image, useImage, Group } from '@shopify/react-native-skia'
import Animated, { useSharedValue, useDerivedValue, withTiming, Easing } from 'react-native-reanimated'

interface Prop {
  spriteSheet: string
  frameWidth: number
  frameHeight: number
  totalFrames: number
  duration: number
}

const SpriteAnimation: React.FC<Prop> = ({ spriteSheet, frameWidth, frameHeight, totalFrames, duration }) => {
  const image = useImage(spriteSheet)
  const frameIndex = useSharedValue(0)

  // Animation loop
  React.useEffect(() => {
    frameIndex.value = withTiming(
      totalFrames - 1,
      {
        duration: duration,
        easing: Easing.linear
      },
      () => {
        frameIndex.value = 0
      }
    )
  }, [frameIndex, totalFrames, duration])

  const skiaTransform = useDerivedValue(() => {
    const currentFrame = Math.floor(frameIndex.value)
    const offsetX = -(currentFrame * frameWidth)
    return [{ translateX: offsetX }]
  }, [frameIndex])

  // TODO: Rename
  const Origin = useDerivedValue(() => {
    return { x: 200, y: 200 }
  })

  return (
    <Group transform={skiaTransform} origin={Origin}>
      {/* {image && <Image image={image} x={0} y={0} width={frameWidth * totalFrames} height={frameHeight} />} */}
      {image && <Image image={image} x={200} y={200} width={frameWidth * totalFrames} height={200} />}
    </Group>
  )
}

export default SpriteAnimation
