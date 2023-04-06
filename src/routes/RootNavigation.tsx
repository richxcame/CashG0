import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export type RootStackParamList = {
  CashesStack: undefined;
  Cashes: undefined;
  Ranges: undefined;
  Login: undefined;
  CashDetails: {uuid: string};
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateTo(routeName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}
