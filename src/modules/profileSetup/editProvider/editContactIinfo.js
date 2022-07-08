import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FONTS, Url } from '../../../constant'
import { getAllCountries } from 'react-native-country-picker-modal'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import CustomInputField from '../components/customInputField'
import CustomPhonePicker from '../components/customPhonePickerForUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import { getUserDetail } from '../../../redux/user/user.action'
import TNIndicator from '../../../common/TNIndicator'
import axios from 'axios'


const editContactIinfo = (props) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState(currentUser.email)
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [flag, setFlag] = useState("US")
    const [progress, setProgress] = useState(0.1)

    useEffect(() => {
        getUserData();
        setTimeout(() => {
            setProgress(0.3)
        }, 100);
        return () => {

        }
    }, [])

    const getUserData = async () => {
        try {
            const response = await fetch(
                `https://api2.sporforya.com/api/users/me/${currentUser._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const data = await response.json();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPhone(data.phone.substr(3, 13));
            getAllCountries().then((countries) => {
                const country = countries.find((c) => (c.callingCode[0] === data.phone.substr(1, 2)));
                console.log("country: ", country)
                setFlag(country.cca2)
                setCode(country.callingCode[0])
                // alert(country.cca2)
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateData = async () => {
        try {
            if (firstName == '') {
                alert("First name field should not be blank");
            } else if (lastName == '') {
                alert("Last name field should not be blank");
            } else if (code == '') {
                alert("Select country code");
            } else if (phone.length != 10) {
                alert("Phone number should be 10 digit");
            } else {
                dispatch(setLoader(true))
                let headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };
                let data = {
                    firstName: firstName,
                    lastName: lastName,
                    phone: "+" + code + phone,
                };
                console.log("+" + code + phone)
                axios.post(`https://api2.sporforya.com/api/users/contactinfo`, data, { headers: headers })
                    .then(resp => {
                        let response = resp.data
                        resendCode()
                        dispatch(setLoader(false))
                        props.navigation.navigate('confirmEditPhone', { phoneNo: "+" + code + phone });
                        dispatch(getUserDetail(currentUser._id))
                    })
                    .catch(error => {
                        const err = error
                        if (err.response) {
                            alert(err.response.data.message)
                        }
                        dispatch(setLoader(false))
                    });
            }
        } catch (error) {
            console.error(error);
            dispatch(setLoader(false))
        }
    };

    const resendCode = () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        let data = {
            "phone": "+" + code + phone
        }
        axios.post(`${Url}api/users/resend-verification`, data, { headers: headers })
            .then(resp => {
                let response = resp.data
            })
            .catch(error => {
                const err = error
                if (err.response) {
                    alert(err.response.data.message)
                }
            });
    }

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
        let removeSpace = value.replace(/ /g, '')
        setPhone(removeSpace)
    }
    const getCode = (country) => {
        setFlag(country.cca2)
        setCode(country.callingCode[0])
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
                    <CustomPhonePicker flag={flag} label="Phone Number" value={phone} getValue={getPhone.bind(this)} getCountryCode={getCode.bind(this)} />

                    <View style={{ height: 50 }} />
                    <Btn label="Update & Next" onClick={() => updateData()} bgColor="#2C99C6" />
                    <View style={{ height: 20 }} />
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

export default editContactIinfo

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
