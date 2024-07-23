import React from 'react'
import { View, Text } from 'react-native'

import { useLandscapeOrientation } from '@/hooks/useOrientation'

const CrazyLians = () => {
  useLandscapeOrientation()

  return (
    <View className="flex-1 justify-center items-center">
      <Text>CrazyLians</Text>
    </View>
  )
}

export default CrazyLians
