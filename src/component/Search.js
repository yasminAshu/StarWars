import React from 'react';
import { SearchResult } from './SearchResult'
import { Redirect } from 'react-router-dom'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            planets: [],
            filterPlanets: [],
            logout: false
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
   *@discription - This function is will fetch the value of all the planet
   @param e- Target value of the search box
   */
    search = (e) => {
        let search = e.target.value;
        const { planets } = this.state;
        if (search !== "") {
            let filterPlanets = planets.filter((planet) => {
                return planet.name.toLowerCase().includes(search.toLowerCase())
            })
            this.setState({ filterPlanets: filterPlanets })
        } else {
            this.setState({ filterPlanets: [] })
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
            <div className="main-container">
                <button onClick={this.logout} className="logout">Logout</button>
                <div className="search-container">
                    <input type="text" id="search-bar" placeholder="Search Planet...." onChange={this.search} />
                    <i className="fa fa-search search-icon" aria-hidden="true"></i>
                </div>
                {this.state.filterPlanets.length !== 0 && <SearchResult maxPopulation={maxPopulation} planets={this.state.filterPlanets} />}
            </div>

        )
    }
}



export default Search