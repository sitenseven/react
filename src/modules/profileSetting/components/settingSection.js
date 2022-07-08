import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../../constant'
import { useSelector } from 'react-redux';


const settingSection = ({ items, title, navigation }) => {
    const badgeEnabled = useSelector(state => state.user.badgeEnabled)
    const userDetail = useSelector(state => state.user.userDetail)
    const [active, setActive] = useState(false)

    useEffect(() => {
        // console.log(userDetail)
        return () => {
        }
    }, [])


    const navigatorMethod = (item) => {
        if (item == "Share a Listing" || item == "Edit Listings") {
            navigation.navigate("Listings")
        } else if (item == "Profile Verification") {
            if (badgeEnabled == "pending") {
                navigation.navigate('Profile Verification');
            } else {
                navigation.navigate('Profile Verification', { screen: 'reviewAgain' });
            }
        }
        else {
            if (item == "Edit Organization") {
                navigation.navigate(userDetail.isOrganization ? "editOrganizationIinfo" : "editContactInfo")
            }
            else {
                navigation.navigate(item)
            }
        }
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => setActive(!active)} style={styles.headerRow} >
                <Text style={styles.headerStyle} >{title}</Text>
                <Image source={active ? ICONS.downArrow : ICONS.nextArrow} style={{ width: 14, height: 14 }} resizeMode={'contain'} />
            </TouchableOpacity>
            {
                active
                    ?
                    <View style={{ width: wp('90'), alignItems: 'center' }} >
                        {
                            items.map((item, index) => {
                                return (
                                    <View key={index} >
                                        {item == "Status"
                                            ?
                                            <>
                                                <View style={styles.divider} />
                                                <View style={{ flexDirection: 'row', width: wp("90"), alignSelf: 'center' }} >
                                                    <Text style={{
                                                        color: '#707070',
                                                        fontFamily: FONTS.SFMedium,
                                                        fontSize: wp('4.2')
                                                    }} >{item}</Text>

                                                    <View style={{ width: 80, height: 22, backgroundColor: '#7CC7E7', borderRadius: 3, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} >
                                                        <Text style={{ color: '#FFFFFF', fontSize: 7 }} >Comming Soon</Text>
                                                    </View>
                                                </View>
                                            </>
                                            :
                                            <TouchableOpacity key={index} onPress={() => navigatorMethod(item)} style={{ width: wp('90'), alignItems: 'center' }} >
                                                <View style={styles.divider} />
                                                <Text style={styles.itemLabelStyle} >{item} </Text>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                )
                            })
                        }
                    </View>
                    :
                    null
            }

        </View>
    )
}

export default settingSection

const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        alignItems: 'center',
    },
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerStyle: {
        color: '#000000',
        fontFamily: FONTS.SFBold,
        fontSize: wp('5')
    },
    divider: {
        width: wp('95'),
        backgroundColor: '#15488F1A',
        height: 1,
        marginTop: 12,
        marginBottom: 12,
        alignSelf: 'flex-start'
    },
    itemLabelStyle: {
        width: '100%',
        color: '#707070',
        fontFamily: FONTS.SFMedium,
        fontSize: wp('4.2')
    },
})
