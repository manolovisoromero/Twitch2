import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { Alert } from 'reactstrap';




class Login extends Component {


    constructor(props) {
        super(props);

        this.loginPost = this.loginPost.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.setAlert = this.setAlert.bind(this);



        this.state = {
            username: '',
            password: '',
            loginSuccess: false,
            showPassword: false,
            alertEnabled: false,
            alertMsg: 'test',
            userID: null
        }


    }

    async loginPost() {

        var self = this

        // const request = axios({
        //     method: 'post',
        //     url: 'https://localhost:8095/authenticate/login',
        //     data: {
        //         username: this.state.username,
        //         password: this.state.password,
        //     }
        // })

        // await request
        //     .then(function (response) {
        //         self.props.setData(response.data.token, response.data.userID)
        //         console.log(response.data.token)

        //         self.props.onLoginClicked()
        //     })
        //     .catch(function (error) {
        //         if (error.response.status === 400) {
        //             self.setAlert("Wrong credentials")
        //         } else {
        //             self.setAlert("Error with status code: " + error.response.status)
        //         }
        //     })
        self.props.onLoginClicked()
    }

    setAlert(msg) {
        this.setState({
            alertEnabled: true,
            alertMsg: msg
        })
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    };

    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        })
    }


    render() {
        return (
            <div style={{ flexDirection: 'column', display: 'flex' }}>
                <h1>Username</h1>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-username"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        labelWidth={90}
                    />
                </FormControl>
                <h1>Password</h1>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    edge="end"
                                >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>

                {this.state.alertEnabled ?
                    (<Alert color="dark">
                        {this.state.alertMsg}
                    </Alert>) : (null)
                }
                <div style={{height: '100%'}}>
                    <Button onClick={() => this.loginPost()} variant="contained" color="secondary">Login</Button>
                </div>

            </div>
        )
    }
}

export default Login;


const classes = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
        backgroundColor: 'white',
        color: "white"

    },
}));