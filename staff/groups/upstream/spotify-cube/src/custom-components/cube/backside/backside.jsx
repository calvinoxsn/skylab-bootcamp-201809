import React, {Component} from 'react'
import Header from '../../header/header'
import SideTitle from '../../sidetitle/sidetitle'
import List from '../../list/list';

export default class BackSide extends Component{

  state = {albums:this.props.albumlist}

    render() {
        return (
    
          <section className="back">
            <div className = "rotateY-180">
              <Header></Header>
              <SideTitle title="Albums list" image ="metallica.png"></SideTitle>
              <List type="album" list={this.state.albums}></List>
            </div>
            
          </section>
        )
      }
}