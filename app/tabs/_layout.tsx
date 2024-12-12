import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    const iconSize = 28;
    
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Job Postings',
                tabBarIcon: ({ color }) => <FontAwesome size={iconSize} name="briefcase" color={color} />,
                headerShown: false,
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                tabBarIcon: ({ color }) => <FontAwesome size={iconSize} name="user" color={color} />,
                headerShown: false,
            }}
        />
        </Tabs>
    );
}
