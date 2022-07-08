import React, { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { FONTS, ICONS } from '../../constant';
import { Divider } from './components/divider';
import TNIndicator from '../../common/TNIndicator'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import { loginByGoogle, loginByFacebook, setUserDetail, setCurrentUser } from '../../redux/user/user.action';


GoogleSignin.configure({
  iosClientId:
    '479328453795-6g32lq9o9vfnluih2eqo2n8p2mjl0s35.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '479328453795-989qqiob8q2ccoh3qjhc1jcevq4tpd9c.apps.googleusercontent.com',
  offlineAccess: true,
});
const SocialLoginTemp = props => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={{
        height: 46,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        // justifyContent: 'center',
        marginVertical: 5,
      }}>
      <Image source={props.img} style={{ width: wp('5.5'), height: wp('5.5'), marginTop: '1%', marginLeft: wp(6), }} />
      <Text
        style={{ color: 'black', fontFamily: FONTS.SFBold, fontSize: wp('3.5'), width: "65%", marginLeft: wp(6), }}>
        Continue with {props.social}
      </Text>
    </TouchableOpacity>
  );
};

export const GetStartedTemplate = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader)

  useEffect(() => {
    dispatch(setUserDetail(null))
    dispatch(setCurrentUser(null))
    return () => {
    }
  }, [])

  const googleSignIn = async () => {
    dispatch(setLoader(true));
    await GoogleSignin.hasPlayServices()
    await GoogleSignin.signIn().then((data) => {
      console.log(data)
      GoogleSignin.getTokens().then((res) => {
        console.log("currentUser: ", res.accessToken);
        let data = {
          token: res.accessToken,
        };
        dispatch(loginByGoogle(data, props.navigation));
      });
    }).catch(error => {
      const err = error
      if (err.response) {
        alert(err.response.data.message)
        console.log("googleSignIn: ", err.response.data)
      }
      console.log("error googleSignIn: ", err)
      dispatch(setLoader(false))
    });
  };

  const onFacebookButtonPress = async () => {
    dispatch(setLoader(true));
    LoginManager.logOut();
    await LoginManager.logInWithPermissions(["public_profile", "email"])
      .then(async result => {
        const fbData = await AccessToken.getCurrentAccessToken();
        dispatch(loginByFacebook(fbData.accessToken, props.navigation));
        return true;
      })
      .catch(error => {
        const err = error
        if (err.response) {
          alert(err.response.data.message)
        }
        console.log("onFacebookButtonPress: ", error)
        dispatch(setLoader(false))
      });
  };

  function onSigninPress() {
    props.navigation.navigate('login');
  }

  const onGuestBtnClick = () => {
    props.navigation.navigate("mainRoutes", { screen: "userAppRoutes" })
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground style={styles.bg} source={ICONS.getStartedBG}>
        <SafeAreaView
          style={{ width: '100%', marginTop: hp('10'), alignItems: 'center' }}>
          <ScrollView style={{ width: '100%' }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ width: '90%' }}>
                <Text style={styles.head}>Let's get started!</Text>
              </View>
              <View style={{ width: '60%', marginTop: hp('2') }}>
                <Text style={styles.txt}>
                  Sign up or log in to find sports near you
                </Text>
              </View>
              <View style={{ width: '80%', marginTop: hp('4') }}>
                <SocialLoginTemp social="Facebook" img={ICONS.facebookIcon} onPress={() => onFacebookButtonPress()} />
                <SocialLoginTemp social="Google" img={ICONS.googleIcon} onPress={() => googleSignIn()} />
              </View>
              <View style={{ width: '80%', marginTop: hp('4') }}>
                <Divider text="OR" />
              </View>
              <View style={{ width: '80%', marginTop: hp('3.5') }}>
                {props.buttonToPut}
              </View>
              <View style={{ width: '90%', marginTop: hp('1.5') }}>
                <TouchableOpacity onPress={onGuestBtnClick} style={{ width: '88%', height: 30, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}  >
                  <Text style={styles.guestText}>
                    Continue as guest
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{ width: '90%', marginTop: hp('12'), alignItems: 'center' }}>
                <Text style={[styles.tosText]}>
                  By continuing, you agree to our
                </Text>
                <View style={styles.tosCont}>
                  <Text
                    onPress={() => props.navigation.navigate("Terms")}
                    style={[styles.tosText, { textDecorationLine: 'underline' }]}>
                    Terms of service{' '}
                  </Text>
                  <Text style={[styles.tosText]}>and our </Text>
                  <Text
                    onPress={() => props.navigation.navigate("PrivacyPolicy")}
                    style={[styles.tosText, { textDecorationLine: 'underline' }]}>
                    Privacy Policy
                  </Text>
                </View>
              </View>
              <View style={[styles.tosCont, { width: '80%', marginTop: hp('5'), marginBottom: 8 }]}>
                <Text style={[styles.tosText, { fontSize: wp('4.5'), fontFamily: FONTS.SFRegular }]}>
                  Already have an account?{' '}
                </Text>
                <Text
                  onPress={onSigninPress}
                  style={[
                    styles.tosText,
                    { textDecorationLine: 'underline' },
                    { fontSize: wp('4.5'), fontFamily: FONTS.SFRegular },
                  ]}>
                  SignIn
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      {
        loader
          ?
          <TNIndicator />
          :
          null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  head: {
    fontSize: wp('8'),
    color: 'white',
    fontFamily: FONTS.SFBold,
    textAlign: 'center',
  },
  txt: {
    fontSize: wp('4.5'),
    color: 'white',
    fontFamily: FONTS.SFRegular,
    textAlign: 'center',
  },
  guestText: {
    color: '#FFFFFF',
    fontFamily: FONTS.SFRegular,
    fontWeight: '700',
    fontSize: wp('3.5'),
    textAlign: 'center',
    textDecorationLine: 'underline',

  },
  tosText: {
    fontSize: wp('3.5'),
    color: 'white',
    fontFamily: FONTS.SFRegular,
  },
  tosCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});
