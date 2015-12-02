import React from 'react-native';

const {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  TouchableHighlight
} = React;

import Firebase from 'firebase';
import Rebase from 're-base';

import styles from './ios_components/Styles';
import TourDetail from './ios_components/TourDetail';

const ref = new Firebase('https://hey-day-tours.firebaseio.com/');
const base = Rebase.createClass('https://hey-day-tours.firebaseio.com/');

class TourList extends React.Component {

    constructor() {
        super();
    }

    goToDetail(tour) {
        this.props.navigator.push({
            title: tour.name,
            component: TourDetail,
            passProps: { tour },
            rightButtonIcon: require('./images/ios7-location-outline.png')
        });
    }

    renderTour(tour) {
        return (
              <TouchableHighlight onPress={this.goToDetail.bind(this, tour)} style={styles.backDrop, styles.listItemContainer}>
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

class yesteryearNative extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let toursEndpoint = 'tours/';
        base.fetch(toursEndpoint, {
            context: this,
            then(data) {
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(data),
                  loaded: true
                })
            }
        });
    }

    renderLoadingView() {
        return (
          <View style={styles.container}>
            <Text style={styles.loadingText}>
              Getting tours...
            </Text>
          </View>
        );
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <NavigatorIOS ref="nav" style={styles.wrapper} initialRoute={{
                component: TourList,
                title: 'Tours',
                rightButtonIcon: require('./images/ios7-location-outline.png'),
                passProps: { dataSource: this.state.dataSource },
                }}
            />
        )
    }
}



let stylesTourDetail = StyleSheet.create({
    heroImg: {
        alignSelf: 'stretch',
        height: 200
    }
})

AppRegistry.registerComponent('yesteryearNative', () => yesteryearNative);
