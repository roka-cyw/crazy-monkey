import React from 'react'
import { Image, useAnimatedImageValue, useImage } from '@shopify/react-native-skia'

interface Props {
  width: number
  height: number
  isStartGame: boolean
}

const MONKEY_HEIGHT = 150
const MONKEY_WIDTH = 120

const Monkey: React.FC<Props> = ({ width, height, isStartGame }) => {
  const stand = useImage(require('../assets/monkey/stand.png'))

  const run = useAnimatedImageValue(require('../assets/monkey/run.gif'))
  const jump = useAnimatedImageValue(require('../assets/monkey/jump.gif'))
  const dead = useAnimatedImageValue(require('../assets/monkey/dead.gif'))

  // TODO: y has test formula. It has to be changed after using the original assets instead of the actual
  return <Image image={isStartGame ? run : stand} width={MONKEY_WIDTH} height={MONKEY_HEIGHT} x={0} y={height - MONKEY_HEIGHT / 1.12} />
}

export default Monkey
