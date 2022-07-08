/**
 * @format
 */
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import {
    NavigationContainer,
} from '@react-navigation/native';
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from '@stripe/stripe-react-native';
import App from './src/routes';
// import App from './src/testComponents/agenda';
// import { CloseSuccess as App } from './src/modules/p4m8/account/closeSucces';
import { name as appName } from './app.json';
import linking from './src/routes/linking';

const Main = () => {
    return (
        <NavigationContainer linking={linking} >
            <App />
        </NavigationContainer>
    );
}

const Root = () => {
    // LogBox.ignoreAllLogs()
    return (
        <StripeProvider
            publishableKey="pk_test_l3zfS6QogXpJbCv2pNFyEh4F00zW84dE12" >
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Main />
                </PersistGate>
            </Provider>
        </StripeProvider>
    );
}

AppRegistry.registerComponent(appName, () => Root);
