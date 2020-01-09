import React from 'react';
import './note.css';
import PropTypes from 'prop-types';


class Note extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        formData: {
          title: '',
          category: '',
          note: '',
        },
      }
    }

    static propTypes = {
      message: PropTypes.string.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      user: PropTypes.string.isRequired,
      editForm: PropTypes.object.isRequired,
    };
  
    // eslint-disable-next-line react/no-typos
    componentDidMount() {
      this.checkEdit(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkEdit(nextProps);
    }

    checkEdit = (props) => {
      console.log(props.editForm);
      if (props.editForm) {
        this.setState({ formData: props.editForm });
      }
    }

    handleChange = (e, type) => {
      const formData = this.state.formData;
      if (type) {
        formData[type] = e.target.value;
      }
      this.setState({ formData });
    }

    validate = formData => {
      if (Object.values(formData).some(o => o === '')){
        return false;
      }
      return true;
    }

    onSubmit = async () => {
      const formData = this.state.formData;
      console.log(this.validate(formData));
      if (this.validate(formData)) {
      formData.created_at = new Date();
        console.log(formData);
        console.log(this.props.user);
        if ( formData && this.props.user) {
        await fetch('/api/note/add', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({formData: formData, user: this.props.user})
      }).then(() => {
        console.log(this.props.editForm);
        this.props.handleSubmit(this.props.editForm._id);

      });
      }
      this.setState({ errorMsg: null})
    }
    else {
      this.setState({ errorMsg: 'You missed some fields'})
    }
      this.setState({ formData: {
        title: '',
        category: '',
        note: '',
      }});
    }

    render() {
      return (
        <div style={{height: '50%'}}>
        <div className="panel" style={{ color: this.state.errorMsg ? 'red' : '#60987F'}}>
          {this.state.errorMsg ? this.state.errorMsg : this.props.message}
          </div>
        <div className="inputBoxes">
          <div>
          <input className="inputForm" type="text" placeholder="Title" onChange={(e) => {this.handleChange(e, 'title')}} value={this.state.formData.title ? this.state.formData.title: ''}/>
          <select className="inputForm" value={this.state.formData.category || 'Category'} onChange={(e) => {this.handleChange(e, 'category')}}>
            <option value="Category" default disabled selected="selected" hidden>Category</option>
            <option value="Politics">Politics</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Random">Random</option>
          </select>
          </div>
          <div> 
            <textarea 
              rows="5"
              id="content_txt"
              name="TextArea1" 
              maxlength="50" 
              className="textbox" 
              type="textbox" 
              placeholder="Type in your notes"
              onChange={(e) => {this.handleChange(e, 'note')}}
              value={this.state.formData.note ? this.state.formData.note: ''}
              />
            </div>
            <div style={{marginLeft: '29%',marginTop: '30px'}}>
              <button className="btn" onClick={() => {this.onSubmit()}}>Submit</button>
            </div>
          </div>
          </div>
      );
    }
  }

  export default (Note);