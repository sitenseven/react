import React, { useEffect, useState } from 'react'
import {
    ScrollView, StyleSheet,
    View,
    Platform,
    KeyboardAvoidingView
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import io from 'socket.io-client';
import { useSelector } from 'react-redux'
import DetailHeader from './components/detailSfyHeader'
import MsgInputField from './components/msgInputField'
import SenderMsg from './components/senderMsg'
import RecieverMsg from './components/recieverMsg';



var socket = null;
const chatWithSfy = (props) => {
    const token = useSelector(state => state.user.token)
    const { _id } = useSelector(state => state.user.currentUser)
    const [msgInput, setMsgInput] = useState('')
    const [history, setHistory] = useState([])

    useEffect(() => {
        socket = io('https://sfyapi.herokuapp.com',
            {
                transports: ['websocket'],
                query: `token=${token}`
            });
        connectWebSocketWatch();
        return () => {

        }
    }, [])

    const getMsgInput = (value) => {
        setMsgInput(value)
    }

    const connectWebSocketWatch = async () => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat', onMessageReceived);
        socket.on('message_status', onMessageStatusReceived);
        socket.on('receive_old_messages', receive_old_messages)
        socket.emit('old_messages', { limit: 20, skip: 0, to: "61dc44682bd3b5420c753453", })
        socket.on('leave', onLeaveRoom);
        socket.on('join', onjoinRoom);
        socket.on('exception', onException);
    };

    function onException(data) {
        console.log("onException, ", data)
    }

    function onConnect(data) {
        console.log("connection successfully")
    }

    function onDisconnect(error) {
        console.log("onDisconnect: ", error)
    }

    function onMessageReceived(message) {
        socket.emit('message_status', {
            _id: message._id,
            senderId: message.senderId,
        });
        setHistory([...history, message]);
    }

    function onMessageStatusReceived(message) {
    }

    function receive_old_messages(data) {
        setHistory(data.docs)
    }

    function sendMessage() {
        const payload = {
            receiverId: '61dc44682bd3b5420c753453',
            message: msgInput
        }
        socket.emit('message', payload);
        setMsgInput('')
        socket.emit('old_messages', { limit: 20, skip: 0, to: "61dc44682bd3b5420c753453", })
    }

    function onLeaveRoom(message) {
        // console.log(message);
    }

    function onjoinRoom(message) {
        // console.log(message);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <View style={styles.container} >
                <DetailHeader navigation={props.navigation} />
                <ScrollView contentContainerStyle={{ width: wp('100'), alignItems: 'center' }} >
                    <View style={{ width: wp('90'), justifyContent: 'flex-end', paddingBottom: 25 }} >
                        {
                            history.reverse().map((item, index) => {
                                return (
                                    <View key={index}>
                                        {
                                            _id == item.senderId
                                                ?
                                                <RecieverMsg data={item} />
                                                :
                                                <SenderMsg data={item} />
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                <MsgInputField getMessagse={getMsgInput.bind(this)} value={msgInput} sendMessage={sendMessage.bind(this)} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default chatWithSfy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFF',
        alignItems: 'center'
    }
})
