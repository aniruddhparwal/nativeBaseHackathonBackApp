import React from "react";
import { NativeBaseProvider, Box, Center } from "native-base";

export default function Scanner() {
  return (
    <NativeBaseProvider>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290" h="70%">
          This is not a vaild Code
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
