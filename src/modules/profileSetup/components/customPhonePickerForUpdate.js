import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import CountryPicker from 'react-native-country-picker-modal'
import { FONTS } from '../../../constant'

const customPhonePickerForUpdate = ({ label, value, getValue, getCountryCode, flag }) => {

    const selectCountry = (country) => {
        getCountryCode(country)
    }

    return (
        <View style={styles.container} >
            <Text style={styles.labelStyle} >{label}</Text>
            <View style={styles.inputRow} >
                <View style={styles.countryPickerContainer} >
                    <CountryPicker
                        countryCode={flag}
                        withCountryNameButton={true}
                        withCallingCode={true}
                        withFlag={true}
                        withEmoji={true}
                        withAlphaFilter={true}
                        onSelect={(value) => selectCountry(value)}
                        translation='eng'
                        cca2={flag}
                    />
                </View>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(value) => getValue(value)}
                    value={value}
                />
            </View>
        </View>
    )
}

export default customPhonePickerForUpdate

const styles = StyleSheet.create({
    container: {
        width: wp('80'),
        alignItems: 'center',
        marginTop: 14
    },
    labelStyle: {
        width: '100%',
        color: '#000000',
        fontSize: wp('4'),
        fontFamily: FONTS.SFSemiBold,
        marginBottom: 6
    },
    inputRow: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputStyle: {
        width: '75%',
        height: 46,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: "#70707026",
        borderRadius: 4,
        color: '#707070'
    },
    countryPickerContainer: {
        width: '22%',
        height: 46,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: "#70707026",
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: "3%"
    }

})
