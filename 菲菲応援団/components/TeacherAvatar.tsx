import React from 'react';

interface TeacherAvatarProps {
    isSpeaking: boolean;
    expression?: 'normal' | 'happy' | 'stern';
    className?: string;
}

const TeacherAvatar: React.FC<TeacherAvatarProps> = ({ isSpeaking, className = '' }) => {
    return (
        <div className={`relative ${className} group`}>
             {/* Photo Frame */}
            <div className={`
                relative w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-gray-200
                ${isSpeaking ? 'ring-4 ring-school-blue/30 scale-105' : ''}
                transition-all duration-300 ease-in-out
            `}>
                <img 
                    /* 
                       IMPORTANT: 
                       Please save the image you provided as "teacher.jpg" 
                       and place it in the root/public folder of your project.
                    */
                    src="/teacher.jpg" 
                    alt="佐藤先生" 
                    className={`
                        w-full h-full object-cover object-center
                        ${isSpeaking ? 'animate-[wiggle_2s_ease-in-out_infinite] brightness-110' : ''}
                        transition-all duration-300
                    `}
                    onError={(e) => {
                        // Fallback to a placeholder if the local image is missing
                        e.currentTarget.src = "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";
                    }}
                />
                
                {/* Glossy overlay effect for polish */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none"></div>
            </div>

            {/* Speaking Badge */}
            {isSpeaking && (
                <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-school-blue rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-school-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-school-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            )}
        </div>
    );
};

export default TeacherAvatar;