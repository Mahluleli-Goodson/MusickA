import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View,StyleSheet,ToolbarAndroid,TouchableHighlight,Navigator,Modal,ScrollView } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import AnotherOne from './artistProfileComponent';

export default class imageViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalStatus
        };
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    render() {

        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {console.log('closed image view')}}
                >
                    <View style={{backgroundColor:'rgba(59,0,106,0.4)',flex:1}}>
                        <View style={styles.closeModalContainer}>
                                <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible)}} style={styles.closeModalBtn}>
                                    <Text style={{/*marginTop: 20,fontSize:18,*/textAlign:'center',color:'#ccc'}}>close</Text>
                        </TouchableHighlight>
                        </View>
                        <ScrollView>
                            <Image
                                source={this.props.imageEnlarge}
                                indicator={ProgressBar}
                                indicatorProps={{color: '#133'}}
                                style={styles.bigImageHolder}
                            />
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bigImageHolder:{
        width: 300,
        height: 300,
        alignSelf:'center',
        marginBottom:22,
        marginTop:22
    },
    closeModalContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:50,
        flexDirection:'column',
        alignItems:'flex-end'
    },
    closeModalBtn:{
        width:50,
        height:20,
        top:15,
        right:10,
        borderRadius:20,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#c5d8df'
    }
});