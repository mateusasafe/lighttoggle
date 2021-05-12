import { setAuthenticationEmail, setAuthenticationPassword,
         getAuthenticationEmail, getAuthenticationPassword } from './secureStore'

export const authenticate = async (email, password) => {
    const request = await fetch('https://lighttoggle-api.herokuapp.com/api/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password }),
    })

    const response = await request.json()
    
    if (response.error === undefined) {
        await setAuthenticationEmail(email)
        await setAuthenticationPassword(password)
        return true
    }

    await setAuthenticationEmail('')
    await setAuthenticationPassword('')
    return false
}

export const deviceList = async () => {
    const email = await getAuthenticationEmail()
    const password = await getAuthenticationPassword()
    if (!email || !password) {
        return
    }

    const request = await fetch('https://lighttoggle-api.herokuapp.com/api/user/device', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })

    const devices = await request.json()
    return devices.error ? [] : devices
}

export const toggleDevice = async (deviceId) => {
    const email = await getAuthenticationEmail()
    const password = await getAuthenticationPassword()
    if (!email || !password) {
        return
    }

    const request = await fetch('https://lighttoggle-api.herokuapp.com/api/user/device/status', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, deviceId: deviceId })
    })

    const response = await request.json()
    return response.error ? false : true
}
