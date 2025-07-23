import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;   /*홈 주소  */
  }
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}