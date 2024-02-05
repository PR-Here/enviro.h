import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { styles } from './Style';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AppString from '../../utils/AppString';
import { EMAIL } from '../../utils/AssetsImages';
import Header from '../../component/header/Header';
import FlashMessage from '../../component/atoms/FlashMessage';

const CompanyPolicy = () => {
  const [dataSource, setDataSource] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  let flashMessageRef = useRef(null);
  const fileName = 'Hello';
  const fileUrl = 'https://www.africau.edu/images/default/sample.pdf';

  const DownloadMethod = ({ item }) => {
    if (item.id === 1) {
      Alert.alert('Hello');
    } else if (item.id === 2) {
      //   Alert.alert('Hello 2');
      showFlashMessage();
      downloadUrl();
    } else {
      Alert.alert('Hello Else');
    }
  };

  const showFlashMessage = () => {
    flashMessageRef.current.showMessage('This is a flash message!', 3000);
  };

  const downloadUrl = () => {
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${fileName}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: fileName,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', fileUrl)
      .then(res => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        // eslint-disable-next-line no-undef
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          // eslint-disable-next-line no-undef
          Share.open(options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log('BLOB ERROR -> ', err));
  };

  const renderItem = item => {
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={() => DownloadMethod(item)}>
          <Image style={styles.imageThumbnail} source={EMAIL} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={AppString.COMPANY_POLICY} />
      <FlatList
        data={dataSource}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
      <FlashMessage ref={flashMessageRef} message={'Downloading Start ...'} />
    </SafeAreaView>
  );
};

export default  CompanyPolicy;