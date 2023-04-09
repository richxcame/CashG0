import React, {useEffect, useState} from 'react';
import {Button, ChevronRightIcon, Input, Pressable} from 'native-base';

import {
  Box,
  FlatList,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigateTo} from '../routes/RootNavigation';
import api from '../plugins/axios';

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

export const CashesScreen = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams('limit=20'),
  );
  const [cashes, setCashes] = useState<CashBody[]>([]);
  const [contacts, setContacts] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('useef');
    console.log(searchParams.toString());

    const fetchData = async () => {
      try {
        const {data} = await api.get<CashesResponse>(
          `/cashes?${searchParams.toString()}`,
        );
        setCashes(old => [...old, ...data.cashes]);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setCashes([]);
      setHasError(false);
      setIsLoading(false);
    };
  }, [searchParams]);

  // const {data, error} = useFetch<CashesResponse>(fetchURL);
  // if (data && data.cashes) {
  //   console.log('rerender');

  //   console.log(cashes.current.length, 'len');

  //   cashes.current = [...cashes.current, ...data.cashes];
  // }

  // if (error) {
  //   return <Text>Couldn't fetch data</Text>;
  // }

  const loadMore = () => {
    setSearchParams(old => {
      const offset = parseInt(old.get('offset') || '0', 10);
      const limit = parseInt(old.get('limit') || '20', 10);
      old.delete('offset');
      old.set('offset', (offset + limit).toString());

      return new URLSearchParams(old.toString());
    });
  };

  const onPress = (uuid: string) => {
    navigateTo('CashDetails', {
      uuid,
    });
  };

  const handleSearch = () => {
    const arr = contacts.split(',');

    setSearchParams(old => {
      old.delete('contact');
      arr.forEach(contact => {
        old.append('contact', contact.trim());
      });

      return new URLSearchParams(old.toString());
    });
  };

  const handleChange = (text: string) => {
    setContacts(text);
  };

  if (hasError) {
    <Text>Couldn't fetch data. Please check your internet connection</Text>;
  }

  return (
    <>
      <Box alignItems="center">
        <Input
          onChangeText={v => handleChange(v)}
          m={2}
          InputRightElement={
            <Button rounded="none" onPress={handleSearch}>
              <Icon name="search-outline" color="white" />
            </Button>
          }
          placeholder="Search from contacts"
        />
      </Box>
      <FlatList
        data={cashes}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        renderItem={({item}) => (
          <Pressable onPress={() => onPress(item.uuid)}>
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
                </VStack>
              </HStack>
            </Box>
          </Pressable>
        )}
      />
      {/* Loader */}
      {isLoading && <Text>Loading...</Text>}
    </>
  );
};
