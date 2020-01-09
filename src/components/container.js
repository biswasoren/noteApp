import React from 'react';
import './container.css';
import Note from './note';
import Table from './table';
import SignUp from './signup';


class Container extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        displayState: {
          signup : 'none',
          note : 'none',
        }
      }
    }

    static propTypes = {};
  
    // eslint-disable-next-line react/no-typos
    componentDidMount() {
      this.checkCookie();
    }

    login = () => {
      const userName = document.getElementById('userName');
      const password = document.getElementById('password');
        fetch('/api/register/login', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
              userName: userName.value })
        }).then(results => results.json())
        .then(info => {
          const usrData = info;
            if (usrData.length !== 0) {
            if (usrData[0].password === password.value) {
              this.setCookie(userName.value);
              this.setState({activeUser: userName.value});

              userName.value = null;
              password.value = null;
              this.getNotes();
              this.updateState({
                signup : 'none',
                note : 'block',
              })
            }
            else {
              password.value = null;
              alert('Paswword is incorrect');
            }
          }
          else {
            userName.value = null;
            password.value = null;
            alert('User not found');
          }            
        });      
    }

    setCookie = (email) => {
      let now = new Date();
      let time = now.getTime();
      let expireTime = time + 1000*300;
      now.setTime(expireTime);
      document.cookie = `email=${email};expires=${now.toUTCString()};path=/`;
    }

    checkCookie = () => {
      const value = document.cookie;
      const splitValue = value.split('=');
      if (splitValue[1]) {
        this.setState({activeUser: splitValue[1]}, 
          () => {
            this.getNotes();
          });
        this.updateState({
          signup : 'none',
          note : 'block',
        })
      }
      else {
        this.updateState({
          signup : 'none',
          note : 'none',
        })
      }
    }

    deleteNote = (key) => {
      fetch(`/api/note/delete/${key}`, {
        method: 'delete',})
      .then(results => {
        this.getNotes();
      });
    }

    edit = (editForm) => {
      this.setState({editForm});
    }

    getNotes = () => {
      fetch(`/api/note/getAll/${this.state.activeUser}`)
      .then(results => results.json())
      .then(info => {
        const data = [];
          const resp = info;
          resp.forEach(formData => {
            const current = [];
            current.push(formData.title);
            current.push(formData.note);
            current.push(formData.category);
            current.push(new Date(formData.created_at).toLocaleDateString());
            current.push(<div><span onClick={() => {this.edit(formData)}}>Edit</span> / <span onClick={() => {
              this.deleteNote(Buffer.from(formData.title+formData.created_at).toString('base64'));
              }}>Delete</span></div>)
            data.push(current);
          });
          this.setState({ 
            data,
          });
      });
  }

    updateState = (displayState) => {
      this.setState({displayState});
    }

    handleSubmit = (id) => {
      this.getNotes();
      if (id) {
        this.deleteNote(id);
      }
      this.setState({ editForm: null})
    }

    logout= () => {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let eqPos = cookie.indexOf("=");
          let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      this.checkCookie();
    }

    render() {
      return (
        <div className="conatiner">
          <div className="header">
            <img alt="select" src="/icon.svg"/>
            {this.state.displayState.note !== 'block' ? <div>
            <div>
            <input id="userName" className="input" type="text" placeholder="Email"/>
            <input id="password" className="input" type="password" placeholder="Password"/>
            <button className="btn" onClick={() => {this.login()}}>Sign In</button>
            </div>
            <div className="signup"> Don't have an account? 
              <span style={{cursor: 'pointer'}} 
              onClick={() => { this.updateState({signup : 'block', note : 'none'})}}> 
              Sign up
              </span>
              </div>
            </div>: 
              <div className="text">
              <div style={{color: 'white', textTransform: 'Capitalize'}} >Hi {this.state.activeUser || 'Guest' } </div>
              <button className="btn" onClick={() => {this.logout()}}>Sign Out</button>
              </div>
            }
          </div>
          <div style={{ display: this.state.displayState.note }}>
          <Note 
          message={'Add Note Here'} 
          handleSubmit={this.handleSubmit} 
          updateState={this.updateState}
          user={this.state.activeUser}
          editForm={this.state.editForm}
          />
          <Table data={this.state.data}/>
          </div>
          <div  style={{ display: this.state.displayState.signup }}>
            <SignUp updateState={this.updateState} display={this.state.displayState}/>
            </div>
          </div>
      );
    }
  }

  export default (Container);