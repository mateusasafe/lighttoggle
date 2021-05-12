import React from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, FlatList, Keyboard,  ActivityIndicator } from 'react-native';
import { Feather } from "@expo/vector-icons";
import logoImg from "../../../assets/logo.png";
import styles from "./styles";
import { StatusBar } from 'expo-status-bar';
import { deviceList, toggleDevice } from '../../services/ewelink'

const ICON_ON = require('../../../assets/on.png')
const ICON_OFF = require('../../../assets/off.png')

export default class Devices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            searchText: '',
            deviceList: [],
            searchResult: []
        }
    }

    setSearchText(text) {
        this.setState({ searchText: text })
    }

    setDeviceList(deviceList) {
        this.setState({ deviceList: deviceList })
    }

    setSearchResult(result) {
        this.setState({ searchResult: result })
    }

    setIsLoading(loading) {
        this.setState({ isLoading: loading })
    }

    componentDidMount(){
        this.reloadDevices()
    }

    async reloadDevices() {
        this.setIsLoading(true)
        const devices = await deviceList()
        this.setDeviceList(devices)
        this.setSearchResult(devices)
        this.setIsLoading(false)
    }

    async search(){
        Keyboard.dismiss()
        this.setIsLoading(true)

        if (this.state.searchText === '') {
            this.setSearchResult(this.state.deviceList)
        }

        let searchedDevices = this.state.deviceList.filter(device => {
            return device.name.toLowerCase().includes(this.state.searchText.toLowerCase())
        })
            
        this.setSearchResult(searchedDevices)
        this.setIsLoading(false)
    }

    async toggleLight(deviceId) {
        const success = await toggleDevice(deviceId)
        if (!success) {
            return
        }

        const deviceIndex = this.state.deviceList.findIndex(device => device.deviceid === deviceId)
        let device = this.state.deviceList[deviceIndex]

        if (device && device.params.switch === 'on') {
            device.params.switch = 'off'
        } else {
            device.params.switch = 'on'
        }

        const updateDeviceList = this.state.deviceList.map((obj, index) => {
            return deviceIndex === device.index ? device : obj;
        });

        const updateSearchResult = this.state.searchResult.map((obj, index) => {
            return deviceIndex === device.index ? device : obj;
        });

        this.setDeviceList(updateDeviceList)
        this.setSearchResult(updateSearchResult)
    }

    render () {
        return(
            <View style={styles.container}>
                <StatusBar style="light" />

                <View style={styles.searchSection}>
                    <TextInput style={styles.searchInput}
                        placeholder="Pesquisar..."
                        placeholderTextColor="#3A3A3A"
                        onChangeText={search => this.setSearchText(search)}
                        onSubmitEditing={() => this.search()}
                        defaultValue={this.state.searchText}
                    />

                    <TouchableOpacity
                        onPress={()=>this.search()}
                    >
                        <Feather style={styles.searchIcon}
                            name="search"
                            size={28}
                            color="#3A3A3A"
                        />
                    </TouchableOpacity>

                </View>

                {this.state.isLoading &&    
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#eabc43" />
                    </View>
                }

                {!this.state.isLoading &&
                    <FlatList
                        data = {this.state.searchResult}
                        style={styles.deviceList}
                        keyExtractor={item => String(item.id)}
                        showsVerticalScrollIndicator={false}
                        onEndReached={this.loadResults}
                        onEndReachedThreshold={0.2}
                        renderItem={({item: item})=>(

                        <TouchableOpacity
                            onPress={ () => this.toggleLight(item.deviceid) }
                        >
                            <View style={styles.device}>
                            
                                <View>
                                    <Image source={item.params.switch === 'on' ? ICON_ON : ICON_OFF} style={styles.deviceImg} />
                                </View>

                                <View style={styles.deviceInfo}>
                                    <Text style={styles.deviceName}>{item.name}</Text>
                                    <Text style={styles.deviceId}>{item.deviceid}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        )}
                    />
                }
            </View>        
        )
    }
}
