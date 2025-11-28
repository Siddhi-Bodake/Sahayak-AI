import { ChatMessage } from "@/types/types";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import { formatDate } from "@/i18n/i18n";

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.sender === "user";
  
  return (
    <div className={cn("flex gap-3 mb-4", isUser ? "flex-row-reverse" : "flex-row")}>
      <div className={cn(
        "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-md",
        isUser ? "bg-primary" : "bg-accent"
      )}>
        {isUser ? (
          <User className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-accent-foreground" />
        )}
      </div>
      
      <div className={cn("flex flex-col max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div className={cn(
          "px-4 py-3 rounded-2xl shadow-md whitespace-pre-line",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-card text-card-foreground rounded-tl-none border border-border"
        )}>
          {message.text}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {new Date(message.timestamp).toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};
