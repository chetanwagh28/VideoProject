import { StyleSheet, Dimensions } from 'react-native';

const PRIMARY_COLOR = "#00B2B6";
const SECONDARY_COLOR = "#00CBCC";
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const ERROR_COLOR = "#FF0000";




export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: WHITE
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 5
    },
    appLogo:{
        width:80,
        height:80,
    },
    footer: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    pageTitle:{
        fontWeight:'bold',
        fontSize:22,
        color:'#00B2B6'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: ERROR_COLOR,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: ERROR_COLOR,
        fontSize: 16,
    },
    commonAppButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 21,
        marginHorizontal:2,
        marginVertical:2,
    },
    commonAppButtonText: {
        color: WHITE,
        fontSize: 12,
    },
    signUp: {
        marginTop: 15,
        width:'100%',
        textAlign:"center"
    },
    textSign1: {
        fontSize: 16,
        fontWeight: 'bold',

    }
});