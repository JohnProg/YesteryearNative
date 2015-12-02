var React = require('react-native');

var {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  View,
} = React;

import stylesTourDetail from './StylesTourDetail.js';
let styles = stylesTourDetail;

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

    renderStop(stop) {
        return (
            <TouchableHighlight style={styles.touchable} key={stop.stopID} index={stop.stopID}>
                <View style={styles.tourStopContainer}>
                    <Image source={{uri: stop.image}} style={styles.stopImage}/>
                      <View>
                          <Text style={styles.stopName}>{stop.name}</Text>
                      </View>
                </View>
            </TouchableHighlight>
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
                    renderRow={this.renderStop.bind(this)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        )
    }
}

module.exports = TourDetail;
