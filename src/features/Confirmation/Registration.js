import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './Style';
import { logo, tree, backBtn, tailLogo, done } from '../../images/index';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import Text from '../../components/Text/index';
import { deviceHeight, deviceWidth, isPlatformIos } from '../../lib/utility';
import { fonts } from '../../theme/fonts';
import { primaryColors, gradientColors } from '../../theme/colors';
import Fire from '../../../Fire';
import analytics from '@react-native-firebase/analytics';

export default function Registration(props) {

    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [activity, setActivity] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
        if (status == 'success') {
            props.navigation.navigate('Contact', {
                registrationStatus: 'success'
            })
        }
    }, [status]);

    function onLoad() {
        setIsLoading(false);
    }

    function operationStatus(stat) {
        setStatus(stat);
    }

    function onBackdropPress() {
        setTimeout(() => {
            props.navigation.goBack()
            setUserName('');
            setPhone('');
            setIdNumber('');
            setEmail('');
            setActivity('');
            setError('');
        }, 500);
        setStatus('');

    }

    async function onSend() {
        if (userName && phone && idNumber && email && activity) {
            Fire.setUser({ name: userName, phone, idNumber, email, activity }, onLoad, operationStatus);
            setIsLoading(true);
            setError('');
        } else {
            setError('قم بتعبئة البيانات الفارغة.')
        }

        await analytics().logEvent('newRegistration', {
            name: userName,
            phone: phone,
            idNumber: idNumber,
            email: email
        });

    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={isPlatformIos() ? 'position' : 'position'} keyboardVerticalOffset={isPlatformIos() && - deviceHeight() * 0.18}>
            <TouchableOpacity style={[styles.backBtn, { marginBottom: 0 }]} onPress={() => { props.navigation.goBack() }}>
                <Image source={backBtn} style={{ width: deviceWidth() * 0.048, height: deviceHeight() * 0.015 }} />
            </TouchableOpacity>
            <View style={[styles.imagesWraper, { marginTop: 0 }]}>
                <Image source={logo} style={styles.logo} />
                <Image source={tree} style={styles.tree} />
            </View>
            <Text
                children={`للحصول  على نسخة  خاصة بك يرجى تعبئة${"\n"} النموذج التالي`}
                fontFamily={fonts.regular}
                fontSize={18}
                color={primaryColors.scarpaFlow}
                lineHeight={25}
                align='center'
                mTop={deviceHeight() * 0.018}
            />
            <Input
                placeholder='إسم المستخدم'
                onChangeText={(value) => setUserName(value)}
                value={userName}
                containerStyle={[styles.inputContainer, styles.inputSpacing]}
                inputTxtStyle={styles.inputTxt}
            />
            <Input
                placeholder='رقم الجوال'
                onChangeText={(value) => setPhone(value)}
                value={phone}
                containerStyle={[styles.inputContainer, styles.inputSpacing]}
                inputTxtStyle={styles.inputTxt}
            />
            <Input
                placeholder='رقم الهوية'
                onChangeText={(value) => setIdNumber(value)}
                value={idNumber}
                containerStyle={[styles.inputContainer, styles.inputSpacing]}
                inputTxtStyle={styles.inputTxt}
            />
            <Input
                placeholder='الايميل'
                onChangeText={(value) => setEmail(value)}
                value={email}
                containerStyle={[styles.inputContainer, styles.inputSpacing]}
                inputTxtStyle={styles.inputTxt}
            />
            <Input
                placeholder='النشاط'
                onChangeText={(value) => setActivity(value)}
                value={activity}
                containerStyle={[styles.inputContainer, styles.inputSpacing]}
                inputTxtStyle={styles.inputTxt}
            />
            <Button
                title='إرسال'
                colors={[
                    gradientColors.chateauGreen, gradientColors.chateauGreen,
                    gradientColors.chateauGreen, gradientColors.feijoa
                ]}
                linearGradient={true}
                style={styles.btnContainer}
                onPress={onSend}
                disabled={isLoading}
            />
            {
                error != '' &&
                <Text
                    children={error}
                    style={styles.errorTxt}
                />
            }

            {
                isLoading &&
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color={primaryColors.chateauGreen} />
                </View>
            }

            {/* <Modal isVisible={status == 'success'}
                style={styles.modalStyle}
                onBackdropPress={onBackdropPress}
                backdropOpacity={0.3}
                animationIn='zoomIn'
                animationOut='zoomOut'
            >
                <View style={styles.modalContent}>
                    <Image source={done} style={styles.modalImage} />
                    <Text
                        children='تم ارسال طلبكم بنجاح سيتم التواصل معكم  بأقرب وقت'
                        color={primaryColors.scarpaFlow}
                        fontSize={18}
                        align='center'
                    />
                </View>
            </Modal> */}
            <View style={[styles.screenBottom, styles.btnSpacing]}>
                <Text style={styles.tailText}>Powerd By Asaas</Text>
                <Image source={tailLogo} style={styles.tailLogo} resizeMode='contain' />
            </View>
        </KeyboardAvoidingView>
    )
}