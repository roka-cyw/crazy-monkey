import { useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export const useLandscapeOrientation = () => {
  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }

    changeScreenOrientation()

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, [])
}

export const usePortraitOrientation = () => {
  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }

    changeScreenOrientation()
  }, [])
}
