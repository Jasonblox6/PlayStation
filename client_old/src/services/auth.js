class Auth{
    async login(username, password){
        let response = await fetch("http://localhost:9000/users/login", {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({username:username, password:password})})



        if (response.status != 200){
            return;
        }

        response = await response.text();

        localStorage.setItem("token", response)

        return response;

    }
}

export default new Auth();