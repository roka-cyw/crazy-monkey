import React from 'react'
import { Image, useImage, Group } from '@shopify/react-native-skia'
import { useSharedValue, useDerivedValue, withRepeat, withTiming } from 'react-native-reanimated'

interface Props {
  source: any
  width: number
  height: number
  totalFrames: any
  fps: number
}

const SpriteAnimation: React.FC<Props> = ({ source, width, height, totalFrames, fps = 24 }) => {
  const spriteSheet = useImage(source)
  const frameIndex = useSharedValue(0)

  React.useEffect(() => {
    frameIndex.value = withRepeat(
      withTiming(totalFrames - 1, { duration: (totalFrames / fps) * 1000 }),
      -1, // Infinite repetitions
      true // Reverse the animation
    )
  }, [totalFrames, fps])

  const transform = useDerivedValue(() => [{ translateX: -frameIndex.value * width }])

  if (!spriteSheet) return null

  return (
    <Group transform={transform}>
      <Image image={spriteSheet} fit='none' x={0} y={0} width={width * totalFrames} height={height} />
    </Group>
  )
}

export default SpriteAnimation
