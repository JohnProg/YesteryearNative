import React from 'react-native';
import Video from 'react-native-video';

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
            <Video source={{uri: "train"}} // Can be a URL or a local file.
               rate={1.0}                   // 0 is paused, 1 is normal.
               volume={0}                 // 0 is muted, 1 is normal.
               muted={false}                // Mutes the audio entirely.
               paused={false}               // Pauses playback entirely.
               resizeMode="cover"           // Fill the whole screen at aspect ratio.
               repeat={true}
               style={styles.backgroundVideo} />
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
