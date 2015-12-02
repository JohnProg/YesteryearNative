var React = require('react-native');

var { StyleSheet } = React;

import type { StyleObj } from 'StyleSheetTypes';

let stylesTourDetail = StyleSheet.create({
  tourDetail: {
    marginTop: 50,
    color: 'black'
  },
  detailWrap: {
      flex: 1,
      flexDirection: 'column'
  },
  backdropView: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
    height: 120,
    marginTop: 40
  },
  stopImage: {
      flex: 1,
      width: 80,
      height: 80
  },
  stopName: {
      flex: 2,
      fontSize: 14
  },
  tourDetailHeroImage: {
    alignSelf: 'stretch',
    height: 240,
    flex: 1,
    marginTop: 63
  },
  tourDetailTitle: {
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      fontSize: 30,
      shadowOffset:{
          width: 0,
          height: 1,
      },
      fontWeight: "bold",
      shadowColor: 'black',
      shadowOpacity: 1.0
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  tourDetailSubtitle: {
      fontSize: 16,
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white'
  },
  tourStopContainer: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center'
  }
});

module.exports = stylesTourDetail;
