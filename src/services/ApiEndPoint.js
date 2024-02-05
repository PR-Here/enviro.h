// export const BASE_URL = 'https://devenviroapi.aglprojects.co.in/'; //Development
export const BASE_URL = 'https://enviroapi.aglprojects.co.in/'; //Live
//export const BASE_URL = 'https://enviroapiuat.aglprojects.co.in/'; //UAT
export const BASE_PATH_VERSION = 'api/v1/';
export const BASE_PATH_URL = BASE_URL + BASE_PATH_VERSION;
// 
export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const MANAGER_DETAILS = BASE_PATH_URL + 'auth/getReportingManagerDetails';
export const LOGIN = BASE_PATH_URL + 'auth/qr-signin';
export const LOGOUT = BASE_PATH_URL + 'auth/logout-account';
export const REGENERATE_ACCESSTOKEN = BASE_PATH_URL + 'auth/regenerate-jwt-access-token';
export const NOTIFICATION_LIST = BASE_PATH_URL + 'auth/notifications';
export const NOTIFICATION_LIST_WORK = BASE_PATH_URL + 'notification/work_notification_list';
export const STARRED_NOTIFICATION = BASE_PATH_URL + 'notification/notification_star_delete';
export const USER_PROFILE_DETAILS = BASE_PATH_URL + 'auth/profile-detail';
export const DASHBOARD = BASE_PATH_URL + 'auth/dashboard';
export const DASHBOARD_PERMISSION = BASE_PATH_URL + 'auth/getPermission';
export const GET_USERSSERACH_LIST = BASE_PATH_URL + 'auth/directory-searching';
export const UPDATE_PROFILE_IMAGE = BASE_PATH_URL + 'auth/update-profile-image';
export const UPDATE_PROFILE = BASE_PATH_URL + 'auth/update-profile';
export const FETCH_EVENTS = BASE_PATH_URL + 'event/todays-event';
export const EVENT_API = BASE_PATH_URL + 'event/';

{/* master Apis*/ }
export const SKILLS = BASE_PATH_URL + 'master/skills';
export const HOBBIES = BASE_PATH_URL + 'master/hobbies';
export const ADD_NEW_HOBBIES = BASE_PATH_URL + 'master/addhobbies';
export const ADD_NEW_SKILL = BASE_PATH_URL + 'master/addskills';

export const GET_DEPARTMENT_MASTERS = BASE_PATH_URL + 'master/departments';
export const GET_LOCATION_MASTERS = BASE_PATH_URL + 'master/locations';
export const GET_DESIGNATION_MASTERS = BASE_PATH_URL + 'master/designations';
export const GET_SKILLS_MASTERS = BASE_PATH_URL + 'master/skills';
export const GET_MEETING_ROOM_LIST = BASE_PATH_URL + 'meetingrooms/meeting-room-list';
export const MEETING_FILTER_LIST = BASE_PATH_URL + 'meetingrooms/meeting-filter-list';
export const MEETING_ROOM_BOOKED = BASE_PATH_URL + 'meetingrooms/meeting-booked';
export const BOOKED_ROOM_LIST = BASE_PATH_URL + 'meetingrooms/my-room-booked';
export const DELETE_ROOM = BASE_PATH_URL + 'meetingrooms/meeting-room-cancelled';
export const CHECK_ROOM_AVALIBILITY = BASE_PATH_URL + 'meetingrooms/check-room-avaliability';
export const CREATE_MEETING = BASE_PATH_URL + 'meetingsehedule';
export const CREATE_EVENT = BASE_PATH_URL + 'meetingsehedule/create-event';
export const MEETING_VIEW_ALL = BASE_PATH_URL + 'meetingsehedule/meetingViewAllList';
export const DELETE_ACCOUNT = BASE_PATH_URL + 'auth/delete-account';
export const HR_POLICY = BASE_PATH_URL + 'auth/hr-policy';
export const POLICY = BASE_PATH_URL + '/policy';


{/* TimeSheet Apis*/ }

export const LIST_CLIENTS = BASE_PATH_URL + 'timesheets/list_clients';
export const LIST_CLIENTS_PROJECT = BASE_PATH_URL + 'timesheets/list_client_project';
export const LIST_CLIENTS_PROJECT_TASK = BASE_PATH_URL + 'timesheets/list_project_task';

export const CREATE_TIME_SHEET = BASE_PATH_URL + 'timesheets/create_timesheet';
export const LIST_TIME_SHEET = BASE_PATH_URL + 'timesheets/list_timesheet';
export const DELETE_TIME_SHEET = BASE_PATH_URL + 'timesheets/delete_timesheet';
export const COPY_FROM_PREVIOUS_DATE_TIME_SHEET = BASE_PATH_URL + 'timesheets/copy_previous_day_timesheet';



{/*Leave Module Apis */ }
export const GET_LEAVE_TYPE = BASE_PATH_URL + 'leaves/leave-type-list';
export const GET_LEAVE_SLOT_TYPE = BASE_PATH_URL + 'leaves/leave-slot-type';
export const GET_COMPANSATORY_TYPE_LIST = BASE_PATH_URL + 'leaves/user-comp-leave-balance-list';
export const GET_LEAVE_BALANCE_DATA = BASE_PATH_URL + 'leaves/user-leave-balance-list';
export const NEW_LEAVE_REQUEST = BASE_PATH_URL + 'leaves/applied-leave';
export const GET_APPLIED_LIST = BASE_PATH_URL + 'leaves/applied-leave-list';
export const SUBMIT_SAVED_LEAVE = BASE_PATH_URL + 'leaves/submitted-saved-leave';
export const DELETE_SAVE_LEAVE = BASE_PATH_URL + 'leaves/delete-leave';
export const CANCELLED_LEAVE = BASE_PATH_URL + 'leaves/cancelled-leave';
export const GET_LEAVE_BALANCE = BASE_PATH_URL + 'leaves/leave-balance';
export const GET_MANAGER_LEAVE_REQUESTS = BASE_PATH_URL + 'leaves/manager-leave-list';
export const GET_MANAGER_LEAVE_ACTION = BASE_PATH_URL + 'leaves/manager-action-leaves';
export const REGENERATE_ACCESS_TOKEN = BASE_PATH_URL + 'auth/regenerate-jwt-access-token';

// QR CODE API
export const GET_QR_CODE = BASE_PATH_URL + "auth/qrcode"
export const GET_LOGIN_LOGOUT_TIME = BASE_PATH_URL + "gaurd/punchinandoutTime1"
export const PUNCHIN_ON_SITE_AND_WFH = BASE_PATH_URL + "gaurd/userpunchinpunchout"
export const OFFICE_SCANNER_API = BASE_PATH_URL + "gaurd/scan-qrcode"

{/*Chat Bot Apis */ }
export const CHATBOT = BASE_PATH_URL + 'chatbot';
export const CHATBOT_HISTORY = BASE_PATH_URL + 'chatbot/history';
export const CHATBOT_SAVE = BASE_PATH_URL + 'chatbot/save';
export const CHATBOT_STAR = BASE_PATH_URL + 'chatbot/starredchats';

{/*Gurukul Apis */ }
export const GURUKUL_JSON = BASE_PATH_URL + 'gurukul/json';

// AttendanceReports
export const ATTENDANCE_LIST = BASE_PATH_URL + 'attendance/user_attendance_list';
{/**Attendance Regularization API */ }
export const ATTENDANCE_REGULARIZATION = BASE_PATH_URL + 'attendance/user_attendance_list_mobile';

// HOLIDAY_LIST
export const HOLIDAY_LIST = BASE_PATH_URL + 'holiday/holiday-list?';

{/** Help and support*/ }
export const GENERAL_SETTING = BASE_PATH_URL + 'auth/generalSetting';
export const REFRESH_TOKEN_API = BASE_PATH_URL + 'auth/fcm_update';


// gurukul
export const GURUKUL_DASHBOARD_LIST = BASE_PATH_URL + 'gurukulMobile/gurukul-dashboard-course-list';
export const GURUKUL_COURSE_LIST = BASE_PATH_URL + 'gurukulMobile/gurukul-course-list';
export const GURUKUL_CATEGORIES_LIST = BASE_PATH_URL + 'gurukulMobile/gurukul-categories';
export const GURUKUL_COURSE_BOOKMARK = BASE_PATH_URL + 'gurukulMobile/gurukul-course-bookmark';
export const GURUKUL_COURSE_DETAILS = BASE_PATH_URL + 'gurukulMobile/gurukul-course-detail?course_id=';
export const GURUKUL_QUIZ_DETAILS = BASE_PATH_URL + 'gurukulMobile/gurukul-quiz-details';
export const GURUKUL_CONTINUE_LEARNING = BASE_PATH_URL + 'gurukulMobile/gurukul-continue-learning-course-list';



