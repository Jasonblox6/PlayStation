function Header ({token, handleLogin}) {

    const logout = () =>{
        localStorage.removeItem("token");
        handleLogin("");

    }


    return(
    <div>
        {token && <button onClick={logout}> Logout    
        </button>}
    </div>
    )

}

export default Header;