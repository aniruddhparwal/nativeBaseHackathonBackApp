import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/Home/Home";
import Scanner from "./src/components/Dashboard/Scanner";
import Failed from "./src/components/Dashboard/Failed";
import Success from "./src/components/Dashboard/Success";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanning" component={Scanner} />
        <Stack.Screen name="Failed" component={Failed} />
        <Stack.Screen name="Slip Data" initialParams={{ itemId: 42 }} component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
