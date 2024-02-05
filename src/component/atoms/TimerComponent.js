import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { FontSize } from '../../theme/Fonts';
import AppString from '../../utils/AppString';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { BLACK } from '../../theme/Colors';

const TimerComponent = ({ running, initialTime = '00:00' }) => {
  const [startTime, setStartTime] = useState(parseTimeToSeconds(initialTime));
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;

    const updateElapsedTime = () => {
      const now = new Date();
      const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      setElapsedTime(currentTime - startTime);
    };

    if (running) {
      updateElapsedTime();
      timer = setInterval(updateElapsedTime, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, startTime]);

  const formattedTime = () => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    return {
      hhmmss: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      seconds: elapsedTime,
    };
  };

  return (
    <CustomText style={styles.timerText}>
      {`${AppString.TIME} : ${formattedTime().hhmmss}`}
      <br />
      {`Total Seconds: ${formattedTime().seconds}`}
    </CustomText>
  );
};

// Helper function to convert time format 'HH:mm' to total seconds
const parseTimeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export default TimerComponent;

const styles = StyleSheet.create({
  timerText: {
    fontSize: FontSize(10),
    right: heightPercentageToDP(0.5),
    color: BLACK,
    textAlign: 'center',
    marginTop: 10,
  },
});
