import { Platform } from 'react-native'
const FONTS = {
  SFRegular: Platform.OS == "android" ? 'SF Pro Display Regular' : "SFProDisplay-Regular",
  SFMedium: Platform.OS == "android" ? 'SF Pro Display Medium' : "SFProDisplay-Medium",
  SFSemiBold: Platform.OS == "android" ? 'SF Pro Display Semibold' : "SFProDisplay-Semibold",
  SFBold: Platform.OS == "android" ? 'SF Pro Display Bold' : 'SFProDisplay-Bold',
  SFBold: Platform.OS == "android" ? 'SF Pro Display Bold' : 'SFProDisplay-Bold',
  HNMedium: Platform.OS == "android" ? 'HelveticaNeue Medium' : 'HelveticaNeueMedium',
  HNRegular: Platform.OS == "android" ? 'HelveticaNeue Regular' : 'HelveticaNeue-Regular',
};

export { FONTS };
