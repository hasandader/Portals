import React, { useCallback, useEffect, useState } from 'react';
import { View, ImageBackground, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import {
    user, close, logout, menuBack
} from '../../images/index';
import { fonts } from '../../theme/fonts';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/auth';

export default function Drawer(props) {

    const userInfo = useSelector(state => state.auth.userInfo);

    const dispatch = useDispatch();

    const logoutHandler = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    return (
        <ImageBackground source={menuBack} style={{ flex: 1 }}>
            <SafeAreaView />
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                <Image source={close} style={styles.close} />
            </TouchableOpacity>
            <View style={styles.subContainer}>
                <View style={styles.infoWraper}>
                    <View style={styles.info}>
                        <Text
                            children={userInfo && userInfo.profile.User.real_name}
                            fontFamily={fonts.bold}
                            fontSize={20}
                            color={'white'}
                            ellipsizeMode='tail'
                            numberOfLines={1}
                        />
                        <Text
                            children={userInfo && userInfo.profile.User.email}
                            fontFamily={fonts.medium}
                            fontSize={16}
                            color={'white'}
                        />
                    </View>
                    {
                        userInfo && userInfo.profile.User.image ?
                            <Image source={{ uri: userInfo.profile.User.image }}
                                style={styles.profileImage} />
                            :
                            <View style={styles.profileImage}>
                                <Image source={user}
                                    style={{ width: 39, height: 39 }} resizeMode='contain' />
                            </View>
                    }
                </View>
                <TouchableOpacity style={styles.rowBtn} onPress={() => props.navigation.navigate('Renter', {
                    parent: 'Drawer'
                })}>
                    <Text
                        children='بيانات المالك الشخصية '
                        fontFamily={fonts.medium}
                        fontSize={18}
                        color='white'
                    />
                    <Image source={user} style={styles.userIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitRow} onPress={() => logoutHandler()}>
                    <Text
                        children='تسجيل الخروج '
                        fontFamily={fonts.medium}
                        fontSize={18}
                        color='white'
                    />
                    <Image source={logout} style={styles.logout} />
                </TouchableOpacity>
            </View>
            {/* <DrawerItems {...props} /> */}
        </ImageBackground>
    );
}
