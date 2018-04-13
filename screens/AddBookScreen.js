import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Dimensions,
  Linking,
  Platform,
  Clipboard,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import LoadingIndicator from '../components/LoadingIndicator';
import OneBookCard from '../components/OneBookCard';
import Server from '../constants/server';

export default class AddBook extends React.Component {
    doTheFetching() {
        fetch(Server.dest + '/api/new_books', {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
            this.setState({books: resJson});
        })
        .then(() => {
          this.setState({doneFetching: true})
        })
    }
    constructor(props)
        {
          super(props);
          this.state = {
              doneFetching:false,
              books: [],
              thingsToTranslate:{NewBooks:'NewBooks'},
              gridView:true,
              HorV:true,
              MYTEXT:'Show List',
              ICON:'ios-list',
              num:35,

          }
        }
        componentDidMount ()
        {
            AsyncStorage.getItem("language").then((value) => {
              if (value == '1') {
                this.setState({ thingsToTranslate: {  NewBooks:'الكتب الجديدة' } })
              } else {
                this.setState({ thingsToTranslate: {  NewBooks:'New Books' } })
              }
              this.doTheFetching();
            });
        }
_keyExtractor = (item, index) => item.id;
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

    return (
        <View style={{flex:1}}>
        <View style={{borderBottomWidth:0.7,borderBottomColor:'#555555',paddingTop:10}}>
        <Text style={{ marginHorizontal: 20, fontWeight: 'bold', color: '#555555', fontSize: 20, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10 }}>
        {this.state.thingsToTranslate.NewBooks}
        </Text>
        </View>
        <ScrollView style ={{flex:1}}>
        <TouchableOpacity style={{backgroundColor:'#106234',borderRadius:100,width:40,height:35,marginLeft:"80%",marginTop:10 }}  onPress = { this.changeView }>
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Ionicons name={this.state.ICON} size={this.state.num}  color='white' style={{flex:1,justifyContent:'center',alignItems:'center',textAlign:'center',marginTop:this.state.gridView ?  "-3%" :"5%"}}/>
            </View>
          </TouchableOpacity>
          <FlatList
            style={{ flex: 1, }}
            key = {( this.state.gridView ) ? 1 : 0 }
            numColumns = { this.state.gridView ? 2 : 1 }
            data = {this.state.books}
            keyExtractor={this._keyExtractor}
            renderItem = {({ item }) => (
                <View style={{ paddingVertical:10 }}>
                    <TouchableOpacity onPress={ () => {
                      this.props.navigation.navigate('Book', {
                          book_ID: item.id,
                          book_photo: item.book_photo,
                          book_name: item.book_name,
                          author_name: item.author_name,
                      })
                    }}>
                        <OneBookCard navigation={this.props.navigation}   id={item.id} horizontal={this.state.gridView ? 0 : 2} addButton={1} book_name={item.book_name} book_photo={item.book_photo} author_name={item.author_name} />
                    </TouchableOpacity>
                </View>
            )} />
            </ScrollView>
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
