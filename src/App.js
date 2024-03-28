import React, { useEffect, useCallback, useState } from 'react';
import {
    StatusBar, ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthData } from './redux/actions/auth';
import SplashScreen from 'react-native-splash-screen';
import { deviceHeight } from './lib/utility';
import analytics from '@react-native-firebase/analytics';

import { IntroStacks, ConfirmationStacks, AuthStacks, AppStacks, DrawerStacks } from '../src/navigation/index';

function App() {
    const token = useSelector(state => state.auth.token);
    const stopSplash = useSelector(state => state.auth.stopSplash);
    const appIntro = useSelector(state => state.auth.appIntro);
    const confirmedAccount = useSelector(state => state.auth.confirmedAccount);

    const [appIntroSlide, setAppIntroSlide] = useState(appIntro);

    const dispatch = useDispatch();

    const appIntroHandler = useCallback(() => {
        dispatch(getAuthData());
    }, [dispatch]);

    useEffect(() => {
        appIntroHandler();
    }, []);

    useEffect(() => {
        setAppIntroSlide(appIntro);
    }, [appIntro])

    useEffect(() => {
        if (stopSplash) {
            SplashScreen.hide();
        }
    }, [stopSplash]);

    console.log('confirmedAccount: ', token, appIntroSlide, confirmedAccount)

    function getActiveRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        // dive into nested navigators
        if (route.routes) {
            return getActiveRouteName(route);
        }

        return route.routeName;
    }



    if (appIntroSlide || !confirmedAccount) {
        return (
            appIntroSlide ? <IntroStacks /> : <ConfirmationStacks />
        )
    } else {
        return (
            <>
                {token !== null ? <DrawerStacks
                    onNavigationStateChange={async (prevState, currentState) => {
                        const currentRouteName = getActiveRouteName(currentState);
                        const previousRouteName = getActiveRouteName(prevState);

                        console.log('previousRouteName: ', previousRouteName)
                        console.log('currentRouteName: ', currentRouteName)

                        if (previousRouteName !== currentRouteName) {
                            // the line below uses the @react-native-firebase/analytics tracker
                            // change the tracker here to use other Mobile analytics SDK.
                            console.log('currentRouteName yes: ', currentRouteName)
                            await analytics().logScreenView({
                                screen_name: currentRouteName,
                                screen_class: currentRouteName
                            });
                        }
                    }}
                /> : <AuthStacks
                    onNavigationStateChange={async (prevState, currentState) => {
                        const currentRouteName = getActiveRouteName(currentState);
                        const previousRouteName = getActiveRouteName(prevState);

                        if (previousRouteName !== currentRouteName) {
                            // the line below uses the @react-native-firebase/analytics tracker
                            // change the tracker here to use other Mobile analytics SDK.
                            console.log('currentRouteName: ', currentRouteName)
                            await analytics().logScreenView({
                                screen_name: currentRouteName,
                                screen_class: currentRouteName
                            });
                        }
                    }}
                />}
            </>
        );
    }
};

export default App;
