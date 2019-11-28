import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component{
  constructor(props){
    super(props);
    this.state={
      books:[]
    }
  }
  componentDidMount(){
    axios.defaults.headers.common['Authorization']=localStorage.getItem('jwtToken');
    axios.get('/api/book')
    .then(res => {
      this.setState({books:res.data})
      console.log(this.state.books)
    })
    .catch((error) => {
      if(error.response.status === 401){
        this.props.history.push('/login')
      }
    });
  }
  logout = () => {
    localStorage.removeItem('jwtToken')
    window.location.reload();
  }
  render(){
    return(
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOK CATALOG &nbsp;
              {localStorage.getItem('jwtToken')&&
                <button class="btn btn-primary" onClick={this.logout}>
                  Logout
                </button>
              }
              </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Description</th>
                  <th>Publisher</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(book => 
                  <tr>
                    <td>{book.title} </td>
                    <td>{book.author} </td>   
                    <td>{book.description} </td>
                    <td>{book.publisher} </td>  


                  </tr>
                 )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
