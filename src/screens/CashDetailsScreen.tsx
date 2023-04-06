import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/RootNavigation';

import {Text} from 'native-base';

type Props = NativeStackScreenProps<RootStackParamList, 'CashDetails'>;
export const CashDetailsScreen = ({route}: Props) => {
  return <Text>{route.params.uuid} </Text>;
};
