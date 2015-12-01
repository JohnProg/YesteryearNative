import React from 'react-native';

const {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

import Firebase from 'firebase';
import Rebase from 're-base';

const ref = new Firebase('https://hey-day-tours.firebaseio.com/');
const base = Rebase.createClass('https://hey-day-tours.firebaseio.com/');

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
            <Text>
              Getting tours...
            </Text>
          </View>
        );
    }

    renderTour(tour) {
        return (
          <View style={styles.container}>
            <Image
              source={{uri: tour.image}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{tour.title}</Text>
              <Text style={styles.year}>{tour.description}</Text>
            </View>
          </View>
        );
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderTour}
                style={styles.listView}
            />
        )
    }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
},
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
  }
});

AppRegistry.registerComponent('yesteryearNative', () => yesteryearNative);
