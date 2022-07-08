import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PaymentTopCard } from './components/topCard';
import { FONTS } from '../../../constant';
import { Pending } from './pending';
import { Withdrawn } from './withdrawn';
import { Available } from './available';
import Header from '../../../common/headerBLC';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';


const TopTabs = createMaterialTopTabNavigator();

export const PaymentTopTabs = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFF' }}>
      <Header navigation={props.navigation} label="Payouts & Payments" />
      <View style={{ height: 20 }} />
      <View style={{ width: '90%', alignItems: 'center', marginBottom: 9 }}>
        <Text style={styles.headtxt}>Payouts & Payments</Text>
      </View>

      <PaymentTopCard />
      <View style={{ height: 10 }} />
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontFamily: FONTS.SFRegular, fontSize: wp('3.7'), textTransform: 'none' },
          tabBarStyle: { backgroundColor: '#F8FAFF' },
          tabBarIndicatorStyle: { backgroundColor: '#2C99C6', },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.46)' 
        }}>
        <TopTabs.Screen
          name="Pending"
          component={Pending}
        />
        <TopTabs.Screen
          name="Withdrawn"
          component={Withdrawn}
        />
        <TopTabs.Screen
          name="Available"
          component={Available}
        />
      </TopTabs.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headtxt: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('7'),
    color: 'black',
  },
});
