import React, { useRef, useEffect } from "react";

import styles from "./Window.css";

import Navigation from "./Navigation";
import registerListeners from "./registerListeners";

export default () => {
  const refWebview = useRef();

  useEffect(() => registerListeners(refWebview.current), []);

  return (
    <div className={styles.container}>
      <Navigation />
      <webview
        ref={refWebview}
        preload="./browser/preload.js"
        className={styles.container}
        id="webview"
        src="https://www.google.com"
      />
    </div>
  );
};
