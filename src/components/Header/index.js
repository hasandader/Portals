import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image, ImageBackground, View } from 'react-native';
import styles from './Style';
import { header, menu, leftArrow } from '../../images/index';
import Text from '../Text/index';
import { isPlatformAndroid } from '../../lib/utility';

const Header = (props) => {
    const {
        back,
        leftIcon,
        title,
        onBack,
        headerStyle,
        bottom,
        titleStyle,
        menuBtn,
        onMenuPress
    } = props;

    return (
        <View style={styles.header}>
            <ImageBackground source={header} style={[styles.backgroundImage, (back || menuBtn) && { justifyContent: 'space-between' }, headerStyle, isPlatformAndroid() && styles.shadow]} resizeMode='stretch'>
                {
                    back ? <TouchableOpacity style={styles.leftBtn} onPress={onBack}>
                        <Image source={leftArrow} style={[styles.leftIcon, leftIcon]} resizeMode='contain' />
                    </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.leftMenu} onPress={onMenuPress}>
                            <Image source={menu} style={[styles.menu, leftIcon]} resizeMode='contain' />
                        </TouchableOpacity>
                }
                <Text children={title} style={[styles.title, titleStyle]} numberOfLines={1} ellipsizeMode='tail' />
            </ImageBackground>
            {bottom && <View style={[styles.headerBottom, styles.shadow]}>{bottom}</View>}
        </View>
    )
}

Header.propTypes = {
    leftIcon: PropTypes.object,
    title: PropTypes.string,
    onBack: PropTypes.func,
    headerStyle: PropTypes.any
}

export default Header