import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Button, Keyboard, ActivityIndicator } from 'react-native';
import { Feather } from "@expo/vector-icons";
import logoImg from "../../../assets/logo.png";
import styles from "./styles";
import { StatusBar } from 'expo-status-bar';
import { authenticate } from '../../services/ewelink'
import { getAuthenticationEmail, getAuthenticationPassword } from '../../services/secureStore'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoginOn: false
        }
    }

    setEmail(email) {
        this.setState({ email: email })
    }

    setPassword(password) {
        this.setState({ password: password })
    }

    setIsLoginOn(isLoginOn) {
        this.setState({ isLoginOn: isLoginOn })
    }

    async componentDidMount() {
        const email = await getAuthenticationEmail()
        const password = await getAuthenticationPassword()

        if (email && password) {
            this.setEmail(email)
            this.setPassword(password)
            this.login()
        }
    }

    async login() {
        Keyboard.dismiss()

        if (this.state.isLoginOn || (this.state.email === '' && this.state.password === '')) {
            return
        }

        this.setIsLoginOn(true)
        const success = await authenticate(this.state.email, this.state.password)
        this.setIsLoginOn(false)

        if (success) {
            this.props.navigation.navigate('Devices')
            return
        }

        alert("email ou senha incorretos!")
    }

    render () {
        return(
            <View style={styles.container}>
                <StatusBar style="light" />

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={()=>resetSearch()}
                    >
                        <Image source={logoImg}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.emailSection}>
                    <Feather style={styles.searchIcon}
                        name="mail"
                        size={28}
                        color="#3A3A3A"
                    />

                    <TextInput style={styles.emailInput}
                        placeholder="Email"
                        placeholderTextColor="#3A3A3A"
                        onChangeText={email => this.setEmail(email)}
                        defaultValue={this.state.email}
                        editable={!this.state.isLoginOn}
                    />

                </View>

                <View style={styles.passwordSection}>
                    <Feather style={styles.searchIcon}
                        name="lock"
                        size={28}
                        color="#3A3A3A"
                    />
                    
                    <TextInput style={styles.passwordInput}
                        placeholder="Senha"
                        placeholderTextColor="#3A3A3A"
                        onChangeText={password => this.setPassword(password)}
                        defaultValue={this.state.password}
                        editable={!this.state.isLoginOn}
                        secureTextEntry={true}
                    />

                </View>

                {this.state.isLoginOn &&    
                    <View style={[styles.spinner]}>
                        <ActivityIndicator size="large" color="#eabc43" />
                    </View>
                }

                {!this.state.isLoginOn &&
                    <View style={styles.loginButtonSection}>
                        <Button
                            style={styles.loginButton}
                            title="Entrar"
                            color="#875B58"
                            onPress={ () => this.login() }
                        />
                    </View>
                }

            </View>        
        )
    }
}
