import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import Clipboard from '@react-native-clipboard/clipboard';

const App = ({ navigation }) => {
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    try {
      let token = await messaging().getToken();
      setDeviceToken(token);

      // Display the token in the console
      console.log('Device Token:', token);
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };

  const copyTokenToClipboard = () => {
    if (deviceToken) {
      Clipboard.setString(deviceToken);
      Alert.alert('Token Copied', 'Device token has been copied to clipboard.');
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived in foreground',
        JSON.stringify(remoteMessage)
      );
    });

    return unsubscribe;
  }, []);

  return (  
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Super App</Text>
        <TouchableOpacity onPress={copyTokenToClipboard}>
          <Text style={styles.copyButton}>Copy Token</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>Welcome to Push Notification</Text>
      {deviceToken && (
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>Device Token:</Text>
          <Text style={styles.token}>{deviceToken}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  copyButton: {
    fontSize: 16,
    color: 'blue',
  },
  content: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  tokenContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 16,
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  token: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default App;

