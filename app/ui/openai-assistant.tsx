"use client";

import { AssistantStream } from "openai/lib/AssistantStream";
import { useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineUser, AiOutlineRobot, AiOutlineSend } from "react-icons/ai";
import Markdown from "react-markdown";
import { supabase } from "./supabaseClient"; // Assuming you have a supabaseClient file for initialization

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
  handleOpenReview?: (value: boolean) => void;
}

interface Props {
  handleOpenReview: (value: boolean) => void;
}

type OpenAIAssistantProps = {
  assistantId?: string;
  greeting?: string;
  handleOpenReview: (value: boolean) => void;
};

const OpenAIAssistant: React.FC<OpenAIAssistantProps> = ({
  assistantId = "",
  greeting = "I am here to assist you with legal matters in Cameroon. How can I help you today?",
  handleOpenReview,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<Message>({
    id: "Thinking...",
    role: "assistant",
    content: "_Thinking..._",
    createdAt: new Date(),
  });
  const messageId = useRef(0);

  // set default greeting Message
  const greetingMessage = {
    id: "greeting",
    role: "assistant",
    content: greeting,
    createdAt: new Date(),
  };

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault();

  //     // clear streaming message
  //     setStreamingMessage({
  //         id: "Thinking...",
  //         role: "assistant",
  //         content: "_Thinking..._",
  //         createdAt: new Date(),
  //     });

  //     // add busy indicator
  //     setIsLoading(true);

  //     // add user message to list of messages
  //     messageId.current ++;
  //     const userMessage = {
  //         id: messageId.current.toString(),
  //         role: "user",
  //         content: prompt,
  //         createdAt: new Date(),
  //     };
  //     setMessages([...messages, userMessage]);
  //     setPrompt("");

  //     // post new message to server and stream OpenAI Assistant response
  //     const response = await fetch('/api/openai-assistant', {
  //         method: 'POST',
  //         body: JSON.stringify({
  //             assistantId: assistantId,
  //             threadId: threadId,
  //             content: prompt,
  //         }),
  //     });

  //     if (!response.body) {
  //         return;
  //     }
  //     const runner = AssistantStream.fromReadableStream(response.body);

  //     runner.on('messageCreated', (message) => {
  //         setThreadId(message.thread_id);
  //     });

  //     runner.on('textDelta', (_delta, contentSnapshot) => {
  //         const newStreamingMessage = {
  //             ...streamingMessage,
  //             content: contentSnapshot.value,
  //         };
  //         setStreamingMessage(newStreamingMessage);
  //     });

  //     runner.on('messageDone', async (message) => {
  //         // get final message content
  //         const finalContent = message.content[0].type == "text" ? message.content[0].text.value : "";

  //         // add assistant message to list of messages
  //         messageId.current ++;
  //         const assistantMessage = {
  //             id: messageId.current.toString(),
  //             role: "assistant",
  //             content: finalContent,
  //             createdAt: new Date(),
  //         };
  //         setMessages((prevMessages) => [...prevMessages, assistantMessage]);

  //         // Update messages in Supabase
  //         const phoneNumber = localStorage.getItem('userPhone'); // Retrieve phone number from local storage
  //         const { data: user, error } = await supabase
  //             .from('Users')
  //             .select('messages')
  //             .eq('phone', phoneNumber)
  //             .single();

  //         if (error) {
  //             console.error('Error fetching user:', error);
  //             return;
  //         }

  //         const updatedMessages = [...user.messages, userMessage, assistantMessage];

  //         // Update the user's messages in Supabase
  //         const { error: updateError } = await supabase
  //             .from('Users')
  //             .update({ messages: updatedMessages })
  //             .eq('phone', phoneNumber);

  //         if (updateError) {
  //             console.error('Error updating messages:', updateError);
  //         }

  //         // remove busy indicator
  //         setIsLoading(false);
  //     });

  //     runner.on('error', (error) => {
  //         console.error(error);
  //     });
  // }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Clear streaming message
    setStreamingMessage({
      id: "Thinking...",
      role: "assistant",
      content: "_Thinking..._",
      createdAt: new Date(),
    });

    // Add busy indicator
    setIsLoading(true);

    // Create user message
    messageId.current++;
    const userMessage = {
      id: messageId.current.toString(),
      role: "user",
      content: prompt,
      createdAt: new Date(),
    };
    setMessages([...messages, userMessage]);
    setPrompt("");

    // Post new message to server and stream OpenAI Assistant response
    const response = await fetch("/api/openai-assistant", {
      method: "POST",
      body: JSON.stringify({
        assistantId: assistantId,
        threadId: threadId,
        content: prompt,
      }),
    });

    if (!response.body) {
      return;
    }
    const runner = AssistantStream.fromReadableStream(response.body);

    runner.on("messageCreated", (message) => {
      setThreadId(message.thread_id);
    });

    runner.on("textDelta", (_delta, contentSnapshot) => {
      const newStreamingMessage = {
        ...streamingMessage,
        content: contentSnapshot.value,
      };
      setStreamingMessage(newStreamingMessage);
    });

    runner.on("messageDone", async (message) => {
      const finalContent =
        message.content[0].type == "text" ? message.content[0].text.value : "";

      // Create assistant message
      messageId.current++;
      const assistantMessage = {
        id: messageId.current.toString(),
        role: "assistant",
        content: finalContent,
        createdAt: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // Send user and assistant messages to the API route
      const phoneNumber = localStorage.getItem("userPhone")!.replace(/\s/g, "");
      const updateResponse = await fetch("/api/supabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          userMessage,
          assistantMessage,
        }),
      });

      if (!updateResponse.ok) {
        console.error("Error updating messages in Supabase");
      }

      // Remove busy indicator
      setIsLoading(false);
    });

    runner.on("error", (error) => {
      console.error(error);
    });
  }

  // handles changes to the prompt input field
  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value);
  }

  const checkIfUserHasFeedback = useCallback(
    async (handleOpenReview: (value: boolean) => void) => {
      const phoneNumber = localStorage.getItem("userPhone")?.replace(/\s/g, "");
      if (!phoneNumber) return;

      const { data: reviews, error } = await supabase
        .from("ReviewsAndRatings")
        .select("*")
        .eq("user_phone", phoneNumber);

      if (error) {
        console.error("Error fetching reviews:", error);
        return;
      }

      if (reviews?.length === 0) {
        handleOpenReview(true);
      }
    },
    []
  );

  useEffect(() => {
    if (!messages.length) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "assistant") return;

    const userMessageCount = messages.filter(
      (msg: any) => msg.role === "user"
    ).length;
    if (userMessageCount < 3) return;

    checkIfUserHasFeedback(handleOpenReview);
  }, [messages, checkIfUserHasFeedback]);

  return (
    <div className="flex flex-col bg-slate-200 shadow-md relative">
      <OpenAIAssistantMessage message={greetingMessage} />
      {messages.map((m) => (
        <OpenAIAssistantMessage key={m.id} message={m} />
      ))}
      {isLoading && <OpenAIAssistantMessage message={streamingMessage} />}
      <form onSubmit={handleSubmit} className="m-2 flex">
        {/* I need a text area with max lines 4 */}
        <textarea
          disabled={isLoading}
          autoFocus
          className="border rounded w-full py-2 px-3 text-gray-70"
          onChange={handlePromptChange}
          value={prompt}
          placeholder="what do you want to know?"
          rows={2.2}
        // <input
        //   disabled={isLoading}
        //   autoFocus
        //   className="border rounded w-full py-2 px-3 text-gray-70"
        //   onChange={handlePromptChange}
        //   value={prompt}
        //   placeholder="what do you want to know?"
        />
        {isLoading ? (
          <button
            disabled
            className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <OpenAISpinner />
          </button>
        ) : (
          <button
            disabled={prompt.length == 0}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <AiOutlineSend />
          </button>
        )}
      </form>
    </div>
  );
};
export default OpenAIAssistant;

export function OpenAIAssistantMessage({ message }: { message: Message }) {
  function displayRole(roleName: string) {
    switch (roleName) {
      case "user":
        return <AiOutlineUser />;
      case "assistant":
        return <AiOutlineRobot />;
    }
  }
  return (
    <div className="flex rounded text-gray-700 text-center bg-white px-4 py-2 m-2 shadow-md">
      <div className="text-4xl">{displayRole(message.role)}</div>
      <div className="mx-4 text-left overflow-auto openai-text">
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
}

// Based on https://flowbite.com/docs/components/spinner/
function OpenAISpinner() {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className="inline w-4 h-4 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
}
