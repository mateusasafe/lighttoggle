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
        marginBottom: 39
    },

    deviceList:{
        marginTop:39,
    },
    device:{
        padding:24,
        borderRadius:8,
        backgroundColor:'#FFF9E5',
        marginBottom:16,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    deviceImg:{
        width: 50,
        height: 75,
    },
    deviceInfo:{
        alignItems:'flex-end',
    },
    deviceName:{
        fontSize:20,
        color:'#3A3A3A',
    },
    deviceId:{
        marginTop:8,
        fontSize:15,
        marginTop:30,
        color:'#737380',
    },

    searchSection: {
        flexDirection: 'row',
        backgroundColor: '#FFF9E5',
        borderRadius: 23,
        paddingLeft: 18,
        paddingTop: 14,
        paddingBottom: 14,
        color: '#3A3A3A'
    },
    searchIcon: {
        paddingRight: 14
    },
    searchInput: {
        color: '#3A3A3A',
        fontSize: 20,
        fontStyle: 'normal',
        flex: 1,
        lineHeight: 25,
        minWidth: 1
    },

    containerSpinner: {
        flex: 1,
        justifyContent: "center"
    },
    horizontalSpinner: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
