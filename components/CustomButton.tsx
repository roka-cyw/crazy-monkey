import React from 'react'
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native'

interface CustomButtonProps {
  image: ImageSourcePropType
  onPress: () => void
  containerStyles?: string
  buttonStyles?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({ image, onPress, containerStyles = '', buttonStyles = '' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      className={`justify-center items-center ${containerStyles} `}
      onPress={onPress}
    >
      <Image source={image} resizeMode='cover' className={`${buttonStyles}`} />
    </TouchableOpacity>
  )
}

export default CustomButton
