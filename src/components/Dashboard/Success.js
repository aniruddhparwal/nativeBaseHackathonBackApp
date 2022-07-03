import React, { useContext, useState, useEffect } from "react";

import { NativeBaseProvider, Box, Center } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ImageBackground, StyleSheet } from "react-native";

export default function Scanner() {
  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290" h="70%">
          Success
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
