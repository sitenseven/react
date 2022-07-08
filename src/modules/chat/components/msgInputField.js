import React from 'react'
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'

const msgInputField = ({ value, getMessagse, sendMessage}) => {
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={()=>alert("Comming soon in version 2")} >
                <Image source={ICONS.paperclip} style={{ width: 16, height: 15 }} resizeMode={"contain"} />
            </TouchableOpacity>

            <TextInput
                style={styles.inputStyle}
                placeholder="Type here..."
                placeholderTextColor="#CCCCCC"
                onChangeText={(value) => getMessagse(value)}
                value={value}
                onSubmitEditing={() => { sendMessage()}}
            />

            <TouchableOpacity onPress={() => alert("Comming soon in version 2")}>
                <Image source={ICONS.micIcon} style={{ width: 16, height: 15 }} resizeMode={"contain"} />
            </TouchableOpacity>
        </View>
    )
}

export default msgInputField

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        height: 55,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        paddingLeft: 10,
        paddingRight: 5,
        borderRadius: 4
    },
    inputStyle: { 
        width: wp('76'), 
        margin: 1,
        color:'#000000',
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFMedium,
        paddingLeft:6
     }
})
