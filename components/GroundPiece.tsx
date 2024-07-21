import React from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue } from 'react-native-reanimated'

interface Props {
  ground: SkImage | null
  width: number
  height: number
  x: SharedValue<number>
  y: number
}

const GroundPiece: React.FC<Props> = ({ ground, width, height, x, y }) => {
  if (!ground) return null

  return <Image image={ground} width={width} height={height} x={x} y={y} />
}

export default GroundPiece
