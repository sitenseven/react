import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, Image,
  ScrollView, Alert, Platform, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ButtonRegular } from '../../common/buttonRegular';
import { MyTextinput } from '../../common/textinput';
import { FONTS, ICONS } from '../../constant';
import { userLogin } from '../../redux/user/user.action';
import TNIndicator from '../../common/TNIndicator'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import { CheckBox } from '../taxinformation/components/checkboxBox';

export const Login = (props) => {
  const dispatch = useDispatch()
  const loader = useSelector(state => state.loader.loader)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    dispatch(setLoader(false))
    return () => {
    }
  }, [])


  const getEmail = (value) => {
    let removeSpace = value.replace(/ /g, '')
    setEmail(removeSpace)
  }
  const getPassword = (value) => {
    setPassword(value)
  }

  const loginUser = async () => {
    let validate = await validateEmail()
    if (email == "") {
      Alert.alert("Please provide a username or password.")
    } else if (!validate) {
      Alert.alert("Wrong email format")
    } else if (password == "") {
      Alert.alert("Please provide a username or password.")
    } else {
      dispatch(setLoader(true))
      let data = {
        "email": email,
        "password": password
      }
      dispatch(userLogin(data, props.navigation))
      setEmail('');
      setPassword('')
    }
  }
  const validateEmail = async () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%', alignItems: 'center' }}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <LinearGradient
        colors={['#3B5998', '#0D6B93']}
        style={styles.linearGradient}>
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: 'absolute', top: Platform.OS == 'ios' ? 50 : 20, left: wp('3.5') }}>
            <Icon name="chevron-back-outline" color="white" size={25} />
          </TouchableOpacity>
          <View style={{ width: '90%', marginTop: 96, alignItems: 'center' }}>
            <Image source={ICONS.signinLogo} style={{ height: 69, width: 96 }} />
          </View>
          <View style={{ marginTop: 33 }}>
            <Text style={styles.head}>Sign In</Text>
          </View>
          <View style={{ width: '90%', marginTop: 39 }}>
            <Text style={styles.field}>Email address</Text>
            <MyTextinput
              value={email}
              onChangeText={getEmail.bind(this)}
              secureTextEntry={false}
            />
          </View>
          <View style={{ width: '90%', marginTop: 23 }}>
            <Text style={styles.field}>Password</Text>
            <MyTextinput
              secureTextEntry={true}
              value={password}
              onChangeText={getPassword.bind(this)}
            />
          </View>
          <View style={{ width: '90%', marginTop: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => setRemember(!remember)}
              style={{
                flexDirection: 'row',
                width: '50%',
                alignItems: 'center',
              }}>
              <View style={{ width: '5%', marginRight: 12 }}>
                <CheckBox value={remember} getValue={setRemember.bind(this)} />
              </View>
              <View style={{ width: '93%' }}>
                <Text style={styles.rememberLabel}>Remember me</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Comming soon!')}>
              <Text style={styles.rememberLabel}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: Platform.OS == 'ios' ? hp('16') : hp('9') }} />
          <View style={styles.bottom}>
            <ButtonRegular title="Done" onClick={() => loginUser()} />
          </View>
        </ScrollView>
        {
          loader
            ?
            <TNIndicator />
            :
            null
        }
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {},
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: 36,
    color: 'white',
  },
  field: {
    fontSize: 14,
    fontFamily: FONTS.SFBold,
    color: 'white',
    marginBottom: 11,
  },
  bottom: {
    width: '90%',
  },
  rememberLabel: {
    fontSize: 14,
    fontFamily: FONTS.SFBold,
    color: 'white',
  }
});
