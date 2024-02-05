import AssetsImages from '../../src/utils/AssetsImages';
import NavString from '../../src/utils/NavString';

export const DrawerItemJson = [
  {
    key: '1',
    icon: AssetsImages.BELL,
    label: 'DashBoard',
    screenName: NavString.DASHBOARD,
  },
  {
    key: '2',
    icon: AssetsImages.BELL,
    label: 'My Profile',
    screenName: NavString.PROFILE,
  },
  {
    key: '3',
    icon: AssetsImages.BELL,
    label: 'Attendance',
    screenName: NavString.ATTENDANCE,
  },
  {
    key: '4',
    icon: AssetsImages.BELL,
    label: 'TimeSheet',
    screenName: NavString.TIMESHEET,
  },
  {
    key: '5',
    icon: AssetsImages.BELL,
    label: 'Share',
    action: 'share',
  },
  {
    key: '6',
    icon: AssetsImages.BELL,
    label: 'Logout',
    action: 'logout',
  },
];
