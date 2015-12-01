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
            <Text style={styles.loadingText}>
              Getting tours...
            </Text>
          </View>
        );
    }

    renderTour(tour) {
        return (
          <View style={styles.listItemContainer}>
            <Image source={{uri: tour.image}} style={styles.backDrop}>
              <View style={styles.backdropView}>
                  <Text style={styles.title}>{tour.name}</Text>
              </View>
            </Image>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center'
  },
  listItemContainer: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  loadingText: {
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20
  },
  backdropView: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: 120
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 20,
    shadowOffset:{
            width: 0,
            height: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    textAlign: 'center'
  },
  tourItemSubtitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center'
  },
  backDrop: {
    paddingTop: 60,
    alignSelf: 'stretch'
  }
});

AppRegistry.registerComponent('yesteryearNative', () => yesteryearNative);
