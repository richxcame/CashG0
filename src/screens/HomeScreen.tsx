import React, {useRef, useState} from 'react';
import {Button, View} from 'react-native';
import {ChevronRightIcon} from 'native-base';

import {useAuth} from '../contexts/Auth';
import {
  Box,
  FlatList,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import useFetch from '../hooks/useFetch';

export type CashBody = {
  uuid: string;
  amount: number;
  client: string;
  contact: string;
  created_at: string;
  detail: string;
  note: string;
};
export type CashesResponse = {
  cashes: CashBody[];
  total: number;
};

export const HomeScreen = () => {
  const [fetchURL, setFetchURL] = useState<string>('/cashes');
  const [offset, setOffset] = useState<number>(0);
  const [limit, _] = useState<number>(50);
  const cashes = useRef<CashBody[]>([]);

  const auth = useAuth();
  const signOut = () => {
    auth.logout();
  };

  const {data, error} = useFetch<CashesResponse>(fetchURL);
  if (data && data.cashes) {
    cashes.current = [...cashes.current, ...data.cashes];
    // setCashes(old => [...old, ...data.cashes]);
  }

  // if (!data) {
  //   return <Text>Loading...</Text>;
  // }

  if (error) {
    return <Text>Couldn't fetch data</Text>;
  }

  const loadMore = () => {
    setOffset(old => old + limit);
    setFetchURL(`/cashes?offset=${offset + limit}&limit=${limit}`);
  };

  return (
    <>
      <View>
        <Button title="Logout" onPress={signOut} />
      </View>
      {/* <Box> */}
      <FlatList
        data={cashes.current}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        renderItem={({item}) => (
          <Box borderColor="light.300" borderBottomWidth="0.3" px="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text color="coolGray.800" bold>
                  {item.contact} {item.amount}
                </Text>
                <Text color="coolGray.600">{item.client}</Text>
              </VStack>
              <Spacer />
              <VStack justifyContent="center">
                <IconButton size="sm" icon={<ChevronRightIcon />} />
                {/* <Text
                    fontSize="xs"
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.detail}
                  </Text> */}
              </VStack>
            </HStack>
          </Box>
        )}
        // keyExtractor={item => item.uuid}
      />
      {/* </Box> */}
      {!data && <Text>Loading...</Text>}
    </>
  );
};
