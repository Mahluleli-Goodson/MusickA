import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,ScrollView,Linking,TouchableOpacity } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import ImageWindow from './imageViewComponent';

export default class artistProfileComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist_bio:'loading, wait...',
            art_img:'./images.png',
            similarOBJ:[''],
            modalOpen:false,
            imageSelect:''
        };
        this.getArtistInfo();
    }

    /*get selected artist info-bio*/
    getArtistInfo(){
        var artistName = encodeURIComponent(this.props.name);
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artistName+'&api_key=57ee3318536b23ee81d6b27e36997cde&format=json').
            then(function (response) {
                return response.json();
            }).
            then(function (respObj) {
            this.setState({
                artist_bio:respObj.artist.bio.content,
                art_img:respObj.artist.image[4]["#text"],
                similarOBJ:respObj.artist.similar.artist
            });
            }.bind(this)).
            catch(function (error) {
            console.error(error);
            });
    };

    /*return to previous scene*/
    goHome(){
        this.props.navigator.pop();
    };

    /*open next scene*/
    fetchArt(artVal){
        this.props.navigator.push({
            title:artVal
        });
    };

    showBigImg(img_uri){
            this.setState({
                modalOpen:!this.state.modalOpen,
                imageSelect:{uri:img_uri}
            });
    }

    render() {

        let artist_clip = {
            uri:this.state.art_img
        };
        let main_content='';//initialise bio-content variable

        //show gif loader while content-bio is still loading
        if(this.state.artist_bio=='loading, wait...'){
             main_content=
                 <View style={styles.gifLoader}>
                    <Image source={require("./ripple.gif")}/>
                </View>;
        }else{
            main_content =
                <ScrollView style={{backgroundColor:'#ddd'}}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileCardInner}>
                            <TouchableOpacity onPress = {()=>this.showBigImg(artist_clip.uri)} activeOpacity={0.5}>
                                <Image
                                    source={artist_clip}
                                    indicator={ProgressBar}
                                    indicatorProps={{color: '#133'}}

                                    style={styles.imageHolder}
                                />
                            </TouchableOpacity>

                            <Text style={styles.imgTitle}>{this.props.name}</Text>
                            <View style={styles.profileParaContainer}>
                                <Text style={styles.profilePara}>{this.state.artist_bio}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:17}}>Similar Artists:</Text>
                                <View>
                                    {
                                        this.state.similarOBJ.map(function (similar_art,index) {
                                            return(
                                                <TouchableHighlight onPress={()=>this.fetchArt(similar_art.name)} key={index} style={styles.listStyle}>
                                                    <Text style={styles.similarList}>{similar_art.name}</Text>
                                                </TouchableHighlight>
                                            ) ;

                                        }.bind(this))
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>;
        }

        return (
          <View style={styles.container}>
              <View style={{padding:7,backgroundColor:'#D9429F',elevation:5,flexDirection: 'row',justifyContent: 'space-between'}}>

                  <View>
                      <Text style={styles.titleTxt}>{this.props.name}</Text>
                  </View>
                  <View style={styles.doneBtn}>
                      <TouchableHighlight  onPress={this.goHome.bind(this)} style={{borderRadius:20,borderStyle:'solid',borderWidth:1,borderColor:'#c5d8df'}}>
                          <Text style={styles.doneTxt}>done</Text>
                      </TouchableHighlight>
                  </View>

              </View>{/*end of top toolbar*/}

              {/*main view section*/}
              {main_content}

              {/*<Text style={styles.anchors} onPress={() => Linking.openURL('http://www.theriket.com/#/')}>Powered By TheRiket</Text>*/}

              {this.state.modalOpen==true?<ImageWindow modalStatus={this.state.modalOpen} imageEnlarge={this.state.imageSelect}/>:null}

          </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:null,
        height:null
    },
    doneBtn:{
        paddingTop:8
    },
    doneTxt:{
        width:40,
        color:'#ccc',
        fontStyle:'italic',
        textAlign:'center'

    },
    titleTxt:{
        color:'#F0D32D',
        paddingLeft:5,
        paddingBottom:5,
        fontSize:22
    },
    imageHolder:{
        width: 200,
        height: 200,
        alignSelf:'center',
        borderRadius:100,
        borderColor:'#F0D32D',
        borderWidth:5
    },
    imgTitle:{
        alignSelf:'center',
        fontSize:19,
        fontWeight:'bold'
    },
    profileCard:{
        backgroundColor:'#fff',
        marginTop:7,
        marginLeft:10,
        marginRight:10,
        marginBottom:7,
        elevation:2
    },
    profileCardInner:{
        backgroundColor:'#fff',
        padding:10
    },
    profileParaContainer:{
        borderTopColor:'#133',
        borderTopWidth:0.3,
        borderBottomColor:'#133',
        borderBottomWidth:0.3,
        borderStyle:'solid',
        paddingTop:10,
        marginBottom:10
    },
    profilePara:{
        textAlign:'justify',
        fontSize:17,
        lineHeight:25,
        color:'#000'
    },
    anchors:{
        color:'#133',
        fontWeight:'100',
        position:'relative',
        bottom:0
    },
    gifLoader:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listStyle:{
        borderColor:'#D9429F',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:5,
        padding:5,
        margin:3
    },
    similarList:{
        fontSize: 16,
        color: '#3B006A',
        textAlign:'center'
    }
});