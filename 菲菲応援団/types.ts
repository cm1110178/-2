import React from 'react';

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export enum GuidanceTopic {
    HOME = 'HOME',
    EXAM_TYPES = 'EXAM_TYPES', // 一般選抜, 総合型選抜, etc.
    TIMELINE = 'TIMELINE',     // High school timeline
    INTERVIEW = 'INTERVIEW',   // Interview prep
    ESSAY = 'ESSAY',           // Essay writing
}

export interface TopicCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface NavItem {
    id: GuidanceTopic;
    label: string;
    icon: React.ReactNode;
}