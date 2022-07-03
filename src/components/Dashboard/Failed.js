import React from "react";
import { NativeBaseProvider, Box, Center,Text } from "native-base";
import { Image, StyleSheet } from "react-native";


export default function Scanner() {
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
      width:"200",
    },
    logo: {
      width: 100,
      height: 100,
      backgroundColor:"white"
    },
  });

  return (
    <NativeBaseProvider>
       <Center w='full' flex={1} background={"white"}>
        <Image source={require('../../assets/failled.gif')} style={styles.logo}/>
        <Text fontSize="2xl">
          This is not a vaild Code
        </Text>
        </Center>
    </NativeBaseProvider>
  );
}
