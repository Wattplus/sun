import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lead } from "@/types/crm";
import { useToast } from "@/components/ui/use-toast";

interface LeadAppointmentsProps {
  lead: Lead;
}

export const LeadAppointments = ({ lead }: LeadAppointmentsProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!date || !time) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et une heure",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Rendez-vous planifié",
      description: `Rendez-vous planifié pour le ${date.toLocaleDateString()} à ${time}`,
    });

    // Reset form
    setTime("");
    setNotes("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Planifier un rendez-vous</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Heure</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes pour le rendez-vous..."
            />
          </div>
          <Button onClick={handleSchedule} className="w-full">
            Planifier
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rendez-vous à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-sm">
            Aucun rendez-vous planifié
          </div>
        </CardContent>
      </Card>
    </div>
  );
};