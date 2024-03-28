import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import styles from './Style';
import Header from '../../components/Header/index';
import Card from './components/Card';
import Input from '../../components/Input/index';
import { menu, realEstates, close, search } from '../../images/index';
import { useSelector, useDispatch } from 'react-redux';
import { getRealEstates } from '../../redux/actions/realEstates';
import { gradientColors, primaryColors } from '../../theme/colors';
import Text from '../../components/Text/index';
import analytics from '@react-native-firebase/analytics';

export default function RealEstates(props) {

    const token = useSelector(state => state.auth.token);
    const realEstate = useSelector(state => state.realEstates.realEstates);
    const loadings = useSelector(state => state.ui.isLoading);
    const userInfo = useSelector(state => state.auth.userInfo);

    const [initial, setInitial] = useState('');
    const [estates, setEstates] = useState('');
    const [searchTxt, setSearchTxt] = useState('');

    const dispatch = useDispatch();

    const realEstatesHandler = useCallback(() => {
        dispatch(getRealEstates(token));
    }, [dispatch]);

    useEffect(() => {
        realEstatesHandler();
    }, []);

    useEffect(() => {
        console.log('realEstate effect: ', realEstate)
        if (realEstate) {
            setInitial(realEstate.properties);
            setEstates(realEstate.properties);
        }
    }, [realEstate]);

    async function filter(searchedText) {
        // setSearchTxt(searchedText);
        await analytics().logEvent('search_in_Estates', {
            userEmail: userInfo.profile.User.email,
            search_text: searchTxt
        });

        const newData = initial.filter((data) => {
            const name = data.propertyName.toLowerCase()
            const text = searchedText.toLowerCase()
            return name.indexOf(text) > -1
        })
        setEstates(newData);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Header
                leftButton={menu}
                title='العقارات'
                headerStyle={styles.headerStyle}
                menuBtn
                onMenuPress={() => props.navigation.openDrawer()}
            />
            <Input
                containerStyle={[styles.searchInput, styles.shadow]}
                placeholder='إبحث باسم العقار'
                onChangeText={(value) => setSearchTxt(value)}
                value={searchTxt}
                // leftIcon={searchTxt ? close : search}
                leftIcon={search}
                leftIconStyle={styles.closehIcon}
                activeOpacity={0.5}
                inputTxtStyle={styles.inputText}
                // onLeftIconPress={() => { searchTxt && filter('') }}
                onLeftIconPress={() => { filter(searchTxt) }}
            />
            {
                loadings.includes('realEstates') ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={primaryColors.chateauGreen} />
                    </View>
                    :
                    estates && estates.length > 0 ?
                        <FlatList
                            data={estates}
                            style={styles.flatList}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={({ item, index }) => {
                                return (
                                    <Card
                                        activeOpacity={0.6}
                                        title={item.propertyName}
                                        address={item.propertyAddress}
                                        type={item.propertyType}
                                        rented={item.rentedUnitsCount}
                                        empty={item.freeUnitsCount}
                                        mainIcon={realEstates}
                                        colors={['#2dc897', '#7ef192']}
                                        containerStyle={styles.cardContainer}
                                        circleStyle={styles.circleStyle}
                                        onPress={() => props.navigation.navigate('RealEstateDetails', {
                                            id: item.propertyId
                                        })}
                                    />
                                );
                            }}
                        />
                        :
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text children='لا يوجد بيانات بعد' fontSize={20} align='center' />
                        </View>
            }
        </View>
    );
}
