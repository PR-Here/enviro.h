import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { BLACK, GREY, WHITE } from '../../theme/Colors';
import { FontName, FontSize } from '../../theme/Fonts';
import AssetsImages from '../../utils/AssetsImages';
import { ShowToast, showUTCToLocal } from '../../utils/Constant';
import Clock from '../../../assets/images/SVG/clock.svg'

const TimeComponent = ({ startTime, endTime, onStartTime, onEndTime, meridein }) => {

  const handleDone = () => {
    if (startTime == 'Book from') {
      ShowToast('Please enter start time')
      return
    }
    onEndTime()
  };

  return (
    <View style={styles.container} >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Clock style={styles.icon} />
        <TouchableOpacity
          style={styles.timePicker}
          onPress={onStartTime}
        >
          <Text style={styles.input}>{showUTCToLocal(startTime)}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.timePicker}
        onPress={handleDone}
      >
        <Text style={styles.input}>{endTime == 'Book to' ? endTime : showUTCToLocal(endTime)}</Text>
      </TouchableOpacity>

    </View>
  );
};

export default TimeComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: FontSize(14),
    fontWeight: '500',
    fontFamily: FontName.Gordita_Medium,
    color: BLACK,
    paddingLeft: heightPercentageToDP(1)
  },
  text: {
    padding: heightPercentageToDP(0.8),
    borderRadius: 5,
    color: WHITE,
    fontSize: FontSize(14),
    fontFamily: FontName.Gordita_Regular,
    fontWeight: '500',
    borderWidth: 1,
  },
  icon: {
    height: heightPercentageToDP(3),
    width: heightPercentageToDP(3),
    tintColor: BLACK,
    marginRight: 5
  },
  timePicker: {
    borderColor: GREY,
    borderWidth: 1,
    borderRadius: heightPercentageToDP(0.5),
    width: widthPercentageToDP('40%'),
    height: heightPercentageToDP(6),
    justifyContent: 'center',
  },
});
