import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';


const App = ({ navigation }) => {
  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    try {
      let token = await messaging().getToken();
      console.log(token);
    } catch (error) {
      console.error('Error getting device token:', error);
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
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          {/* <AntDesign name='down' size={50} color="black" /> */}
          
        
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>Welcome to Push Notification</Text>
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
  content: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default App;
