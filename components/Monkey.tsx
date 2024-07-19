// import React, { useEffect } from 'react'
// import { useImage, Image, Canvas } from '@shopify/react-native-skia'
// import { useSharedValue, useAnimatedReaction, withRepeat, withTiming, Easing } from 'react-native-reanimated'

// interface Props {
//   width: number
//   height: number
//   x: number
//   y: number
// }

// const NUM_FRAMES = 8
// const ANIMATION_DURATION = 800 // Duration for a complete cycle in milliseconds

// const Monkey: React.FC<Props> = ({ width, height, x, y }) => {
//   const animationProgress = useSharedValue(0)

//   //   const monkey = useImage(require('@/assets/main-game/monkey.png'))
//   const test = useImage(require('@/assets/monkey/Run/run-1.png'))

//   //   const frames = Array.from({ length: NUM_FRAMES }, (_, i) =>
//   //     useImage(require(`@/assets/main-game/monkey/Run/run-${i + 1}.png`))
//   //   )

//   const monkeyRun = () => {
//     // frameIndex.value = withRepeat(withTiming(NUM_FRAMES - 1, { duration: ANIMATION_DURATION }), -1, true)
//     animationProgress.value = withRepeat(
//         withTiming(1, { duration: ANIMATION_DURATION, easing: Easing.linear }),
//         -1,
//         false
//       )
//   }

//   //   useEffect(() => {
//   //     frameIndex.value = withRepeat(withTiming(NUM_FRAMES - 1, { duration: ANIMATION_DURATION }), -1, true)
//   //   }, [])

//   //   const currentFrame = useAnimatedReaction(
//   //     () => Math.floor(frameIndex.value),
//   //     result => result,
//   //     [frameIndex]
//   //   )

//   return <Image image={test} width={width / 2} height={height / 2} />

//   // return {frames[currentFrame.value] && (
//   //     <Image image={frames[currentFrame.value]} x={x} y={y} width={width} height={height} fit='contain' />
//   //   )}

//   // <Canvas style={{ width, height }}>
//   //   {frames[currentFrame.value] && (
//   //     <Image image={frames[currentFrame.value]} x={x} y={y} width={width} height={height} fit='contain' />
//   //   )}
//   // </Canvas>
//   //   )
// }

// export default Monkey

import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { Canvas, Image, useImage } from '@shopify/react-native-skia'
import { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated'
// import SpriteSheet from 'rn-sprite-sheet'
import SpriteSheet from './SpriteSheet'

const MONKEY_ORIGINAL_WIDTH = 669
const MONKEY_ORIGINAL_HEIGHT = 569
const ASPECT_RATIO = MONKEY_ORIGINAL_WIDTH / MONKEY_ORIGINAL_HEIGHT

// type SpriteSheetType = {
//   play: (options: {
//     type: string;
//     fps?: number;
//     loop?: boolean;
//     resetAfterFinish?: boolean;
//     onFinish?: () => void;
//   }) => void;
//   // Add other methods and properties as needed
// };

const Monkey = () => {
  const t = useImage(require(`@/assets/monkey/Run/run-1.png`))

  const spriteSheetRef = useRef<SpriteSheet | null>(null)

  useEffect(() => {
    if (spriteSheetRef.current) {
      spriteSheetRef.current.play({
        type: 'run',
        fps: 10,
        loop: true
      })
    }
  }, [])

  return (
    // <View className='flex-1'>
    <SpriteSheet
      ref={spriteSheetRef}
      source={require('../assets/monkey/sprite.png')}
      columns={12}
      rows={3}
      height={300}
      width={300}
      // frameHeight={300} // manually set size of your sprite
      // frameWidth={300} // overrides auto calculation of frame size based on height, width, columns, and rows.
      // offsetX={100}
      // offsetY={0}
      imageStyle={{ marginTop: -1 }}
      animations={{
        idle: [0],
        run: [24, 25, 26, 27, 28, 29],
        jump: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        dead: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      }}
    ></SpriteSheet>
    // </View>
  )
  // return <Image image={t} x={0} y={0} width={MONKEY_ORIGINAL_WIDTH} height={MONKEY_ORIGINAL_HEIGHT} fit='contain' />
}

export default Monkey
