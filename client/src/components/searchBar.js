import React from 'react';

class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {question: ''};
    }
    handleChange(e){
        this.setState({question: e.target.value});
    }
    render() {
        const question = this.state.question;
        return (
          <input
            type = "text"
            value = {question} 
            className='search-bar'
            onChange = {this.handleChange} 
            placeholder = "Search..."
          />
        );
      }


    }
    

export default SearchBar;