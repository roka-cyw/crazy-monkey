import React from 'react'
import { SharedValue } from 'react-native-reanimated'
import { useImage } from '@shopify/react-native-skia'

import Platform from './Platform'

interface Props extends platformDimensions {
  width: number
  height: number
  isStartGame: boolean
  mapAnimationProgress: SharedValue<number>
}

interface platformDimensions {
  platformHeight: number
  platformWidth: number
  totalGroundWidth: number
  fullCycleOfGrounds: SharedValue<number>
}

// Probably move to Scene
const PLATFORM_COUNT = 5

const Platforms: React.FC<Props> = ({
  width,
  height,
  isStartGame,
  mapAnimationProgress,
  platformHeight,
  platformWidth,
  totalGroundWidth,
  fullCycleOfGrounds
}) => {
  const platformImage = useImage(require('@/assets/main-game/platfrom.png'))

  // Probably move ove to Scene
  const platformYPositions = [height * 0.75, height * 0.65, height * 0.55, height * 0.45, height * 0.35] // Adjust as needed

  const xAnimationProps = {
    totalGroundWidth,
    platformHeight,
    platformWidth,
    mapAnimationProgress,
    fullCycleOfGrounds
  }

  return Array.from({ length: PLATFORM_COUNT }, (_, index) => (
    <Platform key={index} width={width} platform={platformImage} arrIndex={index} y={platformYPositions[index]} {...xAnimationProps} />
  ))
}

export default Platforms
