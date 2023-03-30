import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';

import {styles} from '../styles';
import {useAuth} from '../contexts/Auth';

export const LoginScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    await auth.login();
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <Button title="Sign In" onPress={signIn} />
      )}
    </View>
  );
};
