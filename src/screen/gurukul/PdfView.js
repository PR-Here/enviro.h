import React from 'react';
import {
    Platform,
    View
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import MeetingHomeHeader from '../../component/header/MeetingHeader';
import { openUrl } from '../../utils/Constant';

const PdfView = ({ route }) => {

    const fileName = `${route?.params?.lesson_name}.pdf`

    const downloadFile = () => {
        if (Platform.OS == 'ios') {
            let dirs = ReactNativeBlobUtil?.fs.dirs;
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
                .fetch('GET', route?.params?.attachment_data)
                .then((res) => {
                    if (Platform.OS === 'ios') {
                        const filePath = res.path();
                        let options = {
                            type: 'application/pdf',
                            url: filePath,
                            saveToFiles: true,
                        };
                        Share.open(options)
                            .then((resp) => console.log(resp))
                            .catch((err) => console.log(err));
                    }
                })
                .catch((err) => console.log('BLOB ERROR -> ', err));
        } else (
            openUrl(route?.params?.attachment_data)
        )
    };

    return (
        <View style={{ flex: 1 }}>
            <MeetingHomeHeader headerText={route?.params?.lesson_name} icon={'download'}
                onClickDownload={downloadFile}
            />
            <WebView
                source={{
                    uri: Platform.OS == 'ios' ? route?.params?.attachment_data : `https://docs.google.com/viewer?url=${route?.params?.attachment_data}`,
                    mimeType: 'application/pdf',
                }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                useWebKit={true}
                startInLoadingState={true}

            />
        </View>
    )
}

export default PdfView