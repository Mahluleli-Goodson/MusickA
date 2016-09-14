import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,TouchableOpacity,DrawerLayoutAndroid,StatusBar } from 'react-native';
import Image from 'react-native-image-progress';

export default class allArtistsComponent extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);
        this.state = {
            loader:'LOADING...',
            title:this.props.title,/*or use props.title ---still in same scope*/
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([''])
        };
        this.loadArtists();
    };

    /*function to push to navigator AND display name of selected artist*/
     pushArtist(text){
        this.props.navigator.push({
            title:text
        });
    };
    /*END function to display name of selected artist*/

    /*open close drawer func*/
        openDrawerFunc(){
          this.refs['DRAWER-OP'].openDrawer();
        };
    /*ENDopen close drawer func*/

    /*function to fetch artists*/
    loadArtists(){
        fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=pop&api_key=57ee3318536b23ee81d6b27e36997cde&format=json')
            .then(function (response) {
                return response.json();
            })
            .then(function (respJSON) {
                var jsonOBJ = respJSON.topartists.artist;
                this.setState({
                    dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(jsonOBJ),
                    loader:''
                });
                /*console.log(jsonOBJ);*/
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };
    /*END function to fetch artists*/

    render() {

        let artist_list_area = '';

        //show gif loader while artist-list is still loading
        if(this.state.loader=='LOADING...'){
            artist_list_area=
                <View style={this.state.loader=='LOADING...'?styles.centerGif:''}>
                    <Image source={require("./ripple.gif")}/>
                </View>;
        }else{
            artist_list_area =
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <View style={styles.singleListContainer}>
                            <Image source={{uri:rowData.image[2]["#text"]}} style={styles.thumbnailHolder}/>
                        <TouchableOpacity onPress={()=>this.pushArtist(rowData.name)} style={{flex:1}} activeOpacity={0.5}>
                           <Text style={styles.singleListTxt}>{rowData.name}</Text>
                        </TouchableOpacity>
                    </View>
               }
                style={{paddingTop:5}}
            />;
        }

        //drawer menu components
        var navigationView = (
            <View style={{flex: 1, backgroundColor: 'rgba(59,0,106,0.4)'}}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
        );

        let statusBar =
            <StatusBar
                backgroundColor="#bc0d76"
                barStyle="light-content"
            />;

        let innerContent =
            <View style={{flex:1, backgroundColor:'#eee'}}>
                {statusBar}
                <View style={styles.toolBar}>
                    <TouchableOpacity onPress={()=>this.openDrawerFunc()} style={{width:20,height:20,left:-5}}>
                        <Image source={require("./drawerImg.png")} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    <View style={{}}><Text style={{color:'#fff'}}> {this.state.title}</Text></View>
                </View>
                {artist_list_area}
            </View>;

        return (
            <DrawerLayoutAndroid
                ref={'DRAWER-OP'}
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                {innerContent}
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    singleListContainer:{
        marginLeft:5,
        marginRight:5,
        marginBottom:3,
        padding:10,
        flex:1,
        flexDirection:'row',
        backgroundColor:'#fff',
        /*borderStyle:'solid',
        borderBottomColor:'#ccc',
        borderBottomWidth:0.5,*/
    },
    thumbnailHolder:{
        width:50,
        height:50,
        backgroundColor:'#5B2980',
        borderColor:'#D9429F',
        borderWidth:0.5
    },
    singleListTxt:{
        /*textAlign:'center',*/
        /*backgroundColor:'#234',*/
        fontSize:18,
        left:10
    },
    toolBar:{
        padding:15,
        backgroundColor:'#D9429F',
        elevation:5,
        flexDirection:'row'
        /*marginBottom:15*/
    },
    outputText:{
        padding:6,
        borderStyle:'solid',
        borderTopColor:'red',
        borderTopWidth:2
    },
    loaderGIF:{
        fontSize:20,
        textAlign:'center',
        color:'#CB1B0E'
    },
    centerGif:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
