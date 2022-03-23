import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, Feather, AntDesign, Octicons, Entypo, Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
// import { getPhoneNumberSync } from 'react-native-device-info'
import { ProgressBar, Colors } from 'react-native-paper'
import CallLogs from 'react-native-call-log'

export default function App() {
  
  const testActivity = 'MainActivity'
  
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={testActivity}>
        <Stack.Screen
          name="MainActivity"
          component={MainActivity}
          options={{
            title: '',
            headerLeft: () => (
              <View>
              </View>
            ),
            headerRight: () => (
              <View>
              </View>
            )
          }}
        />
        <Stack.Screen
          name="CostsActivity"
          component={CostsActivity}
          options={{
            title: 'Расходы'
          }}
        />
        <Stack.Screen
          name="DetalizationActivity"
          component={DetalizationActivity}
          options={{
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Tab = createBottomTabNavigator()

export function MainActivity({ navigation }) {

  const phoneNumbers = [
    '\n'
  ]
  const [isInit, setIsInit] = useState(false)

  useEffect(async () => {
    const isNotInit = !isInit
    if (isNotInit) {
      navigation.setOptions({
        headerLeft: () => (
          <View>
            <SelectDropdown
              defaultButtonText={'\n'}
              data={phoneNumbers}
              onSelect={(selectedItem, index) => {
                setPhoneNumber(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
              renderDropdownIcon={() => <Entypo name="chevron-down" size={24} color="black" />}
              buttonStyle={{
                height: 25,
                width: 150
              }}
            />
          </View>
        ),
        headerRight: () => (
          <View>
            <Ionicons name="md-chatbubble-ellipses-outline" size={24} color="black" />
          </View>
        )
      })



      setIsInit(true)
    }

    
  }, [])

  const getLogs = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message:
            'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const filter = {
          minTimestamp: 1571835032,    // (Number or String) timestamp in milliseconds since UNIX epoch
                                      // if this filter is set, load(limit, filter) will only return call logs with timestamp >= minTimestamp
        
          maxTimestamp: 1571835033,    // (Number or String) timestamp in milliseconds since UNIX epoch
                                      //
                                      // if this filter is set, load(limit, filter) will only return call logs with timestamp <= maxTimestamp
        
          phoneNumbers: '+1234567890', // (String or an Array of String)
                                      // if this filter is set, load(limit, filter) will only return call logs for this/these phone numbers
        }
        CallLogs.load(-1, filter).then(c => console.log(c));
      } else {
        console.log('Call Log permission denied');
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  // getLogs()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowIcon: true
      }}
    >
      <Tab.Screen
        name="CommunicationActivity"
        component={CommunicationActivity}
        options={{
          title: 'Связь',
          tabBarIcon: ({ focused, horizontal, tintColor }) => <MaterialCommunityIcons name="sim" size={24} color="black" />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="FinancesActivity"
        component={FinancesActivity}
        options={{
          title: 'Финансы',
          tabBarIcon: ({ focused, horizontal, tintColor }) => <Octicons name="credit-card" size={24} color="black" />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="ServicesActivity"
        component={ServicesActivity}
        options={{
          title: 'Услуги',
          tabBarIcon: ({ focused, horizontal, tintColor }) => <MaterialCommunityIcons name="view-list" size={24} color="black" />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="ForMeActivity"
        component={ForMeActivity}
        options={{
          title: 'Для меня',
          tabBarIcon: ({ focused, horizontal, tintColor }) => <AntDesign name="staro" size={24} color="black" />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="MoreActivity"
        component={MoreActivity}
        options={{
          title: 'Другое',
          tabBarIcon: ({ focused, horizontal, tintColor }) => <Feather name="more-horizontal" size={24} color="black" />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

export function CommunicationActivity() {
  
  const getLogs = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message:
            'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      console.log(`granted: ${granted}`)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const filter = {
          minTimestamp: 1571835032,    // (Number or String) timestamp in milliseconds since UNIX epoch
                                      // if this filter is set, load(limit, filter) will only return call logs with timestamp >= minTimestamp
        
          maxTimestamp: 1571835033,    // (Number or String) timestamp in milliseconds since UNIX epoch
                                      //
                                      // if this filter is set, load(limit, filter) will only return call logs with timestamp <= maxTimestamp
        
          phoneNumbers: '+1234567890', // (String or an Array of String)
                                      // if this filter is set, load(limit, filter) will only return call logs for this/these phone numbers
        }
        CallLogs.load(-1, filter).then(c => console.log(c));
        console.log(`CallLogs: ${5}`)
      } else {
        console.log('Call Log permission denied');
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  getLogs()
  
  return (
    <View>
      <Text>
        Расходы
      </Text>
      <TouchableOpacity
        onPress={() => getLogs()}
      >
        <View>

        </View>
        <ProgressBar
          style={{marginTop: 300}}
          progress={0.5}
          color="#49B5F2"
        />
        <View>
          <View>
            <Text>
              Сообщения
            </Text>
          </View>
          <View>
            <Text>
              Звонки
            </Text>
          </View>
        </View>
        <Text>
          Подробнее
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export function FinancesActivity() {
  return (
    <View>
      <Text>
      FinancesActivity
      </Text>
    </View>
  )
}

export function ServicesActivity() {
  return (
    <View>
      <Text>
        ServicesActivity
      </Text>
    </View>
  )
}

export function ForMeActivity() {
  return (
    <View>
      <Text>
        ForMeActivity
      </Text>
    </View>
  )
}

export function MoreActivity() {
  return (
    <View>
      <Text>
        MoreActivity
      </Text>
    </View>
  )
}

export function CostsActivity() {
  return (
    <View>
      <Text>
        CostsActivity
      </Text>
    </View>
  )
}

export function DetalizationActivity() {
  return (
    <View>
      <Text>
        DetalizationActivity
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})