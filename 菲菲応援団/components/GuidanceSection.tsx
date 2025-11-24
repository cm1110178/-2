import React from 'react';
import { GuidanceTopic, TopicCard } from '../types';
import { STATIC_CONTENT } from '../constants';
import ReactMarkdown from 'react-markdown';
import { ChevronRight, BookOpen } from 'lucide-react';

interface GuidanceSectionProps {
    activeTopic: GuidanceTopic;
    topicCards: TopicCard[];
    onTopicSelect: (topic: GuidanceTopic) => void;
}

const GuidanceSection: React.FC<GuidanceSectionProps> = ({ activeTopic, topicCards, onTopicSelect }) => {
    const content = STATIC_CONTENT[activeTopic];

    return (
        <div className="h-full flex flex-col">
            {/* Blackboard Header */}
            <div className="bg-chalkboard text-chalk-white p-6 rounded-xl border-[12px] border-wood-dark shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                     style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-rounded font-bold mb-2 flex items-center gap-3">
                        <BookOpen className="text-wood-light" />
                        {content.title}
                    </h2>
                    <div className="h-1 w-20 bg-wood-light rounded-full mb-4"></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto pr-2">
                {activeTopic === GuidanceTopic.HOME ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-float" style={{animationDuration: '10s'}}>
                        {topicCards.map((card) => (
                            <button
                                key={card.id}
                                onClick={() => onTopicSelect(card.id as GuidanceTopic)}
                                className={`${card.color} p-6 rounded-xl text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 flex flex-col h-full`}
                            >
                                <div className="text-4xl mb-3">{card.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                                <p className="text-sm opacity-80 mb-4 flex-1">{card.description}</p>
                                <div className="flex items-center text-sm font-bold mt-auto">
                                    詳しく見る <ChevronRight size={16} />
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                        <ReactMarkdown 
                            className="prose prose-stone max-w-none prose-headings:font-rounded prose-h3:text-school-blue prose-h3:border-b-2 prose-h3:border-blue-100 prose-h3:pb-2 prose-strong:text-rose-600"
                        >
                            {content.content}
                        </ReactMarkdown>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button 
                                onClick={() => onTopicSelect(GuidanceTopic.HOME)}
                                className="text-gray-500 hover:text-school-blue flex items-center gap-2 transition-colors"
                            >
                                ← メニューに戻る
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuidanceSection;