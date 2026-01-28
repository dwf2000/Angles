import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Pencil, 
  ClipboardCheck, 
  Key, 
  Sparkles, 
  Trophy,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Calculator,
  Target,
  Zap,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Types
type Section = 'learn' | 'practice' | 'test' | 'answers';

interface Question {
  id: number;
  answers: Record<string, number>;
}

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${2 + Math.random() * 4}px`,
    color: ['#00f5ff', '#ff00ff', '#b026ff', '#00ff88'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            animation: `particle-float ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// Animated background
const AnimatedBackground = () => (
  <div className="animated-bg">
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          right: '-10%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          left: '30%',
          bottom: '10%',
          background: 'radial-gradient(circle, rgba(176,38,255,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  </div>
);

// Header component
const Header = () => (
  <motion.header 
    className="header-glow py-8 px-6 mb-8"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <Sparkles className="w-8 h-8 text-cyan-400" />
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          Angle Adventure
        </h1>
        <Sparkles className="w-8 h-8 text-fuchsia-400" />
      </motion.div>
      <motion.p 
        className="text-xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Welcome, <span className="welcome-name">Maleah</span>! Let's master angles together! 
        <span className="inline-block ml-2">🚀</span>
      </motion.p>
    </div>
  </motion.header>
);

// Navigation component
const Navigation = ({ activeSection, setSection }: { activeSection: Section; setSection: (s: Section) => void }) => {
  const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Pencil },
    { id: 'test', label: 'Test', icon: ClipboardCheck },
    { id: 'answers', label: 'Answers', icon: Key },
  ];

  return (
    <motion.nav 
      className="flex flex-wrap justify-center gap-3 mb-8 px-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              isActive 
                ? 'btn-active text-white' 
                : 'btn-neon text-cyan-400 hover:text-white'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

// Learn Section
const LearnSection = () => {
  const concepts = [
    {
      title: 'Angles on a Straight Line = 180°',
      description: 'When angles sit on a straight line, they ALWAYS add up to exactly 180 degrees. This is called being supplementary.',
      color: 'cyan',
      svg: (
        <svg width="350" height="100" viewBox="0 0 350 100" className="mx-auto">
          <line x1="20" y1="60" x2="330" y2="60" stroke="#00f5ff" strokeWidth="3" />
          <line x1="175" y1="60" x2="175" y2="15" stroke="#b026ff" strokeWidth="2" />
          <path d="M 145 60 A 30 30 0 0 1 175 30" fill="none" stroke="#ff00ff" strokeWidth="2" />
          <path d="M 175 30 A 30 30 0 0 1 205 60" fill="none" stroke="#00ff88" strokeWidth="2" />
          <text x="140" y="45" fill="#ff00ff" fontSize="14" fontWeight="bold">a°</text>
          <text x="195" y="45" fill="#00ff88" fontSize="14" fontWeight="bold">b°</text>
          <text x="130" y="90" fill="#00f5ff" fontSize="14" fontWeight="bold">a + b = 180°</text>
        </svg>
      )
    },
    {
      title: 'Angles Around a Point = 360°',
      description: 'When multiple angles meet at a single point, they ALWAYS add up to 360 degrees (a full circle).',
      color: 'purple',
      svg: (
        <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
          <line x1="100" y1="100" x2="180" y2="100" stroke="#00f5ff" strokeWidth="2" />
          <line x1="100" y1="100" x2="100" y2="20" stroke="#ff00ff" strokeWidth="2" />
          <line x1="100" y1="100" x2="30" y2="130" stroke="#00ff88" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="180" stroke="#b026ff" strokeWidth="2" />
          <text x="130" y="85" fill="#00f5ff" fontSize="12" fontWeight="bold">a°</text>
          <text x="60" y="70" fill="#ff00ff" fontSize="12" fontWeight="bold">b°</text>
          <text x="45" y="130" fill="#00ff88" fontSize="12" fontWeight="bold">c°</text>
          <text x="85" y="160" fill="#b026ff" fontSize="12" fontWeight="bold">d°</text>
          <text x="50" y="195" fill="#ffffff" fontSize="12" fontWeight="bold">a+b+c+d = 360°</text>
        </svg>
      )
    },
    {
      title: 'Vertical Angles are Equal',
      description: 'When two lines cross, they create two pairs of vertical angles. Vertical angles are ALWAYS equal!',
      color: 'pink',
      svg: (
        <svg width="250" height="180" viewBox="0 0 250 180" className="mx-auto">
          <line x1="30" y1="30" x2="220" y2="150" stroke="#00f5ff" strokeWidth="2" />
          <line x1="30" y1="150" x2="220" y2="30" stroke="#ff00ff" strokeWidth="2" />
          <text x="115" y="55" fill="#00f5ff" fontSize="14" fontWeight="bold">a°</text>
          <text x="145" y="100" fill="#ff00ff" fontSize="14" fontWeight="bold">b°</text>
          <text x="95" y="130" fill="#00f5ff" fontSize="14" fontWeight="bold">a°</text>
          <text x="65" y="85" fill="#ff00ff" fontSize="14" fontWeight="bold">b°</text>
          <text x="55" y="170" fill="#ffffff" fontSize="12" fontWeight="bold">Opposite angles are equal!</text>
        </svg>
      )
    },
    {
      title: 'Right Angles = 90°',
      description: 'A right angle is exactly 90 degrees. It looks like the corner of a book or a square.',
      color: 'green',
      svg: (
        <svg width="150" height="150" viewBox="0 0 150 150" className="mx-auto">
          <line x1="20" y1="100" x2="130" y2="100" stroke="#00f5ff" strokeWidth="3" />
          <line x1="75" y1="100" x2="75" y2="20" stroke="#00f5ff" strokeWidth="3" />
          <rect x="75" y="80" width="20" height="20" fill="none" stroke="#00ff88" strokeWidth="2" />
          <text x="50" y="140" fill="#ffffff" fontSize="14" fontWeight="bold">90°</text>
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4"
    >
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold gradient-text">Understanding Angle Relationships</h2>
        </div>
        
        <motion.div variants={itemVariants} className="concept-box p-6 mb-8">
          <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            What are Angles?
          </h3>
          <p className="text-gray-300 leading-relaxed">
            An <strong className="text-fuchsia-400">angle</strong> is formed when two lines (called rays) meet at a point. 
            We measure angles in <strong className="text-cyan-400">degrees (°)</strong>.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="analogy-box p-6 mb-8">
          <p className="text-gray-300 leading-relaxed">
            <Lightbulb className="w-5 h-5 inline mr-2 text-fuchsia-400" />
            <strong className="text-fuchsia-400">Think of it like this:</strong> Imagine opening a door. 
            When it's closed, the angle is 0°. Open it a little = small angle. Open it all the way against the wall = 180°. 
            The amount you open the door is the angle!
          </p>
        </motion.div>

        <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          The Key Concepts You Need to Know
        </motion.h3>

        {concepts.map((concept, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="glass-card rounded-xl p-6 mb-6 hover:border-cyan-500/30 transition-all duration-300"
          >
            <h3 className={`text-xl font-semibold mb-3 ${
              concept.color === 'cyan' ? 'text-cyan-400' :
              concept.color === 'purple' ? 'text-fuchsia-400' :
              concept.color === 'pink' ? 'text-pink-400' : 'text-green-400'
            }`}>
              {index + 1}. {concept.title}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">{concept.description}</p>
            <div className="diagram-container p-4">
              {concept.svg}
            </div>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="formula-box p-6 mb-8">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Solving Ratio Problems
          </h3>
          <div className="text-center space-y-3">
            <p className="text-lg text-fuchsia-400 font-mono">If ratio is 4:5, angles are 4x and 5x</p>
            <p className="text-lg text-cyan-400 font-mono">4x + 5x = 180° → 9x = 180° → x = 20°</p>
            <p className="text-lg text-green-400 font-mono">Angles: 4(20°) = 80° and 5(20°) = 100°</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Quick Reference Table
          </h3>
          <div className="overflow-x-auto">
            <table className="table-neon">
              <thead>
                <tr>
                  <th>Angle Type</th>
                  <th>What It Means</th>
                  <th>Total Degrees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-cyan-400 font-semibold">Supplementary</td>
                  <td className="text-gray-300">Angles on a straight line</td>
                  <td className="text-fuchsia-400 font-bold">180°</td>
                </tr>
                <tr>
                  <td className="text-cyan-400 font-semibold">Around a Point</td>
                  <td className="text-gray-300">All angles meeting at one point</td>
                  <td className="text-fuchsia-400 font-bold">360°</td>
                </tr>
                <tr>
                  <td className="text-cyan-400 font-semibold">Right Angle</td>
                  <td className="text-gray-300">A perfect corner</td>
                  <td className="text-green-400 font-bold">90°</td>
                </tr>
                <tr>
                  <td className="text-cyan-400 font-semibold">Complementary</td>
                  <td className="text-gray-300">Two angles that make a right angle</td>
                  <td className="text-green-400 font-bold">90°</td>
                </tr>
                <tr>
                  <td className="text-cyan-400 font-semibold">Vertical Angles</td>
                  <td className="text-gray-300">Opposite angles when lines cross</td>
                  <td className="text-pink-400 font-bold">Equal to each other</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Practice Section - All 10 Homework Questions with Detailed Explanations
const PracticeSection = () => {
  const problems = [
    {
      title: 'Problem 1: Finding an Angle Inside a Right Angle',
      description: 'Find ∠DAE. The right angle is at A (90°), and ∠EAF = 65°.',
      svg: (
        <svg width="300" height="200" viewBox="0 0 300 200">
          <line x1="30" y1="150" x2="270" y2="150" stroke="#00f5ff" strokeWidth="2" />
          <line x1="150" y1="150" x2="150" y2="30" stroke="#00f5ff" strokeWidth="2" />
          <line x1="150" y1="150" x2="230" y2="70" stroke="#b026ff" strokeWidth="2" />
          <line x1="150" y1="150" x2="200" y2="90" stroke="#ff00ff" strokeWidth="2" />
          <rect x="150" y="130" width="20" height="20" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="15" y="145" fill="#ffffff" fontWeight="bold">C</text>
          <text x="275" y="155" fill="#ffffff" fontWeight="bold">F</text>
          <text x="145" y="20" fill="#ffffff" fontWeight="bold">D</text>
          <text x="205" y="85" fill="#ff00ff" fontWeight="bold">E</text>
          <text x="160" y="90" fill="#b026ff">x°</text>
          <text x="195" y="125" fill="#ffffff">65°</text>
          <text x="140" y="175" fill="#ffffff" fontWeight="bold">A</text>
        </svg>
      ),
      explanation: 'This problem is about complementary angles - angles that add up to 90°. The little square symbol at A tells us that ∠CAD is a right angle (90°).',
      steps: [
        { num: 1, text: 'IDENTIFY: Look for the square symbol at point A. This means ∠CAD = 90° (a right angle).' },
        { num: 2, text: 'UNDERSTAND: The right angle is split into two smaller angles: ∠DAE (what we want to find) and ∠EAF (which is 65°).' },
        { num: 3, text: 'SET UP THE EQUATION: Since these two angles together make the right angle: ∠DAE + ∠EAF = 90°' },
        { num: 4, text: 'SUBSTITUTE: ∠DAE + 65° = 90°' },
        { num: 5, text: 'SOLVE: To find ∠DAE, subtract 65° from 90°: ∠DAE = 90° - 65° = 25°' }
      ],
      answer: '∠DAE = 25°',
      check: '25° + 65° = 90° ✓'
    },
    {
      title: 'Problem 2: Angles on a Straight Line (Same Variable)',
      description: 'Angles on a straight line: f°, 154°, f°. Find f.',
      svg: (
        <svg width="400" height="100" viewBox="0 0 400 100">
          <line x1="20" y1="60" x2="380" y2="60" stroke="#00f5ff" strokeWidth="3" />
          <line x1="100" y1="60" x2="80" y2="15" stroke="#b026ff" strokeWidth="2" />
          <line x1="300" y1="60" x2="320" y2="15" stroke="#b026ff" strokeWidth="2" />
          <text x="30" y="50" fill="#ffffff" fontWeight="bold">Q</text>
          <text x="75" y="12" fill="#ffffff" fontWeight="bold">R</text>
          <text x="185" y="50" fill="#ffffff" fontWeight="bold">P</text>
          <text x="315" y="12" fill="#ffffff" fontWeight="bold">S</text>
          <text x="365" y="50" fill="#ffffff" fontWeight="bold">T</text>
          <text x="55" y="50" fill="#ff00ff">f°</text>
          <text x="185" y="85" fill="#00f5ff" fontWeight="bold">154°</text>
          <text x="325" y="50" fill="#ff00ff">f°</text>
        </svg>
      ),
      explanation: 'This problem uses the rule that angles on a straight line always add up to 180°. Notice that two angles are both labeled "f°" - this means they have the same value!',
      steps: [
        { num: 1, text: 'IDENTIFY: All three angles sit on a straight line (line QPT). Angles on a straight line = 180°.' },
        { num: 2, text: 'NOTICE: Two angles are both called "f°" - this means they are EQUAL. So we have f + 154° + f.' },
        { num: 3, text: 'SET UP THE EQUATION: f° + 154° + f° = 180°' },
        { num: 4, text: 'COMBINE LIKE TERMS: f + f = 2f, so: 2f° + 154° = 180°' },
        { num: 5, text: 'ISOLATE 2f: Subtract 154° from both sides: 2f° = 180° - 154° = 26°' },
        { num: 6, text: 'SOLVE FOR f: Divide both sides by 2: f = 26° ÷ 2 = 13°' }
      ],
      answer: 'f = 13°',
      check: '13° + 154° + 13° = 180° ✓'
    },
    {
      title: 'Problem 3: Multiple Angles with Variables on a Line',
      description: 'On a line: 10°, 2x°, 103°, 3x°, 12°. Find ∠CQD (2x°) and ∠EQF (3x°).',
      svg: (
        <svg width="400" height="120" viewBox="0 0 400 120">
          <line x1="20" y1="80" x2="380" y2="80" stroke="#00f5ff" strokeWidth="3" />
          <line x1="60" y1="80" x2="45" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="120" y1="80" x2="120" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="270" y1="80" x2="270" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="340" y1="80" x2="355" y2="25" stroke="#b026ff" strokeWidth="2" />
          <text x="30" y="70" fill="#ffffff">10°</text>
          <text x="75" y="70" fill="#b026ff">2x°</text>
          <text x="175" y="70" fill="#ff00ff" fontWeight="bold">103°</text>
          <text x="290" y="70" fill="#b026ff">3x°</text>
          <text x="345" y="70" fill="#ffffff">12°</text>
          <text x="185" y="105" fill="#ffffff" fontWeight="bold">Q</text>
        </svg>
      ),
      explanation: 'This problem has 5 angles on a straight line, and two of them use the variable x. The key is to add ALL angles and set equal to 180°.',
      steps: [
        { num: 1, text: 'IDENTIFY: There are 5 angles on a straight line. All angles on a line = 180°.' },
        { num: 2, text: 'SET UP THE EQUATION: Add all five angles: 10° + 2x° + 103° + 3x° + 12° = 180°' },
        { num: 3, text: 'COMBINE THE NUMBERS: 10° + 103° + 12° = 125°' },
        { num: 4, text: 'COMBINE THE x TERMS: 2x + 3x = 5x' },
        { num: 5, text: 'SIMPLIFIED EQUATION: 125° + 5x° = 180°' },
        { num: 6, text: 'ISOLATE 5x: Subtract 125° from both sides: 5x° = 180° - 125° = 55°' },
        { num: 7, text: 'SOLVE FOR x: x = 55° ÷ 5 = 11°' },
        { num: 8, text: 'FIND ∠CQD (2x°): 2 × 11° = 22°' },
        { num: 9, text: 'FIND ∠EQF (3x°): 3 × 11° = 33°' }
      ],
      answer: '∠CQD = 22° and ∠EQF = 33°',
      check: '10° + 22° + 103° + 33° + 12° = 180° ✓'
    },
    {
      title: 'Problem 4: Angles Around a Point',
      description: 'Around a point: 4 angles of 71° and 2 angles of x°. Find x.',
      svg: (
        <svg width="220" height="220" viewBox="0 0 220 220">
          <line x1="110" y1="110" x2="200" y2="110" stroke="#00f5ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="175" y2="50" stroke="#ff00ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="110" y2="25" stroke="#ff00ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="45" y2="50" stroke="#ff00ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="25" y2="110" stroke="#00f5ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="60" y2="180" stroke="#ff00ff" strokeWidth="2" />
          <text x="160" y="100" fill="#00f5ff">x°</text>
          <text x="145" y="65" fill="#ffffff">71°</text>
          <text x="100" y="50" fill="#ffffff">71°</text>
          <text x="55" y="70" fill="#ffffff">71°</text>
          <text x="40" y="105" fill="#00f5ff">x°</text>
          <text x="55" y="155" fill="#ffffff">71°</text>
        </svg>
      ),
      explanation: 'This problem uses the rule that angles around a point always add up to 360° (a full circle). There are 4 angles that are 71° and 2 angles that are x°.',
      steps: [
        { num: 1, text: 'IDENTIFY: All angles meet at one point. Angles around a point = 360°.' },
        { num: 2, text: 'COUNT: There are 4 angles of 71° and 2 angles of x°.' },
        { num: 3, text: 'SET UP THE EQUATION: 4(71°) + 2x° = 360°' },
        { num: 4, text: 'MULTIPLY: 4 × 71° = 284°' },
        { num: 5, text: 'SIMPLIFIED EQUATION: 284° + 2x° = 360°' },
        { num: 6, text: 'ISOLATE 2x: Subtract 284° from both sides: 2x° = 360° - 284° = 76°' },
        { num: 7, text: 'SOLVE FOR x: x = 76° ÷ 2 = 38°' }
      ],
      answer: 'x = 38°',
      check: '4(71°) + 2(38°) = 284° + 76° = 360° ✓'
    },
    {
      title: 'Problem 5: Complementary & Vertical Angles',
      description: '25° and x° are complementary (in a right angle). y° is vertical to x°. Find x and y.',
      svg: (
        <svg width="280" height="200" viewBox="0 0 280 200">
          <line x1="20" y1="110" x2="260" y2="110" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="140" y2="20" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="80" y2="40" stroke="#b026ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="200" y2="40" stroke="#ff00ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="140" y2="180" stroke="#00f5ff" strokeWidth="2" />
          <rect x="140" y="90" width="15" height="15" fill="none" stroke="#00ff88" strokeWidth="1" />
          <rect x="125" y="110" width="15" height="15" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="80" y="70" fill="#ffffff">25°</text>
          <text x="115" y="70" fill="#b026ff">x°</text>
          <text x="160" y="70" fill="#ff00ff">y°</text>
        </svg>
      ),
      explanation: 'This problem combines two concepts: complementary angles (add to 90°) and vertical angles (opposite angles that are equal).',
      steps: [
        { num: 1, text: 'IDENTIFY PART 1: Look at the top right corner. The square symbol means this is a right angle (90°).' },
        { num: 2, text: 'UNDERSTAND: The right angle is split into 25° and x°. So: 25° + x° = 90°' },
        { num: 3, text: 'SOLVE FOR x: x° = 90° - 25° = 65°' },
        { num: 4, text: 'IDENTIFY PART 2: Now look at y°. It is "vertical" to x° (opposite angles where lines cross).' },
        { num: 5, text: 'VERTICAL ANGLES RULE: Vertical angles are ALWAYS equal!' },
        { num: 6, text: 'THEREFORE: y° = x° = 65°' }
      ],
      answer: 'x = 65°, y = 65°',
      check: '25° + 65° = 90° ✓ and vertical angles are equal ✓'
    },
    {
      title: 'Problem 6: Two Equations in One Diagram',
      description: 'Above line: x° + x° + 24° = 90° (right angle portion). Below: 3y° = 90°. Find x and y.',
      svg: (
        <svg width="280" height="220" viewBox="0 0 280 220">
          <line x1="20" y1="100" x2="260" y2="100" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="140" y2="20" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="200" y2="40" stroke="#b026ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="100" y2="170" stroke="#ff00ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="120" y2="170" stroke="#ff00ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="140" y2="180" stroke="#ff00ff" strokeWidth="2" />
          <rect x="140" y="100" width="12" height="12" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="100" y="55" fill="#b026ff">x°</text>
          <text x="145" y="55" fill="#b026ff">x°</text>
          <text x="185" y="55" fill="#ffffff">24°</text>
          <text x="95" y="135" fill="#ff00ff">y°</text>
          <text x="115" y="150" fill="#ff00ff">y°</text>
          <text x="135" y="160" fill="#ff00ff">y°</text>
        </svg>
      ),
      explanation: 'This problem has two separate parts - one above the line (finding x) and one below the line (finding y). Each part uses the right angle = 90° rule.',
      steps: [
        { num: 1, text: 'PART 1 - FIND x: Look above the horizontal line. The square symbol shows a right angle (90°).' },
        { num: 2, text: 'SET UP FOR x: The right angle is split into three parts: x° + x° + 24° = 90°' },
        { num: 3, text: 'COMBINE: 2x° + 24° = 90°' },
        { num: 4, text: 'ISOLATE 2x: 2x° = 90° - 24° = 66°' },
        { num: 5, text: 'SOLVE FOR x: x = 66° ÷ 2 = 33°' },
        { num: 6, text: 'PART 2 - FIND y: Look below the horizontal line. Three angles of y° make a right angle (90°).' },
        { num: 7, text: 'SET UP FOR y: y° + y° + y° = 90° which means 3y° = 90°' },
        { num: 8, text: 'SOLVE FOR y: y = 90° ÷ 3 = 30°' }
      ],
      answer: 'x = 33°, y = 30°',
      check: '33° + 33° + 24° = 90° ✓ and 30° + 30° + 30° = 90° ✓'
    },
    {
      title: 'Problem 7: Algebraic Expressions in Angles',
      description: '∠CAD = (3/2)x + 20° and ∠DAE = 2x°. They form a right angle (90°). Find both angles.',
      svg: (
        <svg width="280" height="180" viewBox="0 0 280 180">
          <line x1="20" y1="130" x2="260" y2="130" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="130" x2="140" y2="20" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="130" x2="210" y2="80" stroke="#b026ff" strokeWidth="2" />
          <rect x="140" y="110" width="15" height="15" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="135" y="15" fill="#ffffff" fontWeight="bold">C</text>
          <text x="215" y="80" fill="#ffffff" fontWeight="bold">D</text>
          <text x="260" y="125" fill="#ffffff" fontWeight="bold">E</text>
          <text x="130" y="155" fill="#ffffff" fontWeight="bold">A</text>
          <text x="100" y="75" fill="#b026ff" fontSize="12">(3/2)x+20°</text>
          <text x="175" y="115" fill="#ff00ff" fontSize="12">2x°</text>
        </svg>
      ),
      explanation: 'This problem looks scary because of the fractions, but it is just like Problem 1! Two angles add up to 90°. We just need to solve for x first, then find each angle.',
      steps: [
        { num: 1, text: 'IDENTIFY: The square symbol at A means ∠CAE = 90° (right angle).' },
        { num: 2, text: 'SET UP THE EQUATION: The two angles add to 90°: (3/2)x + 20° + 2x = 90°' },
        { num: 3, text: 'COMBINE x TERMS: (3/2)x + 2x = (3/2)x + (4/2)x = (7/2)x' },
        { num: 4, text: 'SIMPLIFIED EQUATION: (7/2)x + 20° = 90°' },
        { num: 5, text: 'ISOLATE (7/2)x: (7/2)x = 90° - 20° = 70°' },
        { num: 6, text: 'SOLVE FOR x: x = 70° × (2/7) = 140° ÷ 7 = 20°' },
        { num: 7, text: 'FIND ∠CAD: (3/2)(20°) + 20° = 30° + 20° = 50°' },
        { num: 8, text: 'FIND ∠DAE: 2(20°) = 40°' }
      ],
      answer: '∠CAD = 50° and ∠DAE = 40°',
      check: '50° + 40° = 90° ✓'
    },
    {
      title: 'Problem 8: Using Straight Line and Angle Relationships',
      description: 'At point Q: ∠CQG = 3x°, ∠GQF = 56°, ∠EQD = 155° (below line). Line CQD is straight. Find ∠CQG.',
      svg: (
        <svg width="320" height="200" viewBox="0 0 320 200">
          <line x1="20" y1="110" x2="300" y2="110" stroke="#00f5ff" strokeWidth="3" />
          <line x1="160" y1="110" x2="160" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="160" y1="110" x2="230" y2="45" stroke="#ff00ff" strokeWidth="2" />
          <line x1="160" y1="110" x2="160" y2="180" stroke="#00f5ff" strokeWidth="2" />
          <text x="10" y="105" fill="#ffffff" fontWeight="bold">C</text>
          <text x="155" y="20" fill="#ffffff" fontWeight="bold">G</text>
          <text x="235" y="45" fill="#ffffff" fontWeight="bold">F</text>
          <text x="295" y="105" fill="#ffffff" fontWeight="bold">D</text>
          <text x="155" y="190" fill="#ffffff" fontWeight="bold">E</text>
          <text x="90" y="100" fill="#b026ff">3x°</text>
          <text x="180" y="65" fill="#ffffff">56°</text>
          <text x="180" y="150" fill="#ff00ff">155°</text>
          <text x="150" y="125" fill="#ffffff" fontWeight="bold">Q</text>
        </svg>
      ),
      explanation: 'This is a tricky one! Line CQD is straight, so angles above it must add to 180°. The 155° is below the line (a distraction), but we can use it to find the angle next to it!',
      steps: [
        { num: 1, text: 'IDENTIFY: Line CQD is straight, so angles on top of it add to 180°.' },
        { num: 2, text: 'NOTICE: The 155° angle is BELOW the line. The angle directly above it (let\'s call it ∠GQD) forms a straight line with it.' },
        { num: 3, text: 'FIND ∠GQD: Since ∠EQD + ∠GQD = 180° (they form a straight line), then ∠GQD = 180° - 155° = 25°' },
        { num: 4, text: 'NOW LOOK AT TOP: The angles above line CQD are: 3x° (∠CQG) + 56° (∠GQF) + 25° (∠FQD) = 180°' },
        { num: 5, text: 'SET UP: 3x° + 56° + 25° = 180°' },
        { num: 6, text: 'COMBINE NUMBERS: 3x° + 81° = 180°' },
        { num: 7, text: 'ISOLATE 3x: 3x° = 180° - 81° = 99°' },
        { num: 8, text: 'SOLVE FOR x: x = 99° ÷ 3 = 33°' },
        { num: 9, text: 'FIND ∠CQG: 3x° = 3(33°) = 99°' }
      ],
      answer: '∠CQG = 99°',
      check: '99° + 56° + 25° = 180° ✓'
    },
    {
      title: 'Problem 9: Two Angles in Ratio (4:5)',
      description: 'The ratio of two adjacent angles on a line is 4:5. Find both angles.',
      svg: (
        <svg width="400" height="120" viewBox="0 0 400 120">
          <line x1="20" y1="80" x2="380" y2="80" stroke="#00f5ff" strokeWidth="3" />
          <line x1="200" y1="80" x2="140" y2="20" stroke="#b026ff" strokeWidth="2" />
          <text x="100" y="60" fill="#ff00ff" fontWeight="bold" fontSize="20">80°</text>
          <text x="260" y="60" fill="#00ff88" fontWeight="bold" fontSize="20">100°</text>
          <text x="10" y="95" fill="#ffffff" fontWeight="bold">A</text>
          <text x="193" y="105" fill="#ffffff" fontWeight="bold">B</text>
          <text x="125" y="15" fill="#ffffff" fontWeight="bold">C</text>
          <text x="375" y="95" fill="#ffffff" fontWeight="bold">D</text>
          <text x="150" y="115" fill="#888" fontSize="12">80° + 100° = 180° ✓</text>
        </svg>
      ),
      explanation: 'Ratio problems can seem confusing, but they follow a pattern! A ratio of 4:5 means for every 4 "parts" of the first angle, there are 5 "parts" of the second angle. We use "x" to represent one part.',
      steps: [
        { num: 1, text: 'UNDERSTAND THE RATIO: 4:5 means the first angle has 4 parts, the second has 5 parts.' },
        { num: 2, text: 'SET UP WITH x: Let the first angle = 4x and the second angle = 5x' },
        { num: 3, text: 'USE THE STRAIGHT LINE RULE: The two angles are on a line, so they add to 180°' },
        { num: 4, text: 'WRITE THE EQUATION: 4x + 5x = 180°' },
        { num: 5, text: 'COMBINE: 9x = 180°' },
        { num: 6, text: 'SOLVE FOR x: x = 180° ÷ 9 = 20°' },
        { num: 7, text: 'FIND FIRST ANGLE: 4x = 4(20°) = 80°' },
        { num: 8, text: 'FIND SECOND ANGLE: 5x = 5(20°) = 100°' }
      ],
      answer: 'The angles are 80° and 100°',
      check: '80° + 100° = 180° ✓ and 80:100 simplifies to 4:5 ✓'
    },
    {
      title: 'Problem 10: Three Angles in Ratio (3:4:5)',
      description: 'The ratio of three adjacent angles on a line is 3:4:5. Find all three angles.',
      svg: (
        <svg width="450" height="150" viewBox="0 0 450 150">
          <line x1="25" y1="100" x2="425" y2="100" stroke="#00f5ff" strokeWidth="3" />
          <line x1="120" y1="100" x2="80" y2="35" stroke="#b026ff" strokeWidth="2" />
          <line x1="200" y1="100" x2="180" y2="25" stroke="#ff00ff" strokeWidth="2" />
          <line x1="320" y1="100" x2="320" y2="30" stroke="#00ff88" strokeWidth="2" />
          <rect x="320" y="85" width="12" height="12" fill="none" stroke="#00ff88" strokeWidth="2" />
          <text x="55" y="75" fill="#b026ff" fontWeight="bold" fontSize="18">45°</text>
          <text x="140" y="60" fill="#ff00ff" fontWeight="bold" fontSize="18">60°</text>
          <text x="250" y="60" fill="#00ff88" fontWeight="bold" fontSize="18">75°</text>
          <text x="10" y="115" fill="#ffffff" fontWeight="bold">A</text>
          <text x="113" y="125" fill="#ffffff" fontWeight="bold">B</text>
          <text x="193" y="125" fill="#ffffff" fontWeight="bold">C</text>
          <text x="313" y="125" fill="#ffffff" fontWeight="bold">D</text>
          <text x="420" y="115" fill="#ffffff" fontWeight="bold">E</text>
          <text x="130" y="145" fill="#888" fontSize="12">45° + 60° + 75° = 180° ✓</text>
        </svg>
      ),
      explanation: 'This is just like Problem 9, but with THREE angles instead of two. The ratio 3:4:5 means we have 3 parts, 4 parts, and 5 parts. Add them up to get the total number of parts!',
      steps: [
        { num: 1, text: 'UNDERSTAND THE RATIO: 3:4:5 means three angles with 3 parts, 4 parts, and 5 parts.' },
        { num: 2, text: 'SET UP WITH x: First angle = 3x, Second angle = 4x, Third angle = 5x' },
        { num: 3, text: 'USE THE STRAIGHT LINE RULE: All three angles on a line = 180°' },
        { num: 4, text: 'WRITE THE EQUATION: 3x + 4x + 5x = 180°' },
        { num: 5, text: 'COMBINE: 12x = 180° (because 3 + 4 + 5 = 12 parts total)' },
        { num: 6, text: 'SOLVE FOR x: x = 180° ÷ 12 = 15°' },
        { num: 7, text: 'FIND FIRST ANGLE: 3x = 3(15°) = 45°' },
        { num: 8, text: 'FIND SECOND ANGLE: 4x = 4(15°) = 60°' },
        { num: 9, text: 'FIND THIRD ANGLE: 5x = 5(15°) = 75°' }
      ],
      answer: 'The angles are 45°, 60°, and 75°',
      check: '45° + 60° + 75° = 180° ✓ and 45:60:75 simplifies to 3:4:5 ✓'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4"
    >
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Pencil className="w-8 h-8 text-fuchsia-400" />
          <h2 className="text-3xl font-bold gradient-text-fire">Practice Problems</h2>
        </div>
        <div className="concept-box p-6 mb-8">
          <p className="text-gray-300 leading-relaxed">
            <Lightbulb className="w-5 h-5 inline mr-2 text-cyan-400" />
            <strong className="text-cyan-400">Hey Maleah!</strong> This section has all 10 homework problems with 
            <strong className="text-fuchsia-400"> detailed step-by-step solutions</strong>. Each problem explains:
          </p>
          <ul className="mt-3 ml-6 text-gray-300 space-y-1">
            <li>• <strong className="text-green-400">What to look for</strong> in the diagram</li>
            <li>• <strong className="text-green-400">Which rule to use</strong> (180° on a line, 90° right angle, etc.)</li>
            <li>• <strong className="text-green-400">How to set up the equation</strong></li>
            <li>• <strong className="text-green-400">Each step of the math</strong> to solve it</li>
          </ul>
          <p className="mt-3 text-gray-300">
            Read through each problem carefully, and you'll see the patterns! You've got this! 🌟
          </p>
        </div>

        {problems.map((problem, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="problem-card p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">{problem.title}</h3>
            <p className="text-gray-300 mb-4">{problem.description}</p>
            <div className="diagram-container p-4 mb-6">{problem.svg}</div>
            
            {/* Explanation Box */}
            <motion.div 
              className="analogy-box p-5 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 leading-relaxed">
                <Lightbulb className="w-5 h-5 inline mr-2 text-fuchsia-400" />
                <strong className="text-fuchsia-400">How to approach this problem:</strong>{' '}
                {problem.explanation}
              </p>
            </motion.div>
            
            <h4 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Step-by-Step Solution
            </h4>
            
            <div className="space-y-3">
              {problem.steps.map((step, stepIndex) => (
                <motion.div 
                  key={stepIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: stepIndex * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="step-indicator flex-shrink-0 text-sm">{step.num}</span>
                  <p className="text-gray-300 leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="final-answer p-5 mt-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-cyan-400 font-bold text-xl mb-2">✓ {problem.answer}</p>
              <p className="text-green-400 text-sm">{problem.check}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Test Section
const TestSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'incorrect' | null>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    { id: 1, answers: { ans1: 25 } },
    { id: 2, answers: { ans2: 13 } },
    { id: 3, answers: { ans3a: 22, ans3b: 33 } },
    { id: 4, answers: { ans4: 38 } },
    { id: 5, answers: { ans5a: 65, ans5b: 65 } },
    { id: 6, answers: { ans6a: 33, ans6b: 30 } },
    { id: 7, answers: { ans7a: 50, ans7b: 40 } },
    { id: 8, answers: { ans8: 99 } },
    { id: 9, answers: { ans9a: 80, ans9b: 100 } },
    { id: 10, answers: { ans10a: 45, ans10b: 60, ans10c: 75 } },
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f5ff', '#ff00ff', '#b026ff', '#00ff88'],
    });
  };

  const checkAnswer = (qNum: number) => {
    const correct = questions[qNum - 1].answers;
    let isCorrect = true;

    if (qNum === 1) {
      isCorrect = Math.abs(parseFloat(answers.ans1 || '0') - correct.ans1) < 0.5;
    } else if (qNum === 2) {
      isCorrect = Math.abs(parseFloat(answers.ans2 || '0') - correct.ans2) < 0.5;
    } else if (qNum === 3) {
      isCorrect = Math.abs(parseFloat(answers.ans3a || '0') - correct.ans3a) < 0.5 &&
                  Math.abs(parseFloat(answers.ans3b || '0') - correct.ans3b) < 0.5;
    } else if (qNum === 4) {
      isCorrect = Math.abs(parseFloat(answers.ans4 || '0') - correct.ans4) < 0.5;
    } else if (qNum === 5) {
      isCorrect = Math.abs(parseFloat(answers.ans5a || '0') - correct.ans5a) < 0.5 &&
                  Math.abs(parseFloat(answers.ans5b || '0') - correct.ans5b) < 0.5;
    } else if (qNum === 6) {
      isCorrect = Math.abs(parseFloat(answers.ans6a || '0') - correct.ans6a) < 0.5 &&
                  Math.abs(parseFloat(answers.ans6b || '0') - correct.ans6b) < 0.5;
    } else if (qNum === 7) {
      isCorrect = Math.abs(parseFloat(answers.ans7a || '0') - correct.ans7a) < 0.5 &&
                  Math.abs(parseFloat(answers.ans7b || '0') - correct.ans7b) < 0.5;
    } else if (qNum === 8) {
      isCorrect = Math.abs(parseFloat(answers.ans8 || '0') - correct.ans8) < 0.5;
    } else if (qNum === 9) {
      isCorrect = Math.abs(parseFloat(answers.ans9a || '0') - correct.ans9a) < 0.5 &&
                  Math.abs(parseFloat(answers.ans9b || '0') - correct.ans9b) < 0.5;
    } else if (qNum === 10) {
      isCorrect = Math.abs(parseFloat(answers.ans10a || '0') - correct.ans10a) < 0.5 &&
                  Math.abs(parseFloat(answers.ans10b || '0') - correct.ans10b) < 0.5 &&
                  Math.abs(parseFloat(answers.ans10c || '0') - correct.ans10c) < 0.5;
    }

    setFeedback({ ...feedback, [qNum]: isCorrect ? 'correct' : 'incorrect' });
    
    if (isCorrect) {
      triggerConfetti();
      setCompletedQuestions(new Set([...completedQuestions, qNum]));
    }
  };

  const resetTest = () => {
    setCompletedQuestions(new Set());
    setAnswers({});
    setFeedback({});
    setShowResults(false);
    setCurrentQuestion(1);
  };

  const getScoreMessage = (score: number) => {
    if (score === 10) return '🌟 PERFECT! You\'re an angle master!';
    if (score >= 8) return '🎉 Excellent! Almost perfect!';
    if (score >= 6) return '👍 Good job! Review the ones you missed.';
    if (score >= 4) return '📚 Keep practicing! You\'re improving!';
    return '💪 Don\'t give up! Study the Learn section again.';
  };

  const progress = (completedQuestions.size / 10) * 100;

  const questionContent = [
    {
      title: 'Question 1: Find ∠DAE',
      description: 'Right angle at A (90°). ∠EAF = 65°. Find ∠DAE.',
      inputs: [{ id: 'ans1', label: '∠DAE =', suffix: '°' }],
      svg: (
        <svg width="300" height="200" viewBox="0 0 300 200">
          <line x1="30" y1="150" x2="270" y2="150" stroke="#00f5ff" strokeWidth="2" />
          <line x1="150" y1="150" x2="150" y2="30" stroke="#00f5ff" strokeWidth="2" />
          <line x1="150" y1="150" x2="230" y2="70" stroke="#b026ff" strokeWidth="2" />
          <line x1="150" y1="150" x2="200" y2="90" stroke="#ff00ff" strokeWidth="2" />
          <rect x="150" y="130" width="20" height="20" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="15" y="145" fill="#ffffff" fontWeight="bold">C</text>
          <text x="275" y="155" fill="#ffffff" fontWeight="bold">F</text>
          <text x="145" y="20" fill="#ffffff" fontWeight="bold">D</text>
          <text x="205" y="85" fill="#ff00ff" fontWeight="bold">E</text>
          <text x="160" y="90" fill="#b026ff">x°</text>
          <text x="195" y="125" fill="#ffffff">65°</text>
          <text x="140" y="175" fill="#ffffff" fontWeight="bold">A</text>
        </svg>
      )
    },
    {
      title: 'Question 2: Find ∠QPR (f°)',
      description: 'Angles on a line: f°, 154°, f°. Find f.',
      inputs: [{ id: 'ans2', label: 'f =', suffix: '°' }],
      svg: (
        <svg width="400" height="100" viewBox="0 0 400 100">
          <line x1="20" y1="60" x2="380" y2="60" stroke="#00f5ff" strokeWidth="3" />
          <line x1="100" y1="60" x2="80" y2="15" stroke="#b026ff" strokeWidth="2" />
          <line x1="300" y1="60" x2="320" y2="15" stroke="#b026ff" strokeWidth="2" />
          <text x="30" y="50" fill="#ffffff" fontWeight="bold">Q</text>
          <text x="75" y="12" fill="#ffffff" fontWeight="bold">R</text>
          <text x="185" y="50" fill="#ffffff" fontWeight="bold">P</text>
          <text x="315" y="12" fill="#ffffff" fontWeight="bold">S</text>
          <text x="365" y="50" fill="#ffffff" fontWeight="bold">T</text>
          <text x="55" y="50" fill="#ff00ff">f°</text>
          <text x="185" y="85" fill="#00f5ff" fontWeight="bold">154°</text>
          <text x="325" y="50" fill="#ff00ff">f°</text>
        </svg>
      )
    },
    {
      title: 'Question 3: Find ∠CQD and ∠EQF',
      description: 'On a line: 10°, 2x°, 103°, 3x°, 12°',
      inputs: [
        { id: 'ans3a', label: '∠CQD (2x°) =', suffix: '°' },
        { id: 'ans3b', label: '∠EQF (3x°) =', suffix: '°' }
      ],
      svg: (
        <svg width="400" height="120" viewBox="0 0 400 120">
          <line x1="20" y1="80" x2="380" y2="80" stroke="#00f5ff" strokeWidth="3" />
          <line x1="60" y1="80" x2="45" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="120" y1="80" x2="120" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="270" y1="80" x2="270" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="340" y1="80" x2="355" y2="25" stroke="#b026ff" strokeWidth="2" />
          <text x="30" y="70" fill="#ffffff">10°</text>
          <text x="75" y="70" fill="#b026ff">2x°</text>
          <text x="175" y="70" fill="#ff00ff" fontWeight="bold">103°</text>
          <text x="290" y="70" fill="#b026ff">3x°</text>
          <text x="345" y="70" fill="#ffffff">12°</text>
          <text x="185" y="105" fill="#ffffff" fontWeight="bold">Q</text>
        </svg>
      )
    },
    {
      title: 'Question 4: Find x',
      description: 'Around a point: 4 angles of 71° and 2 angles of x°. (Total = 360°)',
      inputs: [{ id: 'ans4', label: 'x =', suffix: '°' }],
      svg: (
        <svg width="220" height="220" viewBox="0 0 220 220">
          <line x1="110" y1="110" x2="200" y2="110" stroke="#00f5ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="175" y2="50" stroke="#ff00ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="110" y2="25" stroke="#ff00ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="45" y2="50" stroke="#ff00ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="25" y2="110" stroke="#00f5ff" strokeWidth="2" />
          <line x1="110" y1="110" x2="60" y2="180" stroke="#ff00ff" strokeWidth="2" />
          <text x="160" y="100" fill="#00f5ff">x°</text>
          <text x="145" y="65" fill="#ffffff">71°</text>
          <text x="100" y="50" fill="#ffffff">71°</text>
          <text x="55" y="70" fill="#ffffff">71°</text>
          <text x="40" y="105" fill="#00f5ff">x°</text>
          <text x="55" y="155" fill="#ffffff">71°</text>
        </svg>
      )
    },
    {
      title: 'Question 5: Find x and y',
      description: '25° and x° are complementary (in a right angle). y° is vertical to x°.',
      inputs: [
        { id: 'ans5a', label: 'x =', suffix: '°' },
        { id: 'ans5b', label: 'y =', suffix: '°' }
      ],
      svg: (
        <svg width="280" height="200" viewBox="0 0 280 200">
          <line x1="20" y1="110" x2="260" y2="110" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="140" y2="20" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="80" y2="40" stroke="#b026ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="200" y2="40" stroke="#ff00ff" strokeWidth="2" />
          <line x1="140" y1="110" x2="140" y2="180" stroke="#00f5ff" strokeWidth="2" />
          <rect x="140" y="90" width="15" height="15" fill="none" stroke="#00ff88" strokeWidth="1" />
          <rect x="125" y="110" width="15" height="15" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="80" y="70" fill="#ffffff">25°</text>
          <text x="115" y="70" fill="#b026ff">x°</text>
          <text x="160" y="70" fill="#ff00ff">y°</text>
        </svg>
      )
    },
    {
      title: 'Question 6: Find x and y',
      description: 'Above line: x° + x° + 24° = 90° (right angle portion). Below: 3y° = 90°.',
      inputs: [
        { id: 'ans6a', label: 'x =', suffix: '°' },
        { id: 'ans6b', label: 'y =', suffix: '°' }
      ],
      svg: (
        <svg width="280" height="220" viewBox="0 0 280 220">
          <line x1="20" y1="100" x2="260" y2="100" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="140" y2="20" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="200" y2="40" stroke="#b026ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="100" y2="170" stroke="#ff00ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="120" y2="170" stroke="#ff00ff" strokeWidth="2" />
          <line x1="140" y1="100" x2="140" y2="180" stroke="#ff00ff" strokeWidth="2" />
          <rect x="140" y="100" width="12" height="12" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="100" y="55" fill="#b026ff">x°</text>
          <text x="145" y="55" fill="#b026ff">x°</text>
          <text x="185" y="55" fill="#ffffff">24°</text>
          <text x="95" y="135" fill="#ff00ff">y°</text>
          <text x="115" y="150" fill="#ff00ff">y°</text>
          <text x="135" y="160" fill="#ff00ff">y°</text>
        </svg>
      )
    },
    {
      title: 'Question 7: Find ∠CAD and ∠DAE',
      description: '∠CAD = (3/2)x + 20° and ∠DAE = 2x°. They form a right angle (90°).',
      inputs: [
        { id: 'ans7a', label: '∠CAD =', suffix: '°' },
        { id: 'ans7b', label: '∠DAE =', suffix: '°' }
      ],
      svg: (
        <svg width="280" height="180" viewBox="0 0 280 180">
          <line x1="20" y1="130" x2="260" y2="130" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="130" x2="140" y2="20" stroke="#00f5ff" strokeWidth="2" />
          <line x1="140" y1="130" x2="210" y2="80" stroke="#b026ff" strokeWidth="2" />
          <rect x="140" y="110" width="15" height="15" fill="none" stroke="#00ff88" strokeWidth="1" />
          <text x="135" y="15" fill="#ffffff" fontWeight="bold">C</text>
          <text x="215" y="80" fill="#ffffff" fontWeight="bold">D</text>
          <text x="260" y="125" fill="#ffffff" fontWeight="bold">E</text>
          <text x="130" y="155" fill="#ffffff" fontWeight="bold">A</text>
          <text x="100" y="75" fill="#b026ff" fontSize="12">(3/2)x+20°</text>
          <text x="175" y="115" fill="#ff00ff" fontSize="12">2x°</text>
        </svg>
      )
    },
    {
      title: 'Question 8: Find ∠CQG',
      description: 'At point Q: ∠CQG = 3x°, ∠GQF = 56°, ∠EQD = 155° (below line). Line CQD is straight.',
      inputs: [{ id: 'ans8', label: '∠CQG =', suffix: '°' }],
      svg: (
        <svg width="320" height="200" viewBox="0 0 320 200">
          <line x1="20" y1="110" x2="300" y2="110" stroke="#00f5ff" strokeWidth="3" />
          <line x1="160" y1="110" x2="160" y2="25" stroke="#b026ff" strokeWidth="2" />
          <line x1="160" y1="110" x2="230" y2="45" stroke="#ff00ff" strokeWidth="2" />
          <line x1="160" y1="110" x2="160" y2="180" stroke="#00f5ff" strokeWidth="2" />
          <text x="10" y="105" fill="#ffffff" fontWeight="bold">C</text>
          <text x="155" y="20" fill="#ffffff" fontWeight="bold">G</text>
          <text x="235" y="45" fill="#ffffff" fontWeight="bold">F</text>
          <text x="295" y="105" fill="#ffffff" fontWeight="bold">D</text>
          <text x="155" y="190" fill="#ffffff" fontWeight="bold">E</text>
          <text x="90" y="100" fill="#b026ff">3x°</text>
          <text x="180" y="65" fill="#ffffff">56°</text>
          <text x="180" y="150" fill="#ff00ff">155°</text>
          <text x="150" y="125" fill="#ffffff" fontWeight="bold">Q</text>
        </svg>
      )
    },
    {
      title: 'Question 9: Two Angles in Ratio 4:5',
      description: 'The ratio of two adjacent angles on a line is 4:5. Find both angles.',
      inputs: [
        { id: 'ans9a', label: 'Smaller angle (4 parts) =', suffix: '°' },
        { id: 'ans9b', label: 'Larger angle (5 parts) =', suffix: '°' }
      ],
      hint: 'Let angles be 4x and 5x. 4x + 5x = 180° (angles on a line)'
    },
    {
      title: 'Question 10: Three Angles in Ratio 3:4:5',
      description: 'The ratio of three adjacent angles on a line is 3:4:5. Find all three angles.',
      inputs: [
        { id: 'ans10a', label: 'First angle (3 parts) =', suffix: '°' },
        { id: 'ans10b', label: 'Second angle (4 parts) =', suffix: '°' },
        { id: 'ans10c', label: 'Third angle (5 parts) =', suffix: '°' }
      ],
      hint: 'Let angles be 3x, 4x, and 5x. 3x + 4x + 5x = 180° (angles on a line)'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardCheck className="w-8 h-8 text-green-400" />
          <h2 className="text-3xl font-bold gradient-text-ocean">Practice Test</h2>
        </div>

        {showResults && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="score-display p-8 mb-8 text-center text-white"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <p className="text-xl mb-2">Your Score</p>
            <div className="text-6xl font-bold mb-4">{completedQuestions.size}/10</div>
            <p className="text-lg mb-6">{getScoreMessage(completedQuestions.size)}</p>
            <Button 
              onClick={resetTest}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-neon h-3">
            <div 
              className="progress-neon-fill h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(q.id)}
              className={`question-nav-btn ${
                currentQuestion === q.id ? 'current' : ''
              } ${completedQuestions.has(q.id) ? 'completed' : ''}`}
            >
              {q.id}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="problem-card p-6"
          >
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              {questionContent[currentQuestion - 1].title}
            </h3>
            <p className="text-gray-300 mb-4">
              {questionContent[currentQuestion - 1].description}
            </p>
            
            {questionContent[currentQuestion - 1].svg && (
              <div className="diagram-container p-4 mb-6">
                {questionContent[currentQuestion - 1].svg}
              </div>
            )}
            
            {questionContent[currentQuestion - 1].hint && (
              <div className="concept-box p-4 mb-6">
                <p className="text-cyan-400 text-sm">
                  <Lightbulb className="w-4 h-4 inline mr-2" />
                  <strong>Method:</strong> {questionContent[currentQuestion - 1].hint}
                </p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {questionContent[currentQuestion - 1].inputs.map((input) => (
                <div key={input.id} className="flex items-center gap-3">
                  <label className="text-gray-300 font-semibold min-w-[180px]">
                    {input.label}
                  </label>
                  <Input
                    type="number"
                    value={answers[input.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [input.id]: e.target.value })}
                    className="input-neon w-32 text-center"
                    placeholder="?"
                  />
                  <span className="text-cyan-400 font-bold">{input.suffix}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => checkAnswer(currentQuestion)}
              className="btn-neon text-cyan-400 hover:text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Check Answer
            </Button>

            {feedback[currentQuestion] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 ${
                  feedback[currentQuestion] === 'correct' 
                    ? 'feedback-correct' 
                    : 'feedback-incorrect'
                }`}
              >
                {feedback[currentQuestion] === 'correct' ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold">Correct! Great job!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-6 h-6" />
                    <span className="font-bold">Not quite. Check the Answer Key for the solution!</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-8">
          <Button
            onClick={() => setShowResults(true)}
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold px-8"
          >
            <Trophy className="w-5 h-5 mr-2" />
            See My Results
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Answers Section
const AnswersSection = () => {
  const answers = [
    { q: 1, answer: '25°', steps: ['Right angle ∠CAD = 90°', '∠DAE + 65° = 90°', '∠DAE = 90° - 65° = 25°'] },
    { q: 2, answer: '13°', steps: ['f° + 154° + f° = 180°', '2f° = 180° - 154° = 26°', 'f = 13°'] },
    { q: 3, answer: '∠CQD = 22°, ∠EQF = 33°', steps: ['10° + 2x° + 103° + 3x° + 12° = 180°', '125° + 5x° = 180° → 5x° = 55° → x = 11°', '∠CQD = 2(11°) = 22°', '∠EQF = 3(11°) = 33°'] },
    { q: 4, answer: '38°', steps: ['4(71°) + 2x° = 360°', '284° + 2x° = 360°', '2x° = 76° → x = 38°'] },
    { q: 5, answer: 'x = 65°, y = 65°', steps: ['25° + x° = 90° (complementary)', 'x° = 65°', 'y° = x° = 65° (vertical angles)'] },
    { q: 6, answer: 'x = 33°, y = 30°', steps: ['x° + x° + 24° = 90° → 2x° = 66° → x = 33°', '3y° = 90° → y = 30°'] },
    { q: 7, answer: '∠CAD = 50°, ∠DAE = 40°', steps: ['(3/2)x + 20° + 2x° = 90°', '(7/2)x = 70° → x = 20°', '∠CAD = (3/2)(20°) + 20° = 50°', '∠DAE = 2(20°) = 40°'] },
    { q: 8, answer: '99°', steps: ['Line CQD is straight: angles above = 180°', 'Angle below 155° means angle above = 180° - 155° = 25°', '3x° + 56° + 25° = 180°', '3x° = 99° → x = 33°', '∠CQG = 3(33°) = 99°'] },
    { q: 9, answer: '80° and 100°', steps: ['4x + 5x = 180° → 9x = 180° → x = 20°', '4(20°) = 80° and 5(20°) = 100°'] },
    { q: 10, answer: '45°, 60°, and 75°', steps: ['3x + 4x + 5x = 180° → 12x = 180° → x = 15°', '3(15°) = 45°', '4(15°) = 60°', '5(15°) = 75°'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4"
    >
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold gradient-text">Complete Answer Key</h2>
        </div>

        <div className="space-y-4">
          {answers.map((item) => (
            <motion.div
              key={item.q}
              variants={itemVariants}
              className="answer-key-item p-5"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Question {item.q}: {item.answer}
              </h3>
              <div className="space-y-2">
                {item.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <span className="step-indicator flex-shrink-0 text-xs w-6 h-6">
                      {stepIndex + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-8 p-8 rounded-2xl text-center text-white"
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.3), rgba(176,38,255,0.3))',
            border: '1px solid rgba(0,245,255,0.3)'
          }}
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-2">Great job studying, Maleah!</h3>
          <p className="text-lg">Practice makes perfect! You've got this! 🚀</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main App
function App() {
  const [activeSection, setActiveSection] = useState<Section>('learn');

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <FloatingParticles />
      
      <div className="relative z-10 pb-12">
        <Header />
        <Navigation activeSection={activeSection} setSection={setActiveSection} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeSection === 'learn' && <LearnSection />}
            {activeSection === 'practice' && <PracticeSection />}
            {activeSection === 'test' && <TestSection />}
            {activeSection === 'answers' && <AnswersSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
