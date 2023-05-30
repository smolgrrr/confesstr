import { dateToUnix } from "nostr-react";
import {
  type Event as NostrEvent,
  getPublicKey,
  getEventHash,
  getSignature,
  nip19
} from "nostr-tools";
import { boards } from "../constants/const";

export const handleThreadSubmit = async (comment: string, hasSubmittedPost: boolean) => {
  
  if (!comment) {
    alert("no message provided");
    return;
  }

  const tags = [["p", boards[0]]];
  if (comment.includes('note') || comment.includes('npub')) {
    const tag = comment.match(/(note|npub)[a-z0-9]+/);
    
    if (tag === null) {
    } else if (tag[0].includes('note')) {
      tags.push(["e", nip19.decode(tag[0]).data as string]);
    } else if (tag[0].includes('npub')) {
      tags.push(["p", nip19.decode(tag[0]).data as string]);
    }
  }
  

  if (hasSubmittedPost) {
    alert('You have already submitted a post.');
    return;
  }

  const newEvent: NostrEvent = {
    id: 'null',
    content: comment,
    kind: 1,
    tags,
    created_at: dateToUnix(),
    pubkey: 'null',
    sig: 'null',
  };

  newEvent.pubkey = getPublicKey(process.env.REACT_APP_PRIVKEY as string);
  newEvent.id = getEventHash(newEvent);
  newEvent.sig = getSignature(newEvent, process.env.REACT_APP_PRIVKEY as string);

  return newEvent
};
