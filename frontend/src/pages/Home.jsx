import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, batch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { addChannels } from '../slices/channelsSlice';
import { setCurrentChannelId, setCurrentChannelName } from '../slices/currentChannelSlice';
import { addMessages } from '../slices/messagesSlice';
import Channels from '../components/Channels';
import MessageTextInput from '../components/MessageTextInput';
import ChatMessages from '../components/ChatMessages';

const Home = () => {
  const redirect = useNavigate();
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const currentChannelName = useSelector((state) => state.currentChannel.currentChannelName);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // eslint-disable-next-line max-len
  const messagesCount = messages.ids.map((id) => messages.entities[id].channelId).filter((item) => item === currentChannelId).length;

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));

  useEffect(() => {
    if (!localStorage.token) {
      redirect('/login');
      return;
    }
    axios({
      method: 'get',
      url: '/api/v1/data',
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => {
        batch(() => {
          dispatch(addChannels(res.data.channels));
          dispatch(addMessages(res.data.messages));
        });
      });
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/data',
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => {
        batch(() => {
          // eslint-disable-next-line max-len
          dispatch(setCurrentChannelId(res.data.currentChannelId));
          dispatch(setCurrentChannelName(currentChannelName));
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Container className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {` ${filter.clean(currentChannelName)}`}
                </b>
              </p>
              <span className="text-muted">
                {messagesCount}
                {t('messageCount', { count: messagesCount })}
              </span>
            </Container>
            <ChatMessages />
            <div className="mt-auto px-5 py-3">
              <MessageTextInput />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
