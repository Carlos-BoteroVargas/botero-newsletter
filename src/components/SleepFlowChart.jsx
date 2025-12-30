import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

// Placeholder for the watercolor image. 
// Replace '/api/placeholder/800/200' with your actual image path in your project.
const headerImageUrl = 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1767123638/Julianna_fvigmz.jpg'; 
const REWARD_IMAGE = 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1767124279/Baby-Flowchart_jrjnjk.png';

const SleepFlowchart = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [rewardOpen, setRewardOpen] = useState(false);
  const rewardCloseBtnRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile (tailwind sm breakpoint ~640px)
    const mq = window.matchMedia('(max-width: 640px)');
    const update = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (rewardOpen && rewardCloseBtnRef.current) rewardCloseBtnRef.current.focus();
    const onKey = (e) => { if (e.key === 'Escape' && rewardOpen) setRewardOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [rewardOpen]);

  // The exact logic transcribed from Isabel's chart
  const flowLogic = {
    start: {
      type: 'question',
      text: "Is baby poopy?",
      yesNext: 'changeBaby',
      noNext: 'checkHunger'
    },
    changeBaby: {
      type: 'action',
      text: "Change Baby",
      next: 'cryingAfterChange'
    },
    cryingAfterChange: {
      type: 'question',
      text: "Still crying?",
      yesNext: 'checkHunger', // Isabel's clever loop!
      noNext: 'finalSnuggle'
    },
    checkHunger: {
      type: 'question',
      text: "Is baby hungry?",
      yesNext: 'feedBaby',
      noNext: 'cryingNotHungry'
    },
    feedBaby: {
      type: 'action',
      text: "Feed baby",
      next: 'checkSwaddle'
    },
    cryingNotHungry: {
      type: 'question',
      text: "Still crying?",
      yesNext: 'checkSwaddle',
      noNext: 'shush'
    },
    checkSwaddle: {
      type: 'question',
      text: "Is the Swaddle too tight?",
      yesNext: 'rewrap',
      // Isabel's chart implies if 'no', the current state is fine, leading to sleep/snuggle
      noNext: 'finalSnuggle' 
    },
    // Terminal Result States
    finalSnuggle: { type: 'result', text: "Give passy and snuggel" },
    shush: { type: 'result', text: "Give passy + gently shush" },
    rewrap: { type: 'result', text: "Rewrap Swaddle" },
  };

  const stepData = flowLogic[currentStep];

  const handleNext = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const restart = () => {
    setCurrentStep('start');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8 border border-purple-100">
      {/* Header Image Header */}
      <div className="relative h-48 bg-purple-50 overflow-hidden">
         <img 
           src={headerImageUrl} 
           alt="Julianna Watercolor Portraits" 
           className="w-full h-full object-cover opacity-90"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent"></div>
         <h2 className="absolute bottom-4 left-0 right-0 text-center text-2xl font-bold text-purple-800 drop-shadow-md" style={{fontFamily: 'Comic Sans MS, cursive'}}>
            Isabel's Guide: Getting Baby to Sleep
         </h2>
      </div>

      <div className="p-8 text-center">
        {/* Render based on step type */}
        {stepData.type === 'question' && (
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{stepData.text}</h3>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleNext(stepData.yesNext)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 flex items-center"
              >
                Yes
              </button>
              <button
                onClick={() => handleNext(stepData.noNext)}
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 flex items-center"
              >
                No
              </button>
            </div>
          </div>
        )}

        {stepData.type === 'action' && (
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <ArrowRight className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{stepData.text}</h3>
            </div>
            <button
                onClick={() => handleNext(stepData.next)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full transition-colors duration-200"
              >
                Okay, done. What next?
              </button>
          </div>
        )}

        {stepData.type === 'result' && (
          <div className="animate-fade-in-up bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
            <div className="mb-6">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-purple-900" style={{fontFamily: 'Comic Sans MS, cursive'}}>{stepData.text}</h3>
              <p className="text-purple-600 mt-2">Sweet dreams, Julianna!</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              {isMobile ? (
                <button onClick={() => isMobile && setRewardOpen(true)} className="mt-2 border border-amber-300 text-amber-800 font-semibold py-2 px-4 rounded-full bg-transparent hover:bg-amber-50">Claim Reward</button>
              ) : (
                <p className="text-sm text-stone-500 mt-2">Reward available on mobile only</p>
              )}
              <button
                onClick={restart}
                className="text-purple-500 hover:text-purple-700 font-semibold flex items-center"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Start Over
              </button>
            </div>
          </div>
        )} 
      </div>

      <AnimatePresence>
        {rewardOpen && isMobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setRewardOpen(false)} />
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative z-10 bg-white rounded-lg p-4 max-w-3xl w-full mx-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Your Reward: Save the Flowchart</h4>
                <button ref={rewardCloseBtnRef} onClick={() => setRewardOpen(false)} className="p-2 rounded hover:bg-stone-100 text-stone-300 text-lg font-bold" aria-label="Close reward">X</button>
              </div>
              <div className="overflow-auto">
                <img src={REWARD_IMAGE} alt="Baby Flowchart Reward" className="w-full h-auto rounded" />
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <a href={REWARD_IMAGE} download className="border border-stone-300 text-stone-900 px-4 py-2 rounded bg-transparent hover:bg-stone-50">Download</a>
                <button onClick={() => setRewardOpen(false)} className="px-4 py-2 rounded border border-stone-300 text-stone-300 bg-transparent hover:bg-stone-50">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SleepFlowchart;