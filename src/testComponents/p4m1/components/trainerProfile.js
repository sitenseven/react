import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {FONTS, ICONS} from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const TrainerProfile = props => {
  const {name, listings, img, onPress} = props;
  return (
    <TouchableOpacity onPress={() => { alert("Coming soon")}} style={styles.main}>
      <Image source={ICONS.listingImage} style={styles.img} />
      <View style={{width: '90%'}}>
        <Text style={[styles.name, {marginBottom: 4}]}>{props.name}</Text>
        <Text style={[styles.field, {marginBottom: 6}]}>
          {props.profession}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 11,
          }}>
          <Icon
            name="location-outline"
            style={{marginRight: 5}}
            color="#0D6B93"
            size={10}
          />
          <Text numberOfLines={1} style={styles.address}>{props.address}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <Text style={styles.amount}>${props.amount}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="share-social-outline"
              size={15}
              style={{marginRight: 10}}
            />
            <Icon name="heart" size={15} color={'#FF5757'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 4,
    minHeight: 269,
    width: 263,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  img: {
    width: '100%',
    height: 178,
    marginBottom: 11,
    borderRadius: 4,
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('5.5'),
    color: 'black',
    marginBottom: 5,
  },
  listing: {
    fontFamily: FONTS.SFRegular,
    color: '#595959',
    fontSize: wp('3.5'),
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('5.5'),
    color: 'black',
  },
  field: {
    fontSize: wp('4'),
    color: 'black',
    fontFamily: FONTS.SFMedium,
  },
  address: {
    fontFamily: FONTS.SFRegular, //change to SFLight
    fontSize: wp('3'),
    color: '#1A1A1A',
  },
  loc: {
    width: 6.31,
    height: 9.18,
    marginRight: 5,
  },
  amount: {
    fontFamily: FONTS.SFBold,
    color: 'black',
    fontSize: wp('4'),
  },
});
