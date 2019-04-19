import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { ProgressBar, Paragraph, Colors, withTheme } from 'react-native-paper'

class ProgressBarExample extends React.Component {
  static title = 'Progress Bar';

  state = {
    progress: 0,
  };

  componentDidMount() {
    this._interval = setInterval(
      () =>
        this.setState(state => ({
          progress: state.progress < 1 ? state.progress + 0.01 : 0,
        })),
      16
    );
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _interval

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        
        <ProgressBar progress={this.state.progress} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default withTheme(ProgressBarExample);
