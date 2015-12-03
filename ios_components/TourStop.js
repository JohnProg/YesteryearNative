import React from 'react-native';
import RNFS  from 'react-native-fs';
import Video from 'react-native-video';

let {
  Image,
  ListView,
  NativeModules,
  TouchableHighlight,
  Text,
  View,
} = React;

var { RNPlayAudio } = NativeModules;

import stylesTourDetail from './StylesTourDetail.js';
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
        this._listAllFiles();
        this._loadInitialState().done();
    }

    _loadInitialState() {
        return RNFS.readFile(RNFS.DocumentDirectoryPath + this.props.stop.stopID).then((data) => {
          this.setState({ output: 'Contents: ' + data });
      }).catch(err => console.log("some error"));
    }

    loadStart() {
        console.log('LOAD!');
        this.setState({
            player: 'loading'
        });
        this.insertMedia();
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

        RNPlayAudio.startAudio(

            "test.mp3", // filename

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

    _listAllFiles() {
        RNFS.readDir(RNFS.MainBundlePath)
          .then((result) => {
            console.log('GOT RESULT', result);
            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            console.log(contents);
          })
          .catch((err) => {
            console.log("error");
          });

          console.log("here comes docs: ");

        RNFS.readDir(RNFS.DocumentDirectoryPath)
          .then((result) => {
            console.log('GOT RESULT', result);
            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            console.log(contents);
          })
          .catch((err) => {
            console.log("error");
          });
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
                <Image source={require('../images/stop.png')} style={styles.stopImage}/>
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
            .catch(error => console.log("error in downloading"))

        console.log(tourStopPath);
        RNFS.readFile(tourStopPath)
            .then((data) => {console.log(data)})
            .catch((err) => {console.log("error reading...")});
    }

    insertMedia() {
            let filePath = '/assets/' + this.props.stop.stopID;
            return (
                <Video source={{uri: filePath }} // Can be a URL or a local file.
                   rate={1.0}                   // 0 is paused, 1 is normal.
                   volume={1.0}                 // 0 is muted, 1 is normal.
                   muted={false}               // Mutes the audio entirely.
                   paused={ this.state.player === 'paused'}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={false}
                   onLoadStart={this.loadStart.bind(this)} // Callback when video starts to load
                   style={styles.backgroundVideo} />
            )
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    key={this.props.stop.stopID}
                    index={this.props.stop.stopID}
                    onPress={this.getTourStopFromInternet.bind(this)}
                    style={styles.touchable}>
                    <View style={styles.tourStopContainer}>
                        <Image source={{uri: this.props.stop.image}} style={styles.stopImage}/>
                        <Text style={styles.stopName}>{this.props.stop.name}</Text>
                    </View>
                </TouchableHighlight>
                <View>
                    { this.renderPlayerIcon() }
                    { (this.state.player !== 'notloaded') ? this.insertMedia() : null }
                </View>
            </View>
        )
    }
}

module.exports = TourStop;
