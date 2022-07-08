import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {FONTS} from '../../../constant';
import Header from '../components/header';
import Btn from '../../../common/meduimBtnSP';
import CustomInputField from '../components/customInputField';
import CustomPhonePicker from '../components/customPhonePicker';
import {useDispatch, useSelector} from 'react-redux';
import TNIndicator from '../../../common/TNIndicator';

const editContactInfo = props => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://api2.sporforya.com/api/users/me`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhone(data.phone);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      const body = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      };

      const response = await fetch(
        `https://api2.sporforya.com/api/users/contactinfo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      );

      if (response.status == 201) {
        props.navigation.navigate('editLocationInfo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getFullName = value => {
    setFirstName(value);
  };
  const getLastName = value => {
    setLastName(value);
  };
  const getEmail = value => {
    setEmail(value);
  };
  const getPhone = value => {
    setPhone(value);
  };
  const getCode = value => {
    setCode(value);
  };

  const saveContact = () => {
    updateData();
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} label="Edit Contact Info" />
      <ScrollView
        contentContainerStyle={{width: wp('100'), alignItems: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: Platform.OS == 'android' ? 20 : 35,
          }}>
          <Text style={styles.headingStyle}>Contact information</Text>
          <Text style={styles.subheadingStyle}>
            Tell us about yourself to set up your profile.
          </Text>
        </View>
        <View style={{height: 20}} />
        <CustomInputField
          label="First name"
          value={firstName}
          getValue={getFullName.bind(this)}
        />
        <CustomInputField
          label="Last name"
          value={lastName}
          getValue={getLastName.bind(this)}
        />
        <CustomInputField
          edit={false}
          label="Email address"
          value={email}
          getValue={getEmail.bind(this)}
        />
        <CustomPhonePicker
          label="Phone Number"
          value={phone}
          getValue={getPhone.bind(this)}
          getCountryCode={getCode.bind(this)}
        />

        <View style={{height: 50}} />
        <Btn label="Next" onClick={() => saveContact()} bgColor="#2C99C6" />
        <View style={{height: 20}} />
      </ScrollView>
      {loader ? <TNIndicator /> : null}
    </View>
  );
};

export default editContactInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
  headingStyle: {
    width: wp('80'),
    color: '#000000',
    fontSize: wp('6.5'),
    fontFamily: FONTS.SFSemiBold,
  },
  subheadingStyle: {
    width: wp('80'),
    color: '#707070',
    fontSize: wp('3.2'),
    fontFamily: FONTS.SFMedium,
    marginTop: 6,
  },
  optionContainer: {
    width: wp('80'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
