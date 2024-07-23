import React from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'

interface Props extends xAnimationProps {
  ground: SkImage | null
  width: number
  height: number
  arrIndex: number
  y: number
}

interface xAnimationProps {
  totalWidth: number
  groundWidth: number
  animationProgress: SharedValue<number>
}

const GroundPiece: React.FC<Props> = ({ ground, width, height, arrIndex, totalWidth, groundWidth, animationProgress, y }) => {
  const x = useDerivedValue(() => {
    const position = (-totalWidth * animationProgress.value + arrIndex * groundWidth) % totalWidth
    return position < -groundWidth ? position + totalWidth : position
  })

  return <Image image={ground} width={width} height={height} x={x} y={y} />
}

export default GroundPiece
