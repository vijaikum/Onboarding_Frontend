function login(username, password) {
    const authURL = 'https://onboardingapplication.azurewebsites.net/user/auth';
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "userId": username, "password": password })
        //body: { "userId": username, "password": password }
    };
    //console.log(request);

    const authpromise = fetch(authURL, request)
        .then(response => {
            if (response.ok) {
                return Promise.resolve(response);
            }
            else {
                return Promise.reject(new Error(response.status + "-" + response.statusText))
            }
        })
        .then(response => response.json())
        .then(data => { 
            //console.log(data); 
            return data; })
        .catch(err => { 
            //console.log(err); 
            return err; })
    return authpromise;
}

//function logout() {
//}

const userService = {
    login,
    //logout
};

export default userService;