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
import TourList from './ios_components/TourList';

const ref = new Firebase('https://hey-day-tours.firebaseio.com/');
const base = Rebase.createClass('https://hey-day-tours.firebaseio.com/');

class App extends React.Component {

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

AppRegistry.registerComponent('yesteryearNative', () => App);
