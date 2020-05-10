import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';

import userService from '../Services/userService';
import  CssTextField from '../Components/CssTextField';


function LoginPage(props) {
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState('');

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const submitLogin = (event) => {
        if (userName === "" || password === "") {
            seterror("UserName/Password are required");
            return;
        }
        event.preventDefault();
        setloading(true);
        userService.login(userName, password).then(data => {
            //console.log('loginpage data', data);
            if (data.constructor === Error) {
                seterror("login failed with " + data);
                setuserName('');
                setpassword('');
            }
            else {
                if (data.authenticated === "true") {
                    let result = JSON.stringify({ "authVal": true, "user": {"userName": userName, "userRole": data.roles} })
                    //console.log('loginpage result', result);
                    props.isAuthenticated(result);
                    history.push(from);
                }
                else {
                    seterror("Invalid UserName or Password");
                    setuserName('');
                    setpassword('');
                }
            }
            setloading(false);
        })
    }


    return (

        <Container maxWidth="xs" style={{ padding: '100px 0px'}}>
            <form onSubmit={submitLogin}>
                <CssTextField style={{ color: "white" }} variant="outlined" colour="" margin="normal" required fullWidth id="txtUserName" label="User Name"
                    name="userName" value={userName} onChange={e => setuserName(e.target.value)} autoComplete="userName" autoFocus />
                <CssTextField variant="outlined" margin="normal" required fullWidth id="txtPassword" label="Password"
                    name="password" type="password" value={password} onChange={e => setpassword(e.target.value)} autoComplete="current-password" />
                <Button type="submit" fullWidth variant="contained" disabled={loading} style={{ color: "white" }}>
                    <span style={{ color: "black" }}>Login</span>
                </Button>
            </form>
            {error && <div className="text-danger">{error}</div>
            }
        </Container>

    );
}
export default LoginPage;