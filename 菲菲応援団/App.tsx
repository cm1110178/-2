import React, { useState } from 'react';
import { GraduationCap, School, Share2, Check } from 'lucide-react';
import { GuidanceTopic } from './types';
import { TOPIC_CARDS } from './constants';
import ChatInterface from './components/ChatInterface';
import TeacherAvatar from './components/TeacherAvatar';
import GuidanceSection from './components/GuidanceSection';

const App: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState<GuidanceTopic>(GuidanceTopic.HOME);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [justCopied, setJustCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '菲菲応援団 - 进学对策',
                    text: '菲菲的专属进学指导AI助手',
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Sharing failed or cancelled', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setJustCopied(true);
                setTimeout(() => setJustCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 font-sans text-gray-800 selection:bg-sakura selection:text-school-blue flex flex-col">
            
            {/* Navigation Header - Sticky with safe area support */}
            <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div 
                        className="flex items-center gap-2 cursor-pointer active:opacity-70 transition-opacity" 
                        onClick={() => setActiveTopic(GuidanceTopic.HOME)}
                    >
                        <School className="text-school-blue h-8 w-8" />
                        <div>
                            <h1 className="text-xl font-bold font-rounded text-school-blue leading-none">菲菲进学</h1>
                            <p className="text-xs text-gray-500 tracking-wider">進路指導室</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden md:inline-block text-sm font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full animate-pulse">
                            共通テスト対策中
                        </span>
                        <button 
                            onClick={handleShare}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95 shadow-sm ${
                                justCopied 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-school-blue text-white hover:bg-blue-700'
                            }`}
                            title="分享给菲菲"
                        >
                            {justCopied ? <Check size={18} /> : <Share2 size={18} />}
                            <span className="text-sm font-bold">
                                {justCopied ? '已复制!' : '共有'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col lg:flex-row gap-8 pb-24">
                
                {/* Left Column: Teacher Avatar & Status */}
                <aside className="lg:w-1/3 flex flex-col items-center">
                    <div className="w-full bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative overflow-hidden mb-6">
                         {/* Background Elements */}
                         <div className="absolute top-4 right-4 text-6xl opacity-10 select-none">🌸</div>
                         <div className="absolute bottom-4 left-4 text-6xl opacity-10 select-none">🏫</div>
                         
                        {/* Avatar */}
                        <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
                            <TeacherAvatar 
                                isSpeaking={isSpeaking} 
                                expression={isSpeaking ? 'happy' : 'normal'}
                            />
                        </div>
                        
                        {/* Dialogue Bubble */}
                        <div className="bg-white border-2 border-gray-800 rounded-2xl p-4 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-gray-800 transform rotate-45"></div>
                            <p className="text-center font-bold text-gray-700">
                                {isSpeaking 
                                    ? "ふむふむ... なるほどですね。" 
                                    : "菲菲、進路の悩みは尽きないものだな。いつでも相談に乗るぞ。"}
                            </p>
                        </div>
                    </div>

                    {/* Quick Tips / Stats */}
                    <div className="w-full bg-sakura/20 rounded-xl p-4 border border-sakura">
                        <h4 className="font-bold text-school-blue flex items-center gap-2 mb-2">
                            <GraduationCap size={18} /> 今日の格言
                        </h4>
                        <p className="text-sm text-gray-700 italic">
                            「努力した者が全て報われるとは限らない。しかし、成功した者は皆すべからく努力している。」
                        </p>
                    </div>
                </aside>

                {/* Right Column: Main Content */}
                <section className="lg:w-2/3 flex-1 min-h-[500px]">
                    <GuidanceSection 
                        activeTopic={activeTopic}
                        topicCards={TOPIC_CARDS}
                        onTopicSelect={setActiveTopic}
                    />
                </section>
            </main>

            {/* Floating Chat Widget */}
            <ChatInterface onSpeakingStateChange={setIsSpeaking} />

            {/* Footer */}
            <footer className="bg-wood-dark text-wood-light py-6 text-center mt-auto safe-area-inset-bottom">
                <p className="font-rounded text-sm">© 2024 Mirai High School Career Guidance System.</p>
            </footer>
        </div>
    );
};

export default App;