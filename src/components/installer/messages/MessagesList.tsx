import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Jean Dupont",
    content: "Bonjour, je souhaiterais avoir plus d'informations sur l'installation de panneaux solaires.",
    date: "2024-03-20",
    read: false,
  },
  {
    id: "2",
    sender: "Marie Martin",
    content: "Est-ce possible de programmer un rendez-vous pour la semaine prochaine ?",
    date: "2024-03-19",
    read: true,
  },
];

export function MessagesList() {
  return (
    <div className="space-y-4">
      {mockMessages.map((message) => (
        <Card 
          key={message.id} 
          className={`p-4 ${!message.read ? 'border-primary' : 'border-border'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{message.sender}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {message.content}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(message.date).toLocaleDateString()}
            </div>
          </div>
        </Card>
      ))}
      
      {mockMessages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Aucun message pour le moment
        </div>
      )}
    </div>
  );
}