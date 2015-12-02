var React = require('react-native');

var { StyleSheet } = React;

import type { StyleObj } from 'StyleSheetTypes';

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tourDetail: {
    marginTop: 50,
    color: 'black'
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
  mapIcon: {
      width: 10
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

module.exports = styles;
