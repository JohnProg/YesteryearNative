import React from 'react-native';
import RNFS  from 'react-native-fs';
import stylesTourDetail from './StylesTourDetail.js';

let {
  Image,
  ListView,
  NativeModules,
  TouchableHighlight,
  Text,
  View,
} = React;

var { RNPlayAudio } = NativeModules;

let styles = stylesTourDetail;

class TourStop extends React.Component {

    constructor() {
        super();
        this.state = {
            player: '',
            audioFilePath: null,
            messages: []
        }
    }

    componentDidMount() {
        this.setState({
            player: 'notloaded'
        })
        this._loadInitialState();
    }

    _loadInitialState() {
        var testFilePath = RNFS.DocumentDirectoryPath + '/test.mp3';
        RNFS.readFile(testFilePath, 'base64')
        .then((data) => {
          console.log("tour stop already downloaded");
            this._loadEnded();
          })
        .catch(err => console.log("initially, nada here", err));
    }

    loadStart() {
        console.log('LOAD!');
        this.setState({
            player: 'loading'
        });
    }

    _loadEnded() {
        this.setState({
            player: 'loaded'
        });
        this._pause();
    }

    _play() {
        console.log("PLAY!");
        this.setState({
            player: 'playing'
        });

        let myAudioFile = "test.mp3";

        RNPlayAudio.startAudio(

            myAudioFile, // filename
            function errorCallback(results) {
                console.log('JS Error: ' + results['errMsg']);
            },
            function successCallback(results) {
                console.log('JS Success: ' + results['successMsg']);
            }
        );
    }

    _pause() {
        console.log('PAWS!');
        this.setState({
            player: 'paused'
        });

        RNPlayAudio.pauseAudio(
            "test.mp3", // fileName
            function errorCallback(results) {
                console.log('JS Error: ' + results['errMsg']);
            },
            function successCallback(results) {
                console.log('JS Success: ' + results['successMsg']);
            }
        );
    }

    renderPlayerIcon() {
        if (this.state.player === 'loading') {
            return (
                <Image source={require('../images/slow.png')} style={styles.stopImage}/>
            )
        }
        else if (this.state.player === 'loaded') {
            return (
                <TouchableHighlight onPress={this._play.bind(this)}>
                    <Image source={require('../images/go.png')} style={styles.stopImage}/>
                </TouchableHighlight>
            )
        }
        else if (this.state.player === 'notloaded') {
            return (
                <TouchableHighlight onPress={this.getTourStopFromInternet.bind(this)} style={styles.touchable}>
                    <Image source={require('../images/stop.png')} style={styles.stopImage}/>
                </TouchableHighlight>

            )
        }
        else if (this.state.player === 'playing') {
            return (
                <TouchableHighlight onPress={this._pause.bind(this)} style={styles.touchable}>
                    <Image source={require('../images/playing.png')} style={styles.stopImage}/>
                </TouchableHighlight>
            )
        }
        else if (this.state.player === 'paused') {
            return (
                <TouchableHighlight onPress={this._play.bind(this)} style={styles.touchable}>
                    <Image source={require('../images/paused.png')} style={styles.stopImage}/>
                </TouchableHighlight>
            )
        }
    }

    getTourStopFromInternet() {
        let tourStopPath = RNFS.DocumentDirectoryPath + '/test.mp3';
        RNFS.downloadFile(this.props.stop.audioURL, tourStopPath)
            .then(response => {
                this._loadEnded();
                console.log(JSON.stringify(response))
            })
            .catch(error => console.log("error in downloading"));
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    key={this.props.stop.stopID}
                    index={this.props.stop.stopID}
                    style={styles.touchable}>
                    <View style={styles.tourStopContainer}>
                        <Image source={{uri: this.props.stop.image}} style={styles.stopImage}/>
                        <Text style={styles.stopName}>{this.props.stop.name}</Text>
                    </View>
                </TouchableHighlight>
                <View>
                    { this.renderPlayerIcon() }
                </View>
            </View>
        )
    }
}

module.exports = TourStop;
