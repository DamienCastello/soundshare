import 'react-native-gesture-handler';

import CreateResourcesForm from './screens/drawerScreens/ResourcesForm';
import ResourceShow from './screens/resourceShow';
import CreateTracksForm from './screens/drawerScreens/TracksForm';
import TrackShow from './screens/trackShow';
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import SplashScreen from './screens/splash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{
            title: 'Log In', //Set Header Title
            headerStyle: {
              backgroundColor: '#647a8f', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
        }}/>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#647a8f', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateResourcesScreen"
          component={CreateResourcesForm}
          // Hiding header for Navigation Drawer
          options={{headerShown: true, headerStyle: {
            backgroundColor: '#3f87a6',
          },
          headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="CreateTracksScreen"
          component={CreateTracksForm}
          // Hiding header for Navigation Drawer
          options={{headerShown: true, headerStyle: {
            backgroundColor: '#3f87a6',
          },
          headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="ResourceShow"
          component={ResourceShow}
          options={{headerShown: true, headerStyle: {
            backgroundColor: '#3f87a6',
          },
          headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="TrackShow"
          component={TrackShow}
          options={{headerShown: true, headerStyle: {
            backgroundColor: '#3f87a6',
          },
          headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;