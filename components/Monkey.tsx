import React from 'react'
import { Group, Image, Rect, useAnimatedImageValue, useImage } from '@shopify/react-native-skia'
import { SharedValue, useDerivedValue } from 'react-native-reanimated'

interface Props extends monkeyProps {
  isStartGame: boolean
}

interface monkeyProps {
  MONKEY_HEIGHT: number
  MONKEY_WIDTH: number
  groundLevel: number
  monkeyY: SharedValue<number>
}

const Monkey: React.FC<Props> = ({ isStartGame, MONKEY_HEIGHT, MONKEY_WIDTH, groundLevel, monkeyY }) => {
  const stand = useImage(require('../assets/monkey/stand.png'))
  const run = useAnimatedImageValue(require('../assets/monkey/run.gif'))
  const jump = useAnimatedImageValue(require('../assets/monkey/jump.gif'))
  const dead = useAnimatedImageValue(require('../assets/monkey/dead.gif'))

  const monkeyTransform = useDerivedValue(() => {
    return [{ translateY: monkeyY.value }]
  })

  return (
    <>
      <Group transform={monkeyTransform} origin={{ x: 0, y: groundLevel }}>
        <Image
          image={isStartGame ? (monkeyY.value < groundLevel ? jump : run) : stand}
          width={MONKEY_WIDTH}
          height={MONKEY_HEIGHT}
          x={0}
          y={0}
        />
      </Group>
      {/* <Rect x={40} y={groundLevel} width={MONKEY_WIDTH / 2} height={MONKEY_HEIGHT} color="rgba(255, 0, 255, 0.5)" /> */}
    </>
  )
}

export default Monkey
