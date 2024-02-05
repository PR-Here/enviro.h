import { StyleSheet } from 'react-native';
import { TIMESHEET_ITEM_HEADER, WHITE } from '../../../theme/Colors';
import { FontSize } from '../../../theme/Fonts';

export const styles = StyleSheet.create({
    qrScannerTopBottomViewStyle: { flex: 0, height: 0 },
    viewOverlayStyle: {
        height: '100%',
        position: 'absolute', alignSelf: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonStyle: {
        marginTop: 40,
        alignSelf: 'center', alignItems: 'center',
        justifyContent: 'center', borderRadius: 100, backgroundColor: '#fff4',
        width: 50, height: 50
    },
    scanCodeTextStyle: {
        marginTop: "20%",
        fontSize: 20, textAlign: 'center',
        fontWeight: '900', color: WHITE
    },
    scanCodeMsgTextStyle: {
        color: TIMESHEET_ITEM_HEADER, paddingHorizontal: 30, fontSize: FontSize(12),
        textAlign: 'center', fontWeight: '400',
    },
    textStyle:{ color: WHITE }
});
