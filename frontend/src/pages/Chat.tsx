import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/i18n/i18n";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/common/Button";
import { ArrowLeft, Loader2 } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const { language, user, chatMessages, isChatLoading, sendChatMessage } = useAppStore();
  const translations = t(language);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSendMessage = async (text: string) => {
    await sendChatMessage(text);
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
            {isChatLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="sticky bottom-0 pt-4 bg-background">
            <ChatInput
              onSend={handleSendMessage}
              placeholder={translations.chat.inputPlaceholder}
              disabled={isChatLoading}
            />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default Chat;
