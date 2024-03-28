import React, { useCallback } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import styles from './Style';
import { logo, tree, backBtn, tailLogo, done } from '../../images/index';
import Button from '../../components/Button/index';
import Text from '../../components/Text/index';
import { deviceHeight, deviceWidth } from '../../lib/utility';
import { fonts } from '../../theme/fonts';
import { primaryColors, gradientColors } from '../../theme/colors';
import { setConfirmedAccount } from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import analytics from '@react-native-firebase/analytics';

export default function Contact(props) {

    const registrationStatus = props.navigation.state.params && props.navigation.state.params.registrationStatus;

    const dispatch = useDispatch();

    const confirmationHandler = useCallback(() => {
        dispatch(setConfirmedAccount(false, 'no'));
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => { confirmationHandler(); props.navigation.goBack() }}>
                <Image source={backBtn} style={{ width: deviceWidth() * 0.048, height: deviceHeight() * 0.015 }} />
            </TouchableOpacity>
            <View style={[styles.imagesWraper, { marginTop: 0 }]}>
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
            {
                registrationStatus == 'success' ?
                    <View style={styles.modalContent}>
                        <Image source={done} style={styles.modalImage} />
                        <Text
                            children='تم ارسال طلبكم بنجاح سيتم التواصل معكم  بأقرب وقت'
                            color={primaryColors.scarpaFlow}
                            fontSize={18}
                            align='center'
                        />
                    </View>
                    :
                    <>
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
                            children='يمكنك الحصول على رمز الاشتراك من خلال '
                            fontFamily={fonts.bold}
                            fontSize={14}
                            color={primaryColors.apple}
                            lineHeight={30}
                            align='center'
                            mTop={deviceHeight() > 812 ? deviceHeight() * 0.05 : deviceHeight() * 0.01}
                        />
                    </>}
            <View style={styles.box}>
                <Text
                    children='التواصل عبر البريد الإلكتروني الخاص بأساس'
                    fontFamily={fonts.regular}
                    fontSize={14}
                    color={primaryColors.eclipse}
                    lineHeight={24}
                />
                <TouchableOpacity style={styles.underline}
                    onPress={async () => {
                        Linking.openURL('mailto:customercare@asaas.rent');

                        await analytics().logEvent('contactByEmail', {
                            contact: 'by email'
                        });
                    }}>
                    <Text
                        children='customercare@asaas.rent'
                        style={styles.test}
                        fontFamily={fonts.bold}
                        fontSize={16}
                        color={primaryColors.eclipse}
                        lineHeight={24}
                        mTop={deviceHeight() * 0.02}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.box, styles.boxAlignment]}>
                <Text
                    children='أو التواصل مع فريق الدعم الفني الخاص بنا '
                    fontFamily={fonts.regular}
                    fontSize={14}
                    color={primaryColors.eclipse}
                    lineHeight={24}
                />
                <TouchableOpacity style={styles.underline} onPress={async () => {
                    Linking.openURL('tel:+966 920033023');

                    await analytics().logEvent('contactByPhone', {
                        contact: 'by phone'
                    });
                }}>
                    <Text
                        children='+966 920033023'
                        style={styles.test}
                        fontFamily={fonts.bold}
                        fontSize={16}
                        color={primaryColors.eclipse}
                        lineHeight={24}
                        mTop={deviceHeight() * 0.02}
                    />
                </TouchableOpacity>
            </View>
            {
                registrationStatus == 'success' ?
                    <Button
                        title='الإنتقال الى الرئيسية'
                        colors={[
                            gradientColors.chateauGreen, gradientColors.chateauGreen,
                            gradientColors.chateauGreen, gradientColors.feijoa
                        ]}
                        linearGradient={true}
                        style={styles.btnContainer}
                        onPress={() => props.navigation.popToTop()}
                    />
                    :
                    <TouchableOpacity style={[styles.textWraper, { alignSelf: 'center' }]} onPress={() => props.navigation.navigate('Registration')}>
                        <Text children='تسجيل حساب جديد' style={styles.textBtn} />
                    </TouchableOpacity>
            }

            <View style={[styles.screenBottom, styles.btnSpacing]}>
                <Text style={styles.tailText}>Powerd By Asaas</Text>
                <Image source={tailLogo} style={styles.tailLogo} resizeMode='contain' />
            </View>
        </View>
    )
}