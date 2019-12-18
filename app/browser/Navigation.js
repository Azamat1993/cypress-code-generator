import { Input, Button, Icon, Row, Col } from "antd";
import styles from "./Navigation.css";
import cypressBus from "../cypressBus";

const { Search } = Input;

export default () => {
  return (
    <div className={styles.container}>
      <Col span={1}>
        <Button.Group size={"small"}>
          <Button type="default">
            <Icon type="left" />
          </Button>
          <Button type="default">
            <Icon type="right" />
          </Button>
        </Button.Group>
      </Col>
      <Col span={16}>
        <Search
          placeholder="type url"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
      </Col>
    </div>
  );
};
