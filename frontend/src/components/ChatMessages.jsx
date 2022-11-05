import React from "react";
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";
import filter from 'leo-profanity';

const ChatMessages = () => {

  const messages = useSelector((state) => state.messages);
  const currentChannelId = useSelector((state) => state.currentChannel.currentChannelId);
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));


  return (
    <Container className="chat-messages overflow-auto px-5">
      {
        messages.ids.map((messageId) => {
        if (messages.entities[messageId].channelId !== currentChannelId) {
          return null;
        };
        return (
          <div className="text-break mb-2" key={messageId}>
            <b>{messages.entities[messageId].user}</b>: {filter.clean(messages.entities[messageId].message)}
          </div>
          )
        })
      }
    </Container>
  )
};

export default ChatMessages;
