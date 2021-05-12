import * as SecureStore from 'expo-secure-store';

export const setAuthenticationEmail = async (email) => {
    await SecureStore.setItemAsync('email', email)
}

export const setAuthenticationPassword = async (password) => {
    await SecureStore.setItemAsync('password', password)
}

export const getAuthenticationEmail = async () => {
    return await SecureStore.getItemAsync('email')
}

export const getAuthenticationPassword = async () => {
    return await SecureStore.getItemAsync('password')
}
