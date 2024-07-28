// import React from 'react'
// import { Image, SkImage } from '@shopify/react-native-skia'
// import { SharedValue, useDerivedValue } from 'react-native-reanimated'

// interface Props {
//   platform: SkImage | null
//   width: number
//   height: number
//   initialX: number
//   y: number
//   mapAnimationProgress: SharedValue<number>
//   totalWidth: number
// }

// const Platform: React.FC<Props> = ({ platform, width, height, initialX, y, mapAnimationProgress, totalWidth }) => {
//   const x = useDerivedValue(() => {
//     const position = initialX - totalWidth * mapAnimationProgress.value
//     return position < -width ? position + totalWidth : position
//   })

//   return <Image image={platform} width={width} height={height} x={x} y={y} />
// }

// export default Platform
import React, { useRef } from 'react'
import { Image, SkImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue, useAnimatedReaction } from 'react-native-reanimated'

interface Props {
  width: number
  height: number
  platform: SkImage | null
  arrIndex: number
  y: number
  totalWidth: number
  mapAnimationProgress: SharedValue<number>
  platformWidth: number
  platformHeight: number
}

const Platform: React.FC<Props> = ({
  width,
  height,
  platform,
  arrIndex,
  y,
  totalWidth,
  mapAnimationProgress,
  platformWidth,
  platformHeight
}) => {
  const x = useDerivedValue(() => {
    const position = (-totalWidth * mapAnimationProgress.value + arrIndex * width) % totalWidth
    return position < -platformWidth ? position + totalWidth : position
  })

  return <Image image={platform} width={platformWidth} height={platformHeight} x={x} y={y} />
}

export default Platform
