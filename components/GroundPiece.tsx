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
  totalGroundWidth: number
  groundWidth: number
  groundHeight: number
  mapAnimationProgress: SharedValue<number>
  fullCycleOfGrounds: SharedValue<number>
}

const GroundPiece: React.FC<Props> = ({
  width,
  height,
  ground,
  arrIndex,
  y,
  totalGroundWidth,
  groundHeight,
  groundWidth,
  mapAnimationProgress,
  fullCycleOfGrounds
}) => {
  let chanceOfStone = 0.8
  let changeStonesEveryCycles = 2
  let chanceUpdateStoneToTheNextCycle = 0.01 // 70% chance for next cycle

  const hasStoneCurrentRef = useRef(Math.random() > chanceOfStone)
  const hasStoneFutureRef = useRef(Math.random() > chanceOfStone)

  const x = useDerivedValue(() => {
    const position = (-totalGroundWidth * mapAnimationProgress.value + arrIndex * groundWidth) % totalGroundWidth
    return position < -groundWidth ? position + totalGroundWidth : position
  })

  useAnimatedReaction(
    () => fullCycleOfGrounds.value,
    (currentCycle, previousCycle) => {
      // console.log(currentCycle, '++++++++++++++', currentCycle % changeStonesEveryCycles)

      if (currentCycle !== previousCycle && currentCycle % changeStonesEveryCycles === 0) {
        // console.log(hasStoneCurrentRef.current)
        // console.log('222', showStone.value)

        // console.log(hasStoneCurrentRef.current, hasStoneFutureRef.current)

        hasStoneCurrentRef.current = hasStoneFutureRef.current
        hasStoneFutureRef.current = Math.random() > chanceUpdateStoneToTheNextCycle
        // console.log('new random', Math.random() > chanceUpdateStoneToTheNextCycle)
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

      {arrIndex === 0 && console.log('-------------------------------------')}
      {console.log(showStone.value, 'INDEX', arrIndex)}
    </>
  )
}

export default GroundPiece
