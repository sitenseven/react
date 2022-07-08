import React, { } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FONTS, ICONS } from '../../constant'

import {
    providerManagement, profile, financials, performance,
    networkSharing, inboxMessages, tools, security,
    support, legal, logout
} from './components/data'
import Header from './components/header'
import SettingLogoutSection from './components/settingLogoutSection'
import SettingMsgSection from './components/settingMsgSection'
import SettingSection from './components/settingSection'
import SwitchUser from './components/switchUser'
import ReferralSection from './components/referralSection'
import UserCard from './components/userCard'

const profileSetting = (props) => {

    return (
        <View style={styles.container} >
            <Header navigation={props.navigation} />
            <View style={styles.divider} />
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} >
                <Text style={styles.titleStyle} >Provider Account</Text>
                <UserCard />
                <SwitchUser navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <ReferralSection navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={providerManagement} title="Provider management" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={profile} title="Profile" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={financials} title="Financials" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={performance} title="Performance" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={networkSharing} title="Network & Sharing" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingMsgSection items={inboxMessages} title="Inbox & Messages" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={tools} title="Tools" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={security} title="Security" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 10 }} />
                <TouchableOpacity style={{ width: '90%', height: 30, justifyContent: 'center' }} onPress={() => props.navigation.navigate('Trust & Safety')} >
                    <Text style={styles.headerStyle} >Trust & Safety</Text>
                </TouchableOpacity>
                <View style={{ height: 10 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={support} title="Support" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingSection items={legal} title="Legal" navigation={props.navigation} />
                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 15 }} />
                <SettingLogoutSection items={logout} title="Logout" navigation={props.navigation} />

                <View style={{ height: 15 }} />
                <View style={[styles.divider]} />
                <View style={{ height: 20 }} />
            </ScrollView>
        </View>
    )
}

export default profileSetting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    },
    divider: {
        width: wp('100'),
        height: 1,
        backgroundColor: '#15488F26'
    },
    titleStyle: {
        width: wp('90'),
        color: '#2A2A2A',
        fontSize: wp('7'),
        fontFamily: FONTS.SFBold,
        marginTop: 16,
        marginBottom: 12
    },
    headerStyle: {
        width: '90%',
        color: '#000000',
        fontFamily: FONTS.SFBold,
        fontSize: wp('5'),
    },
})
