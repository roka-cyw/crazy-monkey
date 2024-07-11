import React from 'react'
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native'

interface CustomButtonProps {
  image: ImageSourcePropType
  onPress: () => void
  containerStyles?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ image, onPress, containerStyles = '' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      className={`justify-center items-center ${containerStyles} `}
      onPress={onPress}
    >
      <Image source={image} resizeMode='cover' />
    </TouchableOpacity>
  )
}

export default CustomButton
