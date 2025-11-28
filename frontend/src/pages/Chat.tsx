import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/common/Button";
import { ArrowLeft } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const { language, user, chatMessages, addChatMessage } = useAppStore();
  const translations = t(language);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSendMessage = (text: string) => {
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: "user" as const,
      text,
      timestamp: new Date().toISOString()
    };
    
    addChatMessage(userMessage);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: "ai" as const,
        text: "Thank you for your question! I'm here to help you with your financial journey. This is a demo response.",
        timestamp: new Date().toISOString()
      };
      addChatMessage(aiMessage);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppLayout>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <div className="mb-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {translations.chat.title}
            </h1>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {chatMessages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="sticky bottom-0 pt-4 bg-background">
            <ChatInput
              onSend={handleSendMessage}
              placeholder={translations.chat.inputPlaceholder}
            />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default Chat;
