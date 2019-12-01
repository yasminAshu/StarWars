import React from 'react';
import { SearchResult } from './SearchResult'
import { Redirect } from 'react-router-dom'
import RootContect from './Contexts'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            planets: [],
            filterPlanets: [],
            logout: false,
            count:0,
            timeLeft:60
        }
    }

    /**
   * 
   *@discription - This function is will fetch the value of all the planet
   */
    componentDidMount() {
        try {
            fetch("https://swapi.co/api/planets", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((resp) => resp.json())
                .then((data) => {
                    this.setState({ planets: data.results })
                });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    /**
   * 
   *@discription - This function is for timer to check number of count in a minute
   @param e- Target value of the search box
   */
    
   timer = ()=> {
    this.setState({timeLeft:this.state.timeLeft-1})
    if(this.state.timeLeft == 0){
        clearInterval(this.timer)   
    }
   }
   
  /**
   * 
   *@discription - This function is will fetch the value of all the planet
   @param e- Target value of the search box
   */
    search = (e,userName) => {
        let search = e.target.value;
        const { planets,count } = this.state;
        if(count === 0){
            this.timer = setInterval(this.timer,1000);
          }
        if (search !== "" && this.state.timeLeft !==0 && count<14  || userName === "Luke Skywalker") {
            let filterPlanets = planets.filter((planet) => {
                return planet.name.toLowerCase().includes(search.toLowerCase())
            })
            this.setState({ filterPlanets: filterPlanets,count:count+1 })
        }  else if(this.state.timeLeft === 0){
            this.setState({count:0,timeLeft:60})
        }else {
            this.setState({ filterPlanets: [] ,count:count+1})
        }
       

    }

   /**
   * 
   *@discription - This function will logout user
   */
    logout = () => {
        this.setState({ logout: true })
    }

   /**
   * 
   *@discription - This function will render the jsx of search form
   */
    render() {
        const maxPopulation = this.state.filterPlanets.length !== 0 && this.state.filterPlanets.reduce(function (prev, current) {
            return (parseInt(prev.population) > parseInt(current.population)) ? prev : current
        })
        if (this.state.logout) {
            return <Redirect to='/' />;
        }
        return (
            <RootContect.Consumer>
                {context => (
                       <div className="main-container">
                       <button onClick={this.logout} className="logout">Logout</button>
                       <div className="search-container">
                               <input type="text" id="search-bar" placeholder="Search Planet...." onChange={(e)=>this.search(e,context.userName)} />
                           <i className="fa fa-search search-icon" aria-hidden="true"></i>
                       </div>
                       {this.state.count == 14 && <div className="error">Only 15 serches Allowed in a minute</div>}
                       {this.state.filterPlanets.length !== 0 && <SearchResult maxPopulation={maxPopulation} planets={this.state.filterPlanets} />}
                   </div>
                )}
         </RootContect.Consumer>

        )
    }
}



export default Search