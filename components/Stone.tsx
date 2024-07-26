import React from 'react'
import { Image, useImage } from '@shopify/react-native-skia'
import { SharedValue } from 'react-native-reanimated'

interface Props {
  height: number
  x: SharedValue<number>
}

const ORIGINAL_STONE_WIDTH = 947
const ORIGINAL_STONE_HEIGHT = 886
const ASPECT_RATIO = ORIGINAL_STONE_WIDTH / ORIGINAL_STONE_HEIGHT

const Stone: React.FC<Props> = ({ height, x }) => {
  const stone = useImage(require('@/assets/main-game/stone.png'))

  const stoneHeight = Math.ceil(height / 4.5)
  const stoneWidth = Math.ceil(height / 6) * Math.floor(ASPECT_RATIO)
  const stoneYposition = height - stoneHeight

  return <Image image={stone} width={stoneWidth} height={stoneHeight} x={x} y={stoneYposition} />
}

export default Stone
