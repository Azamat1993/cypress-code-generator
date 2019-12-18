// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import BrowserWindow from '../browser/Window';
import cypressBus from '../CypressBus';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      action: null
    }

    cypressBus.on("browser:action", e => {
      this.setState({
        action: e
      })
    });
  }

  render() {
    const { action } = this.state;

    return (
      <div class="container" className={styles.container}>
        <BrowserWindow className={styles.browser}/>
      </div>
    );
  }
}
