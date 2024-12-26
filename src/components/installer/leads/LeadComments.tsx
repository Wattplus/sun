import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface LeadCommentsProps {
  comment: string;
  setComment: (comment: string) => void;
  comments: Array<{ text: string; date: string }>;
  handleAddComment: () => void;
}

export const LeadComments = ({ comment, setComment, comments, handleAddComment }: LeadCommentsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commentaires</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Textarea
              placeholder="Ajouter un commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddComment}>Ajouter</Button>
          </div>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-2">
                  {comment.date}
                </p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};