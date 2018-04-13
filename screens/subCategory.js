import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';

//import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';
import Server from '../constants/server';

// API: send this.props.navigation.state.params.sub_cat_id to the server, and receive this.state.booksOfSubCat

export default class subCategory extends React.Component {
    componentDidMount() {
        this.doTheFetching();
    }

    doTheFetching() {
        fetch(Server.dest + '/api/books_of_subcat?sub_cat_id='+this.props.navigation.state.params.sub_cat_id, {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
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
            gridView:true,
            HorV:true,
            MYTEXT:'Show List',
            ICON:'ios-list',
            num:35,
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
changeView = () =>
{
  this.setState({ gridView: !this.state.gridView }, () =>
  {
      if(this.state.gridView)
      {
        this.setState({ MYTEXT: 'Show List' });
        this.setState({ ICON: "ios-list" });
        this.setState({ num:35 });


      }
      else
      {
        this.setState({ MYTEXT: 'Show Grid' });
        this.setState({ ICON: "ios-grid" });
        this.setState({ num:30 });


      }
  });
}
  render() {
    if(!this.state.doneFetching)
        return (<LoadingIndicator size="large" color="#B6E3C6" />);

    return (
        <View style={styles.container}>
        <TouchableOpacity style={{backgroundColor:'#106234',borderRadius:100,width:40,height:35,marginLeft:"80%",marginTop:10 }}  onPress = { this.changeView }>
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Ionicons name={this.state.ICON} size={this.state.num}  color='white' style={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:this.state.gridView ?  "-3%" :"5%"}}/>
            </View>
          </TouchableOpacity>
            <Text style={{ marginHorizontal: 20, marginTop: 4, fontWeight: 'bold', color: '#555555', fontSize: 20, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10, }}>
                {this.props.navigation.state.params.sub_cat_name.toUpperCase()}
            </Text>

            <FlatList
            style={{ flex: 1, }}
            key = {( this.state.gridView ) ? 1 : 0 }
            numColumns = { this.state.gridView ? 2 : 1 }
              data = {this.state.booksOfSubCat}
              keyExtractor={this._keyExtractor}
              renderItem = {({ item }) => (
                  <View style={{  }}>
                      <TouchableOpacity onPress={ () => {
                        this.props.navigation.navigate('Book', {
                            book_ID: item.id,
                            book_photo: item.book_photo,
                            book_name: item.book_name,
                            author_name: item.author_name,
                            cat_name: this.props.navigation.state.params.sub_cat_name.toUpperCase()
                        })
                      }}>
                          <OneBookCard navigation={this.props.navigation} id={item.id} horizontal={this.state.gridView ? 0 : 2} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
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
  Btn:
{
 padding: 15,
 backgroundColor: '#5cb85c'
},

btnText:
{
 color: 'white',
 textAlign: 'center',
 alignSelf: 'stretch'
}
});
