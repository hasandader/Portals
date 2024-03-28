import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth } from '../../lib/utility';

export default StyleSheet.create({
    subContainer: {
        // height: 100,
        alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        paddingRight: I18nManager.isRTL ? 0 : 20,
        paddingLeft: I18nManager.isRTL ? 20 : 0,
        flex: 1,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoWraper: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%'
    },
    info: {
        alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        marginRight: I18nManager.isRTL ? 0 : 10,
        marginLeft: I18nManager.isRTL ? 10 : 0,
        width: '65%',
    },
    close: {
        alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
        width: 30,
        height: 30,
        tintColor: 'white',
        marginLeft: I18nManager.isRTL ? 0 : 30,
        marginRight: I18nManager.isRTL ? 30 : 0,
        marginBottom: 56,
        marginTop: 5
    },
    rowBtn: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'baseline',
        marginTop: 48,
    },
    userIcon: {
        width: 25,
        height: 27,
        marginLeft: I18nManager.isRTL ? 0 : 18,
        marginRight: I18nManager.isRTL ? 18 : 0,
    },
    exitRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginTop: deviceHeight() * 0.5
    },
    logout: {
        width: 31,
        height: 31,
        marginLeft: I18nManager.isRTL ? 0 : 18,
        marginRight: I18nManager.isRTL ? 18 : 0
    }
})