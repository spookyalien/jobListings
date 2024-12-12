import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [user, setUser] = useState("");
    const iconSize = 18;
  
    const handleLogin = () => {
        setIsLoggedIn(true); 
    };

    return (
        <View style={styles.container}>
            {!isLoggedIn ? (
            <>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Username"
                    onChangeText={(user) => setUser(user)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    secureTextEntry={true}
                />
                <View style={styles.loginButton}>
                    <Button title="Log In" onPress={handleLogin} />
                </View>
            </>
            ) : (
                <View style={styles.profileContainer}>
                    <FontAwesome size={80} name="user"/>
                    <Text style={styles.profileName}>{user}</Text>

                    <View style={styles.settingsContainer}>
                        <Text style={styles.title}>Profile Information</Text>
                        <TouchableOpacity style={styles.settingOption}>
                            <FontAwesome size={iconSize} name="id-card" style={styles.icon}/> 
                            <Text style={styles.settingText}>Personal Information</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingOption}>
                            <FontAwesome size={iconSize} name="lock" style={styles.icon}/> 
                            <Text style={styles.settingText}>Security</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingOption}>
                            <FontAwesome size={iconSize} name="bell" style={styles.icon}/> 
                            <Text style={styles.settingText}>Manage Notifications</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingOption}>
                            <FontAwesome size={iconSize} name="shield" style={styles.icon}/> 
                            <Text style={styles.settingText}> Privacy Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingOption}>
                            <FontAwesome size={iconSize} name="arrow-circle-o-right" style={styles.icon}/> 
                            <Text style={styles.settingText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '50%',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    loginButton: {
        width: '50%',  
    },
    profileContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, 
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    settingsContainer: {
        width: '100%',
    },
    settingOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:"flex-start",
    },
    settingText: {
        fontSize: 16,
        color: '#333',  
    },
    icon: {
        width: 20,  
        height: 20,  
        marginRight: 10,
        flexDirection: 'row', 
    }
});