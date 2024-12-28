import { MessagesList } from "../dashboard/MessagesList";
import { Card } from "@/components/ui/card";

export const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Consultez et gérez vos messages
          </p>
        </div>
        <Card className="p-6">
          <MessagesList />
        </Card>
      </div>
    </div>
  );
};