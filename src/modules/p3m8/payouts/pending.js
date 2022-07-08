import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { PaymentDetails } from './components/paymentDetails';

export const Pending = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{ width: '80%', marginTop: 32 }}>
        {/* <PaymentDetails type="Funds Pending Clearance" /> */}

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
});
