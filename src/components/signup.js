import React from 'react';
import './note.css';
import PropTypes from 'prop-types';


class Note extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        message: '',
      }
    }

    static propTypes = {
      updateState: PropTypes.func.isRequired,
      displayState: PropTypes.object.isRequired,
    };
  
    // eslint-disable-next-line react/no-typos
    componentDidMount() {}

    register = () => {
      const userName = document.getElementById('userNameRgstr');
      const password = document.getElementById('passwordRgstr');
        fetch('/api/register/add', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
              userName: userName.value,
              password: password.value })
        }).then(() => {
          this.props.updateState({
            signup : 'none',
            note : 'none',
          });
          this.setState({message: 'SignUp Success ! Please Login'})
        });
        userName.value = null;
        password.value = null;
    }

    render() {
      return (
        <div style={{height: '50%'}}>
        <div className="panel">{this.state.message}</div>
        <div className="inputBoxes">
          <div style={{marginBottom: '20px'}}>
          <input id="userNameRgstr" className="inputForm" type="text" placeholder="Email"/>       
          </div>
          <div style={{marginBottom: '20px'}}>
          <input id="passwordRgstr" className="inputForm" type="text" placeholder="Password"/>       
          </div>
          <div style={{marginBottom: '20px'}}>
            <button className="btn" onClick={() => {this.register();}}>Sign-Up</button>
          </div>
          </div>
          </div>
      );
    }
  }

  export default (Note);