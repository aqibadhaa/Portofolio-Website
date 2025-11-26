import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
    children: React.ReactNode;
    animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
    delay?: number;
    className?: string;
}

export function AnimateOnScroll({
    children,
    animation = 'fade',
    delay = 0,
    className = ''
}: AnimateOnScrollProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getAnimationClasses = () => {
        const baseClasses = 'transition-all duration-1000 ease-out';

        if (!isVisible) {
            switch (animation) {
                case 'fade':
                    return `${baseClasses} opacity-0`;
                case 'slide-up':
                    return `${baseClasses} opacity-0 translate-y-20`;
                case 'slide-left':
                    return `${baseClasses} opacity-0 translate-x-20`;
                case 'slide-right':
                    return `${baseClasses} opacity-0 -translate-x-20`;
                case 'scale':
                    return `${baseClasses} opacity-0 scale-75`;
                case 'rotate':
                    return `${baseClasses} opacity-0 rotate-12 scale-75`;
                default:
                    return `${baseClasses} opacity-0`;
            }
        }

        return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
    };

    return (
        <div
            ref={ref}
            className={`${getAnimationClasses()} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
