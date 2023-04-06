import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, HStack, Text} from 'native-base';

import {RootStackParamList} from '../routes/RootNavigation';
import useFetch from '../hooks/useFetch';
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<RootStackParamList, 'CashDetails'>;

export type Cash = {
  uuid: string;
  created_at: string;
  client: string;
  contact: string;
  amount: string;
  note: string;
  detail: string;
};
export type CashDetailsResponse = {
  cash: Cash;
};

export const CashDetailsScreen = ({route}: Props) => {
  const {uuid} = route.params;
  const {data, error} = useFetch<CashDetailsResponse>(`/cashes/${uuid}`);

  if (error) {
    return <Text>Couldn't fetch data, please internet connection!</Text>;
  }
  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box m={2}>
      <HStack justifyContent="space-between">
        <Text bold>UUID:</Text>
        <Text>{data.cash.uuid}</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text bold>Created:</Text>
        <Text>{dayjs(data.cash.created_at).format('DD.MM.YYYY HH:mm:ss')}</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text bold>Client:</Text>
        <Text>{data.cash.client}</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text bold>Contact:</Text>
        <Text>{data.cash.contact}</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text bold>Amount:</Text>
        <Text>{data.cash.amount} TMT</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text bold>Detail:</Text>
        <Text>{data.cash.detail}</Text>
      </HStack>
      <HStack justifyContent="space-between">
        <Text bold>Note:</Text>
        <Text>{data.cash.note}</Text>
      </HStack>
    </Box>
  );
};
