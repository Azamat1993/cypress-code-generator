// @flow
import * as React from 'react';

import styles from './App.css';
import { Header } from '../header';
import { ControlBar } from '../control-bar';
import { SideBar } from '../sidebar';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <React.Fragment>
      <Header />
      <div className={styles.container}>
        <ControlBar />
        <div className={styles.content}>
          {children}
        </div>
        <SideBar action={null}/>
      </div>
    </React.Fragment>;
  }
}
