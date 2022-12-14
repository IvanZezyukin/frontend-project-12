import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { showAddChannelModal, showRemoveChannelModal, showRenameChannelModal } from '../slices/channelOptionsSlice';
import { setCurrentChannelId, setCurrentChannelName } from '../slices/currentChannelSlice';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));

  return (
    <>
      <Container className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical border-0" onClick={() => dispatch(showAddChannelModal())}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
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
                <Button
                  active={id === currentChannelId}
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  className={channelButtonClassNames}
                  onClick={() => {
                    dispatch(setCurrentChannelId(id));
                    dispatch(setCurrentChannelName(channels.entities[id].name));
                  }}
                >
                  <span className="me-1">
                    #
                  </span>
                  {filter.clean(channels.entities[id].name)}
                </Button>
                {!channels.entities[id].removable ? (
                  null
                ) : (
                  <>
                    <Dropdown.Toggle active={id === currentChannelId} split variant={id === currentChannelId ? 'secondary' : 'light'} className={channelButtonMenuClassNames}>
                      <span className="visually-hidden">{t('channels.dropdownSpan')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => { dispatch(showRemoveChannelModal()); dispatch(setCurrentChannelId(id)); }}>{t('channels.delete')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => { dispatch(showRenameChannelModal()); dispatch(setCurrentChannelId(id)); dispatch(setCurrentChannelName(channels.entities[id].name)); }}>{t('channels.rename')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </>
                )}
              </Dropdown>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Channels;
