import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTeamAvailability from '../../screen/projectMangement/MyTeam/MyTeamAvailability';
import ProjectManagement from '../../screen/projectMangement/ProjectManagement';
import ProjectManagementDetails from '../../screen/projectMangement/ProjectManagementDetails';
import NavString from '../../utils/NavString';

const Stack = createNativeStackNavigator();

function ProjectMStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name={NavString.PROJECT_MANAGEMENT} component={ProjectManagement} options={{ headerShown: false }} />
            <Stack.Screen name={NavString.MY_TEAM_AVAILABILITY} component={MyTeamAvailability} options={{ headerShown: false }} />
            <Stack.Screen name={NavString.PROJECT_MANAGEMENTS_DETAILS} component={ProjectManagementDetails} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
}

export default ProjectMStack

