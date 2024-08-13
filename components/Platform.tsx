import React, { useEffect } from 'react'
import { Image, Rect, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useAnimatedReaction, useDerivedValue } from 'react-native-reanimated'

import { CollisionObject } from '@/hooks/useCollisionSystem'

interface Props extends xAnimationProps {
  width: number
  platform: SkImage | null
  arrIndex: number
  y: number
  addCollisionObject: (obj: CollisionObject) => void
  removeCollisionObject: (id: string) => void
}

interface xAnimationProps {
  totalGroundWidth: number
  platformWidth: number
  platformHeight: number
  mapAnimationProgress: SharedValue<number>
  fullCycleOfGrounds: SharedValue<number>
}

const Platform: React.FC<Props> = ({
  width,
  platform,
  arrIndex,
  y,
  addCollisionObject,
  removeCollisionObject,
  mapAnimationProgress,
  platformHeight,
  platformWidth,
  totalGroundWidth
}) => {
  const x = useDerivedValue(() => {
    const position = (-totalGroundWidth * mapAnimationProgress.value + arrIndex * width) % totalGroundWidth
    return position < -platformWidth ? position + totalGroundWidth : position
  })

  const platformId = `platform-${arrIndex}`

  useAnimatedReaction(
    // visible: showStone.value --- true only for testing
    () => ({ x: x.value, visible: true }),
    (current, previous) => {
      // showStone.value --- true only for testing
      if (current.visible && true) {
        addCollisionObject({
          id: platformId,
          type: 'platform',
          x: current.x,
          y: y,
          width: platformWidth * 2,
          height: platformHeight
        })
      } else {
        removeCollisionObject(platformId)
      }
    },
    [platformWidth, platformHeight]
  )

  useEffect(() => {
    return () => {
      removeCollisionObject(platformId)
    }
  }, [removeCollisionObject, platformId])

  return (
    <>
      <Image image={platform} width={platformWidth * 2} height={platformHeight} x={x} y={y} />
      <Rect
        x={x}
        y={y}
        width={platformWidth * 2}
        height={platformHeight}
        color="rgba(255, 0, 255, 0.5)"
        style="stroke"
        strokeWidth={3}
        strokeColor="red"
      />
    </>
  )
}

export default Platform
