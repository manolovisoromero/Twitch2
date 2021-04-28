import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { useKeycloak } from '@react-keycloak/web'

const Login2 = (props) => {
    const { keycloak, initialized } = useKeycloak()

    if(keycloak.authenticated){
        props.loginClick();
    }

    if (!initialized) {
        return <h3>Loading ... !!!</h3>;
    }
        return (
            <div style={{ flexDirection: 'column', display: 'flex' }}>
                <Button variant="contained" onClick={() => keycloak.login()} color="secondary">Login</Button>
            </div>
        )
}


export default Login2
