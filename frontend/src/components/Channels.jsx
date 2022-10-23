import React from "react";
import Container from "react-bootstrap/esm/Container";
import { useSelector } from "react-redux";
import cn from 'classnames';
import { setCurrentChannelId, setCurrentChannelName } from "../slices/currentChannelSlice";
import { useDispatch } from "react-redux";
import { showAddChannelModal } from "../slices/channelOptionsSlice";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const Channels = () => {

  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const dispatch = useDispatch();

  return (
    <>
    
    <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical border-0" onClick={() => dispatch(showAddChannelModal())}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                </path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </Container>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.ids.map((id) => {

              const channelButtonClassNames = cn('rounded-0', 'shadow-none', 'border-0', 'text-truncate', 'text-start', 'w-100', {
                'text-white': id === currentChannelId,
              });
              const channelButtonMenuClassNames = cn('rounded-0', 'shadow-none', 'border-0', {
                'text-white': id === currentChannelId,
              });

              return (
                <li className="nav-item w-100" key={id}>

                  <Dropdown as={ButtonGroup} className="w-100 ">
                    <Button active={id === currentChannelId} variant={id === currentChannelId ? 'secondary' : 'light'} className={channelButtonClassNames} onClick={() => {
                     dispatch(setCurrentChannelId(id));
                     dispatch(setCurrentChannelName(channels.entities[id].name));
                     }}>
                      <span className="me-1">
                      #
                      </span>
                      {channels.entities[id].name}
                    </Button>
                    {!channels.entities[id].removable ? (
                      null
                      ) : (
                        <>
                        <Dropdown.Toggle active={id === currentChannelId} split variant={id === currentChannelId ? 'secondary' : 'light'} className={channelButtonMenuClassNames} />
                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Удалить</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
                        </Dropdown.Menu>
                        </>
                        )}
                    
                  </Dropdown>

                </li>
              )
            })}
          </ul>
          </>
  )
};

export default Channels;
