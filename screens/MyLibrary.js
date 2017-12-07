import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//import Header from '../components/Header';
import OneBookCard from '../components/OneBookCard';
import LoadingIndicator from '../components/LoadingIndicator';

export default class MyLibrary extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    // just for testing, we will put user_id=1 ... this will be set on SIGN IN later
    doTheFetching() {
        fetch('https://ca235020.ngrok.io/api/show-my-library?user_id=1').then((res) => res.json()).then((resJson) => {
            if(resJson.status == 1)
            {
                this.setState({books: resJson.books});
                this.setState({myLibraryStatus: 1 });
            }
            else
            {
                this.setState({myLibraryStatus: 0});
            }
        })
        .then(() => {
          this.setState({doneFetching: true})
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            doneFetching: false,
            myLibraryStatus: 0,
            books: [
                /*{id: 0, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 0},
                {id: 1, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 1},
                {id: 2, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 2},
                {id: 3, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 3},
                {id: 4, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 4},
                {id: 5, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 5},
                {id: 6, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 6},
                {id: 7, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 7},
                {id: 8, book_name: 'Book name', book_photo: 'https://orig00.deviantart.net/9da8/f/2010/332/8/5/islamic_book_cover_by_sherif_designer-d33s4kd.jpg',  author_name: "Ahmed Hassan", author_ID: 8},
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

    if(this.state.myLibraryStatus == 1)
    {
        return (
              <View style={styles.container}>
                  <FlatList
                    style={{ flexDirection: 'column' }}
                    numColumns={3}
                    data = {this.state.books}
                    keyExtractor={this._keyExtractor}
                    renderItem = {({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={ () => {
                              this.props.navigation.navigate('Book', {book_ID: item.id, book_photo: item.book_photo, book_name: item.book_name, author_name: item.author_name})
                            }}>
                                <OneBookCard id={item.id} addButton={0} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                            </TouchableOpacity>
                        </View>
                    )} />
              </View>
          );
    }
    else
    {
        return(
            <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#106234', fontSize: 22}}>No books in your library</Text>
            </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
