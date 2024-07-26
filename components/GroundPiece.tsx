import React, { useRef } from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue, useAnimatedReaction } from 'react-native-reanimated'

import Stone from './Stone'

interface Props extends xAnimationProps {
  width: number
  height: number
  ground: SkImage | null
  arrIndex: number
  y: number
}

interface xAnimationProps {
  totalWidth: number
  groundWidth: number
  groundHeight: number
  animationProgress: SharedValue<number>
  fullCycleOfGrounds: SharedValue<number>
}

const GroundPiece: React.FC<Props> = ({
  width,
  height,
  ground,
  arrIndex,
  y,
  totalWidth,
  groundHeight,
  groundWidth,
  animationProgress,
  fullCycleOfGrounds
}) => {
  let chanceOfStone = 0.8
  let changeStonesEveryCycles = 3
  let chanceUpdateStoneToTheNextCycle = 0.3 // 70% chance for next cycle

  const hasStoneCurrentRef = useRef(Math.random() > chanceOfStone)
  const hasStoneFutureRef = useRef(Math.random() > chanceOfStone)

  const x = useDerivedValue(() => {
    const position = (-totalWidth * animationProgress.value + arrIndex * groundWidth) % totalWidth
    return position < -groundWidth ? position + totalWidth : position
  })

  useAnimatedReaction(
    () => fullCycleOfGrounds.value,
    (currentCycle, previousCycle) => {
      if (currentCycle !== previousCycle && currentCycle % changeStonesEveryCycles === 0) {
        hasStoneCurrentRef.current = hasStoneFutureRef.current
        hasStoneFutureRef.current = Math.random() > chanceUpdateStoneToTheNextCycle
      }
    }
  )

  const isEnteringScreen = useDerivedValue(() => {
    return x.value >= width - groundWidth && x.value < width
  })

  const isLeavingScreen = useDerivedValue(() => {
    return x.value >= -groundWidth && x.value < 0
  })

  const showStone = useDerivedValue(() => {
    if (isEnteringScreen.value) {
      return hasStoneCurrentRef.current
    }
    if (isLeavingScreen.value) {
      return false
    }
    return hasStoneCurrentRef.current
  })

  return (
    <>
      <Image image={ground} width={groundWidth} height={groundHeight} x={x} y={y} />
      {showStone.value && <Stone height={height} x={x} />}
    </>
  )
}

export default GroundPiece
