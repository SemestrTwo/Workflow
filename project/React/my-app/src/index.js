import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import basename from 'history/createBrowserHistory'
import './index.css'
const faker = require('faker');


const history = createHistory()
history.push('/tour/#besttourever/city1', { some: 'state' })
history.push('/tour/#besttourever/city2', { some: 'state' })
history.push('/tour/#besttourever/city3', { some: 'state' })
history.push('/tour/#mytourr/city1', { some: 'state' })
history.push('/tour/#mytourr/city2', { some: 'state' })
history.push('/tour/#mytourr/city3', { some: 'state' })
history.push('/tour/#backsummer2017/city1', { some: 'state' })
history.push('/tour/#backsummer2017/city2', { some: 'state' })
history.push('/tour/#backsummer2017/city3', { some: 'state' })
const location = history.location



class Header extends React.Component {
  constructor() {
    super()
  }

  render(){
    return(
      <header>
    		<nav class="name">{this.props.name}</nav>
    		<nav class="trip">{this.props.trip}</nav>
    		<nav class="datehead">{this.props.date}</nav>
    	</header>
    )
  }
}
class ReplyForm1 extends React.Component {
  constructor() {
    super()
  }
  render(){
    return(
      <body>
      <div className="container">
      <div className="pic1"><img src={require('./img/1.png')} /></div>
    	<div className="back1">
    	<div className="cityname1"><div className="cityname">{this.props.name}</div></div>
    	<div className="date1"><div className="date">{this.props.date}</div></div>
    	<div className="info1"><div className="info">{this.props.description}</div></div></div></div>
      </body>
    )
  }
}

//history.push('/#besttourever', { some: 'state' })

class Content extends React.Component{
  render(){
    return(
      <div className = "buttons" >
      < Header name="John Malkovich" trip="Best trip Ever!" date ="August 22-27, 2017"/>
      < ReplyForm1 name="Brokdorf" description="Brokdorf is a municipality in the district of Steinburg, in Schleswig-Holstein, Germany.\
    	The planning for a light-water nuclear power reactor at Brokdorf, 45 miles northwest of Hamburg, began in the late 1960s, and concerns about the Brokdorf Nuclear Power Plant proposal became a public issue in November 1973, when several nuclear power reactors were already operating in Germany. During construction in the 1970s and 1980s there were violent protests about Brokdorf by opponents. The largest onsite demonstrations were in November 1976, February 1977, January 1981 and June 1986." date ="August 22, 2017"/>
      < ReplyForm1 name="Grohnde" description="The Grohnde Nuclear Power Plant is located in Hamelin-Pyrmont in Lower Saxony. It has one reactor that uses 193 fuel assemblies and utilizes both enriched uranium and MOX fuel. In 1985, 1986, 1987, 1989, 1990 and 1998 the reactor produced more net electricity for the respective year than any other reactor in the world. The plant is of the pressurized water reactor type, using four water based coolant cycles, kept under high pressure. About 80,000 people live within 10 kilometres (6.2 mi) of the plant and a total of more than a million people within 60 kilometres. The next big city is Hanover 50 kilometres away."
       date ="August 25, 2017"/>
       < ReplyForm1 name="Biblis" description="In 836, Biblis had its first documentary mention in the Lorsch Abbey’s Codex Laureshamensis under the name Bibifloz when King Louis the German donated his holdings in Biblis, Wattenheim and Zullestein to his faithful vassal Wernher, who in turn bequeathed them to the Lorsch Abbey in 846. From 1461 to 1623, the area was pledged to the Palatinate, and in the Reformation’s wake it became Protestant, although after the retrocession, it became Catholic again. With Secularization in 1803, the community passed to what later became the Grand Duchy of Hesse and was assigned to the district of Worms."
       date ="August 26, 2017"/>
      </div>
    )
  }
}


ReactDOM.render( < Content/>, document.getElementById('root'));
