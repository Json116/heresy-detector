// Mock API handler — cycles through 4 realistic test scenarios.
// callCount resets on server restart (documented behavior).
//
// Scenario 0: Arianism      — heresy, high confidence, all traditions = heresy
// Scenario 1: Arminianism   — caution, moderate, protestant = disputed, tradition_note
// Scenario 2: Orthodox      — no match, clean bill of health
// Scenario 3: Open Theism   — caution, low confidence, partial match

let callCount = 0

const scenarios = [
  {
    verdict: 'heresy',
    heresy_name: 'Arianism',
    confidence: 'high',
    explanation:
      'The statement reflects classic Arian theology, which holds that the Son of God is a created being subordinate to the Father rather than co-eternal and consubstantial. This was the central controversy addressed at the Council of Nicaea in 325 AD. The Nicene Creed was formulated precisely to refute this claim, affirming the Son as "God from God, Light from Light, true God from true God, begotten not made." Arianism remains one of the most clearly and universally condemned heresies in Christian history.',
    tradition_consensus: {
      catholic: 'heresy',
      eastern_orthodox: 'heresy',
      protestant: 'heresy'
    },
    tradition_note: null,
    related_heresies: ['Subordinationism', 'Adoptionism', 'Socinianism'],
    historical_note:
      'Arianism was championed by Arius of Alexandria (c.256–336) and spread rapidly through the Roman Empire. At one point the majority of Eastern bishops were Arian. The controversy prompted Emperor Constantine to convene the Council of Nicaea (325), which produced the Nicene Creed.'
  },
  {
    verdict: 'caution',
    heresy_name: 'Arminianism',
    confidence: 'moderate',
    explanation:
      'The statement aligns with Arminian soteriology, which holds that God\'s election is conditioned on foreknown faith and that humans can resist or lose saving grace. The Synod of Dort (1618–19) condemned Arminianism from a Calvinist perspective, producing the TULIP doctrines in opposition. However, Arminianism is not universally considered heresy — it is broadly compatible with Catholic and Eastern Orthodox soteriology and represents the majority view among Methodists, Wesleyans, and many Baptists.',
    tradition_consensus: {
      catholic: 'orthodox',
      eastern_orthodox: 'orthodox',
      protestant: 'disputed'
    },
    tradition_note:
      'This position is disputed within Protestantism — condemned by Calvinist/Reformed traditions at the Synod of Dort, but accepted as orthodox by Methodist, Wesleyan, Arminian Baptist, and Pentecostal traditions. Catholic and Orthodox Christianity share much common ground with Arminian soteriology.',
    related_heresies: ['Semi-Pelagianism', 'Pelagianism', 'Open Theism'],
    historical_note:
      'Jacobus Arminius (1560–1609) developed his theology in reaction to strict Calvinist predestinarianism. His followers (the Remonstrants) presented five points to the Dutch States-General in 1610, prompting the Synod of Dort\'s formal Calvinist response.'
  },
  {
    verdict: 'orthodox',
    heresy_name: null,
    confidence: 'high',
    explanation:
      'The statement falls within the bounds of orthodox Christian theology and does not map to any recognized heresy in our database. The claim is consistent with historic creedal Christianity as affirmed by the Apostles\' Creed, Nicene Creed, and the ecumenical councils. While individual theologians may debate nuances of phrasing, the core substance of the statement is well within the mainstream of Catholic, Eastern Orthodox, and Protestant teaching.',
    tradition_consensus: {
      catholic: 'orthodox',
      eastern_orthodox: 'orthodox',
      protestant: 'orthodox'
    },
    tradition_note: null,
    related_heresies: [],
    historical_note: null
  },
  {
    verdict: 'caution',
    heresy_name: 'Open Theism',
    confidence: 'low',
    explanation:
      'The statement contains elements that may reflect Open Theist assumptions about divine knowledge and human freedom. Open Theism holds that God does not have exhaustive foreknowledge of future free choices, as this would undermine genuine libertarian freedom. While some evangelical theologians defend this position, it conflicts with classical theism\'s understanding of divine omniscience and timelessness as held by Catholic, Orthodox, and most Protestant traditions. The confidence is low because the statement could be interpreted in ways compatible with classical theism.',
    tradition_consensus: {
      catholic: 'heresy',
      eastern_orthodox: 'heresy',
      protestant: 'disputed'
    },
    tradition_note:
      'Open Theism is contested within Protestant evangelicalism — rejected by Reformed and many evangelical bodies, but defended by theologians like Greg Boyd and Clark Pinnock. Catholic and Orthodox traditions, rooted in classical divine simplicity and immutability, reject it more firmly.',
    related_heresies: ['Socinianism', 'Arminianism'],
    historical_note:
      'Open Theism emerged as a distinct theological position in the late 20th century, most notably through the work of Clark Pinnock, John Sanders, and Greg Boyd. The Evangelical Theological Society debated membership of open theists in 2001–2003.'
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
