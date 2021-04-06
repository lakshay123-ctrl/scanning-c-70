import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet, TextInput,Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TranscactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedBookID:'',
            scannedStudentID:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async(ID) => {
     const {status} = await Permissions.askAsync(Permissions.CAMERA)
     this.setState({hasCameraPermissions:status=="granted",buttonState:ID,scanned:false})
     
    }

    handleBarCodeScanned = async ({type,data}) => {
        this.setState({scanned:true,scannedData:data,buttonState:'normal'})
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState

    if (buttonState !== "normal"&&hasCameraPermissions){
        return(
            <BarCodeScanner
            onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
            style = {StyleSheet.absoluteFillObject}
            />
        )
    }

    else if (
        buttonState === "normal"
    ){
        return(
            <View style = {styles.container}>
                <View>
                    <Image
                    style = {{width:200,height:200}}
                    source = {require("./assets/booklogo.jpg")}
                    />
                    <Text style = {{textAlign:'center',fontSize:30}}>Wili</Text>
                </View>
                <View style = {styles.inputView}>
                 <TextInput
                 style = {styles.inputBox}
                 placeholder = "Book ID"
                 value = {this.state.scannedBookID}
                />
                
                <TouchableOpacity style = {styles.scanButton}
                onPress={()=>{this.getCameraPermissions("Book ID")}}>
                 <Text style = {styles.buttonText}>
                  Scan
                 </Text>
                </TouchableOpacity>
                </View>
                <View style = {styles.inputView}>
                
                <TextInput  
                
                 style = {styles.inputBox}
                 placeholder = "Student Id"
                 value = {this.state.scannedStudentID}
                />
                
                <TouchableOpacity style = {styles.scanButton}
                onPress={()=>{this.getCameraPermissions("Student ID")}}>
                 <Text style = {styles.buttonText}>
                  Scan
                 </Text>
                </TouchableOpacity>
                


                </View>
            </View>
        )
    }
    }
}

const styles = StyleSheet.create({

container:
{
flex:1,
justifyContent:'center',
alignItems:'center'
},

scanButton:
{
    backgroundColor:'yellow',
    padding:5,
    margin:5
},
displayText:
{
fontSize:20
},
buttonText:
{
fontSize:15,
textAlign:'center',
marginTop:10
},
inputBox:
{
width:200,
heigth:10,
borderWidth:1.5,
borderRightWidth:0,
fontSize:20
},
inputView:
{
flexDirection:'row',
margin:10
}
})