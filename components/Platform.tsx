import React from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'

interface Props extends xAnimationProps {
  width: number
  platform: SkImage | null
  arrIndex: number
  y: number
}

interface xAnimationProps {
  totalGroundWidth: number
  platformWidth: number
  platformHeight: number
  mapAnimationProgress: SharedValue<number>
  fullCycleOfGrounds: SharedValue<number>
}

const Platform: React.FC<Props> = ({
  width,
  platform,
  arrIndex,
  y,
  mapAnimationProgress,
  platformHeight,
  platformWidth,
  totalGroundWidth
}) => {
  const x = useDerivedValue(() => {
    const position = (-totalGroundWidth * mapAnimationProgress.value + arrIndex * width) % totalGroundWidth
    return position < -platformWidth ? position + totalGroundWidth : position
  })

  return <Image image={platform} width={platformWidth} height={platformHeight} x={x} y={y} />
}

export default Platform
