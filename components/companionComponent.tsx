'use client'
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {useEffect, useRef, useState} from "react";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundWaves from '@/constants/soundwaves.json'
import {addToSessionHistory} from "@/lib/actions/companion.actions";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
    CONNECTING = 'CONNECTING',
    ERROR = 'ERROR'
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [messages, setMessages] = useState<SavedMessage[]>([])
    const [isMuted, setIsMuted] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef.current) {
            isSpeaking ? lottieRef.current.play() : lottieRef.current.pause();
        }
    }, [isSpeaking]);

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
            setError(null);
        }

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            // Add void to handle promise properly
            void addToSessionHistory(companionId);
        }

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                setMessages(prev => [{ role: message.role, content: message.transcript }, ...prev]);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (err: Error) => {
            console.error(err);
            if (err.message.includes('Meeting has ended')) {
                setCallStatus(CallStatus.FINISHED);
                setError('The meeting ended unexpectedly');
            } else {
                setCallStatus(CallStatus.ERROR);
                setError(`Error: ${err.message}`);
            }
        }

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        };
    }, [companionId]); // Added missing dependency

    const toggleMicrophone = () => {
        const muted = vapi.isMuted();
        vapi.setMuted(!muted);
        setIsMuted(!muted);
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        setError(null);

        try {
            const assistantOverrides = {
                variableValues: { subject, topic, style },
                clientMessages: ['transcript'],
                serverMessages: []
            };

            // Added description for ts-expect-error
            // @ts-expect-error: configureAssistant returns valid assistant configuration
            await vapi.start(configureAssistant(voice, style), assistantOverrides);
        } catch (err) {
            setCallStatus(CallStatus.ERROR);
            setError(`Failed to start call: ${(err as Error).message}`);
        }
    }

    const handleDisconnect = () => {
        vapi.stop();
        setCallStatus(CallStatus.FINISHED);
    }

    return (
        <section className={'flex flex-col h-[70vh]'}>
            {/* Error message display */}
            {error && (
                <div className="text-red-500 p-2 text-center">
                    {error}
                </div>
            )}

            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <div
                            className={
                                cn(
                                    'absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                                )
                            }>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className="max-sm:w-fit" />
                        </div>

                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundWaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt={userName} width={130} height={130} className="rounded-lg" />
                        <p className="font-bold text-2xl">
                            {userName}
                        </p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={36} height={36} />
                        <p className="max-sm:hidden">
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting'
                                : 'Start Session'
                        }
                    </button>
                </div>
            </section>
            <section className={'transcript'}>
                <div className={'transcript-message no-scrollbar'}>

                    {
                        messages.map((message, index) => {
                            if(message.role === 'assistant') {
                                return (
                                    <p key={index} className={'max-sm:text-sm '}>{name.split(' ')[0].replace('/[.,]/g. ','')} : {message.content}</p>
                                )
                            }
                            else{
                                return <p key={index} className={'text-primary max-sm:text-sm'}>
                                    {userName} : {message.content}
                                </p>
                            }
                        })
                    }
                </div>
                <div className={'transcript-fade'}/>
            </section>
        </section>
    )
}

export default CompanionComponent;