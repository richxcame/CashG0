import React, {useRef, useState} from 'react';
import dayjs from 'dayjs';

import {Box, FlatList, HStack, Spacer, Text, VStack} from 'native-base';
import useFetch from '../hooks/useFetch';

export type RangeBody = {
  uuid: string;
  created_at: string;
  updated_at: string;
  client: number;
  detail: string;
  note: string;
  total_amount: number;
};
export type CashesResponse = {
  ranges: RangeBody[];
  total: number;
};

export const RangeScreen = () => {
  const [fetchURL, setFetchURL] = useState<string>('/ranges');
  const [offset, setOffset] = useState<number>(0);
  const [limit, _] = useState<number>(50);
  const ranges = useRef<RangeBody[]>([]);

  const {data, error} = useFetch<CashesResponse>(fetchURL);
  if (data && data.ranges) {
    ranges.current = [...ranges.current, ...data.ranges];
  }

  if (error) {
    return <Text>Couldn't fetch ranges</Text>;
  }

  const loadMore = () => {
    setOffset(old => old + limit);
    setFetchURL(`/cashes?offset=${offset + limit}&limit=${limit}`);
  };

  return (
    <>
      {/* Ranges */}
      <FlatList
        data={ranges.current}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        renderItem={({item}) => (
          <Box borderColor="light.300" borderBottomWidth="0.3" px="2">
            <HStack space={[2, 3]} justifyContent="space-between">
              <VStack>
                <Text color="coolGray.800" bold>
                  {item.client}
                </Text>
                <Text color="coolGray.600">
                  {dayjs(item.created_at).format('DD.MM.YYYY HH:mm:ss')}{' '}
                </Text>
              </VStack>
              <Spacer />
              <VStack justifyContent="center">
                <Text color="coolGray.800" bold>
                  {item.total_amount}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
      />

      {/* Loader while fetching */}
      {!data && <Text>Loading...</Text>}
    </>
  );
};
