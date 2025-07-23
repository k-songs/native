import { Stack } from 'expo-router'

export default function RootLayout(){
  return <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='(tabs)' />
    <Stack.Screen name='modal' options={{presentation:"modal"}}/>

  </Stack>
}

/* home,login 파일에 코드를 추가했지만  여기에 자동으로 추가가됨 
 <Stack.Screen name='login'/> expo-router가 파일기반으로 인식함
*/