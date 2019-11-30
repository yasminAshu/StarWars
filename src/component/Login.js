import React from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: "",
            userFound: true,
            
        }
    }

    /**
   * 
   *@discription - This function is to set User Name
   @param {String} e - Target value of user
   */

    handleUserName = (e) => {
        this.setState({ userName: e.target.value })
    }

    /**
   * 
   *@discription - This function is to set Password of user
   @param {String} e - Target value of Password
   */
    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }


    /**
   * 
   *@discription - This function is to Login user after successfull username and password
   */
    login = async () => {
        try {
            const response = await fetch("https://swapi.co/api/people", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const found = data.results.some(el => el.name === this.state.userName && el.birth_year === this.state.password);
            if (found) {
                this.props.history.push('/Search')
            }else{
                this.setState({ userFound: false })
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    /**
   * 
   *@discription - This function is will render the jsx of Login form
   */
    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <input type="text" placeholder="username" value={this.state.userName} onChange={this.handleUserName} />
                    <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePassword} />
                    <button onClick={this.login} >login</button>
                </div>
                {!this.state.userFound && <div class="error">User id or password is incorrect</div>
}            </div>
        )
    }
}

export default Login