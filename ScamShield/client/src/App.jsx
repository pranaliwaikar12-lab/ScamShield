
import { useState } from "react";
import {
  ShieldCheck, Search, BookOpen, Brain, Phone,
  Menu, X, AlertTriangle, Lock, CheckCircle,
  ArrowRight, ShieldAlert, Globe
} from "lucide-react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Home");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [report, setReport] = useState("");

  const navItems = [
    "Home", "Scam Checker", "Awareness", "Quiz", "Report Scam"
  ];

  function checkScam() {
    if (!message.trim()) {
      setResult("Please enter a message first.");
      return;
    }

    const words = [
      "otp", "urgent", "winner", "prize", "password",
      "click here", "bank blocked", "send money",
      "verify account", "refund"
    ];

    const found = words.filter(word =>
      message.toLowerCase().includes(word)
    );

    if (found.length >= 2) {
      setResult("High Risk: Multiple scam warning signs detected.");
    } else if (found.length === 1) {
      setResult("Suspicious: A possible scam warning sign was detected.");
    } else {
      setResult("No common warning signs detected. This does not guarantee safety.");
    }
  }

  const questions = [
    {
      q: "Should you share your OTP with anyone?",
      options: ["Yes", "No", "Only with friends", "Only with bank employees"],
      correct: "No"
    },
    {
      q: "What should you do with a suspicious link?",
      options: ["Click it", "Forward it", "Avoid clicking it", "Enter your details"],
      correct: "Avoid clicking it"
    },
    {
      q: "Is a job offer asking for registration fees always genuine?",
      options: ["Yes", "No", "Pay immediately", "Share your bank details"],
      correct: "No"
    },
    {
      q: "Which is the strongest password choice?",
      options: [
        "123456",
        "password",
        "A long, unique password with letters, numbers and symbols",
        "Your name and birth year"
      ],
      correct: "A long, unique password with letters, numbers and symbols"
    },
    {
      q: "What should you do if you receive a suspicious bank call?",
      options: [
        "Share your account details",
        "Disconnect and contact your bank using its official number",
        "Share your OTP",
        "Follow every instruction"
      ],
      correct: "Disconnect and contact your bank using its official number"
    },
    {
      q: "What does phishing mean?",
      options: [
        "Online shopping",
        "Stealing information through deceptive messages or websites",
        "Playing online games",
        "Updating software"
      ],
      correct: "Stealing information through deceptive messages or websites"
    },
    {
      q: "What should you check before making an online payment?",
      options: [
        "The receiver's name and payment details",
        "Only the colour of the payment screen",
        "Nothing; every request is safe",
        "Whether a stranger says it is urgent"
      ],
      correct: "The receiver's name and payment details"
    },
    {
      q: "What is the national helpline number for reporting cyber financial fraud in India?",
      options: ["100", "101", "1930", "108"],
      correct: "1930"
    },
    {
      q: "Why should you enable two-factor authentication?",
      options: [
        "To make passwords shorter",
        "To add an extra layer of account security",
        "To share accounts",
        "To remove account protection"
      ],
      correct: "To add an extra layer of account security"
    },
    {
      q: "What should you do if you become a victim of online financial fraud?",
      options: [
        "Wait several days",
        "Delete all messages",
        "Contact your bank immediately and report it to 1930",
        "Ignore the transaction"
      ],
      correct: "Contact your bank immediately and report it to 1930"
    }
  ];
  function submitQuiz() {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all 10 questions first.");
      return;
    }

    let totalScore = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        totalScore++;
      }
    });

    setScore(totalScore);
  }

  function handleReport(e) {
    e.preventDefault();
    alert("Your report has been recorded for this demo.");
    setReport("");
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={() => setPage("Home")}>
          <ShieldCheck size={32} />
          <span>Scam<span className="blue">Shield</span></span>
        </div>

        <button className="menu-btn"
          onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          {navItems.map(item => (
            <button
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => {
                setPage(item);
                setMobileMenu(false);
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {page === "Home" && (
        <>
          <section className="hero">
            <div className="hero-text">
              <span className="tag">YOUR DIGITAL SAFETY PARTNER</span>
              <h1>Stay Safe in the <span>Digital World.</span></h1>
              <p>
                Protect yourself from online scams, phishing attacks
                and digital fraud. Learn, check and stay protected
                with ScamShield.
              </p>
              <button className="primary-btn"
                onClick={() => setPage("Scam Checker")}>
                Check a Scam <ArrowRight size={18} />
              </button>
            </div>

            <div className="hero-icon">
              <ShieldCheck size={170} strokeWidth={1.2} />
              <div className="floating-card">
                <CheckCircle color="#16A36A" />
                <span>Stay Protected Online</span>
              </div>
            </div>
          </section>

          <section className="stats">
            <div><ShieldCheck /><h3>Stay Safe</h3><p>Protect your identity</p></div>
            <div><Lock /><h3>Secure Data</h3><p>Protect personal details</p></div>
            <div><Globe /><h3>Digital Awareness</h3><p>Learn online safety</p></div>
          </section>

          <section className="section">
            <div className="section-heading">
              <span>OUR SERVICES</span>
              <h2>Explore ScamShield</h2>
              <p>Everything you need to stay safe online.</p>
            </div>

            <div className="feature-grid">
              <Feature icon={<Search />} title="Scam Checker"
                desc="Check suspicious messages and identify warning signs."
                click={() => setPage("Scam Checker")} />
              <Feature icon={<BookOpen />} title="Scam Awareness"
                desc="Learn about common online scams and fraud."
                click={() => setPage("Awareness")} />
              <Feature icon={<Brain />} title="Cyber Safety Quiz"
                desc="Test your knowledge with interactive questions."
                click={() => setPage("Quiz")} />
              <Feature icon={<Phone />} title="Report a Scam"
                desc="Learn how to report online fraud."
                click={() => setPage("Report Scam")} />
            </div>
          </section>

          <section className="safety-banner">
            <ShieldAlert size={42} />
            <div>
              <h2>Think Before You Click!</h2>
              <p>Never share your OTP, PIN or banking password with anyone.</p>
            </div>
          </section>
        </>
      )}

      {page === "Scam Checker" && (
        <section className="page-section">
          <h1>Scam Checker</h1>
          <p>Check a suspicious SMS, email or message for common warning signs.</p>
          <div className="checker-box">
            <label>Enter your suspicious message</label>
            <textarea
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                setResult("");
              }}
              placeholder="Paste your suspicious message here..."
            />
            <button className="primary-btn" onClick={checkScam}>
              <Search size={18} /> Check Message
            </button>
            {result && <div className="result">{result}</div>}
            <p className="note">Demo checker only. Never enter real OTPs, passwords or banking details.</p>
          </div>
        </section>
      )}

      {page === "Awareness" && (
        <section className="page-section">
          <h1>Scam Awareness</h1>
          <p>Learn about common types of online fraud.</p>
          <div className="feature-grid">
            <Feature icon={<Phone />} title="UPI Scams"
              desc="Never enter your UPI PIN to receive money. Verify every collect request." />
            <Feature icon={<AlertTriangle />} title="Fake Job Offers"
              desc="Be careful with jobs asking for registration or interview fees." />
            <Feature icon={<Lock />} title="Phishing Attacks"
              desc="Avoid unknown links asking for personal or banking information." />
            <Feature icon={<ShieldAlert />} title="Bank KYC Scams"
              desc="Verify bank messages using official bank websites or apps." />
            <Feature icon={<Globe />} title="Fake Shopping"
              desc="Check seller details and reviews before making online payments." />
            <Feature icon={<Brain />} title="Lottery Scams"
              desc="Do not pay fees to claim unexpected prizes or lottery winnings." />
          </div>
        </section>
      )}

      {page === "Quiz" && (
        <section className="page-section">
          <h1>Cyber Safety Quiz</h1>
          <p>Test your knowledge about internet safety.</p>

          <div className="checker-box">
            <h2>Cyber Safety Challenge</h2>
            <p className="note">
              Total Questions: 10 | Each Question: 1 Mark
            </p>

            {questions.map((question, index) => (
              <div key={index} style={{ marginBottom: "30px" }}>
                <h3>
                  {index + 1}. {question.q}
                </h3>

                {question.options.map(option => (
                  <label className="option" key={option}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => {
                        setAnswers(previous => ({
                          ...previous,
                          [index]: option
                        }));
                        setScore(null);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}

            <button className="primary-btn" onClick={submitQuiz}>
              Submit Quiz
            </button>

            {score !== null && (
              <div className="result" aria-live="polite">
                <h2>Your Quiz Result</h2>
                <h1>{score} / 10</h1>
                <h3>
                  {score === 10
                    ? "Excellent! You are a Cyber Safety Champion!"
                    : score >= 7
                    ? "Great job! You have good cyber safety knowledge."
                    : score >= 4
                    ? "Good effort! Keep learning about cyber safety."
                    : "Keep practising! Learn more about online safety."}
                </h3>
                <p>Correct Answers: {score}</p>
                <p>Incorrect Answers: {10 - score}</p>
              </div>
            )}

            <p className="note">
              Remember: Never share your OTP, PIN or banking password.
            </p>
          </div>
        </section>
      )}

      {page === "Report Scam" && (
        <section className="page-section">
          <h1>Report a Scam</h1>
          <p>Learn how to respond if you experience online fraud.</p>
          <div className="checker-box">
            <h3>Important steps</h3>
            <ul className="report-list">
              <li>Stop communicating with the suspected scammer.</li>
              <li>Save screenshots, messages and transaction details.</li>
              <li>Contact your bank immediately if money is lost.</li>
              <li>Report financial cyber fraud by calling 1930 in India.</li>
              <li>Visit the official cybercrime reporting portal.</li>
            </ul>
            <a className="portal-link"
              href="https://cybercrime.gov.in/"
              target="_blank" rel="noreferrer">
              Visit Cyber Crime Portal <ArrowRight size={16} />
            </a>

            <hr />
            <h3>Submit a demo report</h3>
            <form onSubmit={handleReport}>
              <textarea value={report}
                onChange={e => setReport(e.target.value)}
                placeholder="Describe the suspected scam..."
                required />
              <button className="primary-btn">Submit Report</button>
            </form>
            <p className="note">Demo only: this form does not send or save reports yet.</p>
          </div>
        </section>
      )}

      <footer>
        <div className="logo">
          <ShieldCheck size={27} />
          Scam<span className="blue">Shield</span>
        </div>
        <p>Creating a safer digital community, one click at a time.</p>
        <p>© 2026 ScamShield | CEP Project</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc, click }) {
  return (
    <div className="feature-card" onClick={click}>
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {click && <span className="learn">Explore <ArrowRight size={15} /></span>}
    </div>
  );
}

export default App;
