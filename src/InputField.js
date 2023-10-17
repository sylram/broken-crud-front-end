
import { Button } from 'react-bootstrap';
import React from "react";

class Inputfield extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      idValue: '',
      nameValue: '',
      lastNameValue: 'AlcA',
      data: [],
      flag: false,
      personObj: {},
    };

    

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPerson = this.fetchPerson.bind(this);
    this.getAll = this.fetchAll.bind(this);
    this.updatePerson = this.handleUpdate.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    
  }


  handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.id;
      this.setState.personObj = ({...this.setState.personObj, [name]: value });
      this.setState.idValue= value;
      console.log(this.setState.personObj);
     
  }

  handleUpdate(event) {
    this.setState.data = '';
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:8083/person-controller/update/' + this.setState.personObj.id, {
          method: 'PUT',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
          body: JSON.stringify(this.setState.personObj),
        });
        if (!response.ok) {
          this.setState.flag = false;
          this.setState.data = 'Person';
          this.forceUpdate();
          return (<div>'Network response was not ok'</div>)
          // throw new Error('Network response was not ok');
          
        }
        const data = await response.json();
        if (data) {
          this.setState.data = [data];
          this.setState.flag = true;
          this.forceUpdate() // force re-render component
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
    event.preventDefault();
    this.setState.personObj={};
    
  }

  handleSubmit(event) {
    this.setState.data = '';
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:8083//person-controller/create', {
          method: 'POST',
          headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
          body: JSON.stringify(this.setState.personObj),
        });
        if (!response.ok) {
          this.setState.flag = false;
          this.setState.data = 'Error creating Person';
          this.forceUpdate();
          this.setState.personObj = {};
          return (<div>'Network response was not ok'</div>)
          
        }
        const data = await response.json();
        if (data) {
          this.setState.data = [data];
          this.setState.flag = true;
          this.setState.idValue ='';
          this.setState.nameValue = '';
          this.setState.lastNameValue = '';
          this.forceUpdate() // force re-render component
        }
      } catch (error) {
        console.error('Error:', error);
        this.setState.flag = false;
        this.setState.data = 'Error creating Person';
        this.forceUpdate();
      }
    }
    fetchData();
    event.preventDefault();
  
    
  }

  fetchPerson(event) {
    this.setState.data = '';
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:8083/person-controller/read/' + this.setState.personObj.id, {
          method: 'GET',
        });
        if (!response.ok) {
          this.setState.flag = false;
          this.setState.data = 'Network response was not ok';
          this.forceUpdate();
          throw new Error('Network response was not ok');
          
        }
        const data = await response.json();
        if (data) {
          this.setState.data = [data];
          this.setState.flag = true;
          this.forceUpdate() // force re-render component
        }
      } catch (error) {
        console.error('Error:', error);
        this.setState.flag = false;
        this.setState.data = error.message;
        this.forceUpdate();
      }
    }
    fetchData();
    event.preventDefault();
  }

  deletePerson(event) {
    this.setState.data = '';
    const deleteData = async() => {
      try {
        const response = await fetch('http://localhost:8083/person-controller/delete/' + this.setState.personObj.id, {
          method: 'DELETE',
        });
        if (!response.ok) {
          this.setState.flag = false;
          this.setState.data = 'Network response was not ok';
          this.forceUpdate();
          throw new Error('Network response was not ok');
          
        }
        const data = await response.json();
        if (data) {
          this.setState.flag = false;
          this.setState.data = 'Person has been deleted -> ' + data.firstName + " " + data.lastName;
          this.forceUpdate();
        }
      } catch (error) {
        console.error('Error:', error);
        this.setState.flag = false;
        this.setState.data = error.message;
        this.forceUpdate();
      }
    }
   deleteData();
    event.preventDefault();
  }

  fetchAll(event) {
    this.setState.data = '';
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:8083/person-controller/readAll', {
          method: 'GET',
        });
        if (!response.ok) {
          this.setState.flag = false;
          this.setState.data = 'Network response was not ok';
          this.forceUpdate();
          // return (<div>'Network response was not ok'</div>)
          throw new Error('Network response was not ok');
          
        }
        const data = await response.json();
        if (data) {
          this.setState.data = data;
          this.setState.flag = true;
          this.forceUpdate() // force re-render component
        }
      } catch (error) {
        console.error('Error:', error);
        this.setState.flag = false;
        this.setState.data = error.message;
        this.forceUpdate();
      }
    }
    fetchData();
    event.preventDefault();
  }

  render() {
    return (
      <><div>
        <form onSubmit={(ev) => ev.target.reset()} >
          <label>
            Id:
            <br></br>
            <input type="text" id="id" onChange={this.handleInputChange} />
          </label> <br></br>
          <label>
            First Name:
            <br></br>
            <input type="text" id="firstName" onChange={this.handleInputChange} />
          </label><br></br>
          <label>
            Last Name:
            <br></br>
            <input type="text" id="lastName" onChange={this.handleInputChange} />
          </label><br></br>
          <Button className="button" onClick={this.handleSubmit}>Create</Button>
          <Button className="button" onClick={this.getPerson}>Read</Button>
          <Button className="button" onClick={this.updatePerson}>Update</Button>
          <Button className="button" onClick={this.getAll}>Read All</Button>
          <Button className="button" onClick={this.deletePerson}>Delete</Button>

        </form>
      </div>
        <div className="grid">
          
          <table className="table">
          {this.setState.flag === true &&
          <tbody >
            <tr >
            <th scope="col">id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            </tr> 
            {this.setState.data.length ? this.setState.data.map((item, index) => (
              <tr key={index}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              </tr>
            )) : <span></span>}  
           </tbody>}
        </table>
        </div>
        {this.setState.flag === false && <div  className='error'>{this.setState.data}</div> }
        </>
    );
  }
}
export default Inputfield;

