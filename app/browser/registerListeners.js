import cypressBus from "../CypressBus";

const code = `
  // @todo add support for hover, keypress, scroll, etc.
  const events = ['click'];
  const specialTags = ['input'];

  const textNodeType = 3;

  const serializeEvent = (event) => {
    let textContent = '';

    let result = {
      target: {
        textContent
      }
    };

    result.target.classList = JSON.stringify(event.target.classList);
    result.target.dataset = JSON.stringify(event.target.dataset);
    result.target.id = JSON.stringify(event.target.id);
    result.target.nodeType = event.target.nodeType;

    if (event.target.nodeType === textNodeType) {
      textContent = event.target.textContent;
    } else if (specialTags.indexOf(event.target.tagName.toLowerCase()) !== -1) {
      textContent = event.target.value;
    } else {
      // this case when clicking on text gives us parent element of text elemnt
      let children = event.target.childNodes;

      for(let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.nodeType === textNodeType) {
          textContent += child.textContent;
        }
      }
    }
    result.target.textContent = textContent;

    return JSON.stringify(result);
  }

  events.forEach(function(eventName) {
    window.addEventListener(eventName, function(event) {
      window.ipcRenderer.sendToHost(serializeEvent(event));
    })
  })
`;

export default domNode => {
  const tearDowns = [];

  const registerEvents = (dom, eventDefinions) => {
    const traverseEventListeners = op => {
      for (let args of eventDefinions) {
        op.apply(dom, args);
      }
    };
    traverseEventListeners(dom.addEventListener);
    return () => {
      traverseEventListeners(dom.removeEventListener);
    };
  };

  const tearDownFn = () => {
    tearDowns.forEach(tearDown => tearDown());
    tearDowns = [];
  };

  tearDowns.push(
    registerEvents(domNode, [
      ["dom-ready", e => domNode.getWebContents().executeJavaScript(code)],
      [
        "console-message",
        ev => console.log("Guest page logged a message:", ev.message)
      ],
      [
        "ipc-message",
        ev => cypressBus.emit("browser:action", JSON.parse(ev.channel))
      ],
      ["did-navigate", ev => console.log("navigated to", ev.url)],
      ["destroyed", tearDownFn]
    ])
  );

  return tearDownFn;
};
