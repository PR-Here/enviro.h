import CalendarStrip from 'react-native-calendar-strip';
import { BLACK, PRIMARY_COLOR, WHITE } from '../../theme/Colors';
import { useRef } from 'react';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import moment from 'moment';
import { FontName, FontSize } from '../../theme/Fonts';
import AssetsImages from '../../utils/AssetsImages';

const WeeklyCalendar = props => {
  const textRef = useRef()
  let datesWhitelist = [{
    start: moment(),
    end: moment().add(1, 'year')  // total 1 year enabled
  }];
  return (
    <CalendarStrip
      updateWeek={false}
      selectedDate={props.selectedDate}
      calendarAnimation={{ type: 'sequence', duration: 30 }}
      daySelectionAnimation={{
        type: 'border',
        duration: 200,
        borderWidth: 1,
        borderHighlightColor: 'white',
      }}
      calendarHeaderStyle={{ alignSelf: 'flex-start', fontSize: FontSize(16), fontWeight: '500', fontFamily: FontName.Gordita_Medium, color: BLACK }}
      calendarHeaderContainerStyle={{ height: heightPercentageToDP(5) }}
      calendarColor={'white'}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{ color: 'black' }}
      highlightDateNumberStyle={{
        color: WHITE,
        backgroundColor: PRIMARY_COLOR,
        width: widthPercentageToDP(9),
        borderBottomLeftRadius: heightPercentageToDP(0.5),
        borderBottomRightRadius: heightPercentageToDP(0.5),
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(0.5),
      }}
      highlightDateNameStyle={{
        color: WHITE,
        backgroundColor: PRIMARY_COLOR,
        width: widthPercentageToDP(9),
        borderTopLeftRadius: heightPercentageToDP(0.5),
        borderTopRightRadius: heightPercentageToDP(0.5),
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: heightPercentageToDP(0.5)
      }}
      datesWhitelist={datesWhitelist}
      disabledDateNameStyle={{ color: 'grey' }}
      disabledDateNumberStyle={{ color: 'grey' }}
      onDateSelected={props.onDateSelected}
      iconLeftStyle={{ paddingRight: widthPercentageToDP(20), height: heightPercentageToDP(2.4), width: heightPercentageToDP(2.4) }}
      iconRightStyle={{ height: heightPercentageToDP(2.4), width: heightPercentageToDP(2.4), }}
      iconContainer={{ position: 'absolute', top: -heightPercentageToDP(5), right: 0, }}
      innerStyle={[]}
      style={{ height: heightPercentageToDP(20) }}
      iconLeft={AssetsImages.CHEVRON_LEFT}
      iconRight={AssetsImages.CHEVRON_RIGHT}
    />


  );
};

export default WeeklyCalendar;
