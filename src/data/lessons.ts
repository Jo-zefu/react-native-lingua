import type { Lesson, LanguageCode } from '@/types/learning';

// ─── Lessons ───────────────────────────────────────────────────────────────
// Each lesson belongs to a unit and includes:
//  - vocabulary  : individual words with pronunciation and example sentences
//  - phrases     : multi-word expressions with context notes
//  - activities  : exercises the user completes during the lesson
//  - aiTeacherPrompt (optional): config for a Stream Vision Agent AI teacher session
//
// Lesson types:
//   vocabulary   → word-focused lesson
//   conversation → dialogue / situational practice
//   ai_teacher   → live session with an AI video teacher (Stream Vision Agent)
//
// To add a new lesson: copy an existing one, change all IDs, and update
// the parent unit's `totalLessons` count in data/units.ts.

export const lessons: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  SPANISH — Unit 1: Greetings
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es-unit-1-lesson-1',
    unitId: 'es-unit-1',
    languageCode: 'es',
    title: 'Basic Greetings',
    description: 'Learn the most essential Spanish greetings and polite words.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,

    goal: {
      description: 'Say hello, goodbye, please, and thank you in Spanish.',
      skillsCovered: [
        'Recognize and use hola and adiós',
        'Express gratitude with gracias',
        'Make polite requests with por favor',
      ],
    },

    vocabulary: [
      {
        id: 'es-vocab-hola',
        word: 'hola',
        translation: 'hello',
        pronunciation: 'OH-lah',
        example: '¡Hola! ¿Cómo estás?',
        exampleTranslation: 'Hello! How are you?',
      },
      {
        id: 'es-vocab-adios',
        word: 'adiós',
        translation: 'goodbye',
        pronunciation: 'ah-DYOHS',
        example: '¡Adiós! Hasta mañana.',
        exampleTranslation: 'Goodbye! See you tomorrow.',
      },
      {
        id: 'es-vocab-gracias',
        word: 'gracias',
        translation: 'thank you',
        pronunciation: 'GRAH-syahs',
        example: 'Muchas gracias por tu ayuda.',
        exampleTranslation: 'Thank you very much for your help.',
      },
      {
        id: 'es-vocab-porfavor',
        word: 'por favor',
        translation: 'please',
        pronunciation: 'por fah-VOR',
        example: 'Un café, por favor.',
        exampleTranslation: 'A coffee, please.',
      },
    ],

    phrases: [
      {
        id: 'es-phrase-buenos-dias',
        phrase: 'Buenos días',
        translation: 'Good morning',
        pronunciation: 'BWAY-nohs DEE-ahs',
        context: 'Used in the morning until around noon.',
      },
      {
        id: 'es-phrase-buenas-noches',
        phrase: 'Buenas noches',
        translation: 'Good night',
        pronunciation: 'BWAY-nahs NOH-chehs',
        context: 'Used in the evening or as a farewell at night.',
      },
      {
        id: 'es-phrase-como-estas',
        phrase: '¿Cómo estás?',
        translation: 'How are you?',
        pronunciation: 'KOH-moh ehs-TAHS',
        context: 'Informal way to ask how someone is doing.',
      },
    ],

    activities: [
      {
        id: 'es-unit-1-lesson-1-act-1',
        type: 'multiple_choice',
        question: 'What does "hola" mean?',
        options: [
          { id: 'a', text: 'Hello', isCorrect: true },
          { id: 'b', text: 'Goodbye', isCorrect: false },
          { id: 'c', text: 'Thank you', isCorrect: false },
          { id: 'd', text: 'Please', isCorrect: false },
        ],
        hint: 'Think about how you start a conversation.',
      },
      {
        id: 'es-unit-1-lesson-1-act-2',
        type: 'fill_blank',
        question: '___! ¿Cómo estás?',
        correctAnswer: 'Hola',
        hint: 'This is how you say "Hello" in Spanish.',
      },
      {
        id: 'es-unit-1-lesson-1-act-3',
        type: 'match_pairs',
        question: 'Match each Spanish word to its English meaning.',
        pairs: [
          { left: 'hola', right: 'hello' },
          { left: 'adiós', right: 'goodbye' },
          { left: 'gracias', right: 'thank you' },
          { left: 'por favor', right: 'please' },
        ],
      },
    ],

    aiTeacherPrompt: {
      systemPrompt:
        'You are Luna, a warm and encouraging Spanish teacher. The student is a complete beginner. Today they are learning basic greetings: hola, adiós, gracias, and por favor. Keep sentences short and simple. After each exchange, gently reinforce the vocabulary. Celebrate every correct answer with enthusiasm.',
      lessonFocus: 'Basic Spanish greetings and polite expressions',
      exampleDialogue: [
        'Luna: ¡Hola! I\'m Luna, your Spanish teacher. Can you say "hola" back to me?',
        'Student: Hola!',
        'Luna: ¡Perfecto! "Hola" means "hello". Now let\'s try "adiós" — that means goodbye.',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'es-unit-1-lesson-2',
    unitId: 'es-unit-1',
    languageCode: 'es',
    title: 'Introducing Yourself',
    description: 'Meet your AI Spanish teacher and learn how to introduce yourself.',
    type: 'ai_teacher',
    difficulty: 'beginner',
    xpReward: 15,
    estimatedMinutes: 8,
    order: 2,

    goal: {
      description: 'Introduce yourself and ask someone\'s name in Spanish.',
      skillsCovered: [
        'Say "my name is" using me llamo',
        'Ask "what is your name?" with ¿Cómo te llamas?',
        'Respond with mucho gusto when meeting someone',
      ],
    },

    vocabulary: [
      {
        id: 'es-vocab-mellamo',
        word: 'me llamo',
        translation: 'my name is',
        pronunciation: 'meh YAH-moh',
        example: 'Me llamo Ana.',
        exampleTranslation: 'My name is Ana.',
      },
      {
        id: 'es-vocab-yo',
        word: 'yo',
        translation: 'I',
        pronunciation: 'yoh',
        example: 'Yo soy estudiante.',
        exampleTranslation: 'I am a student.',
      },
      {
        id: 'es-vocab-tu',
        word: 'tú',
        translation: 'you (informal)',
        pronunciation: 'too',
        example: '¿Tú hablas inglés?',
        exampleTranslation: 'Do you speak English?',
      },
      {
        id: 'es-vocab-soy',
        word: 'soy',
        translation: 'I am',
        pronunciation: 'soy',
        example: 'Soy de México.',
        exampleTranslation: 'I am from Mexico.',
      },
    ],

    phrases: [
      {
        id: 'es-phrase-me-llamo',
        phrase: 'Me llamo...',
        translation: 'My name is...',
        pronunciation: 'meh YAH-moh',
        context: 'The most natural way to introduce yourself in Spanish.',
      },
      {
        id: 'es-phrase-como-te-llamas',
        phrase: '¿Cómo te llamas?',
        translation: 'What is your name?',
        pronunciation: 'KOH-moh teh YAH-mahs',
        context: 'Ask this when meeting someone new (informal).',
      },
      {
        id: 'es-phrase-mucho-gusto',
        phrase: 'Mucho gusto',
        translation: 'Nice to meet you',
        pronunciation: 'MOO-choh GOOS-toh',
        context: 'Said after being introduced to someone.',
      },
    ],

    activities: [
      {
        id: 'es-unit-1-lesson-2-act-1',
        type: 'multiple_choice',
        question: 'How do you say "My name is..." in Spanish?',
        options: [
          { id: 'a', text: 'Me llamo...', isCorrect: true },
          { id: 'b', text: 'Yo soy...', isCorrect: false },
          { id: 'c', text: 'Tú eres...', isCorrect: false },
          { id: 'd', text: 'Él se llama...', isCorrect: false },
        ],
        hint: 'Literally: "I call myself..."',
      },
      {
        id: 'es-unit-1-lesson-2-act-2',
        type: 'translate',
        question: 'Translate to Spanish: "My name is Pablo."',
        correctAnswer: 'Me llamo Pablo.',
        hint: 'Use "me llamo" followed by the name.',
      },
      {
        id: 'es-unit-1-lesson-2-act-3',
        type: 'fill_blank',
        question: '¡___ gusto! (Nice to meet you)',
        correctAnswer: 'Mucho',
        hint: '"Mucho" means "much" or "very much".',
      },
    ],

    aiTeacherPrompt: {
      systemPrompt:
        'You are Luna, a friendly and patient Spanish tutor. Today\'s session is about self-introductions. Walk the student through saying their name in Spanish using "me llamo", asking someone else\'s name with "¿Cómo te llamas?", and responding with "mucho gusto". Speak slowly, use simple sentences, and encourage the student to repeat phrases aloud. Keep the tone fun and conversational.',
      lessonFocus: 'Self-introductions in Spanish',
      exampleDialogue: [
        'Luna: ¡Hola! Me llamo Luna. ¿Cómo te llamas tú?',
        'Student: Me llamo [name].',
        'Luna: ¡Mucho gusto, [name]! That means "Nice to meet you" — and you just said your first full Spanish sentence!',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  SPANISH — Unit 2: Numbers
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'es-unit-2-lesson-1',
    unitId: 'es-unit-2',
    languageCode: 'es',
    title: 'Numbers 1–5',
    description: 'Count from one to five in Spanish.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,

    goal: {
      description: 'Recognize and use the numbers 1 through 5 in Spanish.',
      skillsCovered: [
        'Say uno, dos, tres, cuatro, cinco',
        'Use numbers in simple sentences',
        'Identify written Spanish numbers',
      ],
    },

    vocabulary: [
      {
        id: 'es-vocab-uno',
        word: 'uno',
        translation: 'one',
        pronunciation: 'OO-noh',
        example: 'Tengo un gato.',
        exampleTranslation: 'I have one cat.',
      },
      {
        id: 'es-vocab-dos',
        word: 'dos',
        translation: 'two',
        pronunciation: 'dohs',
        example: 'Hay dos personas aquí.',
        exampleTranslation: 'There are two people here.',
      },
      {
        id: 'es-vocab-tres',
        word: 'tres',
        translation: 'three',
        pronunciation: 'trehs',
        example: 'Compré tres manzanas.',
        exampleTranslation: 'I bought three apples.',
      },
      {
        id: 'es-vocab-cuatro',
        word: 'cuatro',
        translation: 'four',
        pronunciation: 'KWAH-troh',
        example: 'Faltan cuatro días.',
        exampleTranslation: 'Four days to go.',
      },
      {
        id: 'es-vocab-cinco',
        word: 'cinco',
        translation: 'five',
        pronunciation: 'SEEN-koh',
        example: 'Llegamos en cinco minutos.',
        exampleTranslation: 'We arrive in five minutes.',
      },
    ],

    phrases: [
      {
        id: 'es-phrase-cuantos-hay',
        phrase: '¿Cuántos hay?',
        translation: 'How many are there?',
        pronunciation: 'KWAHN-tohs eye',
        context: 'Ask this to find out the quantity of something.',
      },
      {
        id: 'es-phrase-hay-cinco',
        phrase: 'Hay cinco...',
        translation: 'There are five...',
        pronunciation: 'eye SEEN-koh',
        context: 'Use "hay" (there is/are) to state a quantity.',
      },
    ],

    activities: [
      {
        id: 'es-unit-2-lesson-1-act-1',
        type: 'multiple_choice',
        question: 'What is the Spanish word for "three"?',
        options: [
          { id: 'a', text: 'dos', isCorrect: false },
          { id: 'b', text: 'cuatro', isCorrect: false },
          { id: 'c', text: 'tres', isCorrect: true },
          { id: 'd', text: 'cinco', isCorrect: false },
        ],
        hint: 'It sounds a little like "trace".',
      },
      {
        id: 'es-unit-2-lesson-1-act-2',
        type: 'fill_blank',
        question: 'Tengo ___ manzanas. (I have five apples)',
        correctAnswer: 'cinco',
        hint: 'Five is the highest number in this lesson.',
      },
      {
        id: 'es-unit-2-lesson-1-act-3',
        type: 'match_pairs',
        question: 'Match each number to its translation.',
        pairs: [
          { left: 'uno', right: 'one' },
          { left: 'dos', right: 'two' },
          { left: 'tres', right: 'three' },
          { left: 'cuatro', right: 'four' },
          { left: 'cinco', right: 'five' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'es-unit-2-lesson-2',
    unitId: 'es-unit-2',
    languageCode: 'es',
    title: 'Numbers 6–10',
    description: 'Keep counting! Learn six through ten in Spanish.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    order: 2,

    goal: {
      description: 'Count from six to ten and use those numbers in context.',
      skillsCovered: [
        'Say seis, siete, ocho, nueve, diez',
        'Count from 1 to 10 without pausing',
        'Use numbers in short phrases',
      ],
    },

    vocabulary: [
      {
        id: 'es-vocab-seis',
        word: 'seis',
        translation: 'six',
        pronunciation: 'says',
        example: 'Seis libros en la mesa.',
        exampleTranslation: 'Six books on the table.',
      },
      {
        id: 'es-vocab-siete',
        word: 'siete',
        translation: 'seven',
        pronunciation: 'SYEH-teh',
        example: 'Hay siete días en la semana.',
        exampleTranslation: 'There are seven days in a week.',
      },
      {
        id: 'es-vocab-ocho',
        word: 'ocho',
        translation: 'eight',
        pronunciation: 'OH-choh',
        example: 'Dormí ocho horas.',
        exampleTranslation: 'I slept eight hours.',
      },
      {
        id: 'es-vocab-nueve',
        word: 'nueve',
        translation: 'nine',
        pronunciation: 'NWEH-beh',
        example: 'El bebé tiene nueve meses.',
        exampleTranslation: 'The baby is nine months old.',
      },
      {
        id: 'es-vocab-diez',
        word: 'diez',
        translation: 'ten',
        pronunciation: 'dyehs',
        example: 'Tengo diez dedos.',
        exampleTranslation: 'I have ten fingers.',
      },
    ],

    phrases: [
      {
        id: 'es-phrase-cuento-hasta',
        phrase: 'Cuento hasta diez.',
        translation: 'I count to ten.',
        pronunciation: 'KWEHN-toh AHS-tah dyehs',
        context: 'Useful phrase when practising counting aloud.',
      },
      {
        id: 'es-phrase-que-numero',
        phrase: '¿Qué número es este?',
        translation: 'What number is this?',
        pronunciation: 'keh NOO-meh-roh ehs EHS-teh',
        context: 'Ask this to quiz someone on a number.',
      },
    ],

    activities: [
      {
        id: 'es-unit-2-lesson-2-act-1',
        type: 'multiple_choice',
        question: 'What does "siete" mean?',
        options: [
          { id: 'a', text: 'Six', isCorrect: false },
          { id: 'b', text: 'Seven', isCorrect: true },
          { id: 'c', text: 'Eight', isCorrect: false },
          { id: 'd', text: 'Nine', isCorrect: false },
        ],
        hint: 'It\'s the number of days in a week.',
      },
      {
        id: 'es-unit-2-lesson-2-act-2',
        type: 'fill_blank',
        question: 'Hay ___ días en la semana. (seven)',
        correctAnswer: 'siete',
        hint: 'You use this number when talking about days of the week.',
      },
      {
        id: 'es-unit-2-lesson-2-act-3',
        type: 'match_pairs',
        question: 'Match each number to its translation.',
        pairs: [
          { left: 'seis', right: 'six' },
          { left: 'siete', right: 'seven' },
          { left: 'ocho', right: 'eight' },
          { left: 'nueve', right: 'nine' },
          { left: 'diez', right: 'ten' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  FRENCH — Unit 1: Greetings
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'fr-unit-1-lesson-1',
    unitId: 'fr-unit-1',
    languageCode: 'fr',
    title: 'Bonjour!',
    description: 'Start your French adventure with the most common greetings.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,

    goal: {
      description: 'Greet people and respond politely in French.',
      skillsCovered: [
        'Say hello and goodbye with bonjour and au revoir',
        'Express thanks with merci',
        'Make requests politely with s\'il vous plaît',
      ],
    },

    vocabulary: [
      {
        id: 'fr-vocab-bonjour',
        word: 'bonjour',
        translation: 'hello / good morning',
        pronunciation: 'bohn-ZHOOR',
        example: 'Bonjour, comment ça va?',
        exampleTranslation: 'Hello, how are you?',
      },
      {
        id: 'fr-vocab-aurevoir',
        word: 'au revoir',
        translation: 'goodbye',
        pronunciation: 'oh ruh-VWAHR',
        example: 'Au revoir et bonne journée!',
        exampleTranslation: 'Goodbye and have a great day!',
      },
      {
        id: 'fr-vocab-merci',
        word: 'merci',
        translation: 'thank you',
        pronunciation: 'mehr-SEE',
        example: 'Merci beaucoup!',
        exampleTranslation: 'Thank you very much!',
      },
      {
        id: 'fr-vocab-silvousplait',
        word: 's\'il vous plaît',
        translation: 'please',
        pronunciation: 'seel voo PLEH',
        example: 'Un café, s\'il vous plaît.',
        exampleTranslation: 'A coffee, please.',
      },
    ],

    phrases: [
      {
        id: 'fr-phrase-comment-ca-va',
        phrase: 'Comment ça va?',
        translation: 'How are you?',
        pronunciation: 'koh-mohn sah VAH',
        context: 'Informal — ask a friend how they are doing.',
      },
      {
        id: 'fr-phrase-tres-bien',
        phrase: 'Très bien, merci.',
        translation: 'Very well, thank you.',
        pronunciation: 'treh byaN mehr-SEE',
        context: 'A polite, positive response to "Comment ça va?".',
      },
      {
        id: 'fr-phrase-enchante',
        phrase: 'Enchanté(e)',
        translation: 'Pleased to meet you',
        pronunciation: 'ahn-shahn-TEH',
        context: 'Said when meeting someone for the first time. Add "e" if you are female.',
      },
    ],

    activities: [
      {
        id: 'fr-unit-1-lesson-1-act-1',
        type: 'multiple_choice',
        question: 'What does "bonjour" mean?',
        options: [
          { id: 'a', text: 'Goodbye', isCorrect: false },
          { id: 'b', text: 'Thank you', isCorrect: false },
          { id: 'c', text: 'Hello', isCorrect: true },
          { id: 'd', text: 'Please', isCorrect: false },
        ],
        hint: 'You say this when you walk into a French shop.',
      },
      {
        id: 'fr-unit-1-lesson-1-act-2',
        type: 'fill_blank',
        question: '___ beaucoup! (Thank you very much!)',
        correctAnswer: 'Merci',
        hint: 'It ends with an "i" sound.',
      },
      {
        id: 'fr-unit-1-lesson-1-act-3',
        type: 'match_pairs',
        question: 'Match each French word to its English meaning.',
        pairs: [
          { left: 'bonjour', right: 'hello' },
          { left: 'au revoir', right: 'goodbye' },
          { left: 'merci', right: 'thank you' },
          { left: 's\'il vous plaît', right: 'please' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'fr-unit-1-lesson-2',
    unitId: 'fr-unit-1',
    languageCode: 'fr',
    title: 'At the Café',
    description: 'Order food and drinks like a true Parisian.',
    type: 'conversation',
    difficulty: 'beginner',
    xpReward: 15,
    estimatedMinutes: 7,
    order: 2,

    goal: {
      description: 'Order common items at a French café and ask for the bill.',
      skillsCovered: [
        'Name common café items: café, thé, eau, pain',
        'Place an order using "je voudrais"',
        'Ask for the check with "l\'addition"',
      ],
    },

    vocabulary: [
      {
        id: 'fr-vocab-cafe',
        word: 'café',
        translation: 'coffee',
        pronunciation: 'kah-FEH',
        example: 'Je voudrais un café, s\'il vous plaît.',
        exampleTranslation: 'I would like a coffee, please.',
      },
      {
        id: 'fr-vocab-the',
        word: 'thé',
        translation: 'tea',
        pronunciation: 'teh',
        example: 'Un thé chaud, s\'il vous plaît.',
        exampleTranslation: 'A hot tea, please.',
      },
      {
        id: 'fr-vocab-eau',
        word: 'eau',
        translation: 'water',
        pronunciation: 'oh',
        example: 'De l\'eau, s\'il vous plaît.',
        exampleTranslation: 'Some water, please.',
      },
      {
        id: 'fr-vocab-pain',
        word: 'pain',
        translation: 'bread',
        pronunciation: 'pan',
        example: 'Du pain avec le repas.',
        exampleTranslation: 'Bread with the meal.',
      },
    ],

    phrases: [
      {
        id: 'fr-phrase-je-voudrais',
        phrase: 'Je voudrais...',
        translation: 'I would like...',
        pronunciation: 'zhuh voo-DREH',
        context: 'Polite way to order or request something.',
      },
      {
        id: 'fr-phrase-laddition',
        phrase: 'L\'addition, s\'il vous plaît.',
        translation: 'The check, please.',
        pronunciation: 'lah-dee-SYOHN seel voo PLEH',
        context: 'Ask the server for the bill at the end of a meal.',
      },
      {
        id: 'fr-phrase-cest-delicieux',
        phrase: 'C\'est délicieux!',
        translation: 'It\'s delicious!',
        pronunciation: 'seh deh-lee-SYUH',
        context: 'Compliment the food — French people love this.',
      },
    ],

    activities: [
      {
        id: 'fr-unit-1-lesson-2-act-1',
        type: 'multiple_choice',
        question: 'How do you say "I would like a coffee" in French?',
        options: [
          { id: 'a', text: 'Je voudrais un café.', isCorrect: true },
          { id: 'b', text: 'Je mange du café.', isCorrect: false },
          { id: 'c', text: 'Il y a un café.', isCorrect: false },
          { id: 'd', text: 'Merci du café.', isCorrect: false },
        ],
        hint: '"Je voudrais" means "I would like".',
      },
      {
        id: 'fr-unit-1-lesson-2-act-2',
        type: 'translate',
        question: 'Translate to French: "The bread, please."',
        correctAnswer: 'Le pain, s\'il vous plaît.',
        hint: 'Use "le" before the noun and the polite form of "please".',
      },
      {
        id: 'fr-unit-1-lesson-2-act-3',
        type: 'fill_blank',
        question: 'Un ___, s\'il vous plaît. (A tea, please)',
        correctAnswer: 'thé',
        hint: 'Tea in French is a short word that sounds like the letter "T".',
      },
    ],

    aiTeacherPrompt: {
      systemPrompt:
        'You are Sophie, a friendly French language tutor. Today\'s lesson takes place in a Parisian café. Help the student practice ordering food and drinks in French using "je voudrais". Be warm and encouraging. Use simple phrases, gently correct mistakes, and teach useful expressions like "c\'est délicieux" when appropriate.',
      lessonFocus: 'Ordering food and drinks at a French café',
      exampleDialogue: [
        'Sophie: Bonjour! Bienvenue au café. Que désirez-vous?',
        'Student: Je voudrais un café.',
        'Sophie: Parfait! "Je voudrais" means "I would like". Très bien!',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  JAPANESE — Unit 1: Basics
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ja-unit-1-lesson-1',
    unitId: 'ja-unit-1',
    languageCode: 'ja',
    title: 'First Words',
    description: 'Learn the most important Japanese greetings.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 6,
    order: 1,

    goal: {
      description: 'Say hello, good morning, thank you, and excuse me in Japanese.',
      skillsCovered: [
        'Use こんにちは for "hello"',
        'Use おはよう for "good morning"',
        'Express thanks with ありがとう',
        'Get someone\'s attention with すみません',
      ],
    },

    vocabulary: [
      {
        id: 'ja-vocab-konnichiwa',
        word: 'こんにちは',
        translation: 'hello',
        pronunciation: 'kon-ni-chi-WA',
        example: 'こんにちは、元気ですか?',
        exampleTranslation: 'Hello, how are you?',
      },
      {
        id: 'ja-vocab-ohayou',
        word: 'おはよう',
        translation: 'good morning',
        pronunciation: 'o-ha-YO',
        example: 'おはようございます！',
        exampleTranslation: 'Good morning! (formal)',
      },
      {
        id: 'ja-vocab-arigatou',
        word: 'ありがとう',
        translation: 'thank you',
        pronunciation: 'a-ri-GA-to',
        example: 'ありがとうございます。',
        exampleTranslation: 'Thank you very much. (formal)',
      },
      {
        id: 'ja-vocab-sumimasen',
        word: 'すみません',
        translation: 'excuse me / sorry',
        pronunciation: 'su-mi-MA-sen',
        example: 'すみません、トイレはどこですか?',
        exampleTranslation: 'Excuse me, where is the restroom?',
      },
    ],

    phrases: [
      {
        id: 'ja-phrase-hajimemashite',
        phrase: 'はじめまして',
        translation: 'Nice to meet you',
        pronunciation: 'ha-ji-me-MA-shi-te',
        context: 'Said the first time you meet someone.',
      },
      {
        id: 'ja-phrase-yoroshiku',
        phrase: 'よろしくお願いします',
        translation: 'Please treat me kindly / Nice to meet you',
        pronunciation: 'yo-ro-shi-ku-o-ne-ga-i-shi-mas',
        context: 'Formal closing phrase after introducing yourself.',
      },
      {
        id: 'ja-phrase-oyasumi',
        phrase: 'おやすみなさい',
        translation: 'Good night',
        pronunciation: 'o-ya-su-mi-na-SA-i',
        context: 'Said before going to sleep or leaving at night.',
      },
    ],

    activities: [
      {
        id: 'ja-unit-1-lesson-1-act-1',
        type: 'multiple_choice',
        question: 'What does "ありがとう" mean?',
        options: [
          { id: 'a', text: 'Hello', isCorrect: false },
          { id: 'b', text: 'Good morning', isCorrect: false },
          { id: 'c', text: 'Thank you', isCorrect: true },
          { id: 'd', text: 'Excuse me', isCorrect: false },
        ],
        hint: 'You say this when someone does something kind for you.',
      },
      {
        id: 'ja-unit-1-lesson-1-act-2',
        type: 'multiple_choice',
        question: 'Which word means "Good morning" in Japanese?',
        options: [
          { id: 'a', text: 'こんにちは', isCorrect: false },
          { id: 'b', text: 'おはよう', isCorrect: true },
          { id: 'c', text: 'すみません', isCorrect: false },
          { id: 'd', text: 'ありがとう', isCorrect: false },
        ],
        hint: 'Think of the sun rising in the morning.',
      },
      {
        id: 'ja-unit-1-lesson-1-act-3',
        type: 'match_pairs',
        question: 'Match each Japanese word to its English meaning.',
        pairs: [
          { left: 'こんにちは', right: 'hello' },
          { left: 'おはよう', right: 'good morning' },
          { left: 'ありがとう', right: 'thank you' },
          { left: 'すみません', right: 'excuse me' },
        ],
      },
    ],

    aiTeacherPrompt: {
      systemPrompt:
        'You are Hana, a warm Japanese language teacher. The student is a beginner with no prior knowledge of Japanese. Today\'s lesson covers four key greetings: こんにちは (hello), おはよう (good morning), ありがとう (thank you), and すみません (excuse me). Provide romaji pronunciation after each Japanese word. Be patient, encouraging, and explain cultural context where helpful.',
      lessonFocus: 'Essential Japanese greetings',
      exampleDialogue: [
        'Hana: こんにちは！(Konnichiwa!) That means "Hello!" — can you try saying it?',
        'Student: Konnichiwa!',
        'Hana: すごい！(Sugoi!) That means "Amazing!" Great pronunciation!',
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'ja-unit-1-lesson-2',
    unitId: 'ja-unit-1',
    languageCode: 'ja',
    title: 'Counting',
    description: 'Learn to count from one to five in Japanese.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    order: 2,

    goal: {
      description: 'Count from 1 to 5 in Japanese.',
      skillsCovered: [
        'Say いち、に、さん、し、ご',
        'Recognise written Japanese numbers',
        'Use numbers in simple phrases',
      ],
    },

    vocabulary: [
      {
        id: 'ja-vocab-ichi',
        word: 'いち',
        translation: 'one',
        pronunciation: 'i-chi',
        example: 'いちばん好きです。',
        exampleTranslation: 'I like it the most. (Literally: number one favourite)',
      },
      {
        id: 'ja-vocab-ni',
        word: 'に',
        translation: 'two',
        pronunciation: 'ni',
        example: 'ふたりいます。',
        exampleTranslation: 'There are two people.',
      },
      {
        id: 'ja-vocab-san',
        word: 'さん',
        translation: 'three',
        pronunciation: 'san',
        example: 'さんびきのねこ。',
        exampleTranslation: 'Three cats.',
      },
      {
        id: 'ja-vocab-shi',
        word: 'し / よん',
        translation: 'four',
        pronunciation: 'shi / yon',
        example: 'よっつあります。',
        exampleTranslation: 'There are four (things).',
      },
      {
        id: 'ja-vocab-go',
        word: 'ご',
        translation: 'five',
        pronunciation: 'go',
        example: 'ごほんの本。',
        exampleTranslation: 'Five books.',
      },
    ],

    phrases: [
      {
        id: 'ja-phrase-ikutsu',
        phrase: 'いくつですか?',
        translation: 'How many?',
        pronunciation: 'i-ku-TSU-de-su-ka',
        context: 'Ask this to find out the quantity of something.',
      },
      {
        id: 'ja-phrase-hitotsu-kudasai',
        phrase: 'ひとつください',
        translation: 'One, please.',
        pronunciation: 'hi-to-TSU-ku-da-sa-i',
        context: 'Use this to order or request a single item.',
      },
    ],

    activities: [
      {
        id: 'ja-unit-1-lesson-2-act-1',
        type: 'multiple_choice',
        question: 'What is the Japanese word for "three"?',
        options: [
          { id: 'a', text: 'いち', isCorrect: false },
          { id: 'b', text: 'に', isCorrect: false },
          { id: 'c', text: 'さん', isCorrect: true },
          { id: 'd', text: 'し', isCorrect: false },
        ],
        hint: 'It sounds like "sun".',
      },
      {
        id: 'ja-unit-1-lesson-2-act-2',
        type: 'fill_blank',
        question: '___ (two in Japanese)',
        correctAnswer: 'に',
        hint: 'A single hiragana character — sounds like the English word "knee".',
      },
      {
        id: 'ja-unit-1-lesson-2-act-3',
        type: 'match_pairs',
        question: 'Match each Japanese number to its English meaning.',
        pairs: [
          { left: 'いち', right: 'one' },
          { left: 'に', right: 'two' },
          { left: 'さん', right: 'three' },
          { left: 'し', right: 'four' },
          { left: 'ご', right: 'five' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  GERMAN — Unit 1: Greetings
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'de-unit-1-lesson-1',
    unitId: 'de-unit-1',
    languageCode: 'de',
    title: 'Guten Tag!',
    description: 'Master everyday German greetings and polite expressions.',
    type: 'vocabulary',
    difficulty: 'beginner',
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,

    goal: {
      description: 'Greet people and be polite in German.',
      skillsCovered: [
        'Say hello with hallo and guten Tag',
        'Say goodbye with tschüss and auf Wiedersehen',
        'Use danke and bitte for thanks and politeness',
      ],
    },

    vocabulary: [
      {
        id: 'de-vocab-hallo',
        word: 'hallo',
        translation: 'hello',
        pronunciation: 'HA-loh',
        example: 'Hallo! Wie geht es Ihnen?',
        exampleTranslation: 'Hello! How are you? (formal)',
      },
      {
        id: 'de-vocab-tschuss',
        word: 'tschüss',
        translation: 'bye',
        pronunciation: 'choos',
        example: 'Tschüss, bis morgen!',
        exampleTranslation: 'Bye, see you tomorrow!',
      },
      {
        id: 'de-vocab-danke',
        word: 'danke',
        translation: 'thank you',
        pronunciation: 'DAN-keh',
        example: 'Danke schön für deine Hilfe.',
        exampleTranslation: 'Thank you very much for your help.',
      },
      {
        id: 'de-vocab-bitte',
        word: 'bitte',
        translation: 'please / you\'re welcome',
        pronunciation: 'BI-teh',
        example: 'Bitte helfen Sie mir.',
        exampleTranslation: 'Please help me.',
      },
    ],

    phrases: [
      {
        id: 'de-phrase-guten-morgen',
        phrase: 'Guten Morgen',
        translation: 'Good morning',
        pronunciation: 'GOO-ten MOR-gen',
        context: 'Standard morning greeting until around 10–11 am.',
      },
      {
        id: 'de-phrase-wie-gehts',
        phrase: 'Wie geht\'s?',
        translation: 'How are you? (informal)',
        pronunciation: 'vee geyts',
        context: 'Casual version — use with friends. "Wie geht es Ihnen?" is more formal.',
      },
      {
        id: 'de-phrase-auf-wiedersehen',
        phrase: 'Auf Wiedersehen',
        translation: 'Goodbye (formal)',
        pronunciation: 'owf VEE-der-zey-en',
        context: 'Formal farewell — literally "until we see each other again".',
      },
    ],

    activities: [
      {
        id: 'de-unit-1-lesson-1-act-1',
        type: 'multiple_choice',
        question: 'What does "danke" mean?',
        options: [
          { id: 'a', text: 'Hello', isCorrect: false },
          { id: 'b', text: 'Goodbye', isCorrect: false },
          { id: 'c', text: 'Please', isCorrect: false },
          { id: 'd', text: 'Thank you', isCorrect: true },
        ],
        hint: 'You say this when someone helps you.',
      },
      {
        id: 'de-unit-1-lesson-1-act-2',
        type: 'fill_blank',
        question: '___ Morgen! (Good morning)',
        correctAnswer: 'Guten',
        hint: '"Guten" means "good" — the same root as in English.',
      },
      {
        id: 'de-unit-1-lesson-1-act-3',
        type: 'match_pairs',
        question: 'Match each German word to its English meaning.',
        pairs: [
          { left: 'hallo', right: 'hello' },
          { left: 'tschüss', right: 'bye' },
          { left: 'danke', right: 'thank you' },
          { left: 'bitte', right: 'please' },
        ],
      },
    ],

    aiTeacherPrompt: {
      systemPrompt:
        'You are Max, a friendly and enthusiastic German language tutor. The student is a complete beginner. Today\'s lesson covers basic German greetings and polite expressions: hallo, tschüss, danke, and bitte. Point out similarities to English where they exist (e.g., "hallo" ≈ "hello"). Be encouraging, provide clear pronunciation guides, and celebrate every correct answer.',
      lessonFocus: 'Basic German greetings and polite expressions',
      exampleDialogue: [
        'Max: Hallo! Ich heiße Max. Willkommen zum Deutschkurs!',
        'Student: Hallo, Max!',
        'Max: Sehr gut! "Hallo" is almost identical to "hello" in English — easy, right? Now let\'s try "danke"...',
      ],
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** All lessons for a given unit, sorted by their display order. */
export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

/** All lessons for a given language. */
export function getLessonsByLanguage(code: LanguageCode): Lesson[] {
  return lessons.filter((lesson) => lesson.languageCode === code);
}

/** Look up a single lesson by its unique ID. */
export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

/** The first (unlocked) lesson in a unit — useful for "start unit" CTAs. */
export function getFirstLessonInUnit(unitId: string): Lesson | undefined {
  return getLessonsByUnit(unitId)[0];
}
