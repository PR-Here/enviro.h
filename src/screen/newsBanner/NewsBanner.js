import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './Style';
import AppString from '../../utils/AppString';
import Header from '../../component/header/Header';
import {EMAIL} from '../../utils/AssetsImages';
import CustomText from '../../component/atoms/CustomText';
import {FontSize} from '../../theme/Fonts';

const NewsBanner = () => {
  const [dataSource, setDataSource] = useState([
    {id: 1, title: 'News1', des: 'News 1 Channel'},
    {id: 2, title: 'News2', des: 'News 2 Channel'},
    {id: 3, title: 'News3', des: 'News 3 Channel'},
    {id: 4, title: 'News4', des: 'News 4 Channel'},
    {id: 5, title: 'News5', des: 'News 5 Channel'},
    {id: 6, title: 'News6', des: 'News 6 Channel'},
    {id: 7, title: 'News7', des: 'News 7 Channel'},
    {id: 8, title: 'News8', des: 'News 8 Channel'},
    {id: 9, title: 'News9', des: 'News 9 Channel'},
    {id: 10, title: 'News10', des: 'News 10 Channel'},
  ]);

  const renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Alert.alert('Click me');
        }}>
        <View style={styles.mainCardView}>
          <View style={styles.viewImageText}>
            <View style={styles.subCardView}>
              <Image
                source={EMAIL}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.viewMarginStyle}>
              <CustomText children={item.title} />
              <View style={styles.viewTextStyle}>
                <CustomText children={item.des} fontSize={FontSize(13)} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={AppString.NEWS_BANNER} />
      <FlatList
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={<View style={styles.listHead} />}
        ListFooterComponent={<View style={styles.listFoot} />}
      />
    </View>
  );
};

export default NewsBanner;
