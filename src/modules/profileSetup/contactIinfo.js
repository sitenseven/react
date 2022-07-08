import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS } from '../../constant'
import Header from './components/header'
import Btn from '../../common/meduimBtnSP'
import CustomInputField from './components/customInputField'
import CustomPhonePicker from './components/customPhonePicker'
import { useDispatch, useSelector } from 'react-redux'
import { saveContactInfo } from '../../redux/profile/profile.action'
import { setLoader } from '../../redux/loader/loader.action'
import { getCurrentUserDetail } from '../../redux/user/user.action'
import TNIndicator from '../../common/TNIndicator'


const contactIinfo = (props) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState(currentUser.email)
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("+1")
    const [progress, setProgress] = useState(0.1)

    useEffect(() => {
        setTimeout(() => {
            setProgress(0.3)
        }, 100);
        return () => {

        }
    }, [])

    const getFullName = (value) => {
        setFirstName(value)
    }
    const getLastName = (value) => {
        setLastName(value)
    }
    const getEmail = (value) => {
        setEmail(value)
    }
    const getPhone = (value) => {
        setPhone(value)
    }
    const getCode = (value) => {
        setCode(value)
    }

    const saveContact = () => {
        if (firstName == '') {
            alert("First name field should not be blank");
        } else if (lastName == '') {
            alert("Last name field should not be blank");
        } else if (phone == '') {
            alert("Phone number field should not be blank");
        } else if (phone.length != 10) {
            alert("Phone number should be 10 digit");
        } else {
            dispatch(setLoader(true))
            let data = {
                "phone": "+" + code + phone,
                "firstName": firstName,
                "lastName": lastName
            }
            dispatch(saveContactInfo(data, token, props.navigation, currentUser._id))
            dispatch(getCurrentUserDetail(currentUser._id, token))
        }
    }


    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container} >
                <Header navigation={props.navigation} label="Profile information" progressCount={progress} />
                <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
                    <View style={{ alignItems: 'center', marginTop: Platform.OS == "android" ? 20 : 35 }} >
                        <Text style={styles.headingStyle} >Contact information</Text>
                        <Text style={styles.subheadingStyle} >Tell us about yourself to set up your profile.</Text>
                    </View>
                    <View style={{ height: 20 }} />
                    <CustomInputField label="First name" value={firstName} getValue={getFullName.bind(this)} />
                    <CustomInputField label="Last name" value={lastName} getValue={getLastName.bind(this)} />
                    <CustomInputField edit={false} label="Email address" value={email} getValue={getEmail.bind(this)} />
                    <CustomPhonePicker label="Phone Number" value={phone} getValue={getPhone.bind(this)} getCountryCode={getCode.bind(this)} />

                    <View style={{ height: 50 }} />
                    <Btn label="Next" onClick={() => saveContact()} bgColor="#2C99C6" />
                    <View style={{ height: Platform.OS == 'ios' ? 100 : 50 }} />
                </ScrollView>
                {
                    loader
                        ?
                        <TNIndicator />
                        :
                        null
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default contactIinfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    headingStyle: {
        width: wp('80'),
        color: '#000000',
        fontSize: wp('6.5'),
        fontFamily: FONTS.SFSemiBold
    },
    subheadingStyle: {
        width: wp('80'),
        color: '#707070',
        fontSize: wp('3.2'),
        fontFamily: FONTS.SFMedium,
        marginTop: 6
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
