import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <Slot />
}
// // <Stack>
// //   <Stack.Screen name='index' options={{ headerShown: false }} />
// //   <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
// // </Stack>

// // <Stack>
// {
//   /* <Stack.Screen name='index' options={{ headerShown: false }} /> */
// }
// {
//   /* <Stack.Screen name='(tabs)' options={{ headerShown: false }} /> */
// }
// {
//   /* <Stack.Screen name='+not-found' /> */
// }
// {
//   /* </Stack> */
// }
