import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import bottomTab from '../modules/bottomTab';
import becomeProvider from '../modules/userProfile/becomeProvider';
import secondScreen from '../modules/userProfile/becomeProvider/secondScreen';
import chatHistory from '../modules/chat/chatHistory';
import chatWithSfy from '../modules/chat/chatWithSfy';
import verifiedProvider from '../modules/listing/verifiedProvider/stack/verifiedProviderStack';
import paymentStack from '../modules/payment/components/paymentStack';
import reviewStack from '../modules/review/stack';
import bookingStack from '../modules/bookings/stack/bookingStack';
import userBookingStack from '../modules/userSection/userCancelBookings/stack';
import { StripeSupport } from '../modules/p3m8/stripeSupport';
import { PaymentTopTabs } from '../modules/p3m8/payouts/payoutTobTabs';
import { Bookings } from '../modules/p3m8/bookings';
import { ReferAProvider } from '../modules/p3m8/referAprovider';
import { ReferAFriend } from '../modules/p3m8/referAfriend';
import { InvitationSent } from '../modules/p3m8/invitationsent';
import { LinkedAccounts } from '../modules/p3m8/linkedAccounts';
import { GiveFeedback } from '../modules/p3m8/giveFeedback';
import { ChangePassword } from '../modules/p3m8/changePassword';
import { TermsOfService } from '../modules/p3m8/tos';
import { TrustSafety } from '../modules/p3m8/trustSafety';
import { TwoStepVerification } from '../modules/p3m8/twoStepVerification';
import { TwoStepVerificationStatus } from '../modules/p3m8/twofaStatus';
import { Language } from '../modules/p3m8/language';
import { AddPhone } from '../modules/p3m8/addPhone';
import { Notifications } from '../modules/p3m8/notifications';
import confirmOTP from '../modules/p3m8/confirmYourPhone';
import { ContactUs } from '../modules/p3m8/contactUs';
import { Email } from '../modules/p3m8/email';
import { GetSpotyPoints } from '../modules/p3m8/getSpotyPoints';
import { ListingDetail } from '../modules/listing/details';

import myProfile from '../modules/profileSetting/myProfile';
import profileVerified from '../modules/profileSetting/profileVerified';

//Users
import userAppRoutes from '../routes/userAppRoutes';
import p4M2Stack from '../modules/userSection/p4m2/p4M2Stack';
import w9form from '../modules/taxinformation/w9form';
import informationPreview from '../modules/taxinformation/informationPreview';
import w9formUpdate from '../modules/taxinformation/w9formUpdate';


//edit provider
import editContactInfo from '../modules/profileSetup/editProvider/editContactIinfo';
import confirmEditPhone from '../modules/profileSetup/editProvider/confirmEditPhone';
import editLocationInfo from '../modules/profileSetup/editProvider/editLocationIinfo';
import editHomeMain from '../modules/profileSetup/home/editHomeMain';

//edit organization
import editOrganizationIinfo from '../modules/profileSetup/editOrganization/editOrganizationIinfo';
import confirmEditPhoneOrg from '../modules/profileSetup/editOrganization/confirmEditPhoneOrg';
import editOrgLocationIinfo from '../modules/profileSetup/editOrganization/editOrgLocationIinfo';
import editOrgHomeMain from '../modules/profileSetup/home/editOrgHomeMain';
import editOrganizationContactInfo from '../modules/profileSetup/editOrganization/editOrganizationContactInfo';

//edit service
import editAddServiceDetail from '../modules/listing/editListing/editAddServiceDetail';
import editParticulars from '../modules/listing/editListing/editParticulars'; 
import editServiceLocation from '../modules/listing/editListing/editServiceLocation';
import editFacilities from '../modules/listing/editListing/editFacilities';
import editSchedulePrice from '../modules/listing/editListing/editSchedulePrice';
import editFrequentlyQuestions from '../modules/listing/editListing/editFrequentlyQuestions';
import editCancellationPolicy from '../modules/listing/editListing/editCancellationPolicy';
import editCreateCancellationPolicy from '../modules/listing/editListing/editCreateCancellationPolicy';
import editReleaseLiability from '../modules/listing/editListing/editReleaseLiability';

//edit event
import editEventDetail from '../modules/listing/editEvents/editEventDetail';
import editParticularsEvents from '../modules/listing/editEvents/editParticularsEvents';
import editEventLocation from '../modules/listing/editEvents/editEventLocation';
import editfacilitiesEvent from '../modules/listing/editEvents/editfacilitiesEvent';
import editSchedulePriceEvents from '../modules/listing/editEvents/editSchedulePriceEvents';
import editFrequentlyQuestionsEvent from '../modules/listing/editEvents/editFrequentlyQuestionsEvent';
import editCancellationPolicyEvent from '../modules/listing/editEvents/editCancellationPolicyEvent';
import editCreateCancellationPolicyEvent from '../modules/listing/editEvents/editCreateCancellationPolicyEvent';
import editReleaseLiabilityEvent from '../modules/listing/editEvents/editReleaseLiabilityEvent';

//edit facility
import editFacilityDetail from '../modules/listing/editFacilities/editFacilityDetail';
import editParticularsFacilities from '../modules/listing/editFacilities/editParticularsFacilities';
import editFacilityLocation from '../modules/listing/editFacilities/editFacilityLocation';
import editFacilitiesFacy from '../modules/listing/editFacilities/editFacilitiesFacy';
import editSchedulePriceFacility from '../modules/listing/editFacilities/editSchedulePriceFacility';
import editInsuranceRequirements from '../modules/listing/editFacilities/editInsuranceRequirements';
import editFrequentlyQuestionsFacility from '../modules/listing/editFacilities/editFrequentlyQuestionsFacility';
import editCancellationPolicyFacilty from '../modules/listing/editFacilities/editCancellationPolicyFacilty';
import editCreateCancellationPolicyFacility from '../modules/listing/editFacilities/editCreateCancellationPolicyFacility';
import editReleaseLiabilityFacility from '../modules/listing/editFacilities/editReleaseLiabilityFacility';


const Stack = createNativeStackNavigator();

function MainRoute() {
  const becomeProviderFlag = useSelector(state => state.user.becomeProviderFlag);
  const userMode = useSelector(state => state.user.userMode);


  useEffect(() => {
    return () => { };
  }, []);

  return (
    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={
        becomeProviderFlag == null ? 'becomeProvider' : userMode ? 'userAppRoutes' : 'bottomTab'
      }>
      <Stack.Screen
        name="userAppRoutes"
        component={userAppRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bottomTab"
        component={bottomTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="becomeProvider"
        component={becomeProvider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Listings"
        component={userBookingStack}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="secondScreen"
        component={secondScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chatHistory"
        component={chatHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chatWithSfy"
        component={chatWithSfy}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="paymentStack"
        component={paymentStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reviews & Ratings"
        component={reviewStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bookingStack"
        component={bookingStack}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Stripe Support"
        component={StripeSupport}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Payout & Payments"
        component={PaymentTopTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Refer a Provider"
        component={ReferAProvider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Refer a Friend"
        component={ReferAFriend}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InvitationSent"
        component={InvitationSent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Linked Accounts"
        component={LinkedAccounts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Give Us Feedback"
        component={GiveFeedback}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="My Profile"
        component={myProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile Verification"
        component={verifiedProvider}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profileVerified"
        component={profileVerified}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Password"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Terms of Service"
        component={TermsOfService}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Trust & Safety"
        component={TrustSafety}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="2 Step Verification"
        component={TwoStepVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TwoStepVerificationStatus"
        component={TwoStepVerificationStatus}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPhone"
        component={AddPhone}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirmOTP"
        component={confirmOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Change Language"
        component={Language}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetSpotyPoints"
        component={GetSpotyPoints}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EmailContact"
        component={Email}
        options={{
          headerShown: false,
        }}
      />

      {/* P4 M2 Stack */}
      <Stack.Screen
        name="p4M2Stack"
        component={p4M2Stack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListingDetail"
        component={ListingDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tax Info"
        component={informationPreview}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="w9form"
        component={w9form}
        options={{
          headerShown: false
        }}
      />


      <Stack.Screen
        name="w9formUpdate"
        component={w9formUpdate}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editContactInfo"
        component={editContactInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirmEditPhone"
        component={confirmEditPhone}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editLocatonInfo"
        component={editLocationInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editHomeMain"
        component={editHomeMain}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editOrganizationIinfo"
        component={editOrganizationIinfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="confirmEditPhoneOrg"
        component={confirmEditPhoneOrg}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editOrgLocationIinfo"
        component={editOrgLocationIinfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editOrgHomeMain"
        component={editOrgHomeMain}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editOrganizationContactInfo"
        component={editOrganizationContactInfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editAddServiceDetail"
        component={editAddServiceDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editParticulars"
        component={editParticulars}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editServiceLocation"
        component={editServiceLocation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFacilities"
        component={editFacilities}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editSchedulePrice"
        component={editSchedulePrice}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFrequentlyQuestions"
        component={editFrequentlyQuestions}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editCancellationPolicy"
        component={editCancellationPolicy}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editCreateCancellationPolicy"
        component={editCreateCancellationPolicy}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editReleaseLiability"
        component={editReleaseLiability}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editEventDetail"
        component={editEventDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editParticularsEvents"
        component={editParticularsEvents}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editEventLocation"
        component={editEventLocation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editfacilitiesEvent"
        component={editfacilitiesEvent}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editSchedulePriceEvents"
        component={editSchedulePriceEvents}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFrequentlyQuestionsEvent"
        component={editFrequentlyQuestionsEvent}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editCancellationPolicyEvent"
        component={editCancellationPolicyEvent}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editCreateCancellationPolicyEvent"
        component={editCreateCancellationPolicyEvent}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editReleaseLiabilityEvent"
        component={editReleaseLiabilityEvent}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFacilityDetail"
        component={editFacilityDetail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editParticularsFacilities"
        component={editParticularsFacilities}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFacilityLocation"
        component={editFacilityLocation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFacilitiesFacy"
        component={editFacilitiesFacy}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editSchedulePriceFacility"
        component={editSchedulePriceFacility}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editInsuranceRequirements"
        component={editInsuranceRequirements}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editFrequentlyQuestionsFacility"
        component={editFrequentlyQuestionsFacility}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editCancellationPolicyFacilty"
        component={editCancellationPolicyFacilty}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editCreateCancellationPolicyFacility"
        component={editCreateCancellationPolicyFacility}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editReleaseLiabilityFacility"
        component={editReleaseLiabilityFacility}
        options={{
          headerShown: false
        }}
      />
      
    </Stack.Navigator>
  );
}

export default MainRoute;
