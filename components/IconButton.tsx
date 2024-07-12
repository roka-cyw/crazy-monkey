import React from 'react'

import CustomButton from './CustomButton'
import { ImageSourcePropType } from 'react-native'

interface Props {
  image: ImageSourcePropType
  onPress: () => void
  containerStyles?: string
  buttonStyles?: string
}

const IconButton: React.FC<Props> = ({ image, onPress, containerStyles = '', buttonStyles = '' }) => {
  return <CustomButton image={image} onPress={onPress} containerStyles={containerStyles} buttonStyles={buttonStyles} />
}

export default IconButton
