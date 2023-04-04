import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {
  VStack,
  Input,
  Button,
  FormControl,
  CloseIcon,
  Collapse,
  Alert,
  HStack,
  Text,
  IconButton,
  Box,
} from 'native-base';
import {useForm, Controller, FieldValues} from 'react-hook-form';

import {styles} from '../styles';
import {useAuth} from '../contexts/Auth';

export const LoginScreen = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
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
          {/* Wrong password notification */}
          <Collapse isOpen={showAlert}>
            <Alert maxW="400" status="error">
              <VStack space={1} flexShrink={1} w="100%">
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between">
                  <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      _dark={{
                        color: 'coolGray.800',
                      }}>
                      Please enter right password
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: 'coolGray.600',
                    }}
                    onPress={() => setShowAlert(false)}
                  />
                </HStack>
                <Box
                  pl="6"
                  _dark={{
                    _text: {
                      color: 'coolGray.600',
                    },
                  }}>
                  You entered wrong password
                </Box>
              </VStack>
            </Alert>
          </Collapse>

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
