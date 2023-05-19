/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import { ReactElement, useState } from 'react';

const LoginScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
      <Icon {...props} name={showPassword ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          Hello 2
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Sign in to your account
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          accessoryRight={renderPasswordIcon}
          secureTextEntry={!showPassword}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
          >
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button
        style={styles.signInButton}
        size="giant"
        onPress={() => navigation.navigate('Converstations')}
      >
        SIGN IN
      </Button>
      <Button style={styles.signUpButton} appearance="ghost" status="basic">
        Don't have an account? Create
      </Button>
    </>
  );
};

export default LoginScreen;

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
