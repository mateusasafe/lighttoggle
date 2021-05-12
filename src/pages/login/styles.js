import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#6A322F',
    },

    header:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop: 53,
        marginBottom: 39,
        marginTop: '60%'
    },

    emailSection: {
        flexDirection: 'row',
        backgroundColor: '#FFF9E5',
        borderRadius: 23,
        paddingLeft: 18,
        paddingTop: 14,
        paddingBottom: 14,
        color: '#3A3A3A'
    },
    passwordSection: {
        flexDirection: 'row',
        backgroundColor: '#FFF9E5',
        borderRadius: 23,
        paddingLeft: 18,
        paddingTop: 14,
        paddingBottom: 14,
        color: '#3A3A3A',
        marginTop: 20
    },
    loginButtonSection: {
        marginTop: 20,
        borderRadius: 23
    },

    searchIcon: {
        paddingRight: 14
    },

    emailInput: {
        color: '#3A3A3A',
        fontSize: 20,
        fontStyle: 'normal',
        flex: 1,
        lineHeight: 25,
        minWidth: 1
    },
    passwordInput: {
        color: '#3A3A3A',
        fontSize: 20,
        fontStyle: 'normal',
        flex: 1,
        lineHeight: 25,
        minWidth: 1
    },
    loginButton: {
        fontSize: 20,
        fontStyle: 'normal',
        flex: 1,
        lineHeight: 25,
        minWidth: 1,
        borderRadius: 23
    },

    spinner: {
        paddingTop: 20
    }
})
