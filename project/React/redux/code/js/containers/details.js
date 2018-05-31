import React, {Component} from 'react';
import {connect} from 'react-redux';


class Details extends Component {
  render(){
    if(!this.props.car){
      return(<p>Выберите то, что вы хотите увидеть..</p>);
    }
    return(
      <div>
        <div>
          <p>Progress: {this.props.car.progress}%</p>
        </div>
        <div>
          <p>Progress: {this.props.car.statistic}%</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    car  : state.active
  };
}

export default connect (mapStateToProps)(Details);
