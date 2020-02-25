import React from "react";
import { observer } from "mobx-react";
import { Row, Col, List } from "antd";
import { PaddedRow25px } from "../../components/common/PaddedRow";
import { PlayerAvatar } from "../../components/common/player/PlayerAvatar";
import useStores from "../../useStores";
import { PlayerName } from "../../components/common/player/PlayerName";
import { FormattedMessage } from "react-intl.macro";

export const Dashboard = observer(props => {
  let data = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player5"];

  const { userStore } = useStores();

  return (
    <div>
      <PaddedRow25px>
        <Col span={2} />
        <Col span={14}>
          <h3>
            <FormattedMessage
              id="dashboard.newEventsHeader"
              defaultMessage="Events you might be interested!"
            />
          </h3>
          <div>
            <PlayerAvatar player={userStore.player} />
            <PlayerName player={userStore.player} />
            <span>is awesome!</span>
          </div>
        </Col>
        <Col span={6}>
          <List
            size="small"
            header={
              <div>
                <FormattedMessage
                  id="dashboard.rankingTableHeader"
                  defaultMessage="Ranking"
                />
              </div>
            }
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Col>
        <Col span={2} />
      </PaddedRow25px>
      <Row></Row>
    </div>
  );
});
