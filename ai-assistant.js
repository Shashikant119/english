(() => {
  const rootPrefix = window.location.pathname.includes('/politics/') ? '../' : '';
  const files = [
    { file: 'project-roadmap/README.md', title: 'Shopify AI Agents Project Roadmap' },
    { file: 'project-roadmap/01-shopify-whatsapp-agent.md', title: 'Agent 1: Shopify and WhatsApp' },
    { file: 'project-roadmap/02-google-lead-research-agent.md', title: 'Agent 2: Google Lead Research' },
    { file: 'project-roadmap/03-build-plan-and-checklist.md', title: 'AI Agents Build Plan' },
    { file: 'project-roadmap/04-data-model-prompts-and-stop-controls.md', title: 'Data Model and Agent Controls' },
    { file: 'english-word-reading-pronunciation-guide.txt', title: 'Reading and Pronunciation' },
    { file: 'english-grammar-step-by-step-roadmap.txt', title: 'Grammar Learning Roadmap' },
    { file: 'english-grammar-tenses.txt', title: 'Complete Tense Guide' },
    { file: 'Vocabulary.txt', title: 'Vocabulary' },
    { file: 'verb-forms-v1-v2-v3.txt', title: 'Verb Forms: V1, V2 and V3' },
    { file: 'english-stories-vocabulary-practice.txt', title: 'English Stories and Vocabulary' },
    { file: 'Notes.txt', title: 'Daily English Notes' },
    { file: 'message-send-notes.txt', title: 'Professional Messages' },
    { file: 'english-learning-stories.txt', title: 'English Learning Stories' },
    { file: 'professional-introduction.txt', title: 'My Professional Introduction' },
    { file: 'politics/bjp-karyakarta-name-birthday-post-list.txt', title: 'BJP Karyakarta Name, Birthday and Post List' },
    { file: 'politics/voice-note-desh-se-kya-gayab-hai.txt', title: 'Voice Note: Desh Se Kya Kya Gayab Hai' },
    { file: 'README.md', title: 'Project Guide' }
  ];

  const styles = document.createElement('style');
  styles.textContent = `
    .project-ai-button {
      align-items: center;
      background: rgba(255, 255, 255, .18);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, .55);
      border-radius: 50%;
      bottom: 22px;
      box-shadow: 0 18px 44px rgba(24, 45, 126, .26), inset 0 1px 0 rgba(255, 255, 255, .35);
      cursor: pointer;
      display: inline-flex;
      height: 76px;
      justify-content: center;
      overflow: hidden;
      padding: 0;
      position: fixed;
      right: 22px;
      transition: transform 160ms ease, box-shadow 160ms ease;
      width: 76px;
      z-index: 9998;
    }

    .project-ai-button:hover {
      box-shadow: 0 22px 54px rgba(24, 45, 126, .45), inset 0 1px 0 rgba(255, 255, 255, .28);
      transform: translateY(-2px);
    }

    .project-ai-button img {
      border-radius: 50%;
      display: block;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    .project-ai-overlay {
      align-items: center;
      backdrop-filter: blur(18px);
      background: rgba(10, 16, 31, .34);
      display: none;
      inset: 0;
      justify-content: center;
      padding: 20px;
      position: fixed;
      z-index: 9999;
    }

    .project-ai-overlay.is-open {
      display: flex;
    }

    .project-ai-panel {
      align-items: center;
      border: 0;
      box-shadow: none;
      color: #172036;
      display: flex;
      justify-content: center;
      max-width: 360px;
      width: min(100%, 360px);
    }

    .project-ai-head {
      align-items: center;
      background: transparent;
      color: #172036;
      display: flex;
      justify-content: space-between;
      padding: 20px 22px;
    }

    .project-ai-head,
    .project-ai-status,
    .project-ai-answer,
    .project-ai-toolbar,
    .project-ai-controls,
    .project-ai-buttons {
      display: none;
    }

    .project-ai-brand {
      align-items: center;
      display: flex;
      gap: 13px;
    }

    .project-ai-avatar {
      align-items: center;
      background: rgba(255, 255, 255, .58);
      border: 1px solid rgba(49, 87, 213, .14);
      border-radius: 50%;
      display: flex;
      height: 58px;
      justify-content: center;
      overflow: hidden;
      width: 58px;
    }

    .project-ai-avatar img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    .project-ai-head strong {
      display: block;
      font-size: 20px;
      letter-spacing: .01em;
    }

    .project-ai-head small {
      color: #667085;
      display: block;
      margin-top: 4px;
    }

    .project-ai-close {
      background: rgba(255, 255, 255, .72);
      border: 1px solid #e4e8f0;
      border-radius: 12px;
      color: #172036;
      cursor: pointer;
      font: 850 18px/1 system-ui, sans-serif;
      height: 38px;
      width: 38px;
    }

    .project-ai-body {
      padding: 0;
    }

    .project-ai-wave {
      align-items: center;
      backdrop-filter: blur(18px);
      background:
        radial-gradient(circle at center, rgba(77, 184, 255, .2), rgba(255, 255, 255, .08) 58%, rgba(255, 255, 255, .02)),
        rgba(255, 255, 255, .12);
      border: 1px solid rgba(255, 255, 255, .42);
      border-radius: 50%;
      box-shadow: 0 28px 80px rgba(16, 24, 40, .22), 0 0 0 18px rgba(255, 255, 255, .08);
      display: flex;
      gap: 8px;
      height: 210px;
      justify-content: center;
      margin: 0;
      position: relative;
      width: 210px;
    }

    .project-ai-wave::before,
    .project-ai-wave::after {
      border: 1px solid rgba(77, 184, 255, .34);
      border-radius: 50%;
      content: "";
      inset: 24px;
      position: absolute;
    }

    .project-ai-wave::after {
      animation: projectAiRing 1800ms ease-out infinite;
      inset: 8px;
    }

    .project-ai-wave span {
      animation: projectAiWave 1500ms ease-in-out infinite;
      background: linear-gradient(180deg, #4db8ff, #3157d5);
      border-radius: 999px;
      box-shadow: 0 7px 16px rgba(49, 87, 213, .22);
      height: 36px;
      width: 10px;
    }

    .project-ai-wave span:nth-child(2) { animation-delay: 90ms; }
    .project-ai-wave span:nth-child(3) { animation-delay: 180ms; }
    .project-ai-wave span:nth-child(4) { animation-delay: 270ms; }
    .project-ai-wave span:nth-child(5) { animation-delay: 360ms; }

    @keyframes projectAiWave {
      0%, 100% { transform: scaleY(.65); opacity: .55; }
      50% { transform: scaleY(2.1); opacity: 1; }
    }

    @keyframes projectAiRing {
      0% { opacity: .8; transform: scale(.78); }
      100% { opacity: 0; transform: scale(1.16); }
    }

    .project-ai-panel.is-listening .project-ai-wave span {
      animation-duration: 460ms;
    }

    .project-ai-panel.is-listening .project-ai-wave::after {
      animation-duration: 900ms;
    }

    .project-ai-panel.is-speaking .project-ai-wave span {
      background: linear-gradient(180deg, #19b985, #3157d5);
      animation-duration: 560ms;
    }

    .project-ai-panel.is-speaking .project-ai-wave::after {
      border-color: rgba(25, 185, 133, .38);
      animation-duration: 760ms;
    }

    .project-ai-panel.is-searching .project-ai-wave span {
      background: linear-gradient(180deg, #ffd166, #3157d5);
      animation-duration: 700ms;
    }

    .project-ai-panel.is-searching .project-ai-wave::after {
      border-color: rgba(255, 209, 102, .46);
      animation-duration: 1000ms;
    }

    .project-ai-status {
      color: #667085;
      font-size: 14px;
      margin: 0 0 14px;
      text-align: center;
    }

    .project-ai-answer {
      background: #f6f8fc;
      border: 1px solid #e4e8f0;
      border-radius: 16px;
      font-size: 15px;
      line-height: 1.55;
      max-height: 240px;
      overflow: auto;
      padding: 16px;
      white-space: pre-wrap;
    }

    .project-ai-toolbar {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 1fr;
      margin: 14px 0;
    }

    .project-ai-select {
      appearance: none;
      background: #fff;
      border: 1px solid #e4e8f0;
      border-radius: 12px;
      color: #172036;
      font: 750 14px/1.2 system-ui, sans-serif;
      min-height: 42px;
      padding: 0 12px;
    }

    .project-ai-controls {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr auto;
      margin-top: 14px;
    }

    .project-ai-input {
      border: 1px solid #e4e8f0;
      border-radius: 12px;
      font: 600 15px/1.4 system-ui, sans-serif;
      min-height: 44px;
      outline: none;
      padding: 10px 12px;
    }

    .project-ai-input:focus {
      border-color: #3157d5;
      box-shadow: 0 0 0 4px rgba(49, 87, 213, .12);
    }

    .project-ai-action {
      background: #3157d5;
      border: 0;
      border-radius: 12px;
      color: #fff;
      cursor: pointer;
      font: 850 14px/1 system-ui, sans-serif;
      min-height: 44px;
      padding: 0 14px;
      transition: background 150ms ease, transform 150ms ease;
    }

    .project-ai-action:hover {
      background: #203eaa;
      transform: translateY(-1px);
    }

    .project-ai-secondary {
      background: #fff;
      border: 1px solid #e4e8f0;
      color: #172036;
    }

    .project-ai-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .project-ai-chip {
      background: #edf2ff;
      border: 1px solid rgba(49, 87, 213, .18);
      border-radius: 999px;
      color: #203eaa;
      cursor: pointer;
      font: 750 12px/1 system-ui, sans-serif;
      padding: 9px 11px;
    }

    .project-ai-panel .project-ai-head,
    .project-ai-panel .project-ai-status,
    .project-ai-panel .project-ai-answer,
    .project-ai-panel .project-ai-toolbar,
    .project-ai-panel .project-ai-controls,
    .project-ai-panel .project-ai-buttons {
      display: none !important;
    }

    @media (max-width: 640px) {
      .project-ai-button {
        bottom: 14px;
        right: 14px;
      }

      .project-ai-controls {
        grid-template-columns: 1fr;
      }

      .project-ai-toolbar {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(styles);

  document.body.insertAdjacentHTML('beforeend', `
    <button class="project-ai-button" id="projectAiButton" type="button">
      <img src="https://i.pinimg.com/originals/af/7b/6e/af7b6ee82ae6de2df640d6d40c8fe8a4.gif" alt="Shri AI">
    </button>
    <div class="project-ai-overlay" id="projectAiOverlay" role="dialog" aria-modal="true" aria-labelledby="projectAiTitle">
      <section class="project-ai-panel">
        <div class="project-ai-head">
          <div class="project-ai-brand">
            <div class="project-ai-avatar">
              <img src="https://i.pinimg.com/originals/af/7b/6e/af7b6ee82ae6de2df640d6d40c8fe8a4.gif" alt="">
            </div>
            <div>
              <strong id="projectAiTitle">Shri English AI</strong>
              <small>Voice assistant for this project only</small>
            </div>
          </div>
          <button class="project-ai-close" id="projectAiClose" type="button" aria-label="Close">x</button>
        </div>
        <div class="project-ai-body">
          <div class="project-ai-wave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
          <p class="project-ai-status" id="projectAiStatus">Enable voice, then ask about grammar, vocabulary, roadmap, notes, or politics list.</p>
          <div class="project-ai-answer" id="projectAiAnswer">Namaste ji. Main Shri English AI hoon. Main sirf is project ke notes se jawab dunga, simple Hindi-English me.</div>
          <div class="project-ai-toolbar">
            <select class="project-ai-select" id="projectAiLanguage" aria-label="Assistant language">
              <option value="hi-IN">Hindi + English</option>
              <option value="en-IN">English</option>
            </select>
            <select class="project-ai-select" id="projectAiTone" aria-label="Reply style">
              <option value="short">Short answer</option>
              <option value="detail">Detailed answer</option>
            </select>
          </div>
          <div class="project-ai-controls">
            <input class="project-ai-input" id="projectAiInput" type="text" placeholder="Ask about this project...">
            <button class="project-ai-action" id="projectAiAsk" type="button">Ask</button>
          </div>
          <div class="project-ai-buttons">
            <button class="project-ai-action project-ai-secondary" id="projectAiVoice" type="button">Start Voice</button>
            <button class="project-ai-action project-ai-secondary" id="projectAiStop" type="button">Stop Voice</button>
            <button class="project-ai-chip" type="button" data-ai-question="How should I learn English daily?">Daily plan</button>
            <button class="project-ai-chip" type="button" data-ai-question="Explain tenses">Tenses</button>
            <button class="project-ai-chip" type="button" data-ai-question="Show BJP list">BJP list</button>
          </div>
        </div>
      </section>
    </div>
  `);

  const button = document.getElementById('projectAiButton');
  const overlay = document.getElementById('projectAiOverlay');
  const closeButton = document.getElementById('projectAiClose');
  const voiceButton = document.getElementById('projectAiVoice');
  const stopButton = document.getElementById('projectAiStop');
  const askButton = document.getElementById('projectAiAsk');
  const input = document.getElementById('projectAiInput');
  const status = document.getElementById('projectAiStatus');
  const answer = document.getElementById('projectAiAnswer');
  const panel = overlay.querySelector('.project-ai-panel');
  const languageSelect = document.getElementById('projectAiLanguage');
  const toneSelect = document.getElementById('projectAiTone');
  let index = [];
  let indexPromise = null;
  let recognition = null;
  let availableVoices = [];
  let shouldKeepListening = false;
  let isSpeaking = false;
  let isThinking = false;

  const restartListening = () => {
    if (!recognition || !shouldKeepListening || !overlay.classList.contains('is-open') || isSpeaking || isThinking) return;
    window.setTimeout(() => {
      if (!recognition || !shouldKeepListening || !overlay.classList.contains('is-open') || isSpeaking || isThinking) return;
      try {
        recognition.lang = languageSelect.value;
        panel.classList.add('is-listening');
        recognition.start();
      } catch (error) {
        panel.classList.remove('is-listening');
      }
    }, 500);
  };

  const cleanText = value => value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const refreshVoices = () => {
    availableVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  };

  const chooseVoice = lang => {
    refreshVoices();
    const femaleVoice = availableVoices.find(voice =>
      voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase())
      && /female|woman|zira|samantha|veena|lekha|kalpana|heera|google/i.test(voice.name)
    );
    const preferred = femaleVoice
      || availableVoices.find(voice => voice.lang === lang)
      || availableVoices.find(voice => voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()))
      || availableVoices.find(voice => /india|hindi|english/i.test(`${voice.name} ${voice.lang}`));
    return preferred || null;
  };

  const speak = text => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const lang = languageSelect.value || (/[अ-ह]/.test(text) ? 'hi-IN' : 'en-IN');
    utterance.lang = lang;
    utterance.voice = chooseVoice(lang);
    utterance.rate = lang === 'hi-IN' ? 0.88 : 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    isSpeaking = true;
    panel.classList.add('is-speaking');
    utterance.onend = () => {
      isSpeaking = false;
      panel.classList.remove('is-speaking');
      restartListening();
    };
    utterance.onerror = () => {
      isSpeaking = false;
      panel.classList.remove('is-speaking');
      restartListening();
    };
    window.speechSynthesis.speak(utterance);
  };

  const closeAi = () => {
    shouldKeepListening = false;
    isSpeaking = false;
    isThinking = false;
    overlay.classList.remove('is-open');
    panel.classList.remove('is-listening', 'is-speaking', 'is-searching');
    if (recognition) recognition.stop();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    isSpeaking = false;
  };

  const loadIndex = () => {
    if (indexPromise) return indexPromise;
    status.textContent = 'Project notes loading...';
    indexPromise = Promise.all(files.map(item =>
      fetch(rootPrefix + item.file)
        .then(response => response.ok ? response.text() : '')
        .catch(() => '')
        .then(content => ({ ...item, content: item.file.endsWith('.html') ? cleanText(content) : content }))
    )).then(items => {
      index = items.filter(item => item.content.trim());
      status.textContent = `Ready. ${index.length} project notes loaded.`;
      return index;
    });
    return indexPromise;
  };

  const tokens = text => text
    .toLowerCase()
    .replace(/[^a-z0-9अ-ह\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .filter(word => ![
      'kya', 'hai', 'hain', 'hota', 'hoti', 'batao', 'bataye', 'about', 'tell',
      'search', 'karo', 'karte', 'mere', 'mujhe', 'please', 'iske', 'bare', 'mein',
      'what', 'who', 'when', 'where', 'how', 'the', 'and', 'for', 'this', 'that'
    ].includes(word));

  const expandWords = words => {
    const aliases = {
      tense: ['tense', 'tenses', 'present', 'past', 'future'],
      tenses: ['tense', 'tenses', 'present', 'past', 'future'],
      grammar: ['grammar', 'noun', 'pronoun', 'verb', 'sentence'],
      vocabulary: ['vocabulary', 'word', 'meaning', 'pronunciation'],
      pronunciation: ['pronunciation', 'reading', 'sound', 'vowel'],
      bjp: ['bjp', 'karyakarta', 'leader', 'birthday', 'post'],
      neta: ['bjp', 'leader', 'karyakarta', 'post'],
      politics: ['politics', 'vidhan', 'sabha', 'parishad', 'bjp'],
      introduction: ['introduction', 'professional', 'experience'],
      roadmap: ['roadmap', 'plan', 'daily', 'learning']
    };
    return [...new Set(words.flatMap(word => aliases[word] || [word]))];
  };

  const makeReply = async question => {
    const lower = question.toLowerCase().trim();
    if (!lower) return languageSelect.value === 'en-IN'
      ? 'Please ask a question about this English project.'
      : 'Please is English project ke baare me question puchhiye.';
    if (['close', 'band', 'band karo', 'close karo'].includes(lower)) {
      closeAi();
      return '';
    }

    await loadIndex();
    const words = expandWords(tokens(question));
    if (!words.length) {
      return languageSelect.value === 'en-IN'
        ? 'Please ask a clear topic name, like tenses, vocabulary, BJP list, or daily plan.'
        : 'Please clear topic boliye, jaise tenses, vocabulary, BJP list, ya daily plan.';
    }
    const matches = index
      .map(item => {
        const haystack = `${item.title} ${item.file} ${item.content}`.toLowerCase();
        const title = item.title.toLowerCase();
        const score = words.reduce((total, word) => {
          if (title.includes(word)) return total + 4;
          if (haystack.includes(word)) return total + 1;
          return total;
        }, 0);
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);

    if (!matches.length) {
      return languageSelect.value === 'en-IN'
        ? 'Sorry, I cannot search Google here. I can answer only from the notes inside this English project.'
        : 'Nahi ji, main Google search nahi kar sakta. Main sirf is English project ke andar jo notes aur pages hain, unhi se jawab de sakta hoon.';
    }

    const best = matches[0];
    const firstWord = words.find(word => best.content.toLowerCase().includes(word)) || words[0];
    const foundAt = best.content.toLowerCase().indexOf(firstWord);
    const start = Math.max(0, foundAt - 80);
    const length = toneSelect.value === 'detail' ? 620 : 320;
    const snippet = best.content.slice(start, start + length).replace(/\s+/g, ' ').trim();
    const related = matches.slice(1).map(item => `Related: ${item.title}`).join('\n');

    if (languageSelect.value === 'en-IN') {
      return `I searched this project and found the best answer in "${best.title}".\n\n${snippet}\n\nFor full details, open: ${best.title}${related ? `\n${related}` : ''}`;
    }

    return `Ji, maine is project me search kiya. Sabse achcha answer "${best.title}" me mila.\n\n${snippet}\n\nComplete detail ke liye ye note open kariye: ${best.title}${related ? `\n${related}` : ''}`;
  };

  const ask = async question => {
    isThinking = true;
    panel.classList.remove('is-listening', 'is-speaking');
    panel.classList.add('is-searching');
    status.textContent = 'Project notes se answer bana raha hoon...';
    const reply = await makeReply(question);
    isThinking = false;
    panel.classList.remove('is-searching');
    if (!reply) return;
    answer.textContent = reply;
    status.textContent = 'Answered from this project only.';
    speak(reply);
  };

  const startVoice = () => {
    overlay.classList.add('is-open');
    loadIndex();
    if (!recognition) {
      const reply = 'Voice is not supported in this browser. Please use Chrome for voice assistant.';
      answer.textContent = reply;
      speak(reply);
      return;
    }
    shouldKeepListening = true;
    recognition.lang = languageSelect.value;
    panel.classList.add('is-listening');
    status.textContent = languageSelect.value === 'en-IN' ? 'Listening...' : 'Sun raha hoon...';
    recognition.start();
  };

  button.addEventListener('click', () => {
    startVoice();
  });

  closeButton.addEventListener('click', closeAi);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeAi();
  });

  askButton.addEventListener('click', () => ask(input.value));
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') ask(input.value);
  });

  stopButton.addEventListener('click', () => {
    if (recognition) recognition.stop();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    panel.classList.remove('is-listening', 'is-speaking');
    status.textContent = 'Voice stopped.';
  });

  document.querySelectorAll('[data-ai-question]').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.getAttribute('data-ai-question');
      ask(input.value);
    });
  });

  if (window.speechSynthesis) {
    refreshVoices();
    window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceButton.disabled = true;
    voiceButton.textContent = 'Voice Not Supported';
  } else {
    recognition = new SpeechRecognition();
    recognition.lang = languageSelect.value;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    voiceButton.addEventListener('click', () => {
      recognition.lang = languageSelect.value;
      panel.classList.add('is-listening');
      status.textContent = languageSelect.value === 'en-IN' ? 'Listening... please speak now.' : 'Sun raha hoon... ab boliye.';
      recognition.start();
    });

    recognition.addEventListener('result', event => {
      const text = event.results[0][0].transcript;
      input.value = text;
      ask(text);
    });

    recognition.addEventListener('end', () => {
      panel.classList.remove('is-listening');
      if (shouldKeepListening && overlay.classList.contains('is-open')) {
        restartListening();
      }
    });

    recognition.addEventListener('error', () => {
      panel.classList.remove('is-listening');
      status.textContent = 'Voice nahi suna. Please dobara try karo ya type karo.';
    });
  }
})();
