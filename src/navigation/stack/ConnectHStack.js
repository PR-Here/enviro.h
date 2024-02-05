import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavString from '../../utils/NavString';
import ConnectHTab from '../../screen/connect.h/ConnectHTab';
import ProjectConnectsDetails from '../../screen/connect.h/ProjectConnectsDetails';

const Stack = createNativeStackNavigator();

function ConnectHStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={NavString.CONNECT_TAB} component={ConnectHTab} options={{ headerShown: false }} />
            <Stack.Screen name={NavString.PROJECT_DETAILS} component={ProjectConnectsDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default ConnectHStack

