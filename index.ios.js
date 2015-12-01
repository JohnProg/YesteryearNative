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

const ref = new Firebase('https://hey-day-tours.firebaseio.com/');
const base = Rebase.createClass('https://hey-day-tours.firebaseio.com/');

class TourList extends React.Component {

    constructor() {
        super();
    }

    goToDetail() {
        this.props.navigator.push({
            title: 'A tour detail view',
            component: TourDetail
        });
    }

    renderTour(tour) {
        console.log(this);
        return (
              <TouchableHighlight onPress={this.goToDetail.bind(this)} style={styles.backDrop, styles.listItemContainer}>
                  <Image source={{uri: tour.image}} style={styles.backDropImage}>
                    <View style={styles.backdropView}>
                        <Text style={styles.title}>{tour.name}</Text>
                    </View>
                  </Image>
              </TouchableHighlight>
        )
    }

    render() {
        console.log(this);
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
                rightButtonTitle: 'Map',
                passProps: { dataSource: this.state.dataSource },
            }}
            />
        )
    }
}

class TourDetail extends React.Component {
    render() {
        console.log("tour detail happening");
        return (
            <Text>I'm here</Text>
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
  },
  listItemContainer: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10
},
  backdropView: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
    height: 120,
    marginTop: 40
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 30,
    shadowOffset:{
        width: 0,
        height: 1,
    },
    fontWeight: "bold",
    shadowColor: 'black',
    shadowOpacity: 1.0,
    textAlign: 'center'
  },
  tourItemSubtitle: {
    textAlign: 'center'
  },
  backDrop: {
    marginTop: 10,
    alignSelf: 'stretch',
    height: 120
  },
  backDropImage: {
    alignSelf: 'stretch',
    height: 120
  },
  wrapper: {
      flex: 1
  }
});

AppRegistry.registerComponent('yesteryearNative', () => yesteryearNative);
