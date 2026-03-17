import { useEffect, useState } from 'react';
import { getMoodHistory } from '@/lib/moodTrends';
import { User } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MoodTrendsProps {
  user: User;
  conversationId: string;
  onClose: () => void;
}

export default function MoodTrends({ user, conversationId, onClose }: MoodTrendsProps) {
  const [moodHistory, setMoodHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = getMoodHistory(user.id, conversationId);
    setMoodHistory(data);
  }, [user.id, conversationId]);



  return (
    <Card className="p-4 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">Mood Trends</h2>
        <button onClick={onClose} className="text-sm text-blue-600">Close</button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={moodHistory} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="intensity" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
