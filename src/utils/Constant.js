
import { CommonActions } from '@react-navigation/native';
import { default as Moment, default as moment } from 'moment';
import momentTimeZone from 'moment-timezone';
import { Alert, Linking, Platform, Share } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';


const regex = /\u00A0/g;

// For get current time in 24 Hour format
export const getCurrentTime = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  // Add a leading zero to minutes and Hour if less than 10
  const formattedMinute =
    currentMinute < 10 ? `0${currentMinute}` : currentMinute;
  const formattedHour = currentHour < 10 ? `0${currentHour}` : currentHour;
  return `${formattedHour}:${formattedMinute}`;
};

// Function to calculate distance between two points using Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Calculate differences between the latitudes and longitudes
  const latDiff = lat2Rad - lat1Rad;
  const lonDiff = lon2Rad - lon1Rad;

  // Haversine formula
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1Rad) *
    Math.cos(lat2Rad) *
    Math.sin(lonDiff / 2) *
    Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c * 1000; // Convert to meters
  return distance?.toFixed(0);
}
// Function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export const onShare = async () => {
  try {
    const appName = 'Enviro/OneApp';
    const appLink =
      Platform.OS == 'android'
        ? 'https://play.google.com/store/apps/details?id=com.enviro'
        : 'https://apps.apple.com/in/app/enviro/id6447666432';

    const result = await Share.share({
      message:
        Platform.OS == 'ios'
          ? `Hey! Check out this ${appName}. Download app from App Store:  ${appLink}.`
          : `Hey! Check out this ${appName}. Download app from Play Store:  ${appLink}.`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        ///console.log('Shared via:', result.activityType);
      } else {
        //console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      //console.log('Sharing dismissed');
    }
  } catch (error) {
    console.log('Error sharing:', error.message);
  }
};

// Alert Popup
export const showAlert = ({ onPress, buttonLabel, title, description }) => {
  Alert.alert(
    title || 'Logout',
    description || 'Do you want to Logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: buttonLabel || 'Logout', // Use custom button label or default "OK"
        onPress: onPress || (() => { }),
      },
    ],
    { cancelable: false },
  );
};

//Format date/time
export const formatDateTime = (date, format) => {
  return Moment(date).format(format);
};

export const formatedDate = (date, currentDateFormat, format) => {
  return Moment(date, currentDateFormat).format(format);
};


export const formatDateTimeTodayYesterday = (date, format) => {
  let dateString = ''
  if (Moment(date).format('DD-MM-YYYY') == Moment().format('DD-MM-YYYY')) {
    dateString = "Today, " + showUTCToLocal(date)
  } else if (Moment(date).format('DD-MM-YYYY') == Moment().subtract(1, 'days').format('DD-MM-YYYY')) {
    dateString = "Yesterday, " + showUTCToLocal(date)
  } else if (Moment(date).format('DD-MM-YYYY') == Moment().add(1, 'days').format('DD-MM-YYYY')) {
    dateString = "Tomorrow, " + showUTCToLocal(date)
  } else {
    dateString = `${Moment(date).format(format)} ${showUTCToLocal(date)}`
  }
  return dateString;
};

export const formatTime = (timeString) => {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? timeString == '' ? " AM" : '' : " PM");
}

export const formatTimeTo12Hour = (inputTime) => {
  const [hours, minutes] = inputTime.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format

  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}




export const getTimeAgo = (dateTime, current = new Date()) => {
  const customDate = new Date(dateTime);
  const currentDate = current;
  const timeDifference = currentDate - customDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds < 0) {
    return `1 second ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}


export const launchGallery = onPress => {
  launchImageLibrary(
    {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    },
    response => {
      //console.log(response.assets[0].uri)
      {
        response.assets && onPress(response.assets[0].uri);
      }
      //setUri(response.assets[0].uri)
    },
  );
};

export const ImageFromCamera = onPress => {
  launchCamera(
    {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    },
    response => {
      // console.log(response.assets[0].uri)
      {
        response.assets && onPress(response.assets[0].uri);
      }
      // setUri(response.assets[0].uri)
    },
  );
};

// hide tab navigator on scroll up
var offset = 0;
export const onScrollHandler = e => {
  const currentOffset = Math.abs(e.nativeEvent.contentOffset.y);
  const layDiff = e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height
  const dif = currentOffset - offset;
  const direction = ''
  // if (dif > 0 || currentOffset >= layDiff) {
  //   direction = 'down'
  // }
  // else if (dif < 0) {
  //   direction = 'up'
  // }
  // offset = currentOffset;
  // if (direction === 'down') {
  //   return true;
  // }
  // else if (direction === 'up') {
  //   return false
  // }
};

// CLEAR PREVIOUS STACK OF NAVIGATION
export const handleStackNavigation = (screenName, navigation) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName }],
    }),
  );
};


// If the input JSON string is valid JSON, it will return the parsed JSON object.
// If the input JSON string is null, it will return null.
// If the input JSON string is undefined, it will return null.
// If the input JSON string contains non-breaking space characters 
// (which are replaced with regular spaces), it will still attempt 
// to parse the cleaned string and return the parsed JSON object if it's valid JSON.
export function safeParseJSON(jsonString) {
  try {
    if (jsonString) {
      const cleanedData = jsonString.replace(regex, ' ');
      return JSON.parse(cleanedData);
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return null; // Return null if parsing fails or input is null/undefined
}

// YOU CAN  RENAME A OBJECT KEY USING THIS FUNCTION 
// array= IN WHICH ARRAY YOU WANT TO CHANGE OBJECT KEY
// oldKey= WHICK KEY YOU WANT TO RENAME
// newKey= WHICH KEY YOU WANT TO ADD
export function renameKeyInArray(array, oldKey, newKey) {
  return array.map((item) => {
    const newItem = { ...item };
    newItem[newKey] = newItem[oldKey];
    delete newItem[oldKey];
    return newItem;
  });
}

// formate date 
export const formatDate = (date) => {
  if (typeof date === 'string') {
    return date; // Already in the desired format
  } else if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  } else {
    return ''; // Handle invalid date input as needed
  }
};

// formate date 
export const formatDateWithReverse = (date) => {
  if (typeof date === 'string') {
    return date; // Already in the desired format
  } else if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
    // return `${day}-${month}-${year}`;
  } else {
    return ''; // Handle invalid date input as needed
  }
};

// GENERATE QNIUE IDS
let currentId = 1;
export function generateUniqueId() {
  const uniqueId = currentId;
  currentId += 1; // Increment the ID for the next call
  return uniqueId;

}

// make first word capital of any string
export const capitalizeFirstLetter = (str) => {
  // Split the string into words
  const words = str?.split(' ');
  // Capitalize the first letter of each word
  const capitalizedWords = words?.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return ''; // Handle empty words (e.g., multiple spaces)
    }
  });
  // Join the words back together to form the final string
  return capitalizedWords?.join(' ');
};


export const notifyMessage = (msg) => {
  Alert.alert(msg)
}

export const ShowToast = (msg, length = Toast.LONG) => Toast.showWithGravity(
  msg,
  length,
  Toast.BOTTOM,
);

// THIS FUNCTION IS CREATEING FORM DATA 
// WE JUST IMPORT THIS FUNCTION AND PASS OUR API KEY IMAGE URI AND BODY
// AND HE RETURN THE FORM DATA
export const createFormData = (imageKey, imageUri, body = {}) => {
  const data = new FormData();
  if (imageUri != null && imageUri != "") {
    console.log('imageUri', imageUri);
    data.append(imageKey, {
      uri: Platform.OS === "android"
        ? imageUri?.assets[0]?.uri
        : imageUri?.assets[0]?.uri.replace("file://", ""),
      name: imageUri?.assets[0]?.fileName,
      type: imageUri?.assets[0]?.type,
    });
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};


// function checks if the value is either null, undefined, or a blank string,
//  and it returns true if any of these conditions are met.
export function isNullOrUndefinedOrBlank(value) {
  return value == null || value === undefined || value.trim() === '';
}

// This code will calculate the difference in years, months,
//  and days between date1 and date2.
// Be sure to format your dates correctly in the 'YYYY-MM-DD'
export function dateDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const timeDiff = Math.abs(d2 - d1);

  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25) / (1000 * 60 * 60 * 24 * (365.25 / 12))))
  const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * (365.25 / 12)) / (1000 * 60 * 60 * 24)))

  return `${years} years, ${months} months, ${days} days`;
}

// GET BETWEEN TWO DATES
export const GetMonths = (dateFrom, dateTo) => {
  let start = moment(dateFrom).format('MMM YYYY')
  let end = moment(dateTo).format('MMM YYYY')
  let month = ''
  if (start === end) {
    month = start
  } else {
    month = start.split(" ")[0] + ' - ' + end
  }
  return month
}

export const formatStartEnd = (start, end, format) => {
  return `${moment(start).format(format)} - ${moment(end).format(format)}`
}


// OPEN ANY URL
export const openUrl = (url) => {
  Linking.openURL(url)
}


// CONVERT TIME INTO UTC FORMAT TO LOCAL
export function convertTimeToUTC(utcTimeString) {
  if (!utcTimeString) {
    return null; // Handle empty input gracefully
  }
  const utcTime = moment.utc(utcTimeString, 'HH:mm:ss');
  const localOffsetMinutes = moment().utcOffset();
  const localTime = utcTime.utcOffset(localOffsetMinutes);
  const localTimeString = localTime.format('HH:mm');

  return localTimeString;
}

// CONVERT TIME INTO UTC FORMAT TO LOCAL
export function showUTCToLocal(utcTimeString) {
  if (!utcTimeString) {
    return null; // Handle empty input gracefully
  }
  const utcTime = moment.utc(utcTimeString);
  const localOffsetMinutes = moment().utcOffset();
  const localTime = utcTime.utcOffset(localOffsetMinutes);
  const localTimeString = localTime.format('HH:mm');

  return localTimeString;
}

export function calculateDuration(startDateStr, endDateStr) {
  const startDate = moment(startDateStr);
  const endDate = moment(endDateStr);

  // Calculate duration in milliseconds
  const durationInMillis = endDate.diff(startDate);

  // Convert duration to a human-readable format
  const duration = moment.duration(durationInMillis);

  return {
    durationInMillis,
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
    //formatted: duration.format('HH:mm:ss'),
  };
}

export function addTimeToCurrentDate(time) {
  // Get the current date
  const currentDate = moment();

  // Parse the time string
  const parsedTime = moment(time, 'HH:mm');

  // Set the time on the current date
  const resultDate = currentDate.set({
    hour: parsedTime.hour(),
    minute: parsedTime.minute(),
    second: 0, // Optionally set seconds to 0 if needed
  });

  return resultDate;
}


export function getNoOfHours(time1, time2) {

  let t1 = moment(time1, 'HH:mm')
  let t2 = moment(time2, 'HH:mm')

  let hours = t2.diff(t1, 'hours')
  //console.log('hours', hours)

  return hours;

}


export const getTimeDuration = (in_time, out_time) => {
  if (in_time == null && out_time == null) {
    return '--'
  } else if (in_time != null && out_time == null) {
    return '--'
  } else {
    var dif = moment(out_time, 'HH:mm').diff(moment(in_time, 'HH:mm'))
    const duration = moment.duration(dif);
    return `${String(duration.hours()).padStart(2, '0')}:${String(duration.minutes()).padStart(2, '0')}`
  }
}

export function formateTime(time) {
  return moment(time, 'HH:mm:ss').format('HH:mm');
}

export const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const currentDate = new Date();
  // Calculate the difference in years
  const ageInMilliseconds = currentDate - dobDate;
  const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));

  return ageInYears
}

export const convertLocalToUTC = (localDate) => {
  // return moment(localDate).toISOString();
  if (Platform.OS === 'ios') {
    const localMoment = momentTimeZone.tz(localDate, getLocalTimeZone());
    // Convert local moment to UTC
    const utcMoment = localMoment.utc();
    return utcMoment;
  } else {
    return moment(localDate).toISOString();
  }
}

export const getLocalTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const getFileNameFromUrl = (input) => {
  var n = input.lastIndexOf('/');
  var filename = input.substring(n + 1);
  return filename
}




// Convert Time String into Date Like Thu, 01 Jan 2023 
export function convertTimeString(inputDateString) {
  const inputDate = new Date(inputDateString);

  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return inputDate.toLocaleDateString('en-US', options);
}

