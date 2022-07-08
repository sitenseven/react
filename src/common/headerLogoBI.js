import React from 'react'
import { StyleSheet, Platform, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import { ICONS } from '../constant'

const headerLogoBI = ({ navigation }) => {
    const token = useSelector(state => state.user.token)
    return (
        <View style={styles.headerStyle}>
            <Image source={ICONS.logoSP} style={styles.logoStyle} />
            <View style={{ width: wp('5') }} />
            <Image style={styles.msgIconStyle} resizeMode="contain" />
            <TouchableOpacity onPress={() => { navigation.navigate(token == null ? "authRoute" : "Notifications") }}>
                <Image source={ICONS.notificationIcon} style={styles.bellIconStyle} resizeMode="contain" />
            </TouchableOpacity>
        </View>
    )
}

export default headerLogoBI;

const styles = StyleSheet.create({
    headerStyle: {
        width: wp("90"),
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Platform.OS == "ios" ? 35 : 0,
        borderBottomColor: '#70707026',
        borderBottomWidth: 0.7
    },
    logoStyle: {
        width: 183,
        height: 32,
    },
    msgIconStyle: {
        width: wp('9'),
        height: wp('5.7')
    },
    bellIconStyle: {
        width: wp('5.7'),
        height: wp('7')
    }
});
