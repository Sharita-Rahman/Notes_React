import 'react-native-gesture-handler';
import Home from './src/Home';
import NoteAdd from './src/NoteAdd';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/Header';
import Detail from './src/Details';
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { AuthProvider, AuthContext } from "./src/providers/AuthProviders";


// const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: ()=> <Header name="Notes"/>,
            headerStyle :{
              backgroundColor: '#195190FF',
              height:120,
            }
          }}
        />
        <HomeStack.Screen
          name="NoteAdd"
          component={NoteAdd}
          options={{
            headerTitle: ()=> <Header name="Add Notes"/>,
            headerStyle :{
              backgroundColor: '#195190FF',
              height:120,
            }
          }}
        />
        
        <HomeStack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTitle: ()=> <Header name="Edit Notes"/>,
            headerStyle :{
              backgroundColor: '#195190FF',
              height:120,
            }
          }}
          />
      </HomeStack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignUp">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>{
            auth.isLoggedIn ? <HomeStackScreen /> : <AuthStackScreen />
            }
            </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}


