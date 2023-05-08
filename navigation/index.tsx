import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Loginscreen from '../screens/LoginScreen/Loginscreen'
import AddTravelScreen from '../screens/AddTravelScreen/AddTravelScreen'
import MyTravelsScreen from '../screens/MyTravelsScreen/MyTravelsScreen'

export type RootStackParamList = {
  Login: undefined
  Root: undefined
  AddTravel: undefined
  MyTravels: undefined
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export default Navigation

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0619' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#0a0619' },
      }}
    >
      <Stack.Screen name='Login' component={Loginscreen} />
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootStackParamList>()

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='MyTravels'
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0619' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0a0619' },
        tabBarActiveTintColor: '#fc67fa',
        tabBarInactiveTintColor: '#fff',
      }}
    >
      <BottomTab.Screen
        name='AddTravel'
        component={AddTravelScreen}
        options={{
          title: 'Add Travel',
          tabBarIcon: ({ color, size }) => (
            <Entypo name='aircraft' size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name='MyTravels'
        component={MyTravelsScreen}
        options={{
          title: 'My Travels',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='pluscircle' size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
