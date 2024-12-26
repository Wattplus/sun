import { MessagesList } from "@/components/client/messages/MessagesList";
import { Card } from "@/components/ui/card";

export const MessagesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      <Card className="p-6">
        <MessagesList />
      </Card>
    </div>
  );
};