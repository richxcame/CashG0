import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {VStack, Input, Button, FormControl} from 'native-base';
import {useForm, Controller, FieldValues} from 'react-hook-form';

import {styles} from '../styles';
import {useAuth} from '../contexts/Auth';

export const LoginScreen = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async ({username, password}: FieldValues) => {
    try {
      setIsLoading(true);
      await auth.login(username, password);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <>
          <VStack width="80%" space={4}>
            {/* Username */}
            <FormControl isRequired isInvalid={'username' in errors}>
              <FormControl.Label>Username</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    variant="outline"
                  />
                )}
                name="username"
                rules={{required: 'Username is required'}}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.username?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Password */}
            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    variant="outline"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
                rules={{required: 'Password is required'}}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.password?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <Button onPress={handleSubmit(onSubmit)} colorScheme="primary">
              LOGIN
            </Button>
          </VStack>
        </>
      )}
    </View>
  );
};
