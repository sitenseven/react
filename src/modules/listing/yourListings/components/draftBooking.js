import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { FONTS, ICONS } from '../../../../constant';
import Share from 'react-native-share';

const draftBooking = ({ onClick, data, navigation }) => {
  const { title, listingType, _id, type } = data;
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);


  const onShare = async () => {
    const options = {
      title: 'Sporforya Listing',
      message:
        'Check out this listing on Sporforya , listing link :https://dev.sporforya.com',
    };
    try {
      Share.open(options)
        .then(res => {
          hideMenu();
          alert("Listing shared successfully")
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const onViewClick = () => {
    hideMenu()
    navigation.navigate("ListingDetail", { listId: _id })
  }

  const viewBookings = () => {
    hideMenu()
    navigation.navigate("bookingStack", { listId: data })
  }

  const onEditClick = () => {
    hideMenu()
    if (listingType == 'Service') {
      navigation.navigate("editAddServiceDetail", { listId: _id })
    } else if (listingType == 'Event') {
      navigation.navigate("editEventDetail", { listId: _id })
    } else if (listingType == 'Facility') {
      navigation.navigate("editFacilityDetail", { listId: _id })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Draft</Text>
        </View>
        <View>
          <Menu
            visible={visible}
            onRequestClose={hideMenu}>
            <MenuItem style={styles.menuItemStyle} onPress={onEditClick}>
              <Image source={ICONS.pencilBlue} style={{ width: 10, height: 10, }} resizeMode="contain" />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle} >Edit</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem style={styles.menuItemStyle} onPress={onViewClick}>
              <Image source={ICONS.eyeIcon} style={{ width: 10, height: 10, }} resizeMode="contain" />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle} >View</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem style={styles.menuItemStyle} onPress={onShare}>
              <Image source={ICONS.shareIcon} style={{ width: 10, height: 10, }} resizeMode="contain" />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle} >Share</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem style={styles.menuItemStyle} onPress={viewBookings}>
              <Image source={ICONS.listIconB} style={{ width: 10, height: 10, }} resizeMode="contain" />
              <View style={{ width: 10 }} />
              <Text style={styles.menulabelStyle} >Bookings</Text>
            </MenuItem>
          </Menu>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          marginTop: 2,
        }}>
        <Image
          source={ICONS.providerGallery}
          style={{ width: 70, height: 70, borderRadius: 4 }}
        />
        <View>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.labelStyle}>{listingType}</Text>
        </View>
      </View>
      <TouchableOpacity style={{ position: 'absolute', top: 2, right: 2, }} onPress={showMenu}>
        <Image
          source={ICONS.moreIconV}
          style={{ width: 16, height: 16, top: 1.5, }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onClick(_id)}
        style={{
          width: '100%',
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: '#15488F26',
          borderTopWidth: 1,
        }}>
        <Text style={styles.takingStyle}>Publish Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default draftBooking;

const styles = StyleSheet.create({
  container: {
    width: wp('90'),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#15488F26',
    borderRadius: 4,
    marginTop: 15,
    alignItems: 'center',
    elevation: 1,
  },
  headerRow: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer: {
    width: 64,
    height: 18,
    backgroundColor: '#75BCD9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: FONTS.SFRegular,
  },
  titleStyle: {
    width: wp('65'),
    color: '#000000',
    fontSize: wp('5'),
    fontFamily: FONTS.SFBold,
    marginLeft: 8,
  },
  labelStyle: {
    width: wp('65'),
    color: '#000000',
    fontSize: wp('3'),
    fontFamily: FONTS.SFRegular,
    marginLeft: 8,
  },
  takingStyle: {
    color: '#2C99C6',
    fontSize: wp('2.3'),
    fontFamily: FONTS.SFBold,
  },
  menuItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menulabelStyle: {
    color: '#000000',
    fontSize: wp('2.4'),
    fontFamily: FONTS.SFRegular,
  },
});
