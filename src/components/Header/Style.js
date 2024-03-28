import { StyleSheet, I18nManager } from 'react-native';
import { deviceHeight, deviceWidth, isPlatformIos } from '../../lib/utility';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
    header: {
        width: deviceWidth(),
        height: deviceHeight() <= 700 ? 140 : 150,
        marginBottom: 2
        // alignItems: 'baseline',
        // flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        // justifyContent: 'flex-end',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'flex-end',
    },
    whiteArea: {
        width: '100%',
        height: 60,
        position: 'absolute',
        marginTop: 123,
        borderRadius: 30,
        backgroundColor: primaryColors.athensGray
    },
    leftBtn: {
        alignSelf: 'flex-end',
        marginBottom: deviceHeight() * 0.013,
        marginLeft: I18nManager.isRTL ? 0 : deviceWidth() * 0.043,
        marginRight: I18nManager.isRTL ? deviceWidth() * 0.043 : 0,
        borderWidth: 0,
        padding: 10,
    },
    leftMenu: {
        alignSelf: 'flex-end',
        marginBottom: deviceHeight() * 0.01,
        marginLeft: I18nManager.isRTL ? 0 : deviceWidth() * 0.043,
        marginRight: I18nManager.isRTL ? deviceWidth() * 0.043 : 0,
        borderWidth: 0,
        // padding: 10,
    },
    leftIcon: {
        width: 12,
        height: 20
    },
    menu: {
        width: 47,
        height: 47
    },
    title: {
        alignSelf: 'flex-end',
        marginBottom: deviceHeight() * 0.01,
        marginRight: I18nManager.isRTL ? 0 : deviceWidth() * 0.043,
        marginLeft: I18nManager.isRTL ? deviceWidth() * 0.043 : 0,
        color: primaryColors.white,
        fontFamily: fonts.titleRegular,
        lineHeight: 55,
        borderWidth: 0,
        fontSize: 30
    },
    headerBottom: {
        backgroundColor: primaryColors.white,
        paddingBottom: deviceHeight() * 0.008,
        height: 60,
        justifyContent: 'flex-end',
        borderBottomRightRadius: 35,
        borderBottomLeftRadius: 35,
        marginTop: deviceHeight() <= 700 ? 140 : 150,
        position: 'absolute',
        zIndex: 1,
        width: deviceWidth(),
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.62,

        elevation: 4,
    }
});