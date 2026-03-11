// Mock API handler — cycles through 4 realistic test scenarios.
// callCount resets on server restart (documented behavior).
//
// Scenario 0: Arianism      — heresy, high confidence, all traditions = heresy
// Scenario 1: Arminianism   — caution, moderate, protestant = disputed
// Scenario 2: Orthodox      — no match, clean bill of health
// Scenario 3: Open Theism   — caution, low confidence, ambiguous readings

let callCount = 0

const scenarios = [
  // ── Scenario 0: Arianism ────────────────────────────────────────────────────
  {
    verdict: 'heresy',
    confidence: 'high',
    primary_match: {
      id: 'arianism',
      name: 'Arianism',
      period: '4th century',
      consensus: {
        catholic: 'heresy',
        eastern_orthodox: 'heresy',
        protestant: 'heresy'
      },
      council_condemnation: 'Council of Nicaea (325)',
      tradition_notes: null
    },
    explanation: {
      what_the_statement_claims:
        'The statement holds that the Son of God is a created being, subordinate to and distinct in essence from the Father.',
      why_it_matches:
        'This directly matches the core Arian fingerprint: denying the eternal co-equality of the Son with the Father. Arius taught that the Son had a beginning — "there was a time when he was not" — and that he is not truly God but the highest of God\'s creatures. The statement maps precisely onto this claim.',
      historical_context:
        'Arianism was championed by Arius of Alexandria (c.256–336) and spread rapidly through the Roman Empire, attracting many Eastern bishops. The controversy prompted Emperor Constantine to convene the Council of Nicaea in 325, which produced the Nicene Creed.',
      why_condemned:
        'Arianism undermines the doctrine of salvation: if the Son is not fully God, the Incarnation cannot achieve what Christian theology claims — the union of humanity with divinity. A created mediator cannot redeem; only God himself can save. It also collapses Trinitarian theology into a form of polytheism or hierarchical semi-theism.',
      orthodox_alternative:
        'The Nicene Creed affirms the Son as "God from God, Light from Light, true God from true God, begotten not made, of one substance (homoousios) with the Father." The Son is eternally generated, not created — fully divine, co-equal and co-eternal with the Father.',
      scripture_reference: 'John 1:1 — "In the beginning was the Word, and the Word was with God, and the Word was God."',
      council_reference: 'Condemned at the Council of Nicaea (325)'
    },
    ambiguous_readings: [],
    secondary_matches: [
      {
        id: 'subordinationism',
        name: 'Subordinationism',
        brief_note: 'Arianism is the most extreme form of subordinationism, denying the Son\'s co-equality with the Father in being, not merely in role.'
      },
      {
        id: 'adoptionism',
        name: 'Adoptionism',
        brief_note: 'Both heresies deny the eternal pre-existent divinity of the Son, though Adoptionism locates the problem at the Incarnation rather than in eternal generation.'
      }
    ],
    display_verdict: '🔴 Heresy'
  },

  // ── Scenario 1: Arminianism ──────────────────────────────────────────────────
  {
    verdict: 'caution',
    confidence: 'moderate',
    primary_match: {
      id: 'arminianism',
      name: 'Arminianism',
      period: '17th century',
      consensus: {
        catholic: 'orthodox',
        eastern_orthodox: 'orthodox',
        protestant: 'disputed'
      },
      council_condemnation: 'Synod of Dort (1618–19) — Calvinist condemnation only',
      tradition_notes:
        'This position is disputed within Protestantism — condemned by Calvinist and Reformed traditions at the Synod of Dort, but accepted as orthodox by Methodist, Wesleyan, Arminian Baptist, and Pentecostal traditions. Catholic and Eastern Orthodox Christianity share significant common ground with Arminian soteriology and do not consider it heterodox.'
    },
    explanation: {
      what_the_statement_claims:
        'The statement suggests that God\'s election of individuals to salvation is conditioned on his foreknowledge of their free faith-response, and that saving grace can be resisted or lost.',
      why_it_matches:
        'This aligns with the classic Arminian position: that election is conditional (based on foreseen faith), that Christ\'s atonement is universal in scope, that grace is resistible, and that believers can fall from grace. These are precisely the five points the Synod of Dort addressed and condemned from a Calvinist perspective.',
      historical_context:
        'Jacobus Arminius (1560–1609) developed his theology in reaction to strict Calvinist predestinarianism in the Dutch Reformed church. His followers (the Remonstrants) presented five points to the Dutch States-General in 1610, prompting the Synod of Dort\'s formal Calvinist response in 1618–19.',
      why_condemned:
        'From a Calvinist perspective, Arminianism compromises the sovereignty of God in salvation and introduces a works-based element — the foreseen act of faith — as the basis of election, making salvation ultimately dependent on human decision rather than divine grace alone.',
      orthodox_alternative:
        'Reformed theology affirms unconditional election, limited atonement, irresistible grace, and the perseverance of the saints (TULIP). However, the majority of global Christianity — including Catholic, Orthodox, Methodist, and Pentecostal traditions — holds a broadly synergistic view of salvation compatible with Arminianism.',
      scripture_reference: '1 Timothy 2:4 — "God desires all people to be saved and to come to the knowledge of the truth."',
      council_reference: 'Condemned by Calvinist tradition at the Synod of Dort (1618–19); not condemned by Catholic or Orthodox councils'
    },
    ambiguous_readings: [],
    secondary_matches: [
      {
        id: 'semi-pelagianism',
        name: 'Semi-Pelagianism',
        brief_note: 'Critics allege Arminianism resembles Semi-Pelagianism in grounding election in foreseen human response, though Arminians reject this charge and affirm prevenient grace.'
      },
      {
        id: 'open-theism',
        name: 'Open Theism',
        brief_note: 'Open Theism takes the Arminian emphasis on human freedom further, denying exhaustive divine foreknowledge — a step most Arminians explicitly reject.'
      }
    ],
    display_verdict: '🟡 Caution'
  },

  // ── Scenario 2: Orthodox ─────────────────────────────────────────────────────
  {
    verdict: 'orthodox',
    confidence: 'high',
    primary_match: {
      id: null,
      name: null,
      period: null,
      consensus: {
        catholic: 'orthodox',
        eastern_orthodox: 'orthodox',
        protestant: 'orthodox'
      },
      council_condemnation: null,
      tradition_notes: null
    },
    explanation: {
      what_the_statement_claims:
        'The statement affirms a core doctrine of historic Christian theology without apparent deviation from creedal norms.',
      why_it_matches:
        'No match found against known heresy fingerprints in the database. The statement is consistent with the historic faith as summarised in the Apostles\' Creed and Nicene Creed. While individual theologians may debate fine points of phrasing, the core substance falls within the broad mainstream of Christian orthodoxy.',
      historical_context:
        'The statement reflects received Christian teaching rather than a deviation from it. The great ecumenical councils — Nicaea, Constantinople, Ephesus, Chalcedon — defined the boundaries of orthodoxy in response to specific heresies, and this statement does not approach those boundaries.',
      why_condemned: null,
      orthodox_alternative: null,
      scripture_reference: null,
      council_reference: null
    },
    ambiguous_readings: [],
    secondary_matches: [],
    display_verdict: '🟢 Orthodox'
  },

  // ── Scenario 3: Open Theism ──────────────────────────────────────────────────
  {
    verdict: 'caution',
    confidence: 'low',
    primary_match: {
      id: 'open-theism',
      name: 'Open Theism',
      period: 'Late 20th century',
      consensus: {
        catholic: 'heresy',
        eastern_orthodox: 'heresy',
        protestant: 'disputed'
      },
      council_condemnation: null,
      tradition_notes:
        'Open Theism is contested within Protestant evangelicalism — rejected by Reformed and many conservative evangelical bodies (the Evangelical Theological Society debated expelling open theists in 2001–03), but defended by theologians including Greg Boyd, Clark Pinnock, and John Sanders. Catholic and Eastern Orthodox traditions, rooted in classical divine simplicity, immutability, and timelessness, reject it more firmly as incompatible with classical theism.'
    },
    explanation: {
      what_the_statement_claims:
        'The statement suggests that God does not have exhaustive foreknowledge of future free human choices, in order to preserve the reality of human libertarian freedom.',
      why_it_matches:
        'This partially echoes the Open Theist position, which holds that God\'s knowledge of the future is limited to what is knowable — that genuinely free future choices are not yet determined and therefore not foreknowable even by God. The match is low-confidence because the statement could also be read as addressing only the economic Trinity (how God acts in history) rather than making a claim about divine nature.',
      historical_context:
        'Open Theism emerged as a distinct theological position in the late 20th century through the work of Clark Pinnock, John Sanders, and Greg Boyd. It draws partly on earlier Arminian and Socinian currents, but represents a more radical departure from classical theism than traditional Arminianism.',
      why_condemned:
        'Classical theism — shared by Catholic, Orthodox, and most Protestant traditions — holds that God is eternal and timeless, knowing all things including free future acts by a single eternal act of knowledge. Open Theism is seen as compromising divine omniscience, immutability, and sovereignty, and potentially the reliability of prophetic Scripture.',
      orthodox_alternative:
        'Classical theism affirms that God knows all things — past, present, and future — by his eternal, simple act of knowing. This foreknowledge does not coerce human freedom; the two are held in tension within the tradition. Middle Knowledge (Molinism) offers one reconciling framework; divine timelessness offers another.',
      scripture_reference: 'Isaiah 46:10 — "I make known the end from the beginning, from ancient times, what is still to come."',
      council_reference: null
    },
    ambiguous_readings: [
      {
        reading: 'orthodox',
        description:
          'The statement may be reflecting on the genuine mystery of divine-human interaction in prayer or providence — language about God "responding" or "being surprised" is sometimes used in Scripture without implying a literal limitation on omniscience (anthropopathism). Under this reading, the statement is a pastoral or devotional claim, not a metaphysical one.'
      },
      {
        reading: 'heretical',
        description:
          'If the statement is taken as a straightforward metaphysical claim — that God genuinely lacks foreknowledge of future free choices — it aligns with Open Theism\'s denial of exhaustive divine foreknowledge, which conflicts with classical theism as taught by Catholic, Orthodox, and most Protestant traditions.'
      }
    ],
    secondary_matches: [
      {
        id: 'socinianism',
        name: 'Socinianism',
        brief_note: 'The Socinians (16th–17th century) anticipated Open Theism\'s denial of foreknowledge; Open Theism is sometimes described as a modern revival of Socinian themes on divine knowledge.'
      }
    ],
    display_verdict: '🟡 Caution'
  }
]

export async function mockCheck(_statement) {
  const scenario = scenarios[callCount % scenarios.length]
  callCount++

  // Simulate network/processing delay
  const delay = 1500 + Math.random() * 500
  await new Promise(resolve => setTimeout(resolve, delay))

  return scenario
}
