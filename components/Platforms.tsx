// import React, { useCallback, useEffect, useMemo } from 'react'
// import { useSharedValue, withRepeat, withTiming, Easing, cancelAnimation } from 'react-native-reanimated'
// import { useImage } from '@shopify/react-native-skia'

// import Platform from './Platform'

// interface Props {
//   width: number
//   height: number
//   isStartGame: boolean
// }

// const ANIMATION_DURATION = 6000
// const NUM_PLATFORMS = 5
// const MIN_GAP = 200
// const MAX_GAP = 400

// const ORIGINAL_PLATFORM_WIDTH = 343
// const ORIGINAL_PLATFORM_HEIGHT = 77
// const ASPECT_RATIO = ORIGINAL_PLATFORM_WIDTH / ORIGINAL_PLATFORM_HEIGHT

// const Platforms: React.FC<Props> = ({ width, height, isStartGame }) => {
//   const animationProgress = useSharedValue(0)

//   const platform = useImage(require('@/assets/main-game/platfrom.png'))

//   const platformHeight = Math.ceil(height / 8)
//   const platformWidth = Math.ceil(height / 11) * Math.floor(ASPECT_RATIO)

//   const platformPositions = useMemo(() => {
//     let currentX = width
//     const positions = []

//     for (let i = 0; i < NUM_PLATFORMS; i++) {
//       const y = Math.random() * (height - platformHeight)
//       const gap = MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP)
//       currentX += gap
//       positions.push({ x: currentX, y })
//     }

//     return positions
//   }, [width, height, platformHeight])

//   const movePlatforms = useCallback(() => {
//     animationProgress.value = withRepeat(withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }), -1, false)
//   }, [animationProgress])

//   useEffect(() => {
//     if (isStartGame) movePlatforms()

//     return () => cancelAnimation(animationProgress)
//   }, [isStartGame, animationProgress, movePlatforms])

//   return platformPositions.map((position, index) => (
//     <Platform
//       key={index}
//       platform={platform}
//       width={platformWidth}
//       height={platformHeight}
//       initialX={position.x}
//       y={position.y}
//       animationProgress={animationProgress}
//       totalWidth={width + position.x}
//     />
//   ))
// }

// export default Platforms

import React, { useCallback, useEffect } from 'react'
import { useSharedValue, withRepeat, withTiming, Easing, cancelAnimation, useAnimatedReaction, SharedValue } from 'react-native-reanimated'
import { useImage } from '@shopify/react-native-skia'

import Platform from './Platform'

interface Props {
  width: number
  height: number
  isStartGame: boolean
  mapAnimationProgress: SharedValue<number>
  totalGroundWidth: number
  fullCycleOfGrounds: SharedValue<number>
}

const PLATFORM_WIDTH = 100 // Adjust as needed
const PLATFORM_HEIGHT = 20 // Adjust as needed
const PLATFORM_COUNT = 3 // Adjust as needed
// const CYCLES_BEFORE_PLATFORMS = 3

const Platforms: React.FC<Props> = ({ width, height, isStartGame, mapAnimationProgress, totalGroundWidth, fullCycleOfGrounds }) => {
  const platformImage = useImage(require('@/assets/main-game/platfrom.png'))

  // const showPlatforms = useSharedValue(false)

  const platformYPositions = [height * 0.6, height * 0.4, height * 0.2] // Adjust as needed

  // useAnimatedReaction(
  //   () => fullCycleOfGrounds.value,
  //   currentCycle => {
  //     console.log('PLATF-S --------', fullCycleOfGrounds.value, '+++++', showPlatforms.value)
  //     if (currentCycle >= CYCLES_BEFORE_PLATFORMS) {
  //       showPlatforms.value = true
  //     }
  //   }
  // )

  return Array.from({ length: PLATFORM_COUNT }, (_, index) => (
    <Platform
      key={index}
      width={width}
      height={height}
      platform={platformImage}
      arrIndex={index}
      y={platformYPositions[index]}
      totalWidth={totalGroundWidth}
      mapAnimationProgress={mapAnimationProgress}
      platformWidth={PLATFORM_WIDTH}
      platformHeight={PLATFORM_HEIGHT}
    />
  ))
}

export default Platforms
