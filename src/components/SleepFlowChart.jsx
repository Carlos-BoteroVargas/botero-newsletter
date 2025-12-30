import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons are optional, but if you have lucide-react installed, this works. 
// If not, you can remove the Icon imports and use text (e.g. "X").
import { AlertCircle, CheckCircle, ArrowRight, RotateCcw, X } from 'lucide-react';

const HEADER_IMAGE = 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1767123638/Julianna_fvigmz.jpg';
const REWARD_IMAGE = 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1767124279/Baby-Flowchart_jrjnjk.png';

const SleepFlowchart = ({ isOpen, onClose }) => {
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

  // --- EFFECTS ---
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const update = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // --- STYLES (Internal CSS Objects) ---
  const s = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px'
    },
    modal: {
      backgroundColor: '#fff',
      width: '100%', maxWidth: '500px',
      borderRadius: '16px', overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      height: '180px', position: 'relative',
      backgroundColor: '#f3e8ff' // Light purple
    },
    headerImg: {
      width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9
    },
    headerTitle: {
      position: 'absolute', bottom: '10px', width: '100%',
      textAlign: 'center', color: '#6b21a8', // Purple 800
      fontSize: '20px', fontWeight: 'bold',
      textShadow: '0 1px 2px rgba(255,255,255,0.8)',
      fontFamily: '"Comic Sans MS", cursive, sans-serif'
    },
    closeMain: {
      position: 'absolute', top: '10px', right: '10px',
      background: 'rgba(255,255,255,0.8)', borderRadius: '50%',
      width: '32px', height: '32px', border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', zIndex: 10
    },
    body: { padding: '32px 24px', textAlign: 'center' },
    questionText: {
      fontSize: '22px', fontWeight: '600', color: '#1f2937', marginBottom: '24px'
    },
    btnYes: {
      backgroundColor: '#10b981', // Emerald 500
      color: 'white', border: 'none',
      padding: '12px 30px', borderRadius: '50px',
      fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
      margin: '0 8px'
    },
    btnNo: {
      backgroundColor: '#ef4444', // Red 500
      color: 'white', border: 'none',
      padding: '12px 30px', borderRadius: '50px',
      fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
      margin: '0 8px'
    },
    btnAction: {
      backgroundColor: '#3b82f6', // Blue 500
      color: 'white', border: 'none',
      padding: '12px 40px', borderRadius: '50px',
      fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
    },
    resultBox: {
      backgroundColor: '#faf5ff', // Purple 50
      border: '2px solid #e9d5ff', // Purple 200
      borderRadius: '12px', padding: '24px', marginBottom: '20px'
    },
    resultText: {
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      color: '#581c87', fontSize: '24px', fontWeight: 'bold'
    },
    linkBtn: {
      background: 'none', border: 'none', color: '#6b7280',
      textDecoration: 'underline', cursor: 'pointer', marginTop: '10px'
    },
    rewardBtn: {
      backgroundColor: '#f59e0b', color: 'white',
      border: 'none', padding: '10px 20px', borderRadius: '8px',
      fontWeight: 'bold', marginTop: '10px', cursor: 'pointer'
    }
  };

  // Skip if not open
  if (!isOpen) return null;

  return (
    <div style={s.overlay}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        style={s.modal}
      >
        {/* Close Modal X */}
        <button onClick={onClose} style={s.closeMain} aria-label="Close">
          <X size={20} color="#374151" />
        </button>

        {/* Header */}
        <div style={s.header}>
          <img src={HEADER_IMAGE} alt="Julianna" style={s.headerImg} />
          <h2 style={s.headerTitle}>Isabel's Guide: Sleep</h2>
        </div>

        {/* Content */}
        <div style={s.body}>
          
          {/* QUESTION STEP */}
          {stepData.type === 'question' && (
            <div>
              <AlertCircle size={40} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
              <h3 style={s.questionText}>{stepData.text}</h3>
              <div>
                <button style={s.btnYes} onClick={() => setCurrentStep(stepData.yesNext)}>Yes</button>
                <button style={s.btnNo} onClick={() => setCurrentStep(stepData.noNext)}>No</button>
              </div>
            </div>
          )}

          {/* ACTION STEP */}
          {stepData.type === 'action' && (
            <div>
              <ArrowRight size={40} color="#60a5fa" style={{ margin: '0 auto 16px' }} />
              <h3 style={s.questionText}>{stepData.text}</h3>
              <button style={s.btnAction} onClick={() => setCurrentStep(stepData.next)}>
                Okay, done. Next?
              </button>
            </div>
          )}

          {/* RESULT STEP */}
          {stepData.type === 'result' && (
            <div>
              <div style={s.resultBox}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={s.resultText}>{stepData.text}</h3>
                <p style={{color: '#7e22ce', marginTop: '8px'}}>Sweet dreams, Julianna!</p>
              </div>

              {isMobile && !rewardOpen && (
                <button style={s.rewardBtn} onClick={() => setRewardOpen(true)}>
                  Claim Reward
                </button>
              )}
              
              <div style={{marginTop: '20px'}}>
                <button style={s.linkBtn} onClick={() => setCurrentStep('start')}>
                  <div style={{display:'flex', alignItems:'center', gap: '6px'}}>
                     <RotateCcw size={14}/> Start Over
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* REWARD OVERLAY (Nested) */}
        <AnimatePresence>
          {rewardOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{...s.overlay, zIndex: 10000}}
            >
              <div style={{...s.modal, padding: '20px'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <strong>Save the Flowchart</strong>
                  <button onClick={() => setRewardOpen(false)} style={{border:'none', background:'none', fontSize:'18px', cursor:'pointer'}}>X</button>
                </div>
                <img src={REWARD_IMAGE} alt="Reward" style={{width:'100%', borderRadius:'8px'}} />
                <div style={{marginTop:'16px', display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                  <a href={REWARD_IMAGE} download style={{...s.btnAction, padding: '8px 16px', fontSize: '14px', textDecoration:'none'}}>
                    Download
                  </a>
                  <button onClick={() => setRewardOpen(false)} style={{padding: '8px 16px', border:'1px solid #ccc', background:'white', borderRadius:'50px', cursor:'pointer'}}>
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SleepFlowchart;
