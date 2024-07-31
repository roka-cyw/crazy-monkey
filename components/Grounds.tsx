import React, { useCallback, useEffect } from 'react'
import { withRepeat, withTiming, Easing, cancelAnimation, SharedValue } from 'react-native-reanimated'
import { useImage } from '@shopify/react-native-skia'

import GroundPiece from './GroundPiece'

interface Props extends groundDimensions {
  width: number
  height: number
  isStartGame: boolean
  mapAnimationProgress: SharedValue<number>
}

interface groundDimensions {
  groundHeight: number
  groundWidth: number
  numImages: number
  totalGroundWidth: number
  groundYposition: number
  fullCycleOfGrounds: SharedValue<number>
}

const ANIMATION_DURATION = 4000

const Ground: React.FC<Props> = ({
  width,
  height,
  isStartGame,
  mapAnimationProgress,
  groundHeight,
  groundWidth,
  numImages,
  totalGroundWidth,
  groundYposition,
  fullCycleOfGrounds
}) => {
  const ground = useImage(require('@/assets/main-game/ground.png')) // TODO: update assets as ground2

  const xAnimationProps = {
    totalGroundWidth,
    groundHeight,
    groundWidth,
    mapAnimationProgress,
    fullCycleOfGrounds
  }

  const moveGrounds = useCallback(() => {
    mapAnimationProgress.value = withRepeat(withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }), -1, false)
  }, [mapAnimationProgress])

  useEffect(() => {
    if (isStartGame) moveGrounds()

    return () => {
      cancelAnimation(mapAnimationProgress)
    }
  }, [isStartGame, mapAnimationProgress, moveGrounds])

  // TODO: change 6 to numImages. Now these numbers are equal but what if user use iPad?
  // for solving I have to get the  actual index[from 0 to 6] inside commented calculatePosition()
  return Array.from({ length: 8 }, (_, index) => (
    <GroundPiece key={index} height={height} width={width} ground={ground} arrIndex={index} y={groundYposition} {...xAnimationProps} />
  ))
}

export default Ground
