import React, { useCallback, useEffect, useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { Canvas } from '@shopify/react-native-skia'
import { cancelAnimation, Easing, runOnJS, useAnimatedReaction, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'

import Countdown from './Countdown'
import Grounds from './Grounds'
import Monkey from './Monkey'
import Platforms from './Platforms'

interface Props {
  width: number
  height: number
}
const JUMP_FORCE = 125
const JUMP_DURATION = 550

const MONKEY_HEIGHT = 150
const MONKEY_WIDTH = 120

const ORIGINAL_GROUND_WIDTH = 900
const ORIGINAL_GROUND_HEIGHT = 176
const GROUND_ASPECT_RATIO = ORIGINAL_GROUND_WIDTH / ORIGINAL_GROUND_HEIGHT
const EXTRA_GROUNDS = 4 // just in case to overlap offsets
const CYCLES_BEFORE_PLATFORMS = 3

const PLATFORM_ORIGINAL_WIDTH = 343
const PLATFORM_ORIGINAL_HEIGHT = 77
const PLATFROM_ASPECT_RATIO = PLATFORM_ORIGINAL_WIDTH / PLATFORM_ORIGINAL_HEIGHT

const Scene: React.FC<Props> = ({ width, height }) => {
  const router = useRouter()

  const [isStartGame, setStartGame] = useState(false)
  const [countdownWasShowed, setCountdownWasShowed] = useState(false)
  // const gameOver = useSharedValue(false)
  const [gameOver, setGameOver] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)

  const mapAnimationProgress = useSharedValue(0)
  const fullCycleOfGrounds = useSharedValue(0)
  // const showPlatforms = useSharedValue(false)
  const groundLevel = height - MONKEY_HEIGHT / 1.12
  const groundHeight = Math.ceil(height / 8)
  const groundWidth = Math.ceil(height / 8) * Math.floor(GROUND_ASPECT_RATIO)
  const numImages = Math.ceil(width / groundWidth) + EXTRA_GROUNDS
  const totalGroundWidth = groundWidth * numImages
  const groundYposition = height - groundHeight / 1.5

  const [showPlatforms, setShowPlatforms] = useState(false)
  const platformHeight = Math.ceil(height / 14)
  const platformWidth = Math.ceil(height / 14) * Math.floor(PLATFROM_ASPECT_RATIO)

  const monkeyY = useSharedValue(groundLevel)
  const isJumping = useSharedValue(false)

  const screenDimensions = {
    width,
    height
  }

  const monkeyProps = {
    MONKEY_HEIGHT,
    MONKEY_WIDTH,
    groundLevel,
    monkeyY
  }

  const groundDimensions = {
    groundHeight,
    groundWidth,
    numImages,
    totalGroundWidth,
    groundYposition
  }

  const platformDimensions = {
    platformHeight,
    platformWidth,
    totalGroundWidth
  }

  useAnimatedReaction(
    () => mapAnimationProgress.value,
    currentValue => {
      if (currentValue >= 1) {
        fullCycleOfGrounds.value = fullCycleOfGrounds.value + 1
      }
    }
  )

  useAnimatedReaction(
    () => fullCycleOfGrounds.value,
    currentCycle => {
      if (true) {
        // if (currentCycle >= CYCLES_BEFORE_PLATFORMS) {
        runOnJS(setShowPlatforms)(true)
      }
    }
  )

  const jump = useCallback(() => {
    if (!isJumping.value) {
      isJumping.value = true
      cancelAnimation(monkeyY)
      monkeyY.value = withSequence(
        withTiming(groundLevel - JUMP_FORCE, {
          duration: JUMP_DURATION / 2,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(
          groundLevel,
          {
            duration: JUMP_DURATION / 2,
            easing: Easing.in(Easing.quad)
          },
          finished => {
            if (finished) {
              isJumping.value = false
            }
          }
        )
      )
    }
  }, [groundLevel, monkeyY, isJumping])

  const gesture = Gesture.Tap().onStart(() => {
    // if (gameOver.value) {
    if (gameOver) {
      restartGame()
    } else {
      console.log('jump !!')
      if (isStartGame) {
        runOnJS(jump)()
      }
    }
  })

  const restartGame = () => console.log('RESTART GAME')

  // const handleHomeClick = () => {
  //   router.push('/menu')
  // }

  const handleRestart = () => {
    setStartGame(false)
    setCountdownWasShowed(false)
    setShowGameOver(false)
  }

  const handleGameOver = () => {
    setShowGameOver(true)
  }

  useEffect(() => {
    monkeyY.value = groundLevel

    return () => handleRestart()
  }, [groundLevel, monkeyY])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {!countdownWasShowed && !isStartGame && (
            <Countdown setStartGame={setStartGame} setCountdownWasShowed={setCountdownWasShowed} {...screenDimensions} />
          )}

          {showPlatforms && (
            <Platforms
              isStartGame={isStartGame}
              mapAnimationProgress={mapAnimationProgress}
              fullCycleOfGrounds={fullCycleOfGrounds}
              {...platformDimensions}
              {...screenDimensions}
            />
          )}

          <Grounds
            isStartGame={isStartGame}
            mapAnimationProgress={mapAnimationProgress}
            fullCycleOfGrounds={fullCycleOfGrounds}
            {...groundDimensions}
            {...screenDimensions}
          />

          <Monkey isStartGame={isStartGame} {...monkeyProps} />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default Scene
