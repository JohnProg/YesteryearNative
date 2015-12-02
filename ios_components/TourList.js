var React = require('react-native');

var {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  View,
} = React;

import TourDetail from './TourDetail';
import styles from './Styles.js';

class TourList extends React.Component {

    constructor() {
        super();
    }

    goToDetail(tour) {
        this.props.navigator.push({
            title: tour.name,
            component: TourDetail,
            passProps: { tour },
            rightButtonIcon: require('../images/ios7-location-outline.png')
        });
    }

    renderTour(tour) {
        return (
              <TouchableHighlight onPress={this.goToDetail.bind(this, tour)} style={styles.backDrop, styles.listItemContainer} key={tour}>
                  <Image source={{uri: tour.image}} style={styles.backDropImage}>
                    <View style={styles.backdropView}>
                        <Text style={styles.title}>{tour.name}</Text>
                    </View>
                  </Image>
              </TouchableHighlight>
        )
    }

    render() {
        return (
            <ListView
                dataSource={this.props.dataSource}
                renderRow={this.renderTour.bind(this)}
            />
        )
    }
}

module.exports = TourList;
