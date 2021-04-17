import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../pages/Preload';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Read from '../pages/Read';
import LocateBook from '../pages/LocateBook';

const Stack = createStackNavigator();

function Routes(){
    return(
        <Stack.Navigator
            initialRouteName="Preload"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Read" component={Read} />
            <Stack.Screen name="LocateBook" component={LocateBook} />
        </Stack.Navigator>
    );
};

export default Routes;