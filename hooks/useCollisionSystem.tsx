import { useCallback, useRef } from 'react'
import { useSharedValue, useAnimatedReaction, runOnJS, SharedValue } from 'react-native-reanimated'

export interface CollisionObject {
  id: string
  type: 'platform' | 'stone' | 'coin' | 'banana'
  x: number
  y: number
  width: number
  height: number
}

const COLLISION_TOLERANCE = 20

export const useCollisionSystem = (
  collisionMonkey: Readonly<
    SharedValue<{
      x: number
      y: number
      width: number
      height: number
    }>
  >
) => {
  const collisionObjects = useSharedValue<CollisionObject[]>([])
  const lastCollisionTime = useRef(0)
  const collisionCooldown = 800 // 0.8 second cooldown between collision logs

  const handleCollision = useCallback((obj: CollisionObject, type: string) => {
    const now = Date.now()
    if (now - lastCollisionTime.current > collisionCooldown) {
      lastCollisionTime.current = now
      switch (obj.type) {
        case 'stone':
          console.log('STONE COLLISION !!!!!!!!!!!!!', obj.id, type)
          break
        // ... handle other collision types
      }
    }
  }, [])

  useAnimatedReaction(
    () => ({
      monkey: collisionMonkey.value,
      objects: collisionObjects.value
    }),
    (current, previous) => {
      const { x: monkeyX, y: monkeyY, width: monkeyWidth, height: monkeyHeight } = current.monkey

      const monkeyLeft = monkeyX
      const monkeyRight = monkeyX + monkeyWidth
      const monkeyBottom = monkeyY + monkeyHeight
      const previousMonkeyBottom = previous ? previous.monkey.y + previous.monkey.height : monkeyBottom

      current.objects.forEach(obj => {
        if (obj.type === 'stone') {
          const scenario1 =
            monkeyRight >= obj.x && // Monkey's right edge has reached or passed the stone's left edge
            monkeyRight <= obj.x + COLLISION_TOLERANCE && // Allow a small penetration for more forgiving gameplay
            monkeyBottom > obj.y && // Monkey's bottom is below the stone's top edge
            monkeyY < obj.y + obj.height // Monkey's top is above the stone's bottom edge

          const scenario2 =
            monkeyBottom >= obj.y && // Monkey's bottom is at or below the stone's top
            monkeyBottom <= obj.y + COLLISION_TOLERANCE && // Allow up to 20 pixels of penetration
            monkeyRight > obj.x && // Monkey's right edge is past the stone's left edge
            monkeyLeft < obj.x + obj.width && // Monkey's left edge is before the stone's right edge
            monkeyBottom > previousMonkeyBottom // Monkey is moving downward

          if (scenario1) {
            runOnJS(handleCollision)(obj, 'scenario 1 RIGHT edge of monkey')
          } else if (scenario2) {
            runOnJS(handleCollision)(obj, 'scenario 2 BOTTOM edge of monkey')
          }
        } else {
          console.log('======================== NO COLISION ========================')
        }
      })
    }
  )

  const addCollisionObject = useCallback(
    (obj: CollisionObject) => {
      'worklet'
      collisionObjects.value = collisionObjects.value.filter(item => item.id !== obj.id)
      collisionObjects.value = [...collisionObjects.value, obj]
    },
    [collisionObjects]
  )

  const removeCollisionObject = useCallback(
    (id: string) => {
      'worklet'
      collisionObjects.value = collisionObjects.value.filter(item => item.id !== id)
    },
    [collisionObjects]
  )

  return { addCollisionObject, removeCollisionObject }
}
