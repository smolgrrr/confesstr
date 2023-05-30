import React, { useState } from 'react';
import { useNostr } from "nostr-react";
import VoidCat from '../utils/NostrImg';
import { handleThreadSubmit } from '../utils/postEvent';
import { nip19 } from 'nostr-tools';

const Home = () => {
  const { publish } = useNostr();
  const [comment, setComment] = useState("");
  const [hasSubmittedPost, setHasSubmittedPost] = useState(false);
  const [confessionID, setConfessionID] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const newEvent = await handleThreadSubmit(comment, hasSubmittedPost);
      if (newEvent) {
        publish(newEvent);
        setHasSubmittedPost(true);
        setConfessionID(nip19.noteEncode(newEvent.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const attachFile = async (file_input: File | null) => {
    try {
      if (file_input) {
        const rx = await VoidCat(file_input);
        if (rx.url) {
          setComment(comment + " " + rx.url);
        } else if (rx?.error) {
          setComment(comment + " " + rx.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <h1 className="text-xl font-medium">Confess to Nostr</h1>
        <form className="grid gap-6" name="post" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <input type="hidden" name="MAX_FILE_SIZE" defaultValue={4194304} />
          <div className="space-y-2">
            <label className="text-sm font-medium uppercase">Confession*</label>
            <textarea required name="com" cols={48} rows={4} wrap="soft" defaultValue={'Wait for media link to appear in confession before posting.'} value={comment} onChange={(e) => setComment(e.target.value)} className="my-0 mb-2 block w-full rounded-md border border-zinc-300 py-2 px-3 text-sm placeholder:text-zinc-400 hover:border-zinc-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 dark:border-zinc-600 bg-zinc-800" />
          </div>
          <div className="space-y-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 text-white">Upload Media</label>
            <input type="file" name="file_input" id="file_input"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              onChange={(e) => {
                const file_input = e.target.files?.[0];
                if (file_input) {
                  attachFile(file_input);
                }
              }}
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-zinc-400 disabled:pointer-events-none dark:focus:ring-offset-zinc-900 data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800 text-white hover:bg-zinc-700 dark:text-zinc-900 h-10 py-2 px-4 bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:hover:text-black">Post</button>
        </form>
        {hasSubmittedPost && confessionID && (<a href={`https://iris.to/${confessionID}`} className="text-sm font-medium text-gray-900 dark:text-white">View your confession: {confessionID}</a>)}
      </div>
    </div>
  );
};

export default Home;