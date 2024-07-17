import React from 'react'
import { ImageSourcePropType } from 'react-native'

import CustomButton from './CustomButton'

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
