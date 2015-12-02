var React = require('react-native');

var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

import styles from './Styles.js';

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
            <TouchableHighlight style={styles.backDrop, styles.listItemContainer}>
                <Image source={{uri: stop.image}} style={styles.backDropImage}>
                  <View style={styles.backdropView}>
                      <Text style={styles.title}>{stop.name}</Text>
                  </View>
                </Image>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderStop.bind(this)}
            />
        )
    }
}

module.exports = TourDetail;
