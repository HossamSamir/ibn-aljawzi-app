import React from 'react';
import { AsyncStorage, Text, StyleSheet, View } from "react-native";
import { Table, Row, Rows} from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';

import MenuBackButton from './MenuBackButton'
import LoadingIndicator from '../../components/LoadingIndicator';

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
                WE WILL CONVERT TO STRING INSIDE THE APP (WITH getMethodAsStr and getStatusAsStr), NOT ON THE SERVER
                NOTICE 3: DO NOT SEND ORDERS WITH STATUS = 2 (AKA ALREADY RECEIVED BY CUSTOMER)*/
            doneFetching: false,
            orders: [/*
                ["Book name",       1,      0],
                ["Book name",       0,      1],
                ["Book name",       1,      0],
                ["Book name",       1,      2],
                ["Book name",       1,      0],
                ["Book name",       0,      1],
                ["Book name",       1,      1],
                ["Book name",       0,      0],
                ["Book name",       1,      0],
                ["Book name",       1,      1],*/
            ],
        }
    }

    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        AsyncStorage.getItem('login').then(
            (logged) => {
                if(logged == '1')
                {
                    AsyncStorage.getItem('userid').then(
                        (userid) => {

                            fetch(`https://ecd1cd47.ngrok.io/api/orders?user_id=${userid}`, { headers: { 'Cache-Control': 'no-cache' } }).then((res) => res.json()).then((resJson) => {
                                if(resJson.status == 1)
                                {
                                    var arr = [];
                                    resJson.orders.map((orderArr, index) => {
                                        arr.push([orderArr[0], this.getMethodAsStr(orderArr[1]), this.getStatusAsStr(orderArr[2])]);
                                    });
                                    this.setState({orders: arr});
                                    this.setState({myOrdersStatus: 1});
                                }
                                else
                                {
                                    this.setState({myOrdersStatus: 0});
                                }
                            })
                            .then(() => {
                              this.setState({doneFetching: true})
                            });
                        }
                    );
                }
                else
                    this.setState({myOrdersStatus: 0});
            }
        );
    }

    _keyExtractor = (item, index) => item.id;

    getMethodAsStr = (method) => {
        return (
            (method == 0) ? ("Shipping") : ("From branch")
        );
    };

    getStatusAsStr = (status) => {
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
        if(!this.state.doneFetching)
            return (<LoadingIndicator size="large" color="#B6E3C6" />);

        if(this.state.myOrdersStatus == 1)
        {
            return (
                <View style={{ backgroundColor: '#FCFFFD', height: '100%' }}>
                    <MenuBackButton navigation={this.props.navigation} />

                    <Text style={{ color: '#0E142A', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>My orders</Text>
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#63BA83'}}>
                        <Row data={["Name", "Delivery type", "Status"]} style={styles.head} textStyle={styles.headText} flexArr={[2, 2, 1]}/>
                        <Rows data={this.state.orders} style={styles.row} textStyle={styles.text} flexArr={[2, 2, 1]}/>
                    </Table>
               </View>
              );
        }
        else
        {
            return(
                <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <MenuBackButton navigation={this.props.navigation} />
                    
                    <Text style={{color: '#106234', fontSize: 22}}>No orders by you</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    table: { flex:1, marginTop:20 },
    head: { height: 40, backgroundColor: '#B6E3C6' },
    headText: { textAlign: 'center', color: '#126330' },
    text: { textAlign: 'center', color: '#104A25' },
    row: { height: 30, backgroundColor: '#F5FAF7' }
});
