import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({setIsLoggedIn}:{setIsLoggedIn: (value: boolean) => void}) {
      const navigation = useNavigation()
    
    const activeUsers =  87
    const inActiveUsers = 48

    const widthAndHeight = 250
    const series = [
        { value: activeUsers, color: '#fbd203', label: { text: 'Active', fontWeight: 'bold' } },
        { value: inActiveUsers, color: '#ff6c00',label: { text: 'InActive', fontWeight: 'bold' } },
    ]
const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
const headerRight = () => (
        <Button
          title="Logout"
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: handleLogout },
              ]
            )
          }
        />
      )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

    return (
        <View style={styles.container}>
        <Card>
            <Card.Content>
                <Text variant="titleLarge">Active users: {activeUsers}</Text>
                <Text variant="titleLarge">InActive users: {inActiveUsers}</Text>
                <View style={styles.pieChartContainer}>
                     <PieChart widthAndHeight={widthAndHeight} series={series} />
                </View>
               
            </Card.Content>

        </Card>
        </View>)
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pieChartContainer: {marginTop: 16}
})
export default Home;