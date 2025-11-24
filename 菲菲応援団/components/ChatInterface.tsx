import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { streamMessageToGemini } from '../services/geminiService';
import { Send, X, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
    onSpeakingStateChange: (isSpeaking: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSpeakingStateChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'model',
            text: '進路について何か不安なことはありますか？何でも聞いてくださいね。',
            timestamp: Date.now()
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        onSpeakingStateChange(true);

        const modelMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, {
            id: modelMessageId,
            role: 'model',
            text: '',
            timestamp: Date.now()
        }]);

        try {
            let fullText = '';
            const stream = streamMessageToGemini(userMessage.text);
            
            for await (const chunk of stream) {
                fullText += chunk;
                setMessages(prev => prev.map(msg => 
                    msg.id === modelMessageId ? { ...msg, text: fullText } : msg
                ));
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                text: 'すみません、通信エラーが発生しました。',
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoading(false);
            onSpeakingStateChange(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-sans">
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-school-blue hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 animate-bounce"
                >
                    <MessageSquare size={24} />
                    <span className="font-bold">先生に相談する</span>
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-[90vw] md:w-[400px] max-h-[600px] flex flex-col border-4 border-wood-light overflow-hidden">
                    {/* Header */}
                    <div className="bg-chalkboard p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <h3 className="font-bold text-lg">進路指導室チャット</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 min-h-[300px]">
                        {messages.map((msg) => (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-school-blue text-white rounded-br-none' 
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                                    }`}
                                >
                                    {msg.role === 'model' ? (
                                        <ReactMarkdown 
                                            className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2"
                                            components={{
                                                strong: ({node, ...props}) => <span className="font-bold text-indigo-600" {...props} />
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 bg-gray-100 border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="例：志望理由書が書けません..."
                            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-school-blue focus:ring-1 focus:ring-school-blue transition-all"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="bg-school-blue text-white p-2 rounded-full disabled:opacity-50 hover:bg-blue-800 transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;