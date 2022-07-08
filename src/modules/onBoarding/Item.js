import React, { } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { CommonActions } from '@react-navigation/native';
import { setOnbaording } from '../../redux/user/user.action';
import { FONTS } from '../../constant'
import { useDispatch } from 'react-redux';

const Screen1 = ({ navigation, data }) => {
    const dispatch = useDispatch();
    const { bgImage, desc, welcomeText, appName } = data

    const skipBtnClick = () => {
        dispatch(setOnbaording(1));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'authRoute' }],
            }),
        );
    }

    const {
        container,
        bgStyle,
        headerBox,
        welcomeTextStyle,
        nameTextStyle,
        btnStyle,
        btnLable
    } = styles

    return (
        <View style={container} >
            <ImageBackground source={bgImage} style={bgStyle} resizeMode={'cover'} >
                <View style={headerBox} />
                <View />
                <View style={{ alignItems: 'center' }}>
                    <Text style={welcomeTextStyle} >{welcomeText}</Text>
                    <Text style={nameTextStyle} >{appName}</Text>
                </View>
                {
                    welcomeText == ''
                        ?
                        <>
                            <View />
                            <View />
                        </>
                        :
                        null
                }

                <Text style={welcomeTextStyle} >{desc}</Text>
                <TouchableOpacity onPress={() => skipBtnClick()} style={btnStyle} >
                    <Text style={btnLable} >SKIP</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
export default Screen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgStyle: {
        width: wp('100'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerBox: {
        width: '100%',
        height: hp('20'),
    },
    welcomeTextStyle: {
        color: '#FFFFFF',
        fontSize: wp('6'),
        fontFamily: FONTS.SFBold,
        width: wp('85'),
        textAlign: 'center'
    },
    nameTextStyle: {
        color: '#FFFFFF',
        fontSize: wp('11'),
        fontFamily: FONTS.SFBold,
        width: wp('90'),
        textAlign: 'center',
    },
    btnStyle: {
        marginBottom: 35
    },
    btnLable: {
        color: '#FFFFFF',
        fontSize: wp('5'),
        fontFamily: FONTS.SFRegular,
        textDecorationLine: 'underline',
    }
})

