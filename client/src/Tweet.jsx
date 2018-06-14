import React from 'react';
import { DragSource } from 'react-dnd';
import './style/tweet.scss';
import IconButton from 'material-ui/IconButton';
import ActionAccountCircles from 'material-ui/svg-icons/action/account-circle';
import ActionThumbs from 'material-ui/svg-icons/action/thumbs-up-down';
import axios from 'axios';
import c3 from 'c3';

/**
 * npm install react-modal
 * npm install material-ui
 */

const Types = {
	item: 'tweet',
}

const itemSource = {
	beginDrag(props, monitor, component) {
		component.props.dragging();
		const item = {idx: props.id, type: props.type};
		return item;
	}, 
	endDrag(props, monitor, component) {
		component.props.dragging();
		if (!monitor.didDrop()) {
			return;
		}
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult();

	},
	isDragging(props, monitor) {
		return monitor.getItem().id = props.id
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Tweet extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			comparisonUsers: [],
			canOpen: "none",
            score: this.props.tweet.score
        }
        this.find = this.find.bind(this)
        this.chart = this.chart.bind(this)
        this.buttonNgraph = this.buttonNgraph.bind(this)
	}
	
	find(name){
		// console.log(name)
        axios.get('/userBattle', {params:{user: name}})
            .then((res)=>{
				// console.log(res.data)
				this.setState({neg: res.data.neg, pos: res.data.pos}, ()=>{this.setState({canOpen: "inline-block"})} )
			})
    }

	buttonNgraph(){
		if(this.state.score !== 0){
			return <div 
				onMouseEnter={()=>{
						this.chart(this.state.score)
						this.setState({canOpen: "inline-block"});
					}}
					onMouseLeave={(e)=>{this.setState({canOpen: "none"});
				}}>
				<ActionThumbs />
				<span style={{display:this.state.canOpen}}>Score {this.state.score}</span>
				<div className={`chart${this.props.id}`} style={{display:this.state.canOpen, marigin:"10px" }}></div>
			</div>
		}
	}

	chart(data) {
		console.log('chart func');
		c3.generate({
			bindto: ".chart"+this.props.id, //chart goes in to here
			data: {
				columns: [
					['data', Math.abs(data)]
				],
				type: 'gauge',
				onclick: function (d, i) { console.log("onclick", d, i); },
				onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			},
			gauge: {
		       label: {
		           format: function(value, ratio) {
					   if(data > 0){

						   return value + "0% Positive";
					   }else{
							return value + "0% Negative";
					   }
		           },
		        //    show: false // to turn off the min/max labels.
		       },
		   min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
		   max: 10, // 100 is default
		//    units: ' %',
		//    width: 39 // for adjusting arc thickness
			},
			color: {
				pattern: ['red', 'orange', 'yellow'], // the three color levels for the percentage values.
				threshold: {
		//            unit: 'value', // percentage is default
		//            max: 200, // 100 is default
					values: [0, 5, 10]
				}
			},
			size: {
				height: 100
			}
		})
	};
	

	componentDidMount(){
		// this.props.chart(this.state.score)	
	}

	render(){
		const styles = {
      smallIcon: {
        width: 36,
        height: 36,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
			profilebutton: {
				right: "-90%",
				bottom: 25
			}
		};
			
	const { isDragging, connectDragSource } = this.props
	return connectDragSource(
		<div className="tweetBody" data-key={this.props.data} data-type={this.props.type}>

				<IconButton
				iconStyle={styles.smallIcon}
				style={Object.assign(styles.small, styles.profilebutton)}
				onClick={() => {this.props.clickHandler(this.props.tweet.user_name)}}>
					<ActionAccountCircles style={{}}/>
				</IconButton> 
			

			<div className="header row">
				<img className="avatar" src={this.props.tweet.avatar_url}></img>
				<h3>
					<a target="_blank" href={'https://twitter.com/'+this.props.tweet.user_name}><span>@</span>{this.props.tweet.user_name}</a>
				</h3>
			</div>

			<div className="tweetText row">
				<p className="col col-6-of-6" dangerouslySetInnerHTML={{ __html: this.props.tweet.tweetBody }}></p>
				<span className="timeStamp col right-3-of-6">{this.props.tweet.created_at}</span>
			</div>
			<hr/>
				{/* <IconButton
							iconStyle={styles.smallIcon}
							style={Object.assign(styles.small, styles.profilebutton)}
							onClick={() => {this.props.clickHandler(this.props.tweet.user_name)}}
						> */}
			{this.buttonNgraph()}
			{/* if(this.state.score !== 0){
				<div 
					onMouseEnter={()=>{
							this.chart(this.state.score)
							this.setState({canOpen: "inline-block"});
						}}
						onMouseLeave={(e)=>{this.setState({canOpen: "none"});
					}}>
					<ActionThumbs />
					<span style={{display:this.state.canOpen}}>Score {this.state.score}</span>
					<div className={`chart${this.props.id}`} style={{display:this.state.canOpen, marigin:"10px" }}></div>
				</div>
			} */}
			
			
		</div>
		)
	}
}

// export default Tweet;

export default DragSource(Types.item, itemSource, collect)(Tweet);