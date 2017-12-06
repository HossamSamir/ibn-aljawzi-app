import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

//import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';

// API: send this.props.navigation.state.params.sub_cat_id to the server, and receive this.state.booksOfSubCat

export default class subCategory extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch('https://ca235020.ngrok.io/api/books_of_subcat?sub_cat_id='+this.props.navigation.state.params.sub_cat_id).then((res) => res.json()).then((resJson) => {
            this.setState({booksOfSubCat: resJson});
        })
        .then(() => {
          this.setState({doneFetching: true})
        })
    }

    constructor(props) {
        super(props);
        this.state = {
                doneFetching: false,
                booksOfSubCat: [
                    /*{id: 0, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 0},
                    {id: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 1},
                    {id: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 2},
                    {id: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 3},
                */],
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
            <Text style={{ marginLeft: 12, marginTop: 4, fontWeight: 'bold', color: '#555555', fontSize: 20 }}>
                {this.props.navigation.state.params.sub_cat_name.toUpperCase()}
            </Text>

            <FlatList
              style={{ flexDirection: 'column' }}
              numColumns={3}
              data = {this.state.booksOfSubCat}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity onPress={ () => {
                        this.props.navigation.navigate('Book', {book_ID: item.id, book_photo: item.book_photo, book_name: item.book_name, author_name: item.author_name})
                      }}>
                          <OneBookCard id={item.id} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                      </TouchableOpacity>
                  </View>
              )} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
