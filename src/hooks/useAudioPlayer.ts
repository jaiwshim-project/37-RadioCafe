import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export const useAudioPlayer = (streamUrl: string | null) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!streamUrl) {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            return;
        }

        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const audio = audioRef.current;
        setError(null);
        setIsLoading(true);

        if (Hls.isSupported() && streamUrl.endsWith('.m3u8')) {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
            const hls = new Hls();
            hlsRef.current = hls;
            hls.loadSource(streamUrl);
            hls.attachMedia(audio);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                audio.play().catch(e => {
                    console.error("Playback failed:", e);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
                setIsLoading(false);
            });
            hls.on(Hls.Events.ERROR, (_event, data) => {
                if (data.fatal) {
                    setError('방송을 불러오는 중 오류가 발생했습니다.');
                    setIsLoading(false);
                    setIsPlaying(false);
                }
            });
        } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            audio.src = streamUrl;
            audio.addEventListener('loadedmetadata', () => {
                audio.play().catch(e => {
                    console.error("Playback failed:", e);
                    setIsPlaying(false);
                });
                setIsPlaying(true);
                setIsLoading(false);
            });
        } else {
            // Standard audio
            audio.src = streamUrl;
            audio.play().catch(e => {
                console.error("Playback failed:", e);
                setIsPlaying(false);
            });
            setIsPlaying(true);
            setIsLoading(false);
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            audio.pause();
            audio.src = '';
        };
    }, [streamUrl]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    return {
        isPlaying,
        togglePlay,
        volume,
        setVolume,
        isLoading,
        error
    };
};
