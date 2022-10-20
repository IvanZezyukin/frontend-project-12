import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, batch } from 'react-redux';
import { loggedIn, loggedOut } from "../slices/authSlice";
import { addChannel, addChannels, removeChannel, updateChannel } from "../slices/channelsSlice";
import { setCurrentChannelId } from "../slices/currentChannelSlice";
import { addMessage, addMessages, removeMessage, updateMessage } from "../slices/messagesSlice";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import cn from 'classnames';
import Channels from '../components/Channels';
import MessageTextInput from "../components/MessageTextInput";
import ChatMessages from '../components/ChatMessages';

const Home = () => {

  // if (!localStorage.token) {
  //   //return <Navigate to="/login" replace={true} />
  //   redirect("/login");
  // }

  useEffect(() => {
    if (!localStorage.token) {
      redirect("/login");
      return
    };

    axios({
      method: 'get',
      url: '/api/v1/data',
      headers: {Authorization : `Bearer ${localStorage.token}`},
    })
      .then((res) => {
        batch(() => {
          dispatch(addChannels(res.data.channels));
          // dispatch(setCurrentChannelId(res.data.currentChannelId));
          dispatch(addMessages(res.data.messages));
        })
        //console.log(res.data);
        
      })

  });

  //axios.defaults.headers.common['Authorization'] = localStorage.token;


  const redirect = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  //const activeChannelName = channels.ids[currentChannelId].name;
  const state = useSelector(state => state);
  console.log(state)
  let activeChannelName = '';
  if (state.channels.ids.length > 0) {
    activeChannelName = channels.entities[currentChannelId].name;
  }

  

  return (
    
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Container className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {activeChannelName}</b></p>
              <span className="text-muted">{messages.ids.map((id) => messages.entities[id].channelId).filter((item) => item === currentChannelId).length} сообщений</span>
            </Container>
            <ChatMessages />
            <div className="mt-auto px-5 py-3">
              <MessageTextInput />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export {Home}
