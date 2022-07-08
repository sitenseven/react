import React, { useState, useRef, createRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RNCamera } from 'react-native-camera';
import { FONTS } from '../../../constant';
import { SnapButton } from './component/snapButton';
import Header from '../components/header';

export const ProviderBackVerification = ({ navigation }) => {
  const camera = createRef()
  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: false };
      const data = await camera.current.takePictureAsync(options);
      navigation.navigate('verify', { type: 'back', imgData: data })
      // navigation.navigate('govtIdNeeded', { imgData: data })
    }
  };


  return (
    <View style={styles.main}>
      <Header
        navigation={navigation}
        label="Verified Provider"
        progressCount={0}
      />
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Sporforya would Like to Access the Camera',
          message: 'Enable access so that you can take photos of your listings, government ID, and more, directly from the Sporforya app.',
          buttonPositive: 'Allow',
          buttonNegative: 'Dont Allow',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Sporforya would Like to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Allow',
          buttonNegative: 'Dont Allow',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      />
      <View  >
        <View style={{ width: '80%', marginTop: 22 }}>
          <Text style={[styles.title, { fontSize: wp('4.2') }]}>
            Take your Second Photo :
          </Text>
        </View>
        <View style={{ width: '80%', marginTop: 10 }}>
          <Text style={[styles.title, { fontSize: wp('7.6') }]}>Back of your ID</Text>
        </View>
        <View style={{ width: '80%', marginTop: 10 }}>
          <Text style={[styles.descx]}>
            Make sure there's good lighting and adjust until the front of your ID
            fits within the white border—then tap the camera icon
          </Text>
        </View>
      </View>
      <View
        style={{ position: 'absolute', justifyContent: 'center', bottom: 20 }}>
        <SnapButton
          onPress={() => takePicture()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  cam: {
    height: hp('35'),
    // borderWidth: 1,
    width: '100%',
  },
  preview: {
    height: hp('35'),
    width: '100%',
    overflow: 'hidden'
  },
  title: {
    fontFamily: FONTS.SFBold,
    color: 'black',
  },
  descx: {
    fontFamily: FONTS.SFRegular,
    color: '#3D3D3D',
    fontSize: wp('3.6'),
  },
});



// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import {FONTS} from '../../../constant';
// import {SnapButton} from './component/snapButton';

// export const ProviderBackVerification = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles.main}>
//       <View style={styles.cam}>
//         <RNCamera
//           //   ref={ref => {
//           //     this.camera = ref;
//           //   }}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.back}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onGoogleVisionBarcodesDetected={({barcodes}) => {
//             console.log(barcodes);
//           }}
//         />
//       </View>
//       <View style={{width: '80%', marginTop: 39}}>
//         <Text style={[styles.title, {fontSize: 18}]}>
//           Take your Second Photo :
//         </Text>
//       </View>
//       <View style={{width: '80%', marginTop: 10}}>
//         <Text style={[styles.title, {fontSize: 32}]}>Back of your ID</Text>
//       </View>
//       <View style={{width: '80%', marginTop: 10}}>
//         <Text style={[styles.descx]}>
//           Make sure there's good lighting and adjust until the front of your ID
//           fits within the white border—then tap the camera icon
//         </Text>
//       </View>
//       <View
//         style={{position: 'absolute', justifyContent: 'center', bottom: 20}}>
//         <SnapButton
//           onPress={() => navigation.navigate('verify', {type: 'back'})}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#F8FAFF',
//   },
//   cam: {
//     height: 376,
//     borderWidth: 1,
//     width: '100%',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   title: {
//     fontFamily: FONTS.SFBold,
//     color: 'black',
//   },
//   descx: {
//     fontFamily: FONTS.SFRegular,
//     color: '#3D3D3D',
//     fontSize: 16,
//   },
// });
