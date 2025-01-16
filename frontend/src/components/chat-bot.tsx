import React, { useEffect, useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { ChatBox } from "./chat-box";
import { Input } from "./ui/input";
import { SendHorizontalIcon } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";

type ChatHistoryObj = {
  sender: string;
  text: string;
};

const API_URL = "http://127.0.0.1:8000";
export const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryObj[]>([]);
  const [userInput, setUserInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // useEffect(()=>{
  //     setChatHistory((prev)=>[
  //         ...prev ,
  //         {sender:"bot",text:"Hey there lets chat..."}
  //     ])
  // },[])

  const handleSend = async () => {
    if (!userInput) return;
    setIsLoading(true);
    setChatHistory((prev) => [...prev, { sender: "user", text: userInput }]);
    try {
      const res = await axios.post(`${API_URL}/api/query`, {
        query: userInput,
      });
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: res.data.message },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry an error just occured" },
      ]);
    } finally {
      setIsLoading(false);
    }
    setUserInput("");
  };
  return (
    <Card
      className=" w-full md:max-w-[650px] md:mx-0 mx-2 min-h-[500px]
     rounded-xl bg-neutral-200/90 overflow-hidden"
    >
      <CardHeader>
        <CardTitle
          className=" text-2xl font-bold text-neutral-800 
        tracking-wide text-center font-jersey"
        >
          Lets chat !
        </CardTitle>
      </CardHeader>
      <ScrollArea className=" md:h-[500px] sm:h-[400px] h-[350px] mb-2">
        <CardContent className="w-full  flex flex-col gap-y-4">
          {chatHistory.map((chat, idx) => (
            <div
              key={idx}
              className={` flex w-full items-center
                     ${
                       chat.sender === "bot" ? " justify-start" : " justify-end"
                     }
                    `}
            >
              <ChatBox content={chat.text} isLoading={isLoading} />
            </div>
          ))}
        </CardContent>
      </ScrollArea>
      <CardFooter className=" px-4 w-full">
        <div className=" relative w-full ">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className=" w-full font-jersey font-semibold"
            placeholder="send message..."
          />

          <SendHorizontalIcon
            onClick={handleSend}
            className=" size-4 text-neutral-950/95 font-bold absolute right-3 bottom-3 cursor-pointer
          hover:opacity-85
         "
          />
        </div>
      </CardFooter>
    </Card>
  );
};
