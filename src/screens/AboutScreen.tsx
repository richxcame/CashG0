import React from 'react';
import {CASHG0_VERSION} from '@env';
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  VStack,
} from 'native-base';

import {useAuth} from '../contexts/Auth';

export const AboutScreen = () => {
  const auth = useAuth();

  const logout = () => {
    auth.logout();
  };

  return (
    <Flex h="80%">
      <Center>
        <Image
          mt={3}
          size={200}
          alt="CashG0"
          borderRadius={100}
          source={require('../assets/CashG0.png')}
        />
      </Center>
      <Heading size="xs" mx="auto" mt={2}>
        {CASHG0_VERSION}
      </Heading>
      <Spacer />
      <VStack space={4} alignItems="center">
        <Heading>{auth.authData.username}</Heading>
        <Button
          colorScheme="danger"
          variant="subtle"
          width={250}
          mx="auto"
          onPress={logout}>
          LOGOUT
        </Button>
      </VStack>
    </Flex>
  );
};
