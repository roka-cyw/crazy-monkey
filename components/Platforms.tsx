import React, { useCallback, useEffect } from 'react'
import { useSharedValue, withRepeat, withTiming, Easing, cancelAnimation } from 'react-native-reanimated'
import { useImage } from '@shopify/react-native-skia'

import Platform from './Platform'

interface Props {
  width: number
  height: number
  isStartGame: boolean
}

const ANIMATION_DURATION = 6000
const EXTRA_PLATFORMS = 5 // just in case to overlap offsets

const ORIGINAL_PLATFORM_WIDTH = 343
const ORIGINAL_PLATFORM_HEIGHT = 77
const ASPECT_RATIO = ORIGINAL_PLATFORM_WIDTH / ORIGINAL_PLATFORM_HEIGHT

const Platforms: React.FC<Props> = ({ width, height, isStartGame }) => {
  const animationProgress = useSharedValue(0)

  const platform = useImage(require('@/assets/main-game/platfrom.png'))

  const platformHeight = Math.ceil(height / 8)
  const platformWidth = Math.ceil(height / 11) * Math.floor(ASPECT_RATIO)
  const numImages = Math.ceil(width / platformWidth) + EXTRA_PLATFORMS
  const totalWidth = platformWidth * numImages

  const xAnimationProps = {
    totalWidth,
    platformWidth,
    animationProgress
  }

  const movePlatforms = useCallback(() => {
    animationProgress.value = withRepeat(withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }), -1, false)
  }, [animationProgress])

  useEffect(() => {
    if (isStartGame) movePlatforms()

    return () => cancelAnimation(animationProgress)
  }, [isStartGame, animationProgress, movePlatforms])

  // TODO: change 6 to numImages. Now these numbers are equal but what if user use iPad?
  // for solving I have to get the  actual index[from 0 to 6] inside commented calculatePosition()
  return Array.from({ length: 6 }, (_, index) => (
    <Platform
      key={index}
      platform={platform}
      width={platformWidth}
      height={platformHeight}
      arrIndex={index}
      y={height / 2}
      {...xAnimationProps}
    />
  ))
}

export default Platforms
