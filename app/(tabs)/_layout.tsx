import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const AnimatedTabBarButton = ({ 
  children,
  onPress,
  style,
  ref,
  ...restProps  //rest문법
}: BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

/*   const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2,
      useNativeDriver: true,
      friction: 1, // Adjust for desired springiness
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }; */

  const handlePressOut = () =>{
    Animated.sequence([
      Animated.spring(scaleValue,{
        toValue:1.3,
        useNativeDriver:true,
        speed:400,
      }),
      Animated.spring(scaleValue,{
        toValue:1,
        useNativeDriver:true,
        speed:400,
      })
    ]).start()
  }
  return (
    <Pressable
      {...restProps}
      onPress={onPress}
 /*      onPressIn={handlePressIn} */
      onPressOut={handlePressOut}
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        style,
      ]}
      // Disable Android ripple effect
      android_ripple={{ borderless: false, radius: 0 }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function TabLayout() {
  const router = useRouter();
  const isLoggedIn = true;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Fragment>
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              console.log("tabPress");
              e.preventDefault();
              if (isLoggedIn) {
                router.navigate("/modal");
              } else {
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="heart-outline"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="[username]"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(post)/[username]/post/[postID]"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <Modal
        visible={isLoginModalOpen}
        transparent={true}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>Login Modal</Text>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}