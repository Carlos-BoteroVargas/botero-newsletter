import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, ArrowRight, RotateCcw, X } from 'lucide-react';

// Images from your original file
const HEADER_IMAGE = 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1767123638/Julianna_fvigmz.jpg';
const REWARD_IMAGE = 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1767124279/Baby-Flowchart_jrjnjk.png';

const SleepFlowchart = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [rewardOpen, setRewardOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const rewardCloseBtnRef = useRef(null);

  // --- LOGIC: Isabel's Original Flow ---
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
      yesNext: 'checkHunger',
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
      noNext: 'finalSnuggle'
    },
    // Results
    finalSnuggle: { type: 'result', text: "Give passy and snuggle" },
    shush: { type: 'result', text: "Give passy + gently shush" },
    rewrap: { type: 'result', text: "Rewrap Swaddle" },
  };

  const stepData = flowLogic[currentStep];

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const update = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', update);
    return () => mq.removeEventListener && mq.removeEventListener('change', update);
  }, []);

  // --- STYLES ---
  const s = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e9d5ff', // Purple 200
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    header: {
      height: '200px',
      position: 'relative',
      backgroundColor: '#faf5ff',
    },
    headerImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.9,
    },
    headerTitleBox: {
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
      padding: '20px 10px',
      textAlign: 'center',
    },
    headerTitle: {
      color: '#6b21a8', // Purple 800
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
      margin: 0,
      textShadow: '0 1px 2px rgba(255,255,255,1)',
    },
    body: {
      padding: '32px 24px',
      textAlign: 'center',
    },
    iconWrapper: {
      marginBottom: '16px',
      display: 'flex', justifyContent: 'center'
    },
    questionText: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937', // Gray 800
      marginBottom: '24px',
    },
    btnYes: {
      backgroundColor: '#22c55e', // Green 500
      color: 'white',
      border: 'none',
      padding: '12px 32px',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '0 8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    btnNo: {
      backgroundColor: '#ef4444', // Red 500
      color: 'white',
      border: 'none',
      padding: '12px 32px',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '0 8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    btnAction: {
      backgroundColor: '#3b82f6', // Blue 500
      color: 'white',
      border: 'none',
      padding: '12px 32px',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    resultBox: {
      backgroundColor: '#faf5ff', // Purple 50
      border: '2px solid #e9d5ff',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
    },
    resultText: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      color: '#581c87', // Purple 900
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '10px 0 5px 0',
    },
    claimBtn: {
      backgroundColor: 'transparent',
      border: '2px solid #f59e0b', // Amber 500
      color: '#b45309', // Amber 700
      padding: '8px 16px',
      borderRadius: '50px',
      fontWeight: 'bold',
      marginTop: '10px',
      cursor: 'pointer',
    },
    restartBtn: {
      background: 'none',
      border: 'none',
      color: '#9333ea', // Purple 600
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '20px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    // Reward Modal Styles
    rewardOverlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    },
    rewardModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
    },
    rewardHeader: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: '12px',
    },
    closeRewardBtn: {
      background: '#f3f4f6', border: '1px solid #000', borderRadius: '50%',
      width: '32px', height: '32px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: '#333', fontWeight: 'bold'
    }
  };

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <img src={HEADER_IMAGE} alt="Julianna" style={s.headerImg} />
        <div style={s.headerTitleBox}>
          <h2 style={s.headerTitle}>Isabel's Guide: Getting Baby to Sleep</h2>
        </div>
      </div>

      <div style={s.body}>
        {/* QUESTION */}
        {stepData.type === 'question' && (
          <div className="animate-fade-in-up">
            <div style={s.iconWrapper}>
              <AlertCircle size={48} color="#f59e0b" />
            </div>
            <h3 style={s.questionText}>{stepData.text}</h3>
            <div>
              <button style={s.btnYes} onClick={() => setCurrentStep(stepData.yesNext)}>Yes</button>
              <button style={s.btnNo} onClick={() => setCurrentStep(stepData.noNext)}>No</button>
            </div>
          </div>
        )}

        {/* ACTION */}
        {stepData.type === 'action' && (
          <div className="animate-fade-in-up">
             <div style={s.iconWrapper}>
              <ArrowRight size={48} color="#60a5fa" />
            </div>
            <h3 style={s.questionText}>{stepData.text}</h3>
            <button style={s.btnAction} onClick={() => setCurrentStep(stepData.next)}>
              Okay, done. What next?
            </button>
          </div>
        )}

        {/* RESULT */}
        {stepData.type === 'result' && (
          <div className="animate-fade-in-up">
            <div style={s.resultBox}>
               <div style={s.iconWrapper}>
                <CheckCircle size={56} color="#22c55e" />
              </div>
              <h3 style={s.resultText}>{stepData.text}</h3>
              <p style={{ color: '#9333ea', margin: 0 }}>Sweet dreams, Julianna!</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              {isMobile ? (
                <button style={s.claimBtn} onClick={() => setRewardOpen(true)}>
                  Claim Reward
                </button>
              ) : (
                <p style={{ fontSize: '12px', color: '#78716c' }}>Reward available on mobile only</p>
              )}
              
              <button style={s.restartBtn} onClick={() => setCurrentStep('start')}>
                <RotateCcw size={16} /> Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* REWARD MODAL */}
      <AnimatePresence>
        {rewardOpen && isMobile && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            style={s.rewardOverlay}
          >
            <motion.div 
              initial={{ y: 20 }} animate={{ y: 0 }}
              style={s.rewardModal}
            >
              <div style={s.rewardHeader}>
                {/* <h4 style={{ margin: 0, fontWeight: 'bold' }}>Save the Flowchart</h4> */}
                <div>{" "}</div>
                <button 
                  ref={rewardCloseBtnRef} 
                  onClick={() => setRewardOpen(false)} 
                  style={s.closeRewardBtn}
                  aria-label="Close"
                >
                  <div className='text-gray-800'>X</div>
                </button>
              </div>
              
              <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
                <img src={REWARD_IMAGE} alt="Reward" style={{ width: '100%', display: 'block' }} />
              </div>
              
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <a 
                  href={REWARD_IMAGE} 
                  download 
                  style={{ textDecoration: 'none', color: '#1f2937', padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '14px' }}
                >
                  Download
                </a>
                <button 
                  onClick={() => setRewardOpen(false)} 
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SleepFlowchart;
