/*eslint-disable*/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  AddScheduleMeeting,
  AddTimeSheet,
  AllNotification,
  BirthdayNotification,
  ChangePassword,
  CheckInQRHome,
  CommunityNotification,
  ConnectHNotification,
  Dashboard,
  ForgotPassword,
  HrdNotification,
  LeaveDashboard,
  MeetingBookRoom,
  MeetingHome,
  MeetingRoomList,
  MeetingRoomListDetails,
  NewLeave,
  WorkNotification,
  Wallet,
  WalletHistory,
  RecentPayment,
  Pay,
  PaymentScan,
  NewsBanner,
  NotificationHome,
  ProfileHome,
  Register,
  ReimbursementDetail,
  RmLeaveRequest,
  SearchUsers,
  SelectBookRom,
  Support,
  PaymentOtp,
  TimeSheetList,
  LeaveBalance,
} from '../../screen';
import AttendanceReports from '../../screen/attendance/attendanceReport/AttendanceReports';
import Settings from '../../screen/settings/Settings';
import NavString from '../../utils/NavString';
import ConnectHTab from '../../screen/connect.h/ConnectHTab';
import TeamConnects from '../../screen/connect.h/TeamConnects';
import Result from '../../screen/gurukul/Result';
import AllSolution from '../../screen/gurukul/AllSolution';
import Certificate from '../../screen/gurukul/Certificate';
import PlanGoList from '../../screen/PlanGo/PlanGoList';
// import WalletHistory from '../../screen/wallet/wallethistory/WalletHistory';
// import RecentPayment from '../../screen/wallet/recentpayment/RecentPayment';
// import PaymentScan from '../../screen/wallet/paymentScan/PaymentScan';
// import Pay from '../../screen/wallet/pay/Pay';
import AfterPay from '../../screen/wallet/afterPay/AfterPay';
import BillImage from '../../screen/wallet/billImage/BillImge';
import BookingRequestTab from '../topTabBar/BookingRequestTab/BookingRequestTab';
import PGDetailsList from '../../screen/PlanGo/PlanGoDetailList/PGDetailsList';
import AttRegularization from '../../screen/attendanceRegularization/AttRegularization';
import RequestRegularization from '../../screen/attendanceRegularization/RequestRegularization';
import HRPolicy from '../../screen/hrpolicy/HRPolicy';
import CalenderMeetingListScreen from '../../screen/meetingModule/meetingCalender/CalenderMeetingListScreen';
import HolidayList from '../../screen/holidaylist/HolidayList';
import Policy from '../../screen/hrpolicy/Policy';

const Stack = createNativeStackNavigator();

const HomeStack = () => {

  return (
    <Stack.Navigator
      initialRouteName={NavString.DASHBOARD}
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name={NavString.DASHBOARD} component={Dashboard} />
      <Stack.Screen
        name={NavString.FORGOT_PASSWORD}
        component={ForgotPassword}
      />
      <Stack.Screen name={NavString.REGISTER} component={Register} />
      <Stack.Screen
        name={NavString.CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <Stack.Screen
        name={NavString.REIMBURSEMENT}
        component={ReimbursementDetail}
      />
      <Stack.Screen name={NavString.SEARCH_USER} component={SearchUsers} />
      <Stack.Screen
        name={NavString.HOME_NOTIFICATION}
        component={NotificationHome}
      />
      <Stack.Screen
        name={NavString.ALL_NOTIFICATION}
        component={AllNotification}
      />
      <Stack.Screen
        name={NavString.BIRTHDAY_NOTIFICATION}
        component={BirthdayNotification}
      />
      <Stack.Screen name={NavString.ADD_TIMESHEET} component={AddTimeSheet} />
      <Stack.Screen name={NavString.NEWS_BANNER} component={NewsBanner} />
      <Stack.Screen name={NavString.BOOK_ROOM} component={MeetingBookRoom} />
      <Stack.Screen
        name={NavString.ADD_SCHEDULE_MEETING}
        component={AddScheduleMeeting}
      />
      <Stack.Screen name={NavString.MY_PROFILE} component={ProfileHome} />
      <Stack.Screen name={NavString.HELP_SUPPORT} component={Support} />
      <Stack.Screen name={NavString.MEETING_HOME} component={MeetingHome} />
      <Stack.Screen
        name={NavString.SELECT_BOOK_ROOM}
        component={SelectBookRom}
      />
      <Stack.Screen
        name={NavString.MEETING_LIST_DETAILS}
        component={MeetingRoomListDetails}
      />
      <Stack.Screen
        name={NavString.RM_LEAVE_REQUEST}
        component={RmLeaveRequest}
      />

      <Stack.Screen
        name={NavString.MEETING_ROOM_LIST}
        component={MeetingRoomList}
      />

      <Stack.Screen
        name={NavString.CHECK_IN_QR}
        component={CheckInQRHome}
      />
      <Stack.Screen
        name={NavString.SETTINGS}
        component={Settings}
      />

      <Stack.Screen name={NavString.LEAVE_DASHBOARD} component={LeaveDashboard} />
      <Stack.Screen name={NavString.LEAVEBALANCE} component={LeaveBalance} />
      <Stack.Screen name={NavString.NEW_LEAVE} component={NewLeave} />
      <Stack.Screen name={NavString.ATTENDANCE_REPORT} component={AttendanceReports} />
      <Stack.Screen name={NavString.TIMESHEET} component={TimeSheetList} />
      <Stack.Screen name={NavString.CONNECTH_NOTIFICATION} component={ConnectHNotification} />
      <Stack.Screen name={NavString.CUMMUNITY_NOTIFICATION} component={CommunityNotification} />
      <Stack.Screen name={NavString.HRD_NOTIFICATION} component={HrdNotification} />
      <Stack.Screen name={NavString.WORK_NOTIFICATION} component={WorkNotification} />
      <Stack.Screen name={NavString.GURUKUL_RESULT} component={Result} />
      <Stack.Screen name={NavString.ALL_SOLUTION} component={AllSolution} />
      <Stack.Screen name={NavString.CERTIFICATE} component={Certificate} />
      {/**<Stack.Screen name={NavString.ATTENDANCE_REGULARISE} component={Wallet} />*/}
      <Stack.Screen name={NavString.BILL_SCREEN} component={BillImage} />
      <Stack.Screen name={NavString.WALLETHISTORY} component={WalletHistory} />
      <Stack.Screen name={NavString.WALLET} component={Wallet} />
      <Stack.Screen name={NavString.RECENT_PAYMENT} component={RecentPayment} />
      <Stack.Screen name={NavString.PAY} component={Pay} />
      <Stack.Screen name={NavString.SUCESS_PAY} component={AfterPay} />
      <Stack.Screen name={NavString.PAYMENT_SCREEN} component={PaymentScan} />
      <Stack.Screen name={NavString.CONNECT_TAB} component={ConnectHTab} />
      <Stack.Screen name={NavString.TEAM_CONNECT} component={TeamConnects} />
      <Stack.Screen name={NavString.PLAN_G0_LIST} component={PlanGoList} />
      <Stack.Screen name={NavString.BOOKING_REQUEST_TAB} component={BookingRequestTab} />
      <Stack.Screen name={NavString.PG_DETAILS_LIST} component={PGDetailsList} />

      <Stack.Screen name={NavString.PAYMENT_OTP} component={PaymentOtp} />
      <Stack.Screen name={NavString.ATTENDANCE_REGULARIZATION} component={AttRegularization} />
      <Stack.Screen name={NavString.REQUEST_REGULARIZATION} component={RequestRegularization} />
      <Stack.Screen name={NavString.HR_POLICY} component={HRPolicy} />
      <Stack.Screen name={NavString.CALENDER_MEETING_LIST} component={CalenderMeetingListScreen} />
      <Stack.Screen name={NavString.HOLIDAY_LIST} component={HolidayList} />
      <Stack.Screen name={NavString.POLICY} component={Policy} />

    </Stack.Navigator>
  );
};

export default HomeStack;
