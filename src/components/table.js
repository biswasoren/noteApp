import React from 'react';
import './table.css';
import PropTypes from 'prop-types';

const Headers = [{
  value: 'Title',
},
{ value: 'Notes'},
{ value: 'Category'},
{ value: 'Created_at'},
{ value: '', wd: '10%'},]

class Note extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
      }
    }

    static propTypes = {
      data: PropTypes.array.isRequired,
    };
  
    componentDidMount() {
    }

    render() {
      return (
        <div style={{height: '50%'}}>
          <table style={{width: '100%'}}>
            <thead className="thead">
              {Headers.map(header => 
            <th className="th" style={{ width: header.wd ? header.wd: 'none'}}>{header.value}</th>
                )}
            </thead>
            <tbody>
              {this.props.data.map(row => <tr className="tr">
              {row.map(value => <td>{value}</td>)}
              </tr>)}
              </tbody>
            </table>
        </div>
      );
    }
  }

  export default (Note);