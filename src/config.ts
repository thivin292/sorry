// ==========================================================
// CENTRAL CONFIGURATION SECTION
// Easily edit all text, passwords, image paths, and timings here
// ==========================================================

import couplePhotoUrl from './assets/images/azhagii_photo.jpeg';
import fallbackAudioUrl from '../Pesamale (mp3cut.net).mp3.mpeg';

export const APP_CONFIG = {
  // General & Security
  passcode: '2505',
  passcodeHint: 'Hint: Our birthday date ❤️',

  // Countdown Page
  countdown: {
    startNumber: 3,
    topHeading: 'Are you ready? ♡',
    bottomSubtitle: 'Get ready... ♡',
    startHint: 'Tap anywhere to begin the music & countdown ✨',
  },

  // Welcome Page
  welcome: {
    scriptGreeting: 'Hey Azhagii.. ♡',
    heading: 'Welcome Back',
    subtitle: 'Some days felt longer, But now, everything feels brighter again. ♡',
    // Path to the polaroid couple image
    photoPath: couplePhotoUrl,
    buttonText: 'Let’s Continue →',
  },

  // Catch The Butterflies (Exactly 5 butterflies)
  butterflies: [
    {
      id: 1,
      message: 'Nee illaama college konjam different-ah dhaan irundhuchu…\nSila moments-la automatically unna theduna maari irundhuchu. 🥹❤️',
    },
    {
      id: 2,
      message: 'Unkooda pesina moments, namma random conversations, namma sirippu…\nIdhellam romba miss panniten. Sometimes, without any reason, unna nenachu smile panniruken. 🥺❤️',
    },
    {
      id: 3,
      message: 'But ippo… finally, nee thirumbi vara pora nu nenachale semma happy-ah irukku! 😭❤️\nRomba naal wait pannadhu worth it nu feel aagudhu. 🫶',
    },
    {
      id: 4,
      message: 'Namma past-la enna nadandhaalum… adhellam vida namma future romba azhaga irukkanum nu dhaan aasai. 🥹❤️\nInimey neraya happy moments namma serndhu create pannalaam. 🫶✨',
    },
    {
      id: 5,
      message: 'Honestly… unna ivlo miss pannirupen nu naaney expect pannala. 🥹\nIppo, ivlo naal kazhichu unna paaka poren nu nenachale… heart-la oru different feeling. ❤️✨\nWelcome back, en chello Azhagii. 🫶',
    },
  ],

  // Bottle Page
  bottle: {
    heading: 'You caught all my butterflies… ❤️',
    instruction: 'Tap the bottle to open…',
    altInstruction: 'Now tap the bottle to open it...',
  },

  // Card Page
  card: {
    giftText: 'They left a little gift just for you 🎁',
    tapText: 'Tap to open ❤️',
  },

  // Forgive Page
  forgive: {
    question: 'Will you forgive me? 🥺❤️',
    yesBtn: 'Yes ❤️',
    noBtn: 'No 🙈',
    playfulHint: 'No? Come on... You can’t say no ♡',
  },

  // Final Message Page
  finalMessage: {
    title: 'I’m sorry… ❤️',
    paragraphs: [
      'Sorry for the moments when I hurt you, misunderstood you, or made you feel bad.',
      'I know saying sorry can’t change those moments, but I genuinely mean it. ❤️',
      'Ivlo naal nee illaama irundhadhukku apram…\nNee thirumbi vandhuta nu nenachale romba happy-ah irukku. 🥹❤️',
      'Welcome back, en azhagana loosu. 😂❤️\nUnna miss pannadhu… naan nenachadha vida romba adhigam. 🥹❤️',
      'And honestly… I’m just really happy that you’re back. ❤️',
    ],
    closingLine: 'Thank you for being you. 🦋❤️',
    closingLineAlternative: 'Thank you for always being you... ♡',
  },

  // Audio Music Settings
  music: {
    defaultStartSecond: 0,
    defaultEndSecond: 0,
    defaultSongTitle: 'Romantic Butterfly Melody',
    fallbackAudioUrl,
  },
};
