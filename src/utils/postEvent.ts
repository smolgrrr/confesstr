import { dateToUnix } from "nostr-react";
import {
  type Event as NostrEvent,
  getPublicKey,
  getEventHash,
  getSignature,
} from "nostr-tools";

export const handleThreadSubmit = async (comment: string, file: string, hasSubmittedPost: boolean) => {
  let message = comment + " " + file;

  if (!message) {
    alert("no message provided");
    return;
  }

  if (hasSubmittedPost) {
    alert('You have already submitted a post.');
    return;
  }

  const newEvent: NostrEvent = {
    id: 'null',
    content: message,
    kind: 1,
    tags: [],
    created_at: dateToUnix(),
    pubkey: 'null',
    sig: 'null',
  };

  newEvent.pubkey = getPublicKey(process.env.REACT_APP_PRIVKEY as string);
  newEvent.id = getEventHash(newEvent);
  newEvent.sig = getSignature(newEvent, process.env.REACT_APP_PRIVKEY as string);

  return newEvent
};
