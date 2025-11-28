import { useState, FormEvent } from "react";
import { Button } from "../common/Button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, placeholder, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <Button 
        type="submit" 
        size="md"
        disabled={disabled || !input.trim()}
        className="px-6"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
