import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const brandingImages = [
  { id: 1, url: 'https://i.postimg.cc/kGSKK0sT/1-20251224-122957-0000.png', color: '#ff3366' },
  { id: 2, url: 'https://i.postimg.cc/7ZhPR3vd/2-20251224-122957-0001.png', color: '#33ccff' },
  { id: 3, url: 'https://i.postimg.cc/s2PL9Lnq/3-20251224-122957-0002.png', color: '#ff3366' },
  { id: 4, url: 'https://i.postimg.cc/W1YmRwd4/4-20251224-122957-0003.png', color: '#33ccff' },
  { id: 5, url: 'https://i.postimg.cc/YqnLjqMP/5-20251224-122957-0004.png', color: '#ff3366' },
  { id: 6, url: 'https://i.postimg.cc/PfFdwLvF/6-20251224-122958-0005.png', color: '#33ccff' },
];

// Second row images - 4 Image Boxes
const secondRowImages = [
  { id: 7, url: 'https://i.postimg.cc/3J0yFqqt/7-20260109-075534-0000.png', color: '#33ccff' },
  { id: 8, url: 'https://i.postimg.cc/pVh8syh4/8-20260109-075535-0001.png', color: '#ff3366' },
  { id: 9, url: 'https://i.postimg.cc/TYvyQ0vS/9-20260109-075535-0002.png', color: '#33ccff' },
  { id: 10, url: 'https://player.vimeo.com/video/1152776926?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=0&muted=', color: '#ff3366', isVideo: true, videoDuration: 35000 },
];

// Third row - Single static image/video
const thirdRowImage = { 
  id: 12, 
  url: 'https://player.vimeo.com/video/1157871502?badge=0&autopause=0&player_id=0&app_id=58479&loop=1&muted=', 
  color: '#ff3366',
  isVideo: true
};

export default function CompleteBranding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondRowIndex, setSecondRowIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSecondRowTransitioning, setIsSecondRowTransitioning] = useState(false);
  const [isSecondRowMuted, setIsSecondRowMuted] = useState(true);
  const [isThirdRowMuted, setIsThirdRowMuted] = useState(true);
  const [isSecondRowVisible, setIsSecondRowVisible] = useState(false);
  const [isThirdRowVisible, setIsThirdRowVisible] = useState(false);
  
  const secondRowRef = useRef<HTMLDivElement>(null);
  const thirdRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentItem = secondRowImages[secondRowIndex % secondRowImages.length];
    const duration = currentItem.videoDuration || 4000;
    
    const interval = setInterval(() => {
      setIsSecondRowTransitioning(true);
      setSecondRowIndex((prev) => prev + 1);
    }, duration);

    return () => clearInterval(interval);
  }, [secondRowIndex]);

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    const secondRowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSecondRowVisible(true);
        }
      });
    }, observerOptions);

    const thirdRowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsThirdRowVisible(true);
        }
      });
    }, observerOptions);

    if (secondRowRef.current) {
      secondRowObserver.observe(secondRowRef.current);
    }

    if (thirdRowRef.current) {
      thirdRowObserver.observe(thirdRowRef.current);
    }

    return () => {
      if (secondRowRef.current) {
        secondRowObserver.unobserve(secondRowRef.current);
      }
      if (thirdRowRef.current) {
        thirdRowObserver.unobserve(thirdRowRef.current);
      }
    };
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= brandingImages.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleSecondRowTransitionEnd = () => {
    if (secondRowIndex >= secondRowImages.length) {
      setIsSecondRowTransitioning(false);
      setSecondRowIndex(0);
    }
  };

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Complete <span className="text-[#ff3366]">Branding</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            A comprehensive showcase of branding excellence and visual identity
          </p>
        </motion.div>

        {/* First Row - Moving Right to Left */}
        <div className="relative overflow-hidden mb-8">
          <motion.div
            className="flex"
            animate={{
              x: `-${currentIndex * 100}%`,
            }}
            transition={
              isTransitioning
                ? { duration: 0.8, ease: 'easeInOut' }
                : { duration: 0 }
            }
            onAnimationComplete={handleTransitionEnd}
          >
            {[...brandingImages, brandingImages[0]].map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                className="relative group flex-shrink-0 w-full px-4"
              >
                <motion.div
                  className="relative overflow-hidden rounded-3xl aspect-video"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={image.url}
                    alt={`Branding ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${image.color}20, transparent)`,
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div
                      className="w-16 h-1 mb-4 rounded-full"
                      style={{ backgroundColor: image.color }}
                    />
                    <h3 className="text-white text-2xl font-bold">
                      Branding Project {image.id}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Left to Right */}
        <div ref={secondRowRef} className="relative overflow-hidden mb-8 mt-16">
          <motion.div
            className="flex"
            animate={{
              x: `-${secondRowIndex * 100}%`,
            }}
            transition={
              isSecondRowTransitioning
                ? { duration: 0.8, ease: 'easeInOut' }
                : { duration: 0 }
            }
            onAnimationComplete={handleSecondRowTransitionEnd}
          >
            {[...secondRowImages, secondRowImages[0]].map((image, index) => (
              <motion.div
                key={`second-${image.id}-${index}`}
                className="relative group flex-shrink-0 w-full px-4"
              >
                <motion.div
                  className="relative overflow-hidden rounded-3xl aspect-[4/3]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >

                  {image.isVideo ? (
                    isSecondRowVisible ? (
                      <div style={{ padding: '75% 0 0 0', position: 'relative' }}>
                        <iframe
                          key={`video-${secondRowIndex}-${index}`}
                          src={`${image.url}${isSecondRowMuted ? '1' : '0'}${index === secondRowIndex % (secondRowImages.length + 1) ? '&autoplay=1' : '&autoplay=0'}`}
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          title="Design video"
                          loading="lazy"
                        />
                      <button
                        onClick={() => {
                          setIsSecondRowMuted(!isSecondRowMuted);
                          if (isSecondRowMuted) {
                            setIsThirdRowMuted(true);
                          }
                        }}
                        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                        aria-label={isSecondRowMuted ? "Unmute video" : "Mute video"}
                      >
                        {isSecondRowMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div style={{ padding: '75% 0 0 0', position: 'relative' }} className="bg-gray-900 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse text-gray-600">Loading...</div>
                      </div>
                    </div>
                  )
                  ) : (
                    <img
                      src={image.url}
                      alt={`Design ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                  
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${image.color}20, transparent)`,
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div
                      className="w-16 h-1 mb-4 rounded-full"
                      style={{ backgroundColor: image.color }}
                    />
                    <h3 className="text-white text-2xl font-bold">
                      {image.id === 10 ? 'VIDEO AD I' : `Design Project ${image.id - 6}`}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Third Row - Single Static Image */}
        <div ref={thirdRowRef} className="relative mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-4"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                {/* Video AD II Label */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <div
                    className="w-16 h-1 mb-4 rounded-full"
                    style={{ backgroundColor: thirdRowImage.color }}
                  />
                  <h3 className="text-white text-2xl font-bold">
                    VIDEO AD II
                  </h3>
                </div>

                {thirdRowImage.isVideo ? (
                  isThirdRowVisible ? (
                    <div style={{ padding: '75% 0 0 0', position: 'relative' }}>
                      <iframe
                        key={`third-row-video-${isThirdRowMuted}`}
                        src={`${thirdRowImage.url}${isThirdRowMuted ? '1' : '0'}&autoplay=1`}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        title="Design video"
                        loading="lazy"
                      />
                    <button
                      onClick={() => {
                        setIsThirdRowMuted(!isThirdRowMuted);
                        if (isThirdRowMuted) {
                          setIsSecondRowMuted(true);
                        }
                      }}
                      className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                      aria-label={isThirdRowMuted ? "Unmute video" : "Mute video"}
                    >
                      {isThirdRowMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: '75% 0 0 0', position: 'relative' }} className="bg-gray-900 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-pulse text-gray-600">Loading...</div>
                    </div>
                  </div>
                )
                ) : (
                  <img
                    src={thirdRowImage.url}
                    alt={`Design Project ${thirdRowImage.id - 6}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${thirdRowImage.color}20, transparent)`,
                  }}
                />


              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
