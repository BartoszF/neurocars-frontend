import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Form, Input, Button, Spin, notification } from 'antd';
import { FileTextOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import useStores from '../../useStores';
import SimulationService from '../../service/SimulationService';
import { useEffect } from 'react';
import { TrackService } from '../../service/TrackService';
import { TrackSelect } from './TrackSelect';

const StyledForm = styled(Form)`
  //max-width: 500px;
`;

const SimulationForm = observer((props) => {
  const history = useHistory();
  //const ref = React.createRef();
  const [form] = Form.useForm();
  const { userStore } = useStores();
  let [loading, setLoading] = useState(true);
  let [tracks, setTracks] = useState([]);

  useEffect(() => {
    TrackService.getTracks()
      .then((tracks) => {
        console.log(tracks);
        setTracks(tracks);
        setLoading(false);
      })
      .catch((err) => {
        notification.error({
          title: 'Error',
          message: "Couldn't get tracks",
        });
      });
  }, []);

  let handleSubmit = (values) => {
    setLoading(true);
    let sim = { name: values.name}; //, trackDTO: { id: values.track } 

    SimulationService.createSimulation(sim)
      .then((simulation) => {
        history.push(`/simulation/${simulation.id}`);
      })
      .catch((err) => {
        notification.error({
          title: 'Error',
          message: err.message,
        });
        setLoading(false);
      });
  };

  const trackSelect = (val) => {
    form.setFieldsValue({
      track: val,
    });
  };

  const getForm = () => {
    return (
      <StyledForm
        form={form}
        onFinish={handleSubmit}
        className="simulation-form"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input simulation name!' }]}
        >
          <Input
            prefix={<FileTextOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="track"
          rules={[{ required: false, message: 'Please select track!' }]}
        >
          <TrackSelect label={'Track'} tracks={tracks} onChange={trackSelect} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="simulation-form-button"
          >
            Create
          </Button>
        </Form.Item>
      </StyledForm>
    );
  };
  return loading ? <Spin indicator={<LoadingOutlined />} /> : getForm();
});

export default SimulationForm;
