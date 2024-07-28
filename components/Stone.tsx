import React from 'react'
import { Image, useImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'

interface Props {
  height: number
  x: SharedValue<number>
  showStone: SharedValue<boolean>
}

const ORIGINAL_STONE_WIDTH = 947
const ORIGINAL_STONE_HEIGHT = 886
const ASPECT_RATIO = ORIGINAL_STONE_WIDTH / ORIGINAL_STONE_HEIGHT

const Stone: React.FC<Props> = ({ height, x, showStone }) => {
  const stone = useImage(require('@/assets/main-game/stone.png'))

  const stoneHeight = Math.ceil(height / 4.5)
  const stoneWidth = Math.ceil(height / 6) * Math.floor(ASPECT_RATIO)
  const stoneYposition = height - stoneHeight

  const opacity = useDerivedValue(() => (showStone.value ? 1 : 0))

  return <Image image={stone} width={stoneWidth} height={stoneHeight} x={x} y={stoneYposition} opacity={opacity} />
}

export default Stone
