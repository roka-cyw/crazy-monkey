import React from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'

interface Props extends xAnimationProps {
  platform: SkImage | null
  width: number
  height: number
  arrIndex: number
  y: number
}

interface xAnimationProps {
  totalWidth: number
  platformWidth: number
  animationProgress: SharedValue<number>
}

const Platform: React.FC<Props> = ({ platform, width, height, arrIndex, totalWidth, platformWidth, animationProgress, y }) => {
  const x = useDerivedValue(() => {
    const position = (-totalWidth * animationProgress.value + arrIndex * platformWidth) % totalWidth
    return position < -platformWidth ? position + totalWidth : position
  })

  return <Image image={platform} width={width} height={height} x={x} y={y} />
}

export default Platform
