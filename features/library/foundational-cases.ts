export type FoundationalEvidence = {
  readonly id: string;
  readonly title: string;
  readonly publisher: string;
  readonly role: string;
  readonly limit: string;
  readonly href: string;
};

export type FoundationalCase = {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly readingTime: string;
  readonly dek: string;
  readonly intention: string;
  readonly intentionBoundary: string;
  readonly starting: readonly { label: string; text: string }[];
  readonly subjectLead: string;
  readonly subject: readonly string[];
  readonly visual: {
    readonly label: string;
    readonly steps: readonly { title: string; note: string }[];
    readonly caption: string;
  };
  readonly context: readonly { label: string; title: string; text: string }[];
  readonly relationships: readonly { from: string; relation: string; to: string }[];
  readonly relationshipNote: string;
  readonly evidenceLead: string;
  readonly evidence: readonly FoundationalEvidence[];
  readonly assumptions: readonly string[];
  readonly uncertainties: readonly { title: string; text: string }[];
  readonly supports: string;
  readonly doesNotEstablish: string;
  readonly unknowns: readonly { title: string; text: string }[];
  readonly continuations: readonly {
    title: string;
    text: string;
    href: string;
    action: string;
  }[];
  readonly reflection: readonly string[];
};

export const foundationalCases = {
  evidence: {
    slug: "what-is-evidence",
    title: "What is Evidence?",
    category: "Foundations",
    readingTime: "10 min",
    dek: "How something inspectable comes to bear on a claim—and where certainty still stops.",
    intention: "I want to understand what counts as evidence, and why a source alone is not enough.",
    intentionBoundary: "This asks how evidence supports orientation. It does not ask for one universal rule that settles every discipline or decision.",
    starting: [
      { label: "Likely known", text: "Evidence is what we point to when we say a claim is supported." },
      { label: "Still unclear", text: "How a record becomes relevant, how methods shape its force, and why reasonable people may still disagree." },
    ],
    subjectLead: "Evidence is inspectable material that bears on a claim through a stated relationship.",
    subject: [
      "A document, measurement, observation, image, testimony, or dataset is a source or record. It becomes evidence for a particular claim only when the connection between them is made visible.",
      "Evidence does not speak without context. Identity, provenance, method, version, relevance, and limitations affect what it can support.",
    ],
    visual: {
      label: "The relationship that makes evidence usable",
      steps: [
        { title: "Source", note: "What can be inspected" },
        { title: "Method", note: "How it was obtained" },
        { title: "Relationship", note: "What it bears on" },
        { title: "Claim", note: "What is being considered" },
        { title: "Boundary", note: "What remains unsupported" },
      ],
      caption: "A source becomes useful evidence through an explicit, limited relationship—not through presence or authority alone.",
    },
    context: [
      { label: "Science", title: "Observation and measurement", text: "Methods, uncertainty, replication, and competing explanations shape evidential force." },
      { label: "History", title: "Documents and traces", text: "Origin, authorship, preservation, purpose, and corroboration shape interpretation." },
      { label: "Public decisions", title: "Reasons that can be inspected", text: "Evidence must remain distinguishable from values, policy choices, and authority." },
    ],
    relationships: [
      { from: "Source", relation: "provides", to: "a record" },
      { from: "Record", relation: "under a method becomes", to: "evidence for a claim" },
      { from: "Evidence", relation: "supports or limits", to: "an interpretation" },
      { from: "Several findings", relation: "may increase", to: "confidence" },
    ],
    relationshipNote: "Confidence is an outcome of a body of evidence and its limitations. It is not a property conferred by fluent explanation.",
    evidenceLead: "The form of evidence changes. The need for traceability does not.",
    evidence: [
      {
        id: "E1",
        title: "Engaging in Argument from Evidence",
        publisher: "National Academies of Sciences",
        role: "Claims require justification, and their weaknesses and limitations remain open to scrutiny.",
        limit: "A science-education representation, not a complete philosophy of evidence across all domains.",
        href: "https://nap.nationalacademies.org/visualizations/practices-for-k-12-classrooms/resources/",
      },
      {
        id: "E2",
        title: "Reproducibility and Replicability in Science",
        publisher: "National Academies of Sciences",
        role: "Why accessible data, methods, recomputation, replication, and disagreement matter to scientific confidence.",
        limit: "Focused on scientific research; its terms should not be silently transferred to history, law, or lived experience.",
        href: "https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science",
      },
      {
        id: "E3",
        title: "VIM3 2.26 — Measurement uncertainty",
        publisher: "Joint Committee for Guides in Metrology",
        role: "Measurement results carry uncertainty based on the information and procedures used.",
        limit: "Applies to measurement; not every form of evidence is a measured quantity.",
        href: "https://jcgm.bipm.org/vim/en/2.26.html",
      },
    ],
    assumptions: [
      "The case uses a cross-domain definition broad enough for orientation, not a discipline-specific rule of admissibility.",
      "Evidence, interpretation, and decision are kept separate even when they occur close together in practice.",
      "Authority helps identify responsibility; it does not make every statement from that authority conclusive.",
      "The Human intention is to inspect support, not to automate judgment.",
    ],
    uncertainties: [
      { title: "Relevance", text: "The same record can bear strongly on one claim and weakly—or not at all—on another." },
      { title: "Method", text: "Unknown procedures, sampling, calibration, or selection can limit what a record supports." },
      { title: "Interpretation", text: "People may agree on a record while disagreeing about the explanation that best fits it." },
    ],
    supports: "Evidence can justify, qualify, challenge, or bound a claim when its identity, method, relationship, and limitations remain inspectable.",
    doesNotEstablish: "That every source is evidence, that evidence interprets itself, that one finding creates certainty, or that a supported claim decides what a Human should do.",
    unknowns: [
      { title: "Missing counterevidence", text: "What relevant observation or source might point in another direction?" },
      { title: "Unseen provenance", text: "Which transformations occurred between the original record and what is now presented?" },
      { title: "Decision threshold", text: "How much support is enough for this purpose, and who is responsible for that threshold?" },
    ],
    continuations: [
      { title: "Inspect uncertainty", text: "See how a measurement can be useful without becoming exact.", href: "https://jcgm.bipm.org/vim/en/2.26.html", action: "Open the metrology reference" },
      { title: "Follow evidence in a case", text: "Watch several independent sources support different parts of one orientation.", href: "/cases/plate-tectonics", action: "Open Plate Tectonics" },
      { title: "Understand models", text: "Ask how evidence meets a representation built for a particular purpose.", href: "/cases/what-is-a-scientific-model", action: "Continue to scientific models" },
    ],
    reflection: [
      "Evidence has moved from “something that proves a point” to a traceable relationship among a source, a method, a claim, and a boundary.",
      "The next useful question is no longer only “What is the source?” but “What exactly does this source support—and what does it not?”",
    ],
  },
  map: {
    slug: "what-is-a-map",
    title: "What is a Map?",
    category: "Maps",
    readingTime: "10 min",
    dek: "Selection, symbol, scale, purpose—and the useful distance between a map and what it represents.",
    intention: "I want to understand what a map shows, what it changes, and what it leaves out.",
    intentionBoundary: "This asks how maps orient. It does not ask for a complete history of cartography or one perfect projection.",
    starting: [
      { label: "Likely known", text: "A map shows where things are and helps someone navigate." },
      { label: "Still unclear", text: "Every map is selected, symbolized, scaled, and made for a use; none is the territory itself." },
    ],
    subjectLead: "A map is a designed representation that makes selected relationships easier to see and use.",
    subject: [
      "Geographic maps translate parts of a spatial reality into symbols at a chosen scale. Other maps may represent concepts, networks, processes, or time, but they still depend on declared relationships and conventions.",
      "A map gains usefulness by leaving things out. The same selection that creates clarity also creates a boundary.",
    ],
    visual: {
      label: "How a territory becomes a map",
      steps: [
        { title: "Territory", note: "More than can be shown" },
        { title: "Purpose", note: "What the map is for" },
        { title: "Selection", note: "What enters the frame" },
        { title: "Symbol + scale", note: "How relations appear" },
        { title: "Map", note: "A usable, bounded view" },
      ],
      caption: "The map does not shrink reality neutrally. Purpose guides selection; symbols and scale shape the resulting view.",
    },
    context: [
      { label: "Position", title: "Where am I?", text: "Reference systems and landmarks place the observer relative to a field." },
      { label: "Relationship", title: "What connects?", text: "Distance, adjacency, direction, sequence, and network structure become visible." },
      { label: "Movement", title: "Where can I go?", text: "A map supports action only when its purpose, currency, and limits fit the journey." },
    ],
    relationships: [
      { from: "Purpose", relation: "guides", to: "selection" },
      { from: "Selection", relation: "is expressed through", to: "symbols" },
      { from: "Scale", relation: "controls", to: "coverage and detail" },
      { from: "Projection", relation: "preserves some relations and distorts", to: "others" },
    ],
    relationshipNote: "A map can be accurate for one use and misleading for another without either being arbitrary.",
    evidenceLead: "Maps are inspectable choices, not transparent windows.",
    evidence: [
      {
        id: "E1",
        title: "Mission and definitions: Map",
        publisher: "International Cartographic Association",
        role: "Defines a map as a symbolized representation of selected features, created through choices for spatial use.",
        limit: "A disciplinary definition centered on geographic reality; conceptual maps require additional care.",
        href: "https://icaci.org/mission/",
      },
      {
        id: "E2",
        title: "Map Scales",
        publisher: "U.S. Geological Survey",
        role: "Shows how proportion, intended use, coverage, and detail constrain a map.",
        limit: "Focused on printed geographic maps; digital maps can change scale interactively but retain the tradeoff.",
        href: "https://www.usgs.gov/publications/map-scales",
      },
      {
        id: "E3",
        title: "Map Projections",
        publisher: "U.S. Geological Survey",
        role: "Compares projections by the spatial properties they preserve and the distortions they introduce.",
        limit: "A compact reference poster, not a complete course in projection mathematics or cartographic choice.",
        href: "https://store.usgs.gov/assets/mod/storefiles/PDF/16573.pdf",
      },
    ],
    assumptions: [
      "Geographic maps provide the concrete foundation before the case extends the word map to concepts or systems.",
      "Selection is treated as necessary rather than deceptive; hidden selection remains a problem.",
      "Accuracy is evaluated relative to declared purpose, scale, reference system, and date.",
      "The case distinguishes the represented field from the representation.",
    ],
    uncertainties: [
      { title: "Currency", text: "A once-accurate map may no longer match a changing territory." },
      { title: "Classification", text: "Boundaries and labels can depend on conventions, interpretation, or contested authority." },
      { title: "Transfer", text: "A conceptual map may borrow spatial language without preserving measurable spatial relations." },
    ],
    supports: "A useful map reveals selected relationships through a declared system of symbols, scale, reference, and purpose.",
    doesNotEstablish: "That the map is complete, neutral, current, equally accurate everywhere, or appropriate for a use its maker did not intend.",
    unknowns: [
      { title: "What was omitted?", text: "Which features, people, scales, or relationships fell outside the frame?" },
      { title: "Whose purpose?", text: "Who chose the categories and which decisions was the map designed to support?" },
      { title: "What changes with position?", text: "Would another projection, scale, date, or observer produce a materially different orientation?" },
    ],
    continuations: [
      { title: "Change the scale", text: "See why more detail and more coverage cannot both grow without limit.", href: "/cases/what-is-scale", action: "Continue to scale" },
      { title: "Inspect a projection", text: "Compare what different flat representations preserve and distort.", href: "https://store.usgs.gov/assets/mod/storefiles/PDF/16573.pdf", action: "Open the USGS reference" },
      { title: "Enter the atlas", text: "Explore how the Library treats cases as maps and relationships as paths.", href: "/library", action: "Open the Library" },
    ],
    reflection: [
      "A map has changed from a reduced picture of a place into a purposeful relationship among reality, selection, symbol, scale, and use.",
      "Its omissions are no longer merely missing content. They are part of the map's orientation boundary.",
    ],
  },
  scale: {
    slug: "what-is-scale",
    title: "What is Scale?",
    category: "Maps",
    readingTime: "9 min",
    dek: "Extent, detail, ratio, and the changes that become visible only from a different level.",
    intention: "I want to understand what changes when I zoom in or out.",
    intentionBoundary: "This asks how scale changes orientation. It does not attempt to compare every physical, temporal, social, or mathematical scale.",
    starting: [
      { label: "Likely known", text: "Scale can mean size, level, or the ratio printed on a map." },
      { label: "Still unclear", text: "Changing scale can reveal different patterns, hide local detail, and change which explanation is useful." },
    ],
    subjectLead: "Scale is a declared relationship between the level of a representation and the extent or resolution of what it represents.",
    subject: [
      "On a map, scale relates distance on the representation to distance on the ground. More broadly, scale can describe spatial extent, time span, level of organization, or granularity of observation.",
      "A scale change is not only magnification. It can change what counts as a feature, which variation matters, and which relationships become visible.",
    ],
    visual: {
      label: "One field viewed at several scales",
      steps: [
        { title: "Detail", note: "A crack, leaf, or street" },
        { title: "Local pattern", note: "A wall, tree, or district" },
        { title: "System", note: "A building, forest, or city" },
        { title: "Region", note: "Connections across systems" },
        { title: "Planet", note: "Broad patterns, little local detail" },
      ],
      caption: "Zooming out increases extent and can reveal large patterns; zooming in increases detail and can reveal local variation.",
    },
    context: [
      { label: "Spatial", title: "How much area?", text: "A room, watershed, continent, and planet make different relations visible." },
      { label: "Temporal", title: "How much time?", text: "Seconds, seasons, generations, and geological time reveal different kinds of change." },
      { label: "Organizational", title: "Which level?", text: "Parts, organisms, groups, and systems can interact without one level replacing another." },
    ],
    relationships: [
      { from: "Larger mapped extent", relation: "usually permits", to: "less local detail" },
      { from: "Finer resolution", relation: "reveals", to: "smaller variation" },
      { from: "Longer time span", relation: "can reveal", to: "slow patterns" },
      { from: "Scale mismatch", relation: "can hide or exaggerate", to: "a relationship" },
    ],
    relationshipNote: "A pattern visible at one scale does not automatically explain what happens at another.",
    evidenceLead: "Scale is measurable in some representations and interpretive in others.",
    evidence: [
      {
        id: "E1",
        title: "Map Scales",
        publisher: "U.S. Geological Survey",
        role: "Defines map scale as a proportion and demonstrates the tradeoff between ground coverage and visible detail.",
        limit: "A cartographic treatment; other kinds of scale may not be expressible as one representative fraction.",
        href: "https://www.usgs.gov/publications/map-scales",
      },
      {
        id: "E2",
        title: "Map Projections",
        publisher: "U.S. Geological Survey",
        role: "Shows that scale and distortion can vary with position and projection across one represented world.",
        limit: "A cartographic reference; it does not decide which spatial, temporal, or organizational level fits a question.",
        href: "https://store.usgs.gov/assets/mod/storefiles/PDF/16573.pdf",
      },
      {
        id: "E3",
        title: "SI prefixes",
        publisher: "International Bureau of Weights and Measures",
        role: "Provides a stable language for expressing orders of magnitude in measured quantities.",
        limit: "Prefixes express magnitude; they do not decide which organizational or explanatory scale is appropriate.",
        href: "https://www.bipm.org/en/measurement-units/si-prefixes",
      },
    ],
    assumptions: [
      "The case begins with cartographic scale because its ratio and tradeoffs are explicit and inspectable.",
      "Zoom is used as an entry metaphor, while acknowledging that changing organizational level is more than magnification.",
      "No universal pattern is assumed to repeat unchanged across scales.",
      "The useful scale depends on the Human intention and the phenomenon being inspected.",
    ],
    uncertainties: [
      { title: "Relevant level", text: "More detail does not guarantee a better explanation; the useful level depends on the question." },
      { title: "Boundary between levels", text: "Local, regional, and global are practical frames, not naturally sharp divisions." },
      { title: "Cross-scale inference", text: "A relationship observed at one level may weaken, reverse, or disappear at another." },
    ],
    supports: "Declaring scale helps a reader understand the extent, resolution, and level at which a representation is useful.",
    doesNotEstablish: "That one scale is most real, that a repeated shape has the same cause at every level, or that zooming out produces a complete view.",
    unknowns: [
      { title: "Which scale is missing?", text: "Is an important local or larger pattern outside the chosen frame?" },
      { title: "What is lost in aggregation?", text: "Which differences disappear when many observations become one value or region?" },
      { title: "What connects the levels?", text: "Which tested mechanism, rather than visual resemblance, links one scale to another?" },
    ],
    continuations: [
      { title: "Return to maps", text: "See how scale participates in selection, symbol, purpose, and omission.", href: "/cases/what-is-a-map", action: "Continue to maps" },
      { title: "Compare two scales", text: "Inspect the USGS examples of coverage and detail in real map series.", href: "https://www.usgs.gov/publications/map-scales", action: "Open Map Scales" },
      { title: "Examine a model", text: "Ask how resolution and boundaries shape a scientific representation.", href: "/cases/what-is-a-scientific-model", action: "Continue to scientific models" },
    ],
    reflection: [
      "Scale has changed from “how large something looks” into a declared position: extent, resolution, time span, and organizational level.",
      "A responsible orientation now asks not only what the pattern is, but at which scale it appears and whether the relationship survives a change of level.",
    ],
  },
  model: {
    slug: "what-is-a-scientific-model",
    title: "What is a Scientific Model?",
    category: "Foundations",
    readingTime: "11 min",
    dek: "A purposeful representation of a system: useful because it is selective, testable, and revisable.",
    intention: "I want to understand what a scientific model can show—and why it is not the thing itself.",
    intentionBoundary: "This asks how models support scientific understanding. It does not teach one modeling technique or evaluate one disputed model.",
    starting: [
      { label: "Likely known", text: "A model is a simplified version of something scientists want to understand or predict." },
      { label: "Still unclear", text: "Simplification is not merely a flaw: assumptions and purpose determine what a model can usefully represent." },
    ],
    subjectLead: "A scientific model is an explicit representation used to describe, explain, investigate, or predict aspects of a system.",
    subject: [
      "Models can be physical, conceptual, mathematical, computational, or graphical. Each keeps some relationships visible while holding others constant, approximating them, or leaving them outside scope.",
      "A model is judged through use: whether its structure is clear, its assumptions are declared, and its outputs remain open to comparison with observations and other models.",
    ],
    visual: {
      label: "The scientific modeling loop",
      steps: [
        { title: "Phenomenon", note: "The system under study" },
        { title: "Question", note: "What the model is for" },
        { title: "Representation", note: "Variables, relations, assumptions" },
        { title: "Output", note: "Explanation, simulation, prediction" },
        { title: "Comparison", note: "Observation tests the fit" },
      ],
      caption: "Comparison can support, limit, or revise the model. It does not turn the representation into the phenomenon.",
    },
    context: [
      { label: "Conceptual", title: "Make relationships explicit", text: "A diagram or analogy can organize current understanding and expose questions." },
      { label: "Mathematical", title: "Express constraints", text: "Equations make selected quantities and relationships precise enough to analyze." },
      { label: "Computational", title: "Explore behavior", text: "Simulation can examine consequences when direct observation or calculation is limited." },
    ],
    relationships: [
      { from: "Question", relation: "sets", to: "purpose" },
      { from: "Purpose", relation: "guides", to: "assumptions and variables" },
      { from: "Model", relation: "produces", to: "representations or outputs" },
      { from: "Observation", relation: "supports, limits, or revises", to: "the model" },
    ],
    relationshipNote: "A useful model can be knowingly incomplete. Its value depends on whether the incompleteness is appropriate and visible for the intended use.",
    evidenceLead: "Models become trustworthy through explicit assumptions and continued comparison—not resemblance alone.",
    evidence: [
      {
        id: "E1",
        title: "Developing and Using Models",
        publisher: "National Academies of Sciences",
        role: "Models represent current understanding, support questions and explanations, and communicate ideas.",
        limit: "An education framework; specialist fields use additional model classes and validation practices.",
        href: "https://nap.nationalacademies.org/visualizations/practices-for-k-12-classrooms/resources/",
      },
      {
        id: "E2",
        title: "Numerical Weather Prediction",
        publisher: "NOAA National Centers for Environmental Information",
        role: "A concrete example of observations entering a model framework to produce forecasts.",
        limit: "One computational domain; it does not represent conceptual, physical, or non-predictive scientific models generally.",
        href: "https://www.ncei.noaa.gov/products/weather-climate-models/numerical-weather-prediction",
      },
      {
        id: "E3",
        title: "Modeling and Data Assimilation",
        publisher: "NOAA Physical Sciences Laboratory",
        role: "Shows models being calibrated, diagnosed, improved, and combined with observations across time scales.",
        limit: "Operational weather and climate practice, not a universal validation procedure for all sciences.",
        href: "https://psl.noaa.gov/research/divisions/mda/",
      },
    ],
    assumptions: [
      "The case treats scientific models as a family of representations rather than only equations or simulations.",
      "Usefulness is evaluated relative to a declared question, domain, scale, and validation practice.",
      "Agreement with observations can support a model without proving it is uniquely correct.",
      "Orientation remains distinct from prediction: a model may do one well without doing the other.",
    ],
    uncertainties: [
      { title: "Parameter and input uncertainty", text: "Outputs can change when measured inputs, initial conditions, or parameter estimates change." },
      { title: "Structural uncertainty", text: "Another defensible model may organize the same system through different relationships or approximations." },
      { title: "Domain of validity", text: "Performance in one range, place, or time period may not transfer beyond it." },
    ],
    supports: "A scientific model can make selected relationships explicit, generate inspectable consequences, and improve through comparison with observations.",
    doesNotEstablish: "That the model is reality, that a successful prediction proves every assumption, that more detail always makes a better model, or that one model fits every purpose.",
    unknowns: [
      { title: "Alternative models", text: "Could a different representation fit the same observations while implying another explanation?" },
      { title: "Untested range", text: "Where has the model not yet been compared with appropriate observations?" },
      { title: "Decision use", text: "Which additional values, risks, or local evidence are required before a model output informs action?" },
    ],
    continuations: [
      { title: "Inspect a working model", text: "See observations, a numerical framework, outputs, and known forecast limits together.", href: "https://www.ncei.noaa.gov/products/weather-climate-models/numerical-weather-prediction", action: "Open NOAA weather models" },
      { title: "Return to evidence", text: "Examine what comparison can support and why uncertainty remains visible.", href: "/cases/what-is-evidence", action: "Continue to evidence" },
      { title: "Change the scale", text: "Ask how extent and resolution alter variables, patterns, and domains of validity.", href: "/cases/what-is-scale", action: "Continue to scale" },
    ],
    reflection: [
      "A scientific model has changed from “a simplified copy” into a purposeful, inspectable representation built around a question.",
      "Its assumptions, outputs, comparisons, and limits now show where it can help—and where orientation must continue beyond it.",
    ],
  },
} as const satisfies Record<string, FoundationalCase>;
