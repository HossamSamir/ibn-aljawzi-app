import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

//import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';

export default class Categories extends React.Component {

    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch('https://ca235020.ngrok.io/api/categories').then((res) => res.json()).then((resJson) => {
            this.setState({mainCats: resJson});
        })
        .then(() => {
          this.setState({doneFetching: true})
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            doneFetching: false,
            mainCats: [
                /*{id: 0, name: 'Top selling'},
                {id: 1, name: 'Trending'},
                {id: 2, name: 'Soulful'},
                {id: 3, name: 'History'},
                {id: 4, name: 'Entertainment'},*/
            ],
        }
    }
    _keyExtractor = (item, index) => item.id;

    /*static navigationOptions = {
        header: <Header />
    };*/

  render() {
    if(!this.state.doneFetching)
        return (<LoadingIndicator size="large" color="#B6E3C6" />);

    return (
        <View style={styles.container}>
            <FlatList
              style={{ flexDirection: 'column' }}
              numColumns={2}
              data = {this.state.mainCats}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 13, marginHorizontal: 10 }}>
                      <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Category', {main_cat_id: item.id, cat_name: item.name})}}
                        style={{ flex: 1, flexDirection: 'row', backgroundColor: '#106234', paddingVertical: 12, paddingHorizontal: 10,  borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: 'white', backgroundColor:'transparent', fontSize: 13, fontWeight: 'bold' }}>{item.name.toUpperCase()}</Text>
                      </TouchableOpacity>
                  </View>
              )} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
});
