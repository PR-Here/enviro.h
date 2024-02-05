import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { hubScreens } from '../../redux/slices/EventSlice';

const Community = () => {
  const dispatch = useDispatch()
  const eventState = useSelector((state) => state.event)

  useEffect(() => {
    dispatch(hubScreens('Your Community'))
  }, [eventState.screenName])

  return (
    <View>
      <Text>City</Text>
    </View>
  );
};

export default Community;
