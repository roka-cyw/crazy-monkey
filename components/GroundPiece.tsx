import React from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue, useAnimatedReaction, useSharedValue } from 'react-native-reanimated'

import { CollisionObject } from '@/hooks/useCollisionSystem'
import Stone from './Stone'

interface Props extends xAnimationProps {
  width: number
  height: number
  ground: SkImage | null
  arrIndex: number
  y: number
  addCollisionObject: (obj: CollisionObject) => void
  removeCollisionObject: (id: string) => void
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
  fullCycleOfGrounds,
  addCollisionObject,
  removeCollisionObject
}) => {
  const chanceOfStone = 0.35
  const changeStonesEveryCycles = 2
  const chanceUpdateStoneToTheNextCycle = 0.3

  const hasStone = useSharedValue(Math.random() > chanceOfStone)
  const pendingStoneUpdate = useSharedValue(false)

  const x = useDerivedValue(() => {
    const position = (-totalGroundWidth * mapAnimationProgress.value + arrIndex * groundWidth) % totalGroundWidth
    return position < -groundWidth ? position + totalGroundWidth : position
  })

  useAnimatedReaction(
    () => fullCycleOfGrounds.value,
    (currentCycle, previousCycle) => {
      if (currentCycle !== previousCycle && currentCycle % changeStonesEveryCycles === 0) {
        pendingStoneUpdate.value = true
      }
    }
  )

  const isOffScreen = useDerivedValue(() => {
    return x.value <= -groundWidth || x.value >= width
  })

  const showStone = useDerivedValue(() => {
    if (isOffScreen.value && pendingStoneUpdate.value) {
      hasStone.value = Math.random() < chanceUpdateStoneToTheNextCycle
      pendingStoneUpdate.value = false
    }

    return hasStone.value && x.value < width
  })

  return (
    <>
      <Image image={ground} width={groundWidth} height={groundHeight} x={x} y={y} />
      <Stone
        height={height}
        x={x}
        showStone={showStone}
        addCollisionObject={addCollisionObject}
        removeCollisionObject={removeCollisionObject}
        arrIndex={arrIndex}
      />
    </>
  )
}

export default GroundPiece
