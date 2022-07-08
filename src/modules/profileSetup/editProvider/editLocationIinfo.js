import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import TNIndicator from '../../../common/TNIndicator'
import { FONTS } from '../../../constant'
import Header from '../components/header'
import Btn from '../../../common/meduimBtnSP'
import CustomInputField from '../components/customInputField'
import CustomInputNumberPad from '../components/customInputFieldNumberPaid'

const editLocationIinfo = (props) => {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const currentUser = useSelector(state => state.user.currentUser)
    const [address, setAddress] = useState("")
    const [apartment, setApartment] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [postCode, setPostCode] = useState("")
    const [progress, setProgress] = useState(0.5)

    useEffect(() => {
        getUserData();
        setTimeout(() => {
            setProgress(0.7)
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
            setAddress(data.providerInfo.locationInfo.address);
            setApartment(data.providerInfo.locationInfo.appartment);
            setCity(data.providerInfo.locationInfo.city);
            setCountry(data.providerInfo.locationInfo.countary);
            setState(data.providerInfo.locationInfo.state);
            setPostCode(data.providerInfo.locationInfo.postcode);
        } catch (error) {
            console.error(error);
        }
    };

    const updateData = async () => {
        try {
            if (address == '') {
                alert("Address field should not be blank");
            } else if (apartment == '') {
                alert("Apartment field should not be blank");
            } else if (city == '') {
                alert("City field should not be blank");
            } else if (state == '') {
                alert("State field should not be blank");
            } else if (country == '') {
                alert("Country field should not be blank");
            } else if (postCode == '') {
                alert("Post code field should not be blank");
            } else {
                dispatch(setLoader(true))
                const body = {
                    address: address,
                    appartment: apartment,
                    city: city,
                    state: state,
                    countary: country,
                    postcode: postCode,
                };

                const response = await fetch(
                    `https://api2.sporforya.com/api/users/locationinfo`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(body),
                    },
                );

                if (response.status == 201) {
                    props.navigation.navigate('editHomeMain');
                }
                dispatch(setLoader(false))
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAddress = (value) => {
        setAddress(value)
    }
    const getApartment = (value) => {
        setApartment(value)
    }
    const getCity = (value) => {
        setCity(value)
    }
    const getState = (value) => {
        setState(value)
    }
    const getCountry = (value) => {
        setCountry(value)
    }
    const getPostCode = (value) => {
        setPostCode(value)
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
                        <Text style={styles.headingStyle} >Location information</Text>
                        <Text style={styles.subheadingStyle} >Please tell us where your service is located</Text>
                    </View>
                    <View style={{ height: 20 }} />
                    <CustomInputField label="Address" value={address} getValue={getAddress.bind(this)} />
                    <CustomInputField label="Apartment / Building" value={apartment} getValue={getApartment.bind(this)} />
                    <CustomInputField label="City" value={city} getValue={getCity.bind(this)} />
                    <CustomInputField label="State" value={state} getValue={getState.bind(this)} />
                    <CustomInputField label="Country" value={country} getValue={getCountry.bind(this)} />
                    <CustomInputNumberPad label="Post code" value={postCode} getValue={getPostCode.bind(this)} />
                    <View style={{ height: 50 }} />
                    <Btn label="Update & Next" onClick={updateData} bgColor="#2C99C6" />
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

export default editLocationIinfo

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
        fontFamily: FONTS.SFRegular,
        marginTop: 6
    },
    optionContainer: {
        width: wp('80'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
