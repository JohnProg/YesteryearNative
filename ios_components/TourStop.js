var React = require('react-native');
import Video from 'react-native-video';

var {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  View,
} = React;

import stylesTourDetail from './StylesTourDetail.js';
let styles = stylesTourDetail;


class TourStop extends React.Component {

    constructor() {
        super();
        this.state = {
            player: ''
        }
    }

    componentDidMount() {
        this.setState({
            player: 'notloaded'
        })
    }

    loadStart() {
        console.log('LOAD!');
        this.setState({
            player: 'loading'
        });
        this.insertMedia();
    }

    setDuration() {
        this.setState({
            player: 'loaded'
        });
        this._pause();
    }

    _togglePlayback() {
        console.log('TAWGLE!');
        if (this.state.player === 'playing') {
            this._pause();
        }
        else if (this.state.player === 'paused') {
            this._play()
        }
    }

    _play() {
        this.setState({
            player: 'playing'
        });
    }

    _pause() {
        console.log('PAWS!');
        this.setState({
            player: 'paused'
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
                <TouchableHighlight onPress={this.togglePlayer}>
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

    insertMedia() {
            return (
                <Video source={{uri: "https://s3.amazonaws.com/yesteryear-tours/School-gym.mp3"}} // Can be a URL or a local file.
                   rate={1.0}                   // 0 is paused, 1 is normal.
                   volume={1.0}                 // 0 is muted, 1 is normal.
                   muted={false}               // Mutes the audio entirely.
                   paused={ this.state.player === 'paused'}               // Pauses playback entirely.
                   resizeMode="cover"           // Fill the whole screen at aspect ratio.
                   repeat={false}
                   onLoadStart={this.loadStart.bind(this)} // Callback when video starts to load
                   onLoad={this.setDuration.bind(this)}    // Callback when video loads
                   style={styles.backgroundVideo} />
            )
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    key={this.props.stop.stopID}
                    index={this.props.stop.stopID}
                    onPress={this.loadStart.bind(this)}
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
