import React, { useEffect } from 'react'
import { Image, Rect, useImage } from '@shopify/react-native-skia'
import { SharedValue, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated'

import { CollisionObject } from '@/hooks/useCollisionSystem'

interface Props {
  height: number
  x: SharedValue<number>
  showStone: SharedValue<boolean>
  addCollisionObject: (obj: CollisionObject) => void
  removeCollisionObject: (id: string) => void
  arrIndex: number
}

const ORIGINAL_STONE_WIDTH = 947
const ORIGINAL_STONE_HEIGHT = 886
const ASPECT_RATIO = ORIGINAL_STONE_WIDTH / ORIGINAL_STONE_HEIGHT

const Stone: React.FC<Props> = ({ height, x, showStone, addCollisionObject, removeCollisionObject, arrIndex }) => {
  const stone = useImage(require('@/assets/main-game/stone.png'))

  const stoneHeight = Math.ceil(height / 4.5)
  const stoneWidth = Math.ceil(height / 6) * Math.floor(ASPECT_RATIO)
  const stoneYposition = height - stoneHeight

  const collisionStoneY = stoneYposition + stoneHeight * 0.2
  const collisionStoneHeight = stoneHeight * 0.8

  const opacity = useDerivedValue(() => (showStone.value ? 1 : 0))

  const stoneId = `stone-${arrIndex}`

  useAnimatedReaction(
    () => ({ x: x.value, visible: showStone.value }),
    (current, previous) => {
      if (current.visible && showStone.value) {
        addCollisionObject({
          id: stoneId,
          type: 'stone',
          x: current.x,
          y: collisionStoneY,
          width: stoneWidth,
          height: collisionStoneHeight
        })
      } else {
        removeCollisionObject(stoneId)
      }
    },
    [stoneHeight, stoneWidth, stoneYposition]
  )

  useEffect(() => {
    return () => {
      removeCollisionObject(stoneId)
    }
  }, [removeCollisionObject, stoneId])

  return (
    <>
      <Image image={stone} width={stoneWidth} height={stoneHeight} x={x} y={stoneYposition} opacity={opacity} />

      {/* {showStone.value && <Rect x={x} y={collisionStoneY} width={stoneWidth} height={collisionStoneHeight} color="rgba(255, 0, 0, 0.5)" />} */}
    </>
  )
}

export default Stone
