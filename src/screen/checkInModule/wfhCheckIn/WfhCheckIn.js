import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './Style'
import CustomText from '../../../component/atoms/CustomText'
import { convertTimeToUTC } from '../../../utils/Constant'
import TimerComponent from '../../../component/atoms/TimerComponent'

export default function CheckInWfh({ punchinData, currentaddress }) {


  var previousMinute = (punchinData?.totalHours * 60) + punchinData?.totalMinutes;
  var currentMinute = punchinData?.currentcalculatetime != null ? (punchinData?.currentcalculatetime?.hours * 60) + punchinData?.currentcalculatetime?.minutes :
    0;

  var totalCalculatedTime = previousMinute + currentMinute;

  var Hours = Math.floor(totalCalculatedTime / 60)
  var minutes = totalCalculatedTime % 60

  var showTotalTime = `${Hours}:${minutes}:${punchinData?.currentcalculatetime != null ? punchinData?.currentcalculatetime?.seconds : punchinData?.totalSeconds}`


  return (
    <View style={styles.container}>
      <View style={styles.punchIn_Details}>
        <View style={styles.punchInView}>
          <CustomText style={styles.punchInText} children={"Punch In"} />
          <CustomText style={styles.punchInTimeText} children={`${punchinData == null ? '--:--' : convertTimeToUTC(punchinData?.firstInTime)}`} />
        </View>
        {/* Line */}
        <View style={styles.line}></View>
        <View style={styles.punchInView}>
          <CustomText style={styles.punchOutText} children={"Punch Out"} />
          <CustomText style={styles.punchOutTimeText} children={punchinData?.lastOutTime == null ? "--:--" : convertTimeToUTC(punchinData?.lastOutTime)} />
        </View>
      </View>
      {/* Total Hour Time Text */}
      {
        punchinData == null ? <CustomText style={styles.totalHourText}>00:00 Hrs</CustomText>
          :
          // punchinData?.currentcalculatetime == null ?
          // <CustomText style={styles.totalHourText} children={`Working Hrs: ${punchinData?.totalHours}:${punchinData?.totalMinutes}:${punchinData?.totalSeconds} Sec`} /> :
          <CustomText style={styles.totalHourText} children={`Working Hrs: ${showTotalTime} Sec`} />
      }

      <CustomText style={styles.locationText} children={`${currentaddress}`} />
    </View>
  )
}