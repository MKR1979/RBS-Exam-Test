import React, { Component } from "react";
import {Modal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default class Evolutions extends Component {
  
  render() {
    let prevEvolutions=""; let nextEvolutions=""; let evolutionHeader="";
    if(this.props.selectedprevevolution.length>0)
    {
          prevEvolutions=<div className="form-container" >
          <label> Previous evolutions</label>         
          <table className="evolution">
            <thead>            
              <tr>
                <th className="col-md-1">Num</th>
                <th className="col-md-1">Name</th>          
              </tr>  
              </thead>  
              <tbody>            
              {this.props.selectedprevevolution.map((val, key) => {          
                return (
                  <tr key={key}  onClick={e=> this.handleRowClick(e,val.num)} styles={{ marginTop: 1 }}> 
                    <td className="col-md-1">{val.num}</td>
                    <td className="col-md-1">{val.name}</td>              
                  </tr>           
                )          
              })}
              </tbody> 
            </table>    
      </div>
    }
    if(this.props.selectednextevolution.length>0)
    {
      nextEvolutions= <div className="form-group">
              <label htmlFor="title">Next evolutions</label>
              <table className="evolution"> 
              <thead>           
              <tr>
                <th className="col-md-1">Num</th>
                <th className="col-md-1">Name</th>          
              </tr>  
              </thead>
              <tbody>           
              {this.props.selectednextevolution.map((val, key) => {          
                return (
                  <tr key={key}  onClick={e=> this.handleRowClick(e,val.num)} styles={{ marginTop: 1 }}> 
                    <td className="col-md-1">{val.num}</td>
                    <td className="col-md-1">{val.name}</td>              
                  </tr>                             
                )          
              })}
              </tbody>    
            </table>    
      </div>      
    }
    evolutionHeader=this.props.isevolutionfound==="n"? "There is no evolution for "+this.props.selectedname: "Evolutions for "+this.props.selectedName;
    return (<div>
      <Modal
      {...this.props}
      size="10"    aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">          
        {evolutionHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body> 
        {prevEvolutions}
        {nextEvolutions}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal> </div>
    );
  }
}
