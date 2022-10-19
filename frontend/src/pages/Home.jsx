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
          dispatch(setCurrentChannelId(res.data.currentChannelId));
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
          <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical border-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                </path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </Container>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.ids.map((id) => {
              const channelButtonClassNames = cn('w-100', 'rounded-0', 'text-start', 'btn', 'border-0', {
                'btn-secondary': id === currentChannelId,
              })
              return (
                <li className="nav-item w-100" key={id}>
                  <button type="button" className={channelButtonClassNames}>
                    <span className="me-1">
                    #
                    </span>
                    {channels.entities[id].name}
                  </button>
                </li>
              )
            })}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Container className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {activeChannelName}</b></p>
              <span className="text-muted">{messages.ids.length} сообщений</span>
            </Container>
            <Container className="chat-messages overflow-auto px-5">
              Сообщения в чате
            </Container>
            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounded-2">
                <Container className="input-group has-validation">
                  <Form.Control className="border-0 p-0 ps-2 form-control" name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." />
                  <Button type="submit" className="btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg>
                  </Button>
                </Container>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export {Home}
