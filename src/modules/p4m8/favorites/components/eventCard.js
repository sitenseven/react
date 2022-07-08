import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FONTS, ICONS } from '../../../../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const SportsEventCard = ({ listings, navigation }) => {

  return (
    <TouchableOpacity
      onPress={() => { }}
    >
      <View style={styles.main}>
        <ImageBackground
          borderRadius={4}
          source={ICONS.listingImage}
          style={styles.img}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={ICONS.verifiedBadge}
              style={styles.verifiedImg}
            />
            <Icon name="heart" size={20} color="#FC204A" />
          </View>
        </ImageBackground>
        <View
          style={{
            marginTop: 13,
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
          }}>
          <Image source={ICONS.starBlue} style={styles.startIcon} />
          <Text style={styles.gainedRating}>0</Text>
          <Text style={styles.totalRating}>/10</Text>
        </View>
        <View style={{ marginTop: 10, width: '100%' }}>
          <Text style={styles.title}>Cycling Event for Women</Text>
        </View>
        <View style={{ marginTop: 4, width: '100%' }}>
          <Text style={styles.address}>
            Princeton, New Jersey 08540
          </Text>
        </View>
        <View style={{ marginTop: 4, width: '100%' }}>
          <Text style={styles.date}>
            16th July 2020 - 20th July, 2020
          </Text>
        </View>
        <View style={{ marginTop: 9, width: '100%' }}>
          <Text style={styles.amount}>
            $23
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 11,
  },
  img: {
    height: 171,
    width: '100%',
    alignItems: 'center',
  },
  verifiedImg: {
    height: 20.79,
    width: 16.86,
  },
  startIcon: {
    height: 16.75,
    width: 17.48,
    marginRight: 5,
  },
  gainedRating: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('3.5'),
    color: 'black',
  },
  totalRating: {
    fontFamily: FONTS.SFSemiBold,
    fontSize: wp('2'),
    color: 'black',
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: 'black',
  },
  address: {
    fontFamily: FONTS.SFMedium,
    fontSize: wp('3.5'),
    color: 'black',
  },
  date: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('2.8'),
    color: 'black',
  },
  amount: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('4.5'),
    color: 'black',
  },
});
