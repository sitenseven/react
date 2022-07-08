import React from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { COLORS, FONTS, ICONS } from '../../constant'
import LargeBtn from '../../common/largeBtnSP'

const index = (props) => {
    const email = props.route.params.email

    const btnClick = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'mainRoutes' }],
            }),
        );
        // props.navigation.navigate("becomeProvider")
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[COLORS.G1Color, COLORS.G3Color, COLORS.G2Color]} style={styles.container} >
            <View>
            </View>
            <View style={{ alignItems: 'center' }} >
                <Image source={ICONS.emailIcon} style={{ width: wp('35'), height: wp('30') }} resizeMode={'contain'} />
                <Text style={styles.headingStyle} >Confirm Your Email</Text>
                <Text style={styles.descStyle} >We sent an email to {email}. Please click the link in the message to confirm your email.</Text>
            </View>
            <View style={{ bottom: Platform.OS == "ios" ? 30 : 0 }} >
                <LargeBtn label="OK" onClick={() => { btnClick() }} bgColor="#65C51F" />
            </View>

        </LinearGradient>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20
    },
    headingStyle: {
        color: '#FFFFFF',
        fontSize: wp('6'),
        fontFamily: FONTS.SFBold,
        marginTop: 25,

    },
    descStyle: {
        width: wp('65'),
        color: '#FFFFFF',
        fontSize: wp('4'),
        fontFamily: FONTS.SFRegular,
        marginTop: 13,
        textAlign: 'center'
    }
})
