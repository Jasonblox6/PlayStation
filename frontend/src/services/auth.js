class Auth{
    async login(username, password){
        let response = await fetch("http://localhost:9000/users/login", {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({username:username, password:password})})

        if (response.status != 200){
            return;
        }

        response = await response.json();

        localStorage.setItem("token", response.token)
        localStorage.setItem("userId", response.userId)

        return response;

    }

    async signUp(username, password, email){
        let response = await fetch("http://localhost:9000/users/add", {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({username:username, password:password, email:email, type:0})})

        if (response.status > 399){
            response = await response.text();
            return {message: response, status: "error"};
        }

        response = await response.text();

        return {message: response, status: "success"};
    }
}

export default new Auth();