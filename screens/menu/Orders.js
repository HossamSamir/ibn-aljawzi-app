import React from 'react';
import { Text, StyleSheet, View } from "react-native";
import { Table, Row, Rows} from 'react-native-table-component';

export default class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*
                method
                    0: shipping
                    1: get from branch

                status
                    0: pending
                    1: approved
                    2: received

            */
            /*
                NOTICE 1: send this as arrays in an array, no objects here
                NOTICE 2: FOR API LOOK AT THIS
                SEND THE LAST 2 COLUMNS AS INTEGERS NOT STRINGS
                WE WILL CONVERT TO STRING INSIDE THE APP (WITH GetMethodAsStr and GetStatusAsStr), NOT ON THE SERVER
                NOTICE 3: DO NOT SEND ORDERS WITH STATUS = 2 (AKA ALREADY RECEIVED BY CUSTOMER)
            orders: [
                ["Book name",       1,      0],
                ["Book name",       0,      1],
                ["Book name",       1,      0],
                ["Book name",       1,      2],
                ["Book name",       1,      0],
                ["Book name",       0,      1],
                ["Book name",       1,      1],
                ["Book name",       0,      0],
                ["Book name",       1,      0],
                ["Book name",       1,      1],
            ],*/
            orders: [
                ["Book name",       "Shipping",                 "Pending"],
                ["Book name",       "Get from branch",          "Approved"],
                ["Book name",       "Shipping",                 "Pending"],
                ["Book name",       "Get from branch",          "Approved"],
                ["Book name",       "Shipping",                 "Pending"],
                ["Book name",       "Get from branch",          "Approved"],
                ["Book name",       "Get from branch",          "Approved"],
                ["Book name",       "Shipping",                 "Pending"],
                ["Book name",       "Get from branch",          "Pending"],
                ["Book name",       "Shipping",                 "Approved"],
            ],
        }
    }
    _keyExtractor = (item, index) => item.id;

    GetMethodAsStr = (method) => {
        return (
            (method == 0) ? ("Shipping") : ("From branch")
        );
    };

    GetStatusAsStr = (status) => {
        switch(status)
        {
            case 0:
                return ("Pending");
            case 1:
                return ("Approved");
            case 2:
                return ("Received");
        }
    };

    static navigationOptions = {
        title: "My orders"
    };

    render() {

        return (
            <View style={{ backgroundColor: '#FCFFFD', height: '100%' }}>
                <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>My orders</Text>
                <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#63BA83'}}>
                    <Row data={["Name", "Delivery type", "Status"]} style={styles.head} textStyle={styles.headText} flexArr={[2, 2, 1]}/>
                    <Rows data={this.state.orders} style={styles.row} textStyle={styles.text} flexArr={[2, 2, 1]}/>
                </Table>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    table: { flex:1, marginTop:20 },
    head: { height: 40, backgroundColor: '#B6E3C6' },
    headText: { textAlign: 'center', color: '#126330' },
    text: { textAlign: 'center', color: '#104A25' },
    row: { height: 30, backgroundColor: '#F5FAF7' }
});
