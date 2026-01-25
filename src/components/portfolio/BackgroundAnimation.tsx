import { motion } from 'framer-motion';

export default function BackgroundAnimation() {
  // Fixed stars with pink and blue colors - positioned to avoid center content area
  const stars = [
    // Top area stars
    { id: 1, x: 5, y: 5, size: 2, duration: 3, delay: 0, color: '#ff3366' },
    { id: 2, x: 15, y: 8, size: 1.5, duration: 4, delay: 0.5, color: '#33ccff' },
    { id: 3, x: 25, y: 3, size: 1.8, duration: 3.5, delay: 1, color: '#ff3366' },
    { id: 4, x: 35, y: 7, size: 2, duration: 4.5, delay: 0.3, color: '#33ccff' },
    { id: 5, x: 45, y: 4, size: 1.5, duration: 3.8, delay: 0.8, color: '#ff3366' },
    { id: 6, x: 55, y: 6, size: 2, duration: 4.2, delay: 1.2, color: '#33ccff' },
    { id: 7, x: 65, y: 5, size: 1.8, duration: 3.3, delay: 0.6, color: '#ff3366' },
    { id: 8, x: 75, y: 8, size: 2, duration: 4, delay: 1.5, color: '#33ccff' },
    { id: 9, x: 85, y: 4, size: 1.5, duration: 3.7, delay: 0.4, color: '#ff3366' },
    { id: 10, x: 95, y: 7, size: 2, duration: 4.3, delay: 1, color: '#33ccff' },
    
    // Left side stars
    { id: 11, x: 3, y: 15, size: 1.8, duration: 3.5, delay: 0.7, color: '#33ccff' },
    { id: 12, x: 7, y: 25, size: 2, duration: 4, delay: 1.3, color: '#ff3366' },
    { id: 13, x: 4, y: 35, size: 1.5, duration: 3.8, delay: 0.5, color: '#33ccff' },
    { id: 14, x: 8, y: 45, size: 2, duration: 4.5, delay: 1.1, color: '#ff3366' },
    { id: 15, x: 5, y: 55, size: 1.8, duration: 3.3, delay: 0.9, color: '#33ccff' },
    { id: 16, x: 6, y: 65, size: 2, duration: 4.2, delay: 1.4, color: '#ff3366' },
    { id: 17, x: 4, y: 75, size: 1.5, duration: 3.6, delay: 0.6, color: '#33ccff' },
    { id: 18, x: 7, y: 85, size: 2, duration: 4, delay: 1.2, color: '#ff3366' },
    
    // Right side stars
    { id: 19, x: 93, y: 15, size: 1.8, duration: 3.7, delay: 0.8, color: '#ff3366' },
    { id: 20, x: 96, y: 25, size: 2, duration: 4.3, delay: 1.5, color: '#33ccff' },
    { id: 21, x: 94, y: 35, size: 1.5, duration: 3.5, delay: 0.4, color: '#ff3366' },
    { id: 22, x: 97, y: 45, size: 2, duration: 4, delay: 1, color: '#33ccff' },
    { id: 23, x: 95, y: 55, size: 1.8, duration: 3.8, delay: 0.7, color: '#ff3366' },
    { id: 24, x: 96, y: 65, size: 2, duration: 4.5, delay: 1.3, color: '#33ccff' },
    { id: 25, x: 94, y: 75, size: 1.5, duration: 3.3, delay: 0.5, color: '#ff3366' },
    { id: 26, x: 97, y: 85, size: 2, duration: 4.2, delay: 1.1, color: '#33ccff' },
    
    // Bottom area stars
    { id: 27, x: 10, y: 95, size: 1.8, duration: 3.6, delay: 0.9, color: '#33ccff' },
    { id: 28, x: 20, y: 93, size: 2, duration: 4, delay: 1.4, color: '#ff3366' },
    { id: 29, x: 30, y: 96, size: 1.5, duration: 3.8, delay: 0.6, color: '#33ccff' },
    { id: 30, x: 40, y: 94, size: 2, duration: 4.3, delay: 1.2, color: '#ff3366' },
    { id: 31, x: 50, y: 95, size: 1.8, duration: 3.5, delay: 0.8, color: '#33ccff' },
    { id: 32, x: 60, y: 93, size: 2, duration: 4, delay: 1.5, color: '#ff3366' },
    { id: 33, x: 70, y: 96, size: 1.5, duration: 3.7, delay: 0.4, color: '#33ccff' },
    { id: 34, x: 80, y: 94, size: 2, duration: 4.5, delay: 1, color: '#ff3366' },
    { id: 35, x: 90, y: 95, size: 1.8, duration: 3.3, delay: 0.7, color: '#33ccff' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Shining Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff3366] rounded-full blur-[150px] opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#33ccff] rounded-full blur-[150px] opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#ff3366] rounded-full blur-[150px] opacity-15"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
    </div>
  );
}