import React, { useEffect, useMemo, useState } from 'react'
import { useSharedValue, withRepeat, withTiming, useDerivedValue, Easing } from 'react-native-reanimated'
import { useImage } from '@shopify/react-native-skia'

import GroundPiece from './GroundPiece'

interface Props {
  width: number
  height: number
}

const ANIMATION_DURATION = 6000
const EXTRA_GROUNDS = 2 // just in case to overlap offsets

const ORIGINAL_GROUND_WIDTH = 900
const ORIGINAL_GROUND_HEIGHT = 176
const ASPECT_RATIO = ORIGINAL_GROUND_WIDTH / ORIGINAL_GROUND_HEIGHT

const Ground: React.FC<Props> = ({ width, height }) => {
  const animationProgress = useSharedValue(0)

  const ground = useImage(require('@/assets/main-game/ground.png')) // TODO: update assets as ground2

  const groundHeight = Math.ceil(height / 8)
  const groundWidth = Math.ceil(height / 8) * Math.floor(ASPECT_RATIO)
  const numImages = Math.ceil(width / groundWidth) + EXTRA_GROUNDS
  const totalWidth = groundWidth * numImages

  useEffect(() => {
    moveGrounds()
  }, [])

  const moveGrounds = () => {
    animationProgress.value = withRepeat(
      withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }),
      -1,
      false
    )
  }

  // const calculatePosition = useDerivedValue(() => {
  //   const position = (-totalWidth * animationProgress.value + index * groundWidth) % totalWidth
  //   return position < -groundWidth ? position + totalWidth : position
  // })

  const calculatePosition = (index: number) => {
    return useDerivedValue(() => {
      const position = (-totalWidth * animationProgress.value + index * groundWidth) % totalWidth
      return position < -groundWidth ? position + totalWidth : position
    })
  }

  // TODO: change 6 to numImages. Now these numbers are equal but what if user use iPad?
  // for solving I have to get the  actual index[from 0 to 6] inside commented calculatePosition()
  return Array.from({ length: 6 }, (_, index) => (
    <GroundPiece
      key={index}
      ground={ground}
      width={groundWidth}
      height={groundHeight}
      x={calculatePosition(index)}
      y={height - groundHeight * 1.5}
    />
  ))
}

export default Ground
