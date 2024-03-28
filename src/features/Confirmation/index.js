import React, { useState, useCallback, useEffect } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './Style';
import { logo, tree, eye, tailLogo } from '../../images/index';
import { deviceHeight, deviceWidth } from '../../lib/utility';
import Text from '../../components/Text/index';
import { fonts } from '../../theme/fonts';
import { primaryColors, gradientColors } from '../../theme/colors';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import { confirmAccount } from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import analytics from '@react-native-firebase/analytics';


export default function Confirmation(props) {
    const loadings = useSelector(state => state.ui.isLoading);
    const confirmedAccount = useSelector(state => state.auth.confirmedAccount);
    const updated = useSelector(state => state.auth.updated);

    const [securePass, setSecurePass] = useState(true);
    const [password, setPassword] = useState(null);

    const dispatch = useDispatch();

    const confirmationHandler = useCallback(() => {
        dispatch(confirmAccount(fixNumbers(password)));
    }, [dispatch, password]);

    useEffect(() => {
        if (updated == 'yes') {
            if (!confirmedAccount) {
                props.navigation.navigate('Contact');
            } else {
                logAnEvent();
            }
        }
    }, [confirmedAccount, updated]);

    logAnEvent = async () => {
        await analytics().logEvent('confirmationCode', {
            confirmationCode: password
        });
    }

    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    function fixNumbers(str) {
        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(arabicNumbers[i], i);
            }
        }
        return str;
    };

    return (
        <View style={styles.container}>
            <View style={styles.imagesWraper}>
                <Image source={logo} style={styles.logo} />
                <Image source={tree} style={styles.tree} />
            </View>
            <Text
                children={`نظام أساس العقاري ${"\n"}تطبيق الملاك`}
                fontFamily={fonts.bold}
                fontSize={20}
                color={primaryColors.scarpaFlow}
                lineHeight={30}
                align='center'
            />
            <Text
                children={`يتيح لك متابعة حسابك لدى الوسيط${"\n"} العقاري إدارياَ ومالياَ`}
                fontFamily={fonts.regular}
                fontSize={18}
                color={primaryColors.scarpaFlow}
                lineHeight={30}
                align='center'
                mTop={deviceHeight() * 0.018}
            />
            <Text
                children='أدخل رمز  الاشتراك الخاص بك  '
                fontFamily={fonts.medium}
                fontSize={16}
                color={primaryColors.eclipse}
                lineHeight={30}
                style={styles.title}
            />
            <Input
                placeholder='• • • • • • • •'
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={securePass}
                containerStyle={styles.inputContainer}
                inputTxtStyle={styles.inputTxtStyle}
                leftIcon={eye}
                leftIconStyle={{ width: 20, height: 15 }}
                onLeftIconPress={() => setSecurePass(!securePass)}
            />
            <Button
                title='تسجيل الدخول'
                colors={[
                    gradientColors.chateauGreen, gradientColors.chateauGreen,
                    gradientColors.chateauGreen, gradientColors.feijoa
                ]}
                linearGradient={true}
                style={styles.btnContainer}
                onPress={() => {
                    confirmationHandler();
                }}
                disabled={loadings.includes('confirmAccount')}
            />
            <TouchableOpacity style={[styles.textWraper, styles.spacing]} onPress={() => props.navigation.navigate('Contact')}>
                <Text children='أنا لا أمتلك الرمز ؟' style={styles.textBtn} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.textWraper, styles.spacing]} onPress={() => props.navigation.navigate('Registration')}>
                <Text children='تسجيل حساب جديد' style={styles.textBtn} />
            </TouchableOpacity>
            {
                loadings.includes('confirmAccount') &&
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color={primaryColors.chateauGreen} />
                </View>
            }
            <View style={styles.screenBottom}>
                <Text style={styles.tailText}>Powerd By Asaas</Text>
                <Image source={tailLogo} style={styles.tailLogo} resizeMode='contain' />
            </View>
        </View>
    )
}