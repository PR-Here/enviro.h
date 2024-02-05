import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { BLACK, LIGHTGREY, WHITE } from "../../theme/Colors"
import { FontName, FontSize } from "../../theme/Fonts"
import CustomButton from "../atoms/CustomButton"
import AttachmentIcon from '../../../assets/images/SVG/paperclip.svg'
// import RNFetchBlob from 'rn-fetch-blob';
import { widthPercentageToDP } from "react-native-responsive-screen"


function EventFooterItem({ conatinerStyle, file, link, url }) {

    const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };

    const downloadFile = () => {
        // // Get today's date to add the time suffix in filename
        // let date = new Date();
        // // File URL which we want to download
        // let FILE_URL = file;
        // // Function to get extention of the file url
        // let file_ext = getFileExtention(FILE_URL);

        // file_ext = '.' + file_ext[0];

        // // config: To get response by passing the downloading related options
        // // fs: Root directory path to download
        // // const { config, fs } = RNFetchBlob;
        // let RootDir = fs.dirs.PictureDir;
        // let options = {
        //     fileCache: true,
        //     addAndroidDownloads: {
        //         path:
        //             RootDir +
        //             '/file_' +
        //             Math.floor(date.getTime() + date.getSeconds() / 2) +
        //             file_ext,
        //         description: 'downloading file...',
        //         notification: true,
        //         // useDownloadManager works with Android only
        //         useDownloadManager: true,
        //     },
        // };
        // config(options)
        //     .fetch('GET', FILE_URL)
        //     .then(res => {
        //         // Alert after successful downloading
        //         console.log('res -> ', JSON.stringify(res));
        //         alert('File Downloaded Successfully.');
        //     });
    };

    return (
        <View style={[styles.conatiner, conatinerStyle]}>
            {
                link ?
                    <TouchableOpacity style={styles.leftContent} onPress={() => Linking.openURL(url)}>
                        <AttachmentIcon style={styles.icon} />
                        <Text style={styles.text}>{link}</Text>
                    </TouchableOpacity>
                    : null
            }
            {
                file ?
                    <CustomButton style={styles.button} title={'Download'} textStyle={styles.buttonText} onPress={() => downloadFile()} />
                    : null
            }


        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: '#88898A'
    },
    leftContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(16),
        color: '#0C95F0',
        textDecorationLine: 'underline',
        marginLeft: 10,
        width: widthPercentageToDP(40)
    },
    button: {
        backgroundColor: BLACK,
        width: 'auto',
        height: 'auto',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: FontName.Gordita_Medium,
        fontSize: FontSize(14),
        color: WHITE
    }

})

export default EventFooterItem