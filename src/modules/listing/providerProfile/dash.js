import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS, ICONS } from '../../../constant';
import { DashNotification } from './dashComponents/DashNotification';
import { FieldTitle } from './dashComponents/fieldTitle';
import { FourCompBox } from './dashComponents/fourCompBox';
import { OptionCard } from './dashComponents/optionCard';
import { DashTodo } from './dashComponents/todo';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../../common/headerLogoBI';
import { getBookingStats, getPaymentStats } from '../../../redux/booking/booking.action';


const ProviderDashA = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const userDetail = useSelector(state => state.user.userDetail)
  const bookingStats = useSelector(state => state.booking.bookingStats)
  const pymentStats = useSelector(state => state.booking.pymentStats)

  useEffect(() => {
    dispatch(getPaymentStats(token, currentUser != null ? currentUser._id : ''))
    dispatch(getBookingStats(token, currentUser != null ? currentUser._id : ''))
    return () => {
    };
  }, []);


  return (
    <View style={styles.main}>
      <Header navigation={navigation} />
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View
            style={{
              marginTop: 25,
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            {
              userDetail != null && userDetail.isOrganization
                ?
                <Text style={styles.welcome}>Welcome <Text style={[styles.welcome, styles.nameColor]}>{userDetail.organizationInfo.orgName != undefined ? userDetail.organizationInfo.orgName.charAt(0).toUpperCase() + userDetail.organizationInfo.orgName.slice(1) : ''}!</Text></Text>
                :
                <Text style={styles.welcome}>Welcome <Text style={[styles.welcome, styles.nameColor]}>{userDetail != null ? userDetail.firstName.charAt(0).toUpperCase() + userDetail.firstName.slice(1) : ''}!</Text></Text>
            }
          </View>
          <View style={{ marginTop: 9, width: '90%' }}>
            {/* <DashNotification defaultIcon /> */}
          </View>
          <View style={{ marginTop: 17, width: '90%' }}>
            <FieldTitle
              imageSource={ICONS.moneybag}
              imageStyles={{ width: 15.22, height: 20 }}
              name="Financials"
            />
            <FourCompBox
              title1="Earnings September"
              val1={pymentStats != null ? pymentStats.monthly : 0}
              title2="Earnings 12 Months"
              val2={pymentStats != null ? pymentStats.annually : 0}
              title3="Pending Payout"
              val3={pymentStats != null ? pymentStats.pending : 0}
              title4="Available"
              val4={pymentStats != null ? pymentStats.available : 0}
            />
          </View>
          <View style={{ marginTop: 18, width: '90%' }}>
            <FieldTitle
              imageSource={ICONS.rocket}
              imageStyles={{ width: 18.74, height: 18.74 }}
              name="Performance"
            />
            <FourCompBox
              title1="Bookings September"
              val1={bookingStats != null ? bookingStats.monthlyBooking : 0}
              title2="Booking 12 Months"
              val2={bookingStats != null ? bookingStats.annuallyBookings : 0}
              title3="Active Listings"
              val3={bookingStats != null ? bookingStats.activeListings : 0}
              title4="Rating Average"
              val4={bookingStats != null ? bookingStats.avgRating : 0}
            />
          </View>
          <View style={{ marginTop: 18, width: '90%' }}>
            <FieldTitle
              imageSource={ICONS.calendar}
              imageStyles={{ width: 18.74, height: 18.74 }}
              name="To-Do"
            />
            <DashTodo />
          </View>
          <View style={{ marginTop: 9, width: '90%' }}>
            <OptionCard
              name="Create New Listings"
              desc="Add more choice, get more customers, make more money"
              onPress={() => navigation.navigate('Create New Listing')}
              icons={[
                {
                  source: ICONS.ball,
                  size: 25,
                },
                {
                  source: ICONS.tanis,
                  size: 25,
                },
                {
                  size: ICONS.cycle,
                  size: 25,
                },
              ]}
            />
            <View style={{ height: 10 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProviderDashA;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  welcome: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    color: 'black',
  },
  nameColor: {
    color: '#2C99C6',
  },
});
