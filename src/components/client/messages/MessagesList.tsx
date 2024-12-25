import { Card } from "@/components/ui/card";

interface Message {
  date: string;
  content: string;
  read: boolean;
}

const messages: Message[] = [
  {
    date: "2024-03-22",
    content: "Votre dossier a été mis à jour avec les dernières informations techniques.",
    read: false
  },
  {
    date: "2024-03-20",
    content: "L'étude de faisabilité a été complétée avec succès.",
    read: true
  },
  {
    date: "2024-03-18",
    content: "Bienvenue sur votre espace client ! N'hésitez pas à nous contacter pour toute question.",
    read: true
  }
];

export const MessagesList = () => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.read ? "bg-gray-50" : "bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <p className="font-medium">{message.date}</p>
              {!message.read && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Nouveau
                </span>
              )}
            </div>
            <p className="text-gray-600">{message.content}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};