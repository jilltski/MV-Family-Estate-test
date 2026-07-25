// MV Family — ledger-derived data
// Source: MV_Master_Room_Ledger.xlsx (Rooms + Seats tabs)
// Structure matches the reusable Estate template schema.

window.MV_FAMILY = {
  id: 'mv',
  name: 'MV Family',
  subtitle: 'Martín Villar · Governance Architecture',

  // ── THE HOUSE — ordered top-to-bottom ──
  // Each level: id, label (short, appears on side strip), name (full),
  //             color palette, and rooms[]. Rooms have widths that sum to 12 (grid units).
  house: {
    title: 'The House',
    subtitle: 'Family Governance & Ownership',
    levels: [
      {
        id: 'PH',
        label: 'Penthouse',
        name: 'Master Ownership',
        qualification: 'Election or Family Office Qualification',
        palette: {
          strip: '#BF5129',        // terracotta strip
          stripText: '#FFFBF5',
          roomBg: '#FAE9DD',       // lighter blush
          roomBgAlt: '#F7E2D4',
          categoryText: '#8B2210'  // darker terra for category eyebrow
        },
        rooms: [
          {
            id: 'PH-01',
            category: 'MV Ownership Decisions',
            name: 'MV Master Trust Technical Committee',
            generations: ['G1','G2','G3'],
            width: 4,
          },
          {
            id: 'PH-02',
            category: 'MV Soriana Branch Decisions',
            name: 'Adaltiora Trust',
            generations: ['G1','G2'],
            width: 4,
          },
          {
            id: 'PH-03',
            category: 'MB Soriana Ownership Decisions',
            name: 'HSBC Trust Technical Committee',
            generations: ['G1','G2'],
            width: 4,
          },
        ]
      },
      {
        id: 'L3',
        label: 'Level 3',
        name: 'Ownership Decision Making',
        qualification: 'G2 Trusts Qualifications',
        palette: {
          strip: '#ACC0CF',
          stripText: '#002848',
          roomBg: '#DAE4EC',
          roomBgAlt: '#CED9E2',
          categoryText: '#002848'
        },
        rooms: [
          {
            id: 'L3-01',
            category: 'Branch Vote · Ownership Decision Making',
            name: 'G2 Family Trusts Technical Committees',
            subName: 'Four branch committees (FJMV · JCMV · MCMV · LMMV)',
            generations: ['G2','G3'],
            width: 12,
          },
        ]
      },
      {
        id: 'L2',
        label: 'Level 2',
        name: 'Ownership Participation',
        qualification: 'Birthright',
        palette: {
          strip: '#BC9F68',
          stripText: '#FFFBF5',
          roomBg: '#EFE6D0',
          roomBgAlt: '#E8DCB8',
          categoryText: '#6B5731'
        },
        rooms: [
          {
            id: 'L2-01',
            category: 'Ownership Participation · Distributions',
            name: 'Trust Beneficiaries',
            subName: 'MV Master Trust & G2 Family Trusts',
            generations: ['G1','G2','G3'],
            width: 12,
          },
        ]
      },
      {
        id: 'L1',
        label: 'Level 1',
        name: 'Family Governance',
        qualification: 'Family Membership 16+',
        palette: {
          strip: '#002848',
          stripText: '#FFFBF5',
          roomBg: '#DDE3EA',       // light navy tint — ~15% navy on white, distinct from L2 gold and L3 blue
          roomBgAlt: '#CED6E0',
          categoryText: '#002848'
        },
        rooms: [
          {
            id: 'L1-01',
            category: 'Communication and Planning',
            name: 'Family Council',
            generations: ['G1','G2'],
            width: 6,
          },
          {
            id: 'L1-02',
            category: 'Connection and Transparency',
            name: 'Family Assembly',
            generations: ['G1','G2','IL','G3'],
            width: 6,
          },
        ]
      },
      {
        id: 'GF',
        label: 'Ground Floor',
        name: 'Capacity Building',
        qualification: 'Capacity Building Floor — Welcome to all',
        palette: {
          strip: '#DBCFB6',
          stripText: '#002848',
          roomBg: '#F5EFDF',
          roomBgAlt: '#EEE5CC',
          categoryText: '#6B5731'
        },
        rooms: [
          {
            id: 'GF-01',
            category: 'Governance',
            name: 'Advisory Board',
            generations: ['G1'],
            width: 2,
          },
          {
            id: 'GF-02',
            category: 'Team Leadership',
            name: 'G2 Lionheart Team',
            generations: ['G2'],
            width: 2,
          },
          {
            id: 'GF-03',
            category: 'Coaching',
            name: '1-1 Coaching',
            generations: ['G1','G2','G3','IL'],
            width: 2,
          },
          {
            id: 'GF-04',
            category: '',
            name: 'Well-being Coaching',
            generations: ['G1','G2','G3','IL'],
            width: 2,
          },
          {
            id: 'GF-05',
            category: 'Development',
            name: 'G3 Programs',
            generations: ['G3'],
            width: 2,
          },
          {
            id: 'GF-06',
            category: '',
            name: 'Committee Qualification',
            status: 'Under Construction',
            generations: ['G3'],
            width: 2,
          },
        ]
      },
    ],
    foundation: {
      label: 'The Foundation',
      text: 'Family Agreements (the Why)',
      roomId: 'FDN-01',
    }
  },

  // ── THE ESTATE — garden, annex, gateway, ops ──
  estate: {
    title: 'The Estate',
    subtitle: 'The House and its Grounds',
    buildings: {
      garden: {
        name: 'Garden',
        subtitle: 'Well-being & Life',
        accentColor: '#8FAE8F',
        description: 'A dedicated space on the estate grounds for personal well-being, life design, and individual flourishing.',
        rooms: [
          {
            category: 'Personal Flourishing',
            name: 'Well-being & Life Design',
            rows: [
              {label:'Function', value:'Individual and family well-being programs, life design workshops, creative expression, and personal development.'},
              {label:'Access', value:'All family members. No qualification required.'},
              {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span> <span class="gen-badge gen-g3">G3</span> <span class="gen-badge gen-il">IL</span> Everyone'}
            ]
          }
        ]
      },
      annex: {
        name: 'Annex',
        subtitle: 'Corporate Governance',
        accentColor: '#004076',
        description: 'Separate from the main house. The Annex holds the corporate boards and oversight committees of the enterprise. Corporate rooms carry legal fiduciary duties and require formal qualification.',
        rooms: [] // populated from ANX rooms below
      },
      gateway: {
        name: 'Family Office',
        subtitle: 'The Gateway',
        accentColor: '#BC9F68',
        description: 'The connective tissue between the family estate and the operational world. Both a service and a threshold — you pass through it to reach the operating businesses.',
        rooms: [
          {
            category: 'Operating Initiative',
            name: 'MV Family Office',
            rows: [
              {label:'Function', value:'Coordinates governance services, family services, wealth management oversight, advisor relationships, and next-generation programs.'},
              {label:'Authority', value:'Execution authority within defined owner mandate. Does not replace owner decision-making.'},
              {label:'Leader', value:'Family Office Director / Corporate Secretary (combined role)'},
              {label:'Reports To', value:'Family Council (governance mandate) · Technical Committee (ownership mandate)'}
            ]
          }
        ]
      },
      ops: {
        name: 'Operational Building',
        subtitle: 'Operating Initiatives',
        accentColor: '#DE8870',
        description: 'Beyond the gate. The operating businesses and investments of the family enterprise, each with its own leadership and accountability.',
        rooms: [
          {
            category: 'Retail Enterprise',
            name: 'Innovasport',
            rows: [
              {label:'Function', value:'Core operating retail business. Full commercial operations with professional management.'},
              {label:'Authority', value:'Operational authority under Innovasport Board of Directors (Annex).'},
              {label:'Leadership', value:'JCMV — CEO · Executive team'}
            ]
          },
          {
            category: 'Investment Holding',
            name: 'Soriana (via Adaltiora / HSBC Trust)',
            rows: [
              {label:'Function', value:'MV family shareholding in Soriana, held through Adaltiora Trust and HSBC Trust structures.'},
              {label:'Authority', value:'Soriana Board of Directors; MV representation via Adaltiora (Penthouse).'}
            ]
          },
          {
            category: 'Investment Strategy',
            name: 'Organización Marbrin',
            rows: [
              {label:'Function', value:'Family wealth investment vehicle. Investment strategy and deployment.'},
              {label:'Oversight', value:'Marbrin Investment Board (Annex) provides non-binding recommendations.'}
            ]
          },
        ]
      }
    }
  },

  // ── ROOM DETAIL (full content for slide-up panel) ──
  // Keyed by Room_ID for easy lookup.
  roomDetails: {
    'PH-01': {
      badge: 'Penthouse · Ownership Decisions',
      badgeColor: '#BF5129',
      title: 'MV Master Trust Technical Committee',
      subtitle: 'Ultimate decision-making body over the consolidated family patrimony. Exists because the consolidated patrimony requires a governance body with the legal authority to protect, manage, and steward it across generations.',
      rows: [
        {label:'Function', value:'Manages, invests, and distributes assets held in the MV Master Family Trust (Fideicomiso de Administración No. 5531, Invex). Makes ultimate ownership decisions over the rights and responsibilities of the Master Trust as shareholder of MV companies and initiatives.'},
        {label:'Agreement', value:'MV Master Family Trust (Fideicomiso No. 5531, Invex) · Protocolo Familiar MV'},
        {label:'Authority', value:'Peer-to-peer accountability per trust terms. G1 50/50 voting; quality vote on tie by active Original Settlor (FJMB while alive, then MCVML). Tiebreaker Committee activates only after 3rd session deadlock among G2.'},
        {label:'Access', value:'G1 (voting, current). G2 voice without vote now; 25% voting rights each on G1 succession. G3 ≥18 invited as observers.'},
        {label:'How Access Gained', value:'MV vote · Election · Family Office Qualification · Eligibility Criteria (30+ yrs / master\'s / 2 yrs non-family employer / Spanish+English / Career and Training Plan complete)'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> FJMB and MCVML — Voting Members (50/50)<br><span class="gen-badge gen-g2">G2</span> All G2 — Voice without vote (current)<br><span class="gen-badge gen-g3">G3</span> G3 ≥18 — Observer status'},
        {label:'Meeting Rhythm', value:'Once or twice per year · Post-fiscal closing and pre-shareholders\' meeting mandatory'},
        {label:'Leader', value:'FJMB and MCVML (co-chairs, 50/50 vote)'},
        {label:'Support', value:'Family Office · Legal and financial advisors · Corporate Secretary'}
      ]
    },
    'PH-02': {
      badge: 'Penthouse · Soriana Branch',
      badgeColor: '#BF5129',
      title: 'Adaltiora Trust',
      subtitle: 'Governance body for the MV family\'s Soriana shareholding through the Adaltiora structure. Protects ownership position independent of any single individual\'s capacity or presence.',
      rows: [
        {label:'Function', value:'Represents MV Family interests in Soriana (as beneficiary of the Soriana Master Trust / Orsosa). Takes key decisions on management, investing, and distribution of assets held in trust.'},
        {label:'Agreement', value:'Adaltiora Trust deed · Soriana Master Trust (Orsosa) · Protocolo Familiar MV'},
        {label:'Authority', value:'Highest fiduciary duty standard per trust document. Protector holds ultimate governance authority over Soriana representation. A&R may voluntarily relinquish powers via written instrument to Trustee (Section 5.5).'},
        {label:'Access', value:'Restricted by trust document and named role appointments'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> FJMB — Protector and Appointer/Remover<br><span class="gen-badge gen-g2">G2</span> FJMV (Paco) — Investment Advisor<br><span class="gen-badge gen-g2">G2</span> All G2 — Successor beneficiaries'},
        {label:'Meeting Rhythm', value:'As required — Protector Committee holds ≥1 documented session per year'},
        {label:'Leader', value:'FJMB — Protector and Appointer/Remover'},
        {label:'Support', value:'Trustee (JTC) · Legal counsel · Family Office'}
      ]
    },
    'PH-03': {
      badge: 'Penthouse · MB Soriana',
      badgeColor: '#BF5129',
      title: 'HSBC Trust Technical Committee',
      subtitle: 'Shared MB-family governance for Soriana ownership position held through HSBC Trust.',
      rows: [
        {label:'Function', value:'Technical governance of the HSBC Trust structure holding MB family Soriana position. Ordinary governance decisions + qualified matters (share sales, structural change) require supermajority.'},
        {label:'Authority', value:'7 proprietary members (5 non-independent + 2 independent). Chairman must be independent, has NO casting vote. Simple majority for ordinary; qualified supermajority for structural matters.'},
        {label:'Access', value:'By trust document — named voting member and alternate member only'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> FJMB — Voting Member<br><span class="gen-badge gen-g2">G2</span> FJMV (Paco) — Alternate and successor'},
        {label:'Leader', value:'FJMB'},
        {label:'Support', value:'Legal counsel · Family Office · HSBC Trustee (executes only under formal instruction)'}
      ]
    },
    'PH-04': {
      badge: 'Penthouse · Safety Net',
      badgeColor: '#BF5129',
      title: 'Tiebreaker Committee (Comité de Desempate)',
      subtitle: 'Independent safety mechanism that activates only when G2 deadlocks persist across sessions. Casts the quality vote once the original Settlors are no longer active.',
      rows: [
        {label:'Function', value:'Independent trusted member(s). Intervention exclusively to break ties between Gen2 votes. Does NOT intervene in decisions made by the Original Settlors (Gen1). Activates ONLY at 3rd session of same matter after documented G2 deadlock.'},
        {label:'Access', value:'Closed — Family Office convenes at 2nd-session deadlock signal'},
        {label:'Membership', value:'External / Independent members (not a family generation)'},
        {label:'Leader', value:'Ernesto Villar Izaguirre — current sole independent member; casts the quality vote'},
        {label:'Support', value:'Family Office (notifies of potential involvement at 2nd session; records activations)'}
      ]
    },
    'L3-01': {
      badge: 'Level 3 · Branch Vote',
      badgeColor: '#BC9F68',
      title: 'G2 Family Trusts Technical Committees',
      subtitle: 'Four branch-level committees — one per G2 line. Dormant today; activates on G1 succession when each G2 inherits 25% voting rights into the Master Trust.',
      rows: [
        {label:'Function', value:'Branch-level ownership decisions — distribution planning, asset management, and intergenerational transitions. Each G2 branch (FJMV, JCMV, MCMV, LMMV) has its own committee.'},
        {label:'Status', value:'Dormant — activates on G1 succession'},
        {label:'Authority', value:'G2 for each branch; eligible G3 (25+ certified) in absence of G2'},
        {label:'Access', value:'G2 (one per branch) and eligible G3 (25+ with certification)'},
        {label:'Membership', value:'<span class="gen-badge gen-g2">G2</span> Branch G2 member<br><span class="gen-badge gen-g3">G3</span> ≥25, certified'},
        {label:'Support', value:'Family Office · Legal counsel · Financial advisors'},
        {label:'Legal Handoff', value:'Execution status of four G2 branch trust documents (FJMV, JCMV, MCMV, LMMV) pending confirmation with legal counsel.'}
      ]
    },
    'L2-01': {
      badge: 'Level 2 · Ownership Participation',
      badgeColor: '#ACC0CF',
      title: 'Trust Beneficiaries',
      subtitle: 'The first level of ownership — belonging to the ownership system by birthright. Members of the MV Master Trust and G2 Family Trusts.',
      rows: [
        {label:'Function', value:'All family members are beneficiaries of the MV Master Trust and/or their respective G2 trusts. Ownership participation rights — distributions, reporting, and transparency.'},
        {label:'Authority', value:'Governed by trust documents and Technical Committees above. Master Trust: three tiers — First Degree (G1 50/50); Successor (G2 branch trusts 25% each once G1 passes); Third Degree (living G1 who voluntarily step aside).'},
        {label:'Access', value:'Birthright'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span> <span class="gen-badge gen-g3">G3</span> All by birthright<br><em>In-Law status not documented (gap)</em>'},
        {label:'Support', value:'Family Office (distribution coordination and communication) · Trustee'}
      ]
    },
    'L1-01': {
      badge: 'Level 1 · Family Governance',
      badgeColor: '#004076',
      title: 'Family Council',
      subtitle: 'The primary governance body for family-level decisions — communication, planning, and the cultural architecture of the enterprise family.',
      rows: [
        {label:'Function', value:'Manages family policy, resolves dynamics, coordinates cross-branch issues, and sets the agenda for the Family Assembly.'},
        {label:'Authority', value:'Peer-to-peer accountability. Coordination authority (NOT ownership authority). NO formal binding voting rights by design — decisions over ownership and business rest with Technical Committee and Corporate Boards.'},
        {label:'Access', value:'G1 and G2 only. In-Laws NOT members (Blueprint diagram places IL at Assembly only).'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> FJMB and MCVML<br><span class="gen-badge gen-g2">G2</span> All G2 members'},
        {label:'Leader', value:'MCMV (Cony) — Leader/Convenor · Backup during RED: to be named'},
        {label:'Support', value:'Family Office · Perpetum (structural support) · Council Coordinator designates successor'}
      ]
    },
    'L1-02': {
      badge: 'Level 1 · Family Governance',
      badgeColor: '#004076',
      title: 'Family Assembly',
      subtitle: 'Annual gathering of the full family. Forum for transparency, shared voice, and intergenerational connection.',
      rows: [
        {label:'Function', value:'Annual gathering of the full family. Forum for transparency, updates, shared voice, and intergenerational connection. Not a decision-making body.'},
        {label:'Authority', value:'Family Council (designs and executes the Assembly)'},
        {label:'Access', value:'G1, G2, In-Laws, G3 ≥14'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span> <span class="gen-badge gen-il">IL</span> <span class="gen-badge gen-g3">G3 (14+)</span>'},
        {label:'Leader', value:'Family Office (convene, facilitate, close) · Cony — Leadership Contributor'},
        {label:'Support', value:'Perpetum · External facilitators as needed · Family Council designs format'}
      ]
    },
    'GF-01': {
      badge: 'Ground Level · Governance',
      badgeColor: '#002848',
      title: 'Advisory Board',
      subtitle: 'Personal governance advisory for the principal.',
      rows: [
        {label:'Function', value:'Provides strategic input and accountability for principal-led initiatives.'},
        {label:'Authority', value:'Principal drives the agenda'},
        {label:'Access', value:'Closed — principal and named advisors only'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> Principal only'},
        {label:'Support', value:'External advisors · Perpetum (structural)'}
      ]
    },
    'GF-02': {
      badge: 'Ground Level · Team Leadership',
      badgeColor: '#002848',
      title: 'G2 Lionheart Team',
      subtitle: 'Peer leadership development and shared governance competency for the G2 cohort.',
      rows: [
        {label:'Function', value:'Builds shared governance competency, collective voice, and accountability among siblings.'},
        {label:'Authority', value:'Room Leader (LMMV). Peer accountability among G2.'},
        {label:'Access', value:'G2 only (FJMV, JCMV, MCMV, LMMV)'},
        {label:'Membership', value:'<span class="gen-badge gen-g2">G2</span> All G2 members'},
        {label:'Leader', value:'LMMV (Luz Ma) — Room Leader'},
        {label:'Support', value:'MCMV (Cony) — Assistant Leader · Perpetum · Jill Thomas'}
      ]
    },
    'GF-03': {
      badge: 'Ground Level · Coaching',
      badgeColor: '#002848',
      title: '1-1 Coaching',
      subtitle: 'Individual governance and leadership coaching.',
      rows: [
        {label:'Function', value:'Supports personal development within the family governance system.'},
        {label:'Authority', value:'Individual participant (each owns their own cadence and agenda)'},
        {label:'Access', value:'G1 and G2 individually. G3 and In-Laws invited.'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span> primary · <span class="gen-badge gen-g3">G3</span> <span class="gen-badge gen-il">IL</span> invited'},
        {label:'Support', value:'Perpetum · Verónica Yépez · Jill Thomas · Therapists as appropriate'}
      ]
    },
    'GF-04': {
      badge: 'Ground Level · Individual Dev.',
      badgeColor: '#002848',
      title: 'Well-being Coaching',
      subtitle: 'Personal well-being support across generations.',
      rows: [
        {label:'Function', value:'Individual well-being programs and personalized support.'},
        {label:'Authority', value:'Individual participant'},
        {label:'Access', value:'G1, G2, G3, and In-Laws'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span> <span class="gen-badge gen-g3">G3</span> <span class="gen-badge gen-il">IL</span> All generations'},
        {label:'Support', value:'Specialist coaches and therapists as assigned per Individual Pathway'}
      ]
    },
    'GF-05': {
      badge: 'Ground Level · Development',
      badgeColor: '#002848',
      title: 'G3 Programs',
      subtitle: 'Play the Game (7+) and Summer Practices (16+) — enterprise and vocational learning for the next generation.',
      rows: [
        {label:'Function', value:'Play the Game: G3 7+ (optional). Summer Practices: G3 16+ at Innovasport.'},
        {label:'Authority', value:'Family Office · Family Council (per Committee Qualification; Play/Summer pending formalization)'},
        {label:'Access', value:'G3 only'},
        {label:'Membership', value:'<span class="gen-badge gen-g3">G3</span> G3 (age-appropriate)'},
        {label:'Leader', value:'Family Office'},
        {label:'Support', value:'MCMV (Cony) — Program Sponsor · Innovasport HR · Perpetum (program design)'}
      ]
    },
    'GF-06': {
      badge: 'Ground Level · Qualifications',
      badgeColor: '#002848',
      title: 'Committee Qualification Program',
      subtitle: 'Certification pathway for G3 members to access ownership decision-making rooms (L3 / PH) and corporate governance seats (Annex).',
      rows: [
        {label:'Status', value:'Coming 2027'},
        {label:'Function', value:'Certification pathways for G3 members to access ownership decision-making rooms on upper floors and corporate governance seats in the Annex.'},
        {label:'Authority', value:'Family Council'},
        {label:'Access', value:'G3 aspiring to L3 / PH participation'},
        {label:'Membership', value:'<span class="gen-badge gen-g3">G3</span> G3 members pursuing qualification'},
        {label:'Leader', value:'Family Office'},
        {label:'Support', value:'Perpetum · Legal advisors · Enterprise mentors'}
      ]
    },
    'FDN-01': {
      badge: 'Foundation · The Why',
      badgeColor: '#002848',
      title: 'Family Agreements (the \'Why\')',
      subtitle: 'The foundation the entire house stands on. The shared commitments that make the architecture above meaningful.',
      rows: [
        {label:'Status', value:'Under Construction — not yet transcribed'},
        {label:'Function', value:'The explicit commitments the family makes to itself. The cultural agreements that sit beneath every room and every decision made above.'},
        {label:'Authority', value:'The Family itself (peer-to-peer commitment by all signatories)'},
        {label:'Access', value:'All family members by definition'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span> <span class="gen-badge gen-g3">G3</span> <span class="gen-badge gen-il">IL</span> All (In-Laws adherence scope may vary)'},
        {label:'Leader', value:'Family Office (operational guardian) · Family Council (governance steward)'},
        {label:'Support', value:'Perpetum (facilitation) · External advisors during review cycles'}
      ]
    },
    // Annex rooms (opened from the Estate view)
    'AX-01': {
      badge: 'Annex · Corporate Strategy',
      badgeColor: '#004076',
      title: 'Soriana Board of Directors (MV Representation)',
      subtitle: 'Corporate fiduciary governance of Soriana. MV family occupies representation seats.',
      rows: [
        {label:'Function', value:'Full fiduciary governance of Soriana. MV family members hold representation seats through Adaltiora structure.'},
        {label:'Authority', value:'Board of Directors — Board Chair (external) · Full fiduciary duties'},
        {label:'Access', value:'Restricted. Qualification and experience-based (family or non-family).'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> currently · <span class="gen-badge gen-g2">G2</span> in preparation phase (FJMV/Paco)'},
        {label:'Leader', value:'Board Chair (external)'},
        {label:'Support', value:'Legal counsel · Family Office briefings'}
      ]
    },
    'AX-02': {
      badge: 'Annex · Corporate Strategy',
      badgeColor: '#004076',
      title: 'Innovasport Board of Directors',
      subtitle: 'Fiduciary governance of Innovasport — the core MV operating business.',
      rows: [
        {label:'Function', value:'Strategic oversight and fiduciary governance of Innovasport.'},
        {label:'Authority', value:'Board of Directors — Board Chair · Full fiduciary duties'},
        {label:'Access', value:'Restricted. G1 and qualified board members. G2 may attend based on role (CEO).'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> FJMB, MCVML<br><span class="gen-badge gen-g2">G2</span> JCMV — attends as CEO (operational role, NOT ownership seat)'},
        {label:'Leader', value:'Board Chair'},
        {label:'Support', value:'Audit Committee · Legal counsel'}
      ]
    },
    'AX-03': {
      badge: 'Annex · Family Wealth Strategy',
      badgeColor: '#004076',
      title: 'Organización Marbrin — Investment Board',
      subtitle: 'Advisory deliberation on family wealth investment strategy. Non-binding recommendations to the Master Trust Technical Committee.',
      rows: [
        {label:'Status', value:'Active — recently activated'},
        {label:'Function', value:'Strategic deliberation and oversight of family wealth and investments.'},
        {label:'Authority', value:'Advisory — NON-BINDING recommendations to Technical Committee of MV Family Master Trust'},
        {label:'Access', value:'G1 and G2'},
        {label:'Membership', value:'<span class="gen-badge gen-g1">G1</span> <span class="gen-badge gen-g2">G2</span>'},
        {label:'Leader', value:'Family Office Director / Corporate Secretary (combined role)'},
        {label:'Support', value:'Investment advisors · Legal counsel · Family Office Secretary (convener)'}
      ]
    },
    'AX-04': {
      badge: 'Annex · Risk Oversight',
      badgeColor: '#004076',
      title: 'Innovasport — Audit Committee',
      subtitle: 'Risk, financial reporting integrity, and compliance oversight for Innovasport.',
      rows: [
        {label:'Status', value:'Active — restructuring phase (composition changing)'},
        {label:'Function', value:'Risk oversight, financial reporting integrity, and compliance — acts as Executive Committee of the Board.'},
        {label:'Authority', value:'Reports to Innovasport Board of Directors'},
        {label:'Access', value:'Restricted. Committee Members only.'},
        {label:'Membership', value:'Stage 1 (current): 5–9 members — FJMB, JCMV (CEO), MCMV, Guillermo Rodal Espinosa, + Internal Auditor (permanent guest, voice only)<br>Stage 3 (future): JCMV and Guillermo replaced for independence'},
        {label:'Leader', value:'FJMB (current)'},
        {label:'Support', value:'External auditors · Legal counsel · Internal Auditor (permanent guest)'}
      ]
    },
  }
};

// Populate Annex rooms for estate view from roomDetails
window.MV_FAMILY.estate.buildings.annex.rooms = [
  {category:'Corporate Strategy', name:'Soriana Board of Directors', roomId:'AX-01'},
  {category:'Corporate Strategy', name:'Innovasport Board of Directors', roomId:'AX-02'},
  {category:'Family Wealth Strategy', name:'Organización Marbrin — Investment Board', roomId:'AX-03'},
  {category:'Risk Oversight', name:'Innovasport — Audit Committee', roomId:'AX-04'},
];
