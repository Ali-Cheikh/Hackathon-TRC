import { MoodEntry } from '@/lib/types';

export function getMoodHistory(userId: string, conversationId: string): { date: string; intensity: number }[] {
  if (typeof window === 'undefined') return [];
  try {
    const entries = localStorage.getItem('campus_ai_buddy_mood_entries');
    const all = entries ? JSON.parse(entries) : {};
    return Object.values(all)
      .filter((e: any) => e.userId === userId && e.conversationId === conversationId)
      .map((e: any) => ({
        date: new Date(e.createdAt).toLocaleDateString(),
        intensity: e.intensity,
      }));
  } catch {
    return [];
  }
}
