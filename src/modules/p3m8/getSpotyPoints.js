import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import ButtonRegular from '../../common/meduimBtnSP';
import TNActivityIndicator from '../../common/TNIndicator';
import { FONTS, ICONS, Url } from '../../constant';
import { getUserDetail } from '../../redux/user/user.action';
import Header from './components/headerBL';



export const GetSpotyPoints = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)


  const sendInvite = async () => {
    if (email == "") {
      Alert.alert("Code field should not be blank")
    } else {
      setLoader(true)
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      let data = {
        "referralCode": email
      }
      axios.post(`${Url}api/refer`, data, { headers: headers })
        .then(resp => {
          let response = resp.data
          console.log("sendInvite: ", response)
          dispatch(getUserDetail(currentUser._id))
          Alert.alert("Congrates you get 100 sporty points")
          setLoader(false)
          setEmail('')
        })
        .catch(error => {
          const err = error
          if (err.response) {
            alert(err.response.data.message)
          }
          setLoader(false)
        });
    };
  };

  const getEmail = (value) => {
    let removeSpace = value.replace(/ /g, '')
    setEmail(removeSpace)
  }


  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label='Sporty Points' />

      <View style={{ width: '80%', marginTop: 30 }}>
        <Text style={styles.head}>Collect Sporty Points</Text>
      </View>
      <View style={{ width: '80%', marginTop: 11 }}>
        <Text style={styles.desc}>
          Collect sporty points using referral code, sent by friend in your email, and earn 1000 sporty points to spend on
          Sporforya! Terms apply
        </Text>
      </View>
      <View style={{ width: '80%', marginTop: 22 }}>
        <TextInput
          style={styles.ti}
          placeholder="Enter Referral Code"
          placeholderTextColor={"#707070"}
          onChangeText={(value) => getEmail(value)}
          value={email}
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <ButtonRegular label="Collect" bgColor={"#75CB36"} onClick={sendInvite} />
      </View>

      <View style={styles.imgCont}>
        <Image source={ICONS.refer} style={styles.img} resizeMode='contain' />
      </View>

      {
        loader
          ?
          <TNActivityIndicator />
          :
          null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#21D17F',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: '#FFFFFF',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#FFFFFF',
  },
  link: {
    fontFamily: FONTS.SFBold,
    color: 'white',
    fontSize: wp('4'),
  },
  ti: {
    borderColor: '#70707026',
    borderWidth: 1,
    borderRadius: 4,
    height: 46,
    padding: 10,
    backgroundColor: 'white',
    fontSize: wp('3.5'),
    color: '#000000',
    fontFamily: FONTS.SFRegular
  },
  linkTxt: {
    color: '#707070',
    opacity: 0.5,
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
  },
  imgCont: {
    bottom: 0,
    width: '100%',
    marginTop: hp('21')

  },
  img: {
    height: wp('50'),
    width: wp('100'),
  },
});
