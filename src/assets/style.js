import { StyleSheet, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';

const PRIMARY_COLOR = "#0AFFEF";
const SECONDARY_COLOR = "#00CBCC";

const DARK_BACKGROUND_COLOR = "#243441";
const LIGHT_BACKGROUND_COLOR = "#E7F0FF";
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const LIGHT_SHADOW_COLOR = "#FBFFFF";
const DARK_SHADOW_COLOR = "#B7C4DD";


var { width, height} = Dimensions.get('screen')
 width = width

export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: LIGHT_BACKGROUND_COLOR,
        justifyContent:"center"
    },

    contentInRow:{
        display:"flex",
        alignContent:"center",
        alignSelf:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    contentInColumnCenter:{
        display:"flex",
        alignContent:"center",
        alignSelf:"center",
        alignItems:"center",
        flexDirection:"column",

    },

    appNeoMorpButtom:{
        shadowOpacity: 0.9, 
        shadowRadius: 5,
        borderRadius: 5,
        backgroundColor: LIGHT_BACKGROUND_COLOR ,
        width: width/3,
        height: 40,
        display:"flex",
        justifyContent:"center",
        alignSelf:"center",
        alignItems:"center",
        margin:5,
 
    },

    appNeoMorpInputBox:{
        shadowOpacity: 0.9, 
        shadowRadius: 5,
        borderRadius: 5,
        backgroundColor: LIGHT_BACKGROUND_COLOR ,
        width: width-15,
        height: 40,
        display:"flex",
        justifyContent:"flex-start",
        alignSelf:"center",
        alignItems:"center",
        margin:5,
        paddingLeft:15,
        paddingRight:15
 
    },    

    topShadow:{
        color: LIGHT_SHADOW_COLOR
    },
    
    BottomShadow:{
        color: DARK_SHADOW_COLOR
    }    

});