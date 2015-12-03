var React = require('react-native');
import Video from 'react-native-video';

var {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  View,
} = React;

import stylesTourDetail from './StylesTourDetail.js';
let styles = stylesTourDetail;

import TourStop from './TourStop.js';

class TourDetail extends React.Component {

    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.tour.stops)
        })
    }

    renderTourStop(stop) {
        return (
            <TourStop stop={stop}/>
        )
    }

    render() {
        return (
            <View style={styles.detailWrap}>
                <Image source={{uri: this.props.tour.image}} style={styles.tourDetailHeroImage}>
                  <View style={styles.backdropView}>
                      <Text style={styles.tourDetailTitle}>{this.props.tour.name}</Text>
                      <Text style={styles.tourDetailSubtitle}>{this.props.tour.totalTime} minutes</Text>
                      <Text style={styles.tourDetailSubtitle}>${this.props.tour.price}</Text>
                  </View>
                </Image>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderTourStop.bind(this)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        )
    }
}

module.exports = TourDetail;
