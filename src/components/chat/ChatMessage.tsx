import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export const ChatMessage = ({ role, content, isLoading }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%]",
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted",
          isLoading && "animate-pulse"
        )}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};