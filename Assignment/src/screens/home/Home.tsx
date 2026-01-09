import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONSTANTS, COLORS } from '../../utils/constants';

function Home({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {
    const navigation = useNavigation()

    const activeUsers = 87
    const inActiveUsers = 48
    const widthAndHeight = 250

    const series = [
        { value: activeUsers, color: COLORS.YELLOW, label: { text: APP_CONSTANTS.ACTIVE, fontWeight: 'bold' } },
        { value: inActiveUsers, color: COLORS.ORANGE, label: { text: APP_CONSTANTS.IN_ACTIVE, fontWeight: 'bold' } },
    ]

    const { LOGOUT, ARE_YOU_SURE, CANCEL, ACTIVE_USERS, IN_ACTIVE_USERS } = APP_CONSTANTS

    const handleLogout = async () => {
        await AsyncStorage.removeItem(APP_CONSTANTS.IS_USER_LOGGED_IN);
        setIsLoggedIn(false);
    };

    const headerRight = () => (
        <Button
            title={LOGOUT}
            onPress={() =>
                Alert.alert(
                    LOGOUT,
                    ARE_YOU_SURE,
                    [
                        { text: CANCEL, style: 'cancel' },
                        { text: LOGOUT, onPress: handleLogout },
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
                    <Text variant="titleLarge">{ACTIVE_USERS} {activeUsers}</Text>
                    <Text variant="titleLarge">{IN_ACTIVE_USERS} {inActiveUsers}</Text>
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
    pieChartContainer: { marginTop: 16 }
})
export default Home;