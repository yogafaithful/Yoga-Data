/* =====================================================
   Business English Hangman — Game Logic
   ===================================================== */

// ── Word Bank ─────────────────────────────────────────
// All words are max 8 letters, beginner-friendly business vocabulary.
// Each entry has: word, hint, category.

const WORD_BANK = [
  // ── Jobs / Roles ──────────────────────────────────────
  { word: "BOSS",     hint: "The person in charge of a company or team.",           category: "Jobs" },
  { word: "STAFF",    hint: "All the workers who work for a company.",              category: "Jobs" },
  { word: "CLERK",    hint: "A person who does office work like typing and filing.", category: "Jobs" },
  { word: "MANAGER",  hint: "A person who is in charge of a team or department.",   category: "Jobs" },
  { word: "WORKER",   hint: "A person who does a job for a company.",               category: "Jobs" },
  { word: "PARTNER",  hint: "A person who shares the ownership of a business.",     category: "Jobs" },
  { word: "TRAINER",  hint: "A person who teaches new skills to employees.",        category: "Jobs" },
  { word: "CASHIER",  hint: "A person who takes payments from customers.",          category: "Jobs" },

  // ── Office Items ──────────────────────────────────────
  { word: "DESK",     hint: "A flat table where you do your work in an office.",    category: "Office" },
  { word: "CHAIR",    hint: "A piece of furniture you sit on at your desk.",        category: "Office" },
  { word: "PHONE",    hint: "A device you use to call and talk to other people.",   category: "Office" },
  { word: "FOLDER",   hint: "A cover used to keep papers and documents together.",  category: "Office" },
  { word: "LAPTOP",   hint: "A small computer you can carry and use anywhere.",     category: "Office" },
  { word: "PRINTER",  hint: "A machine that prints words and pictures on paper.",   category: "Office" },
  { word: "STAPLER",  hint: "A tool that joins sheets of paper with metal clips.",  category: "Office" },
  { word: "CABINET",  hint: "A large box with drawers used to store office files.", category: "Office" },

  // ── Business Terms ────────────────────────────────────
  { word: "DEAL",     hint: "An agreement between two people or companies.",        category: "Business" },
  { word: "SALE",     hint: "When a product is sold to a customer.",                category: "Business" },
  { word: "PROFIT",   hint: "Money left after paying all costs and expenses.",      category: "Business" },
  { word: "BUDGET",   hint: "A plan that shows how money will be spent.",           category: "Business" },
  { word: "INVOICE",  hint: "A bill sent to a customer asking for payment.",        category: "Business" },
  { word: "CONTRACT", hint: "A written agreement signed by two or more parties.",   category: "Business" },
  { word: "REPORT",   hint: "A written document describing work or results.",       category: "Business" },
  { word: "PROJECT",  hint: "A planned piece of work with a specific goal.",        category: "Business" },
  { word: "RECEIPT",  hint: "A paper that proves you have paid for something.",     category: "Business" },
  { word: "PRODUCT",  hint: "Something made by a company and sold to customers.",   category: "Business" },
  { word: "SERVICE",  hint: "Work done for a customer in exchange for payment.",    category: "Business" },
  { word: "SALARY",   hint: "The fixed amount of money a worker earns each month.", category: "Business" },

  // ── Actions ───────────────────────────────────────────
  { word: "SELL",     hint: "To give something to someone in exchange for money.",  category: "Actions" },
  { word: "HIRE",     hint: "To give someone a job at your company.",               category: "Actions" },
  { word: "MEET",     hint: "To come together with other people to talk.",          category: "Actions" },
  { word: "SIGN",     hint: "To write your name on an official document.",          category: "Actions" },
  { word: "EMAIL",    hint: "To send a message to someone using the internet.",     category: "Actions" },
  { word: "PLAN",     hint: "To decide how you will do something in the future.",   category: "Actions" },
  { word: "ORDER",    hint: "To ask a company to send you goods or services.",      category: "Actions" },
  { word: "DELIVER",  hint: "To bring goods to a customer at their location.",      category: "Actions" },

  // ── Places ────────────────────────────────────────────
  { word: "OFFICE",   hint: "A room or building where people do business work.",    category: "Places" },
  { word: "FACTORY",  hint: "A building where goods are made by machines.",         category: "Places" },
  { word: "STORE",    hint: "A place where customers can go to buy things.",        category: "Places" },
  { word: "BANK",     hint: "A business where people keep money and get loans.",    category: "Places" },
  { word: "MARKET",   hint: "A place where many goods are bought and sold.",        category: "Places" },
  { word: "AIRPORT",  hint: "A place where planes take off and land.",              category: "Places" },
  { word: "HOTEL",    hint: "A building where business travellers stay overnight.", category: "Places" },
  { word: "CANTEEN",  hint: "A room in a workplace where staff eat lunch.",         category: "Places" },

  // ── Communication ─────────────────────────────────────
  { word: "MEMO",     hint: "A short written note sent between people in a company.", category: "Communication" },
  { word: "MEETING",  hint: "When a group of people gather to discuss work topics.",  category: "Communication" },
  { word: "LETTER",   hint: "A written message sent by post or mail.",               category: "Communication" },
  { word: "SCHEDULE", hint: "A written plan showing when events will happen.",        category: "Communication" },
  { word: "TRAINING", hint: "Learning new skills to become better at your job.",      category: "Communication" },
  { word: "CUSTOMER", hint: "A person who buys goods or services from a business.",  category: "Communication" },

  // ── Trades ────────────────────────────────────────────
  { word: "PLUMBER",  hint: "A person who installs and repairs water pipes.",        category: "Trades" },
  { word: "WELDER",   hint: "A person who joins metal parts together using heat.",   category: "Trades" },
  { word: "BUILDER",  hint: "A person who constructs and repairs buildings.",        category: "Trades" },
  { word: "DRIVER",   hint: "A person who operates a vehicle as their job.",         category: "Trades" },
  { word: "PAINTER",  hint: "A person who paints walls and surfaces of buildings.",  category: "Trades" },
  { word: "MECHANIC", hint: "A person who repairs and maintains engines and vehicles.", category: "Trades" },
  { word: "COOK",     hint: "A person who prepares food in a cafe or restaurant.",   category: "Trades" },
  { word: "TAILOR",   hint: "A person who makes and alters clothing.",               category: "Trades" },
  { word: "DRILL",    hint: "A tool used to make holes in walls or hard surfaces.",  category: "Trades" },
  { word: "WRENCH",   hint: "A tool used to turn bolts and nuts.",                   category: "Trades" },
  { word: "SAFETY",   hint: "Rules and actions that keep workers protected at work.", category: "Trades" },
  { word: "PERMIT",   hint: "An official document that allows you to do a job.",     category: "Trades" },

  // ── Finance ───────────────────────────────────────────
  { word: "LOAN",     hint: "Money borrowed from a bank that must be paid back.",    category: "Finance" },
  { word: "TAX",      hint: "Money you must pay to the government from your income.", category: "Finance" },
  { word: "CASH",     hint: "Physical money in the form of coins and banknotes.",    category: "Finance" },
  { word: "COST",     hint: "The amount of money needed to buy or make something.",  category: "Finance" },
  { word: "BONUS",    hint: "Extra money given to an employee as a reward.",         category: "Finance" },
  { word: "CREDIT",   hint: "Money a bank allows you to use and pay back later.",    category: "Finance" },
  { word: "SAVINGS",  hint: "Money that you keep and do not spend.",                 category: "Finance" },
  { word: "EXPENSE",  hint: "Money spent as part of doing your job.",                category: "Finance" },
  { word: "INTEREST", hint: "Extra money charged by a bank when you borrow money.",  category: "Finance" },
  { word: "FUND",     hint: "An amount of money saved or collected for a purpose.",  category: "Finance" },

  // ── Retail ────────────────────────────────────────────
  { word: "PRICE",    hint: "The amount of money you pay to buy something.",         category: "Retail" },
  { word: "BRAND",    hint: "The name or logo that identifies a company's product.", category: "Retail" },
  { word: "STOCK",    hint: "The goods a store has available and ready to sell.",    category: "Retail" },
  { word: "SHELF",    hint: "A flat board in a store where products are displayed.", category: "Retail" },
  { word: "LABEL",    hint: "A small tag attached to a product with information.",   category: "Retail" },
  { word: "REFUND",   hint: "Money given back to a customer who returns an item.",   category: "Retail" },
  { word: "DISCOUNT", hint: "A reduction in the normal price of a product.",         category: "Retail" },
  { word: "PURCHASE", hint: "Something you buy; the act of buying something.",       category: "Retail" },
  { word: "SUPPLY",   hint: "The amount of a product available for people to buy.",  category: "Retail" },
  { word: "RETAIL",   hint: "The selling of goods directly to members of the public.", category: "Retail" },

  // ── Logistics ─────────────────────────────────────────
  { word: "CARGO",    hint: "Goods carried by a ship, plane, or large vehicle.",    category: "Logistics" },
  { word: "TRUCK",    hint: "A large vehicle used to transport and deliver goods.",  category: "Logistics" },
  { word: "SHIP",     hint: "A large vessel that carries goods across the sea.",     category: "Logistics" },
  { word: "LOAD",     hint: "Goods placed onto a vehicle for transport.",            category: "Logistics" },
  { word: "ROUTE",    hint: "The path taken to move goods from one place to another.", category: "Logistics" },
  { word: "CUSTOMS",  hint: "The official office at a border that checks goods.",   category: "Logistics" },
  { word: "TRANSIT",  hint: "The movement of goods from one place to another.",     category: "Logistics" },
  { word: "PACKAGE",  hint: "A box or wrapped parcel containing items to be sent.", category: "Logistics" },

  // ── Technology ────────────────────────────────────────
  { word: "DATA",     hint: "Information stored and processed by a computer.",      category: "Technology" },
  { word: "WIFI",     hint: "A wireless connection that lets devices use the internet.", category: "Technology" },
  { word: "SCAN",     hint: "To copy a document using a machine and save it digitally.", category: "Technology" },
  { word: "SYSTEM",   hint: "A group of programs that controls a computer or device.", category: "Technology" },
  { word: "WEBSITE",  hint: "A set of pages you can visit on the internet.",        category: "Technology" },
  { word: "SOFTWARE", hint: "Programs that make a computer do useful tasks.",        category: "Technology" },
  { word: "DATABASE", hint: "An organized place where large amounts of data is stored.", category: "Technology" },
  { word: "BACKUP",   hint: "A saved copy of data in case the original is lost.",   category: "Technology" },
  { word: "NETWORK",  hint: "A group of computers connected to share information.", category: "Technology" },
  { word: "PASSWORD", hint: "A secret word used to log in to a computer or account.", category: "Technology" },

  // ── Customer Service ──────────────────────────────────
  { word: "RETURN",   hint: "To bring a product back to the store for a refund.",   category: "Customer Service" },
  { word: "QUEUE",    hint: "A line of people waiting for their turn to be served.", category: "Customer Service" },
  { word: "REVIEW",   hint: "A written opinion about a product or service.",        category: "Customer Service" },
  { word: "SUPPORT",  hint: "Help given to customers who have a problem.",          category: "Customer Service" },
  { word: "FEEDBACK", hint: "Comments that tell you how good or bad something is.", category: "Customer Service" },
  { word: "ASSIST",   hint: "To help a customer with a question or problem.",       category: "Customer Service" },
  { word: "INQUIRY",  hint: "A question asked to get information about a product.", category: "Customer Service" },
  { word: "POLITE",   hint: "Being kind and respectful when speaking to customers.", category: "Customer Service" },
  { word: "GREET",    hint: "To welcome a customer when they arrive or contact you.", category: "Customer Service" },
  { word: "RESOLVE",  hint: "To fix or solve a customer's complaint or problem.",   category: "Customer Service" },
];

// ── Constants ─────────────────────────────────────────
const MAX_WRONG = 6;

const BODY_PART_IDS = [
  "h-head",
  "h-body",
  "h-arm-left",
  "h-arm-right",
  "h-leg-left",
  "h-leg-right",
];

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"],
];

// Win / Lose SVG icons (inline, no emojis)
const WIN_ICON_SVG = `
  <svg viewBox="0 0 36 36" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="16" stroke="#43a047" stroke-width="2.5" fill="#e8f5e9"/>
    <polyline points="10,19 16,25 26,13" stroke="#43a047" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const LOSE_ICON_SVG = `
  <svg viewBox="0 0 36 36" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="16" stroke="#e53935" stroke-width="2.5" fill="#ffebee"/>
    <line x1="12" y1="12" x2="24" y2="24" stroke="#e53935" stroke-width="3" stroke-linecap="round"/>
    <line x1="24" y1="12" x2="12" y2="24" stroke="#e53935" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

// ── State ─────────────────────────────────────────────
let currentWord     = "";
let currentHint     = "";
let currentCategory = "";
let guessedLetters  = new Set();
let wrongCount      = 0;
let gameActive      = false;
let wins            = 0;
let losses          = 0;

// ── DOM helpers ───────────────────────────────────────
const $ = (id) => document.getElementById(id);

// ── Initialise ────────────────────────────────────────
function init() {
  buildKeyboard();
  startNewGame();
  document.addEventListener("keydown", onKeyDown);
  $("btn-play-again").addEventListener("click", startNewGame);
}

// ── Build keyboard ────────────────────────────────────
function buildKeyboard() {
  const kb = $("keyboard");
  kb.innerHTML = "";
  KEYBOARD_ROWS.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "kb-row";
    row.forEach((letter) => {
      const btn = document.createElement("button");
      btn.className = "key-btn";
      btn.id = `key-${letter}`;
      btn.textContent = letter;
      btn.setAttribute("aria-label", `Letter ${letter}`);
      btn.addEventListener("click", () => handleGuess(letter));
      rowEl.appendChild(btn);
    });
    kb.appendChild(rowEl);
  });
}

// ── Start a new game ──────────────────────────────────
function startNewGame() {
  // Pick a random word (avoid repeating the current one if bank allows)
  let entry;
  do {
    entry = WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
  } while (entry.word === currentWord && WORD_BANK.length > 1);

  currentWord     = entry.word;
  currentHint     = entry.hint;
  currentCategory = entry.category;
  guessedLetters  = new Set();
  wrongCount      = 0;
  gameActive      = true;

  // Update info panel
  $("badge-category").textContent = currentCategory;
  $("hint-text").textContent      = currentHint;
  $("wrong-letters").innerHTML    = "";

  // Hide result overlay
  $("result-overlay").classList.add("hidden");

  // Reset hangman body parts
  BODY_PART_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("visible");
  });

  // Reset lives dots
  renderLivesDots();

  // Reset keyboard buttons
  document.querySelectorAll(".key-btn").forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });

  // Render blank word
  renderWord();
}

// ── Render word blanks ────────────────────────────────
function renderWord() {
  const display = $("word-display");
  display.innerHTML = "";
  [...currentWord].forEach((letter) => {
    const box = document.createElement("div");
    box.className = "letter-box";
    if (guessedLetters.has(letter)) {
      box.textContent = letter;
      box.classList.add("revealed");
    }
    display.appendChild(box);
  });
}

// ── Render lives dots ─────────────────────────────────
function renderLivesDots() {
  const container = $("lives-dots");
  container.innerHTML = "";
  for (let i = 0; i < MAX_WRONG; i++) {
    const dot = document.createElement("div");
    dot.className = "life-dot" + (i < wrongCount ? " lost" : "");
    container.appendChild(dot);
  }
}

// ── Handle a letter guess ─────────────────────────────
function handleGuess(letter) {
  if (!gameActive || guessedLetters.has(letter)) return;

  guessedLetters.add(letter);

  const btn = $(`key-${letter}`);
  if (btn) btn.disabled = true;

  if (currentWord.includes(letter)) {
    // Correct guess
    if (btn) btn.classList.add("correct");
    renderWord();
    if (isWordComplete()) {
      gameActive = false;
      wins++;
      updateScoreBoard();
      showResult("win");
    }
  } else {
    // Wrong guess
    if (btn) btn.classList.add("wrong");
    wrongCount++;

    // Reveal next body part
    const partId = BODY_PART_IDS[wrongCount - 1];
    const part = document.getElementById(partId);
    if (part) part.classList.add("visible");

    // Update lives dots
    renderLivesDots();

    // Add wrong chip
    const chip = document.createElement("span");
    chip.className = "wrong-chip";
    chip.textContent = letter;
    $("wrong-letters").appendChild(chip);

    // Check for loss
    if (wrongCount >= MAX_WRONG) {
      gameActive = false;
      losses++;
      updateScoreBoard();
      // Reveal the full word before showing result
      [...currentWord].forEach((l) => guessedLetters.add(l));
      renderWord();
      showResult("lose");
    }
  }
}

// ── Check if word is fully guessed ────────────────────
function isWordComplete() {
  return [...currentWord].every((letter) => guessedLetters.has(letter));
}

// ── Show result overlay ───────────────────────────────
function showResult(type) {
  const overlay  = $("result-overlay");
  const iconEl   = $("result-icon");
  const titleEl  = $("result-title");
  const msgEl    = $("result-msg");
  const wordEl   = $("result-word");

  if (type === "win") {
    iconEl.innerHTML   = WIN_ICON_SVG;
    iconEl.className   = "result-icon win";
    titleEl.textContent = "Well Done!";
    titleEl.className  = "win";
    msgEl.textContent  = "You guessed the word correctly!";
  } else {
    iconEl.innerHTML   = LOSE_ICON_SVG;
    iconEl.className   = "result-icon lose";
    titleEl.textContent = "Game Over";
    titleEl.className  = "lose";
    msgEl.textContent  = "Better luck next time!";
  }

  wordEl.textContent = `The word was: ${currentWord}`;
  overlay.classList.remove("hidden");
}

// ── Update score board in header ──────────────────────
function updateScoreBoard() {
  $("score-win").textContent  = wins;
  $("score-lose").textContent = losses;
}

// ── Physical keyboard support ─────────────────────────
function onKeyDown(e) {
  const letter = e.key.toUpperCase();
  if (/^[A-Z]$/.test(letter)) {
    handleGuess(letter);
  }
}

// ── Start ─────────────────────────────────────────────
init();
