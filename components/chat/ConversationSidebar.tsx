'use client';

import { Conversation } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, Menu, X, Trash2, Settings } from 'lucide-react';
import { useState } from 'react';
import InstallPWAButton from '@/components/ui/InstallPWAButton';

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onLogout: () => void;
  onDeleteConversation?: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onShowMoodTracker?: () => void;
  onShowSettings?: () => void;
  onShowMoodTrends?: () => void;
}

export default function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onLogout,
  onDeleteConversation,
  isOpen = true,
  onClose,
  onShowMoodTracker = () => {},
  onShowSettings = () => {},
  onShowMoodTrends = () => {},
}: ConversationSidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-sidebar text-sidebar-foreground w-64 flex flex-col transition-transform duration-300 z-40 md:relative md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-4 flex flex-col items-start gap-3">
        <h1 className="font-bold text-lg w-full text-center">AI Buddy</h1>
        <div className="flex w-full justify-between md:hidden gap-2">
          <button
            onClick={onShowMoodTracker}
            className="p-2 rounded-full bg-accent text-white hover:bg-primary transition"
            title="Log Mood"
          >
            <span role="img" aria-label="mood">😊</span>
          </button>
          <button
            onClick={onShowSettings}
            className="p-2 rounded-full bg-accent text-white hover:bg-primary transition"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-2 rounded-full bg-muted text-foreground hover:bg-accent transition">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-4 pt-2 pb-4 flex flex-col gap-3">
        <Button onClick={onNewConversation} className="w-full gap-2 text-base font-semibold rounded-lg">
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
        <div className="flex flex-col gap-2">
          <Button onClick={onShowMoodTracker} className="w-full gap-2 hidden md:flex rounded-lg" variant="outline" size="sm">
            <span role="img" aria-label="mood">😊</span>
            Log Mood
          </Button>
          <Button onClick={onShowSettings} className="w-full gap-2 hidden md:flex rounded-lg" variant="outline" size="sm">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button onClick={onShowMoodTrends} className="w-full gap-2 hidden md:flex rounded-lg" variant="outline" size="sm">
            📈
            Mood Trends
          </Button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {conversations.length === 0 ? (
          <p className="text-sm text-sidebar-foreground/60 p-3">No conversations yet</p>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center group w-full px-3 py-2 rounded-lg transition-colors text-sm truncate cursor-pointer ${
                activeConversationId === conversation.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/50'
              }`}
              title={conversation.title}
              onClick={() => {
                onSelectConversation(conversation.id);
                onClose?.();
              }}
            >
              <span className="flex-1 truncate">{conversation.title}</span>
              {onDeleteConversation && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                  className="ml-2 p-1 rounded-full bg-destructive text-white hover:bg-destructive/80 transition"
                  title="Delete this chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Sticky bottom actions: Install App + Sign Out */}
      <div className="px-4 pb-4 mt-auto sticky bottom-0 bg-sidebar flex flex-col gap-2">
        <InstallPWAButton />
        <Button variant="outline" onClick={onLogout} className="w-full gap-2 rounded-lg" size="sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
