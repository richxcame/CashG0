import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateTo(routeName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}
