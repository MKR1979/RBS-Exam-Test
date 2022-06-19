import React, { Component } from "react";
import PokemonDataService from "../services/pokemon.service";
import Evolutions from './show-evolutions.component';
import Pagination from './pagination.component';


export default class PokemonList extends Component {
  //const PokemonList = () => {
  constructor(props) {
    super(props);    
    this.retrieveData = this.retrieveData.bind(this);
    this.sortList = this.sortList.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.filterList = this.filterList.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    
    this.state = {
      pokemons: [],
      filterPokemons: [],
      searchName: "",
      visible:false,
      selectedNextEvolution:[],
      selectedPrevEvolution:[],
      selectedName:"",
      directionNum:"",
      directionName:"",
      isEvolutionFound:false
    };
  }

  componentDidMount() {
    this.retrieveData();
  }
  
  retrieveData() {
    PokemonDataService.getAll()
      .then(response => {
        let sortPokemons=this.sortList('name',response.data.pokemon);
        this.setState({
          pokemons: sortPokemons,
          filterPokemons:sortPokemons        
        });        
      })
      .catch(e => {
        console.log(e);
      });
  }

  sortList(colname,props) {      
      let sortedPokemons = props;
      let direction=this.state.directionNum!==""? this.state.directionNum: this.state.directionName;
      sortedPokemons.sort((a, b) => {
        if (a[colname] < b[colname]) {         
          return direction==="asc" || direction===""?-1:1;
        }
        if (a[colname] > b[colname]) {          
          return direction==="asc" || direction===""?1:-1;
        }
        return 0;
      }); 
      let directionNum=colname==='num' && this.state.directionNum===""?"asc": colname==='num' && this.state.directionNum==="asc"? "desc" :colname==='num' && this.state.directionNum==="desc"? "asc":"";           
      let directionName=colname==='name' && this.state.directionName===""?"asc": colname==='name' && this.state.directionName==="asc"? "desc" :colname==='name' && this.state.directionName==="desc"? "asc":"";           
      //
      this.setState({
        pokemons: sortedPokemons,
        filterPokemons:sortedPokemons, 
        directionNum:directionName===""?directionNum:"",
        directionName:directionNum===""?directionName:"",
      });        
      return(sortedPokemons);
  }
 
  getArrow(order) {
    if (order === 'asc') return '↑';
    if (order === 'desc') return '↓';
    return '';
  }

  handleSearchChange = e => {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });   
  }

  filterList = e => {    
    const updatedList = this.state.pokemons.filter(item => {
      return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filterPokemons: updatedList, 
      searchName:e.target.value,
     });
  }

  handleRowClick = (e,num) => {
    let selectedEvolution=this.state.pokemons.filter((item) => item.num === num);
    let selectedNextEvolution=selectedEvolution[0].next_evolution===undefined?[]:selectedEvolution[0].next_evolution;
    let selectedPrevEvolution=selectedEvolution[0].prev_evolution===undefined?[]:selectedEvolution[0].prev_evolution;
    let selectedName=selectedEvolution[0].name; 
    let isEvolutionFound=selectedNextEvolution.length>0||selectedPrevEvolution.length>0?true:false;    
    this.setState({ 
      visible: true,
      selectedName:selectedName,
      selectedNextEvolution:selectedNextEvolution,
      selectedPrevEvolution:selectedPrevEvolution,
      isEvolutionFound:isEvolutionFound
    });         
  }; 
  
  render() {
    const { searchName, filterPokemons } = this.state;  
    let evolutionsClose=()=>this.setState({visible: false}); 
    // const [pagination,setPagination] =useState({
    //   start:0,
    //   end:5
    // });   
    return (
      <div >
            <div className="row col-md-12">
                <div className="col-md-1">
                    <label>
                        <strong>Search: </strong>
                    </label>{""}
                </div>
                <div className="input-group mb-4 col-md-11">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"              
                    onClick={this.handleSearchChange}
                    onChange={this.filterList}
                    value={searchName}             
                  />           
                </div>
            </div>
            <div className="col-md-12">
                <table className="table table-hover">
                  <thead>                    
                      <tr>                      
                        <th className="col-md-2" onClick={() => this.sortList('num',this.state.pokemons)} >Num {this.getArrow(this.state.directionNum)}</th>
                        <th className="col-md-3" onClick={() => this.sortList('name',this.state.pokemons)}>Name {this.getArrow(this.state.directionName)}</th>
                        <th className="col-md-3">Type</th>
                        <th className="col-md-4">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filterPokemons.map((val, key) => {
                        let types="";
                        for(let i=0;i<val.type.length;i++)
                        {types=i===0?val.type[i]:types+", " +val.type[i]}
                      return (
                    
                      <tr key={key}  onClick={e=> this.handleRowClick(e,val.num)}> 
                          <td className="col-md-2">{val.num}</td>
                          <td className="col-md-3">{val.name}</td>                       
                          <td className="col-md-3">{types}</td>                         
                          <td className="col-md-4"><img src={val.img} alt="" /> </td>                         
                      </tr> 
                                                                  
                    )          
                  })}
                  </tbody>    
                  <tfoot>
                    <tr>
                      <td colspan="4">
                      <Pagination/> 
                      </td>
                    </tr>                  
                  </tfoot>                     
                </table>               
            </div>
            {/* <div><Pagination/>
            </div>  */}
            <Evolutions
                    show={this.state.visible}
                    onHide={evolutionsClose}
                    selectedNextEvolution={this.state.selectedNextEvolution}
                    selectedPrevEvolution={this.state.selectedPrevEvolution}
                    selectedName={this.state.selectedName}
                    isEvolutionFound={this.state.isEvolutionFound}>                
              </Evolutions> 
      </div>
        
    );
  }
}
