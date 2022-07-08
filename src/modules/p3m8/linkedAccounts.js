import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonRegular} from '../../common/btnRegular';
import {FONTS, ICONS} from '../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../common/headerBLC';

const Account = props => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Icon
        size={24}
        name={props.iconName}
        color={props.iconColor}
        style={{marginRight: 30}}
      />
      <Text style={styles.name}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export const LinkedAccounts = (props) => {
  return (
    <SafeAreaView style={styles.main}>
      <Header navigation={props.navigation} label='Linked Accounts' />
      <View style={{width: '80%', marginTop: 50}}>
        <Account name="Facebook" iconName="logo-facebook" iconColor="#3B5999" />
        <Account name="Twitter" iconColor="#1DA1F2" iconName="logo-twitter" />
        <Account
          name="Instagram"
          iconColor="#1DA1F2"
          iconName="logo-instagram"
        />
        <Account name="Linkedin" iconColor="#0e76a8" iconName="logo-linkedin" />
        <Account
          name="Pinterest"
          iconColor="#D32F2F"
          iconName="logo-pinterest"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 20,
    width: '100%',
    // borderWidth: 1,
  },
  name: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: 20,
    color: 'black',
  },
});
