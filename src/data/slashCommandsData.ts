export interface SlashCommandDef {
  command: string;
  name: string;
  skillId: string;
  phase: 'define' | 'plan' | 'build' | 'verify' | 'review' | 'ship';
  keyPrinciple: string;
  description: string;
  inputPlaceholder: string;
  examples: {
    title: string;
    input: string;
    simulatedOutput: string;
  }[];
}

export const SLASH_COMMANDS: SlashCommandDef[] = [
  {
    command: '/spec',
    name: 'Spec-Driven Development',
    skillId: 'spec-driven-development',
    phase: 'define',
    keyPrinciple: 'Spec before code',
    description: 'Establishes explicit invariants, boundary conditions, capability maps, and acceptance proofs before a single line of implementation begins.',
    inputPlaceholder: 'Describe the feature, user goal, or system requirement...',
    examples: [
      {
        title: 'Team Activity Feed with Realtime Filtering',
        input: 'Build a team activity feed with filter by project and member, paginated, with optimistic updates.',
        simulatedOutput: `# Feature Specification: Team Activity Feed

## 1. Problem & Context
Engineering leads and team members lose track of cross-project commits, pull request reviews, and deployment triggers.
Target User: Technical collaborators working on concurrent repos.

## 2. Capability Map & Modules
- [Capability 1]: Paginated Activity Stream (Cursor-based, 25 items/page)
- [Capability 2]: Multi-dimensional Filtering (By projectId[], userId[], eventType[])
- [Capability 3]: Optimistic Reactions & Comments (Local cache reconcile on mutation)
- [Capability 4]: Real-time Broadcast Ingestion (SSE or WebSocket push handler)

## 3. Boundary Conditions & Invariants
- Invariant: A user can NEVER view activities from an organization they lack read permissions on.
- Idempotency: Duplicate socket frames with identical \`eventId\` are de-duplicated via local bloom/LRU buffer.
- Fallback: If socket disconnects, gracefully fallback to exponential backoff polling (5s -> 15s -> 45s).

## 4. Explicit Non-Goals (Out of Scope for Slice 1)
- Full-text search across arbitrary event payload json (slice 2).
- Video/media attachments in comment replies.

## 5. Acceptance Tests & Proof Criteria
- [ ] Test 1: Given 60 items in DB, requesting page 1 with limit 20 returns items 1-20 and valid \`next_cursor\`.
- [ ] Test 2: Filtering by \`projectId=alpha\` yields strictly events where \`event.project_id === 'alpha'\`.
- [ ] Test 3: Optimistic comment displays in <16ms; rollback triggers if API returns HTTP 422.`
      },
      {
        title: 'Rate-Limiting Middleware for Public API',
        input: 'Implement token bucket rate limiting middleware in Express with Redis backend.',
        simulatedOutput: `# Specification: Distributed Token-Bucket Rate Limiter

## 1. Objectives & Threat Model
Prevent runaway crawler loops and DDoS attacks on public endpoints while giving authentic users burst headroom.

## 2. Invariants
- Limit: 60 requests per minute per IP, with a burst allowance of 10 requests.
- Header contracts: Responses MUST always attach \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, \`X-RateLimit-Reset\`.
- Redis Failure Policy: FAIL OPEN with structured warning log; an infrastructure hiccup in Redis must not take down the entire API for legitimate traffic.

## 3. Verification Criteria
- [ ] Red Test: 71 rapid requests from IP 1.2.3.4 return exactly 60x 200, 10x 200 (burst), 1x 429 Too Many Requests.
- [ ] Clock Drift Test: Verified across 2 simulated server instances with 200ms simulated clock drift.`
      }
    ]
  },
  {
    command: '/interview-me',
    name: 'Interview Me (Epistemic Interrogation)',
    skillId: 'interview-me',
    phase: 'define',
    keyPrinciple: 'Ask one question at a time with your best guess attached until ~95% confidence',
    description: 'When requirements are underspecified, stops guessing. Interrogates requirements one question at a time, guessing the answer to accelerate alignment.',
    inputPlaceholder: 'Tell me what you are trying to build (e.g. "Build me an analytics dashboard")...',
    examples: [
      {
        title: 'Vague Dashboard Ask',
        input: 'Build me an analytics dashboard for our SaaS.',
        simulatedOutput: `HYPOTHESIS: You want an operational dashboard for the founding/exec team to answer "how did today go?" in under 10 seconds, and "dashboard" was the shorthand that came to mind.
[Confidence: 35%]

QUESTION: Are you optimizing for internal stakeholders monitoring recurring revenue (MRR, churn, signups) or for end-customers analyzing their own team's usage inside your product?

MY GUESS: You want the internal executive metric overview, because end-customer usage analytics usually requires complex multi-tenant query isolation and custom export pipelines.`
      },
      {
        title: 'Vague Performance Ask',
        input: 'Make our checkout flow faster.',
        simulatedOutput: `HYPOTHESIS: You are seeing checkout abandonments or high bounce rates and suspect payment gateway latency or cart bundle size is causing users to drop off.
[Confidence: 45%]

QUESTION: What specific threshold or bottleneck are you targeting?
(A) Interaction latency (e.g. button click to payment modal taking >1.5s)
(B) Initial page load / bundle hydration (LCP on mobile 3G/4G)
(C) Backend database transaction lock time during order settlement

MY GUESS: It's (A) or (B) on mobile devices, because 70% of e-commerce checkout abandonments stem from client-side UI freeze during third-party payment script initialization.`
      }
    ]
  },
  {
    command: '/plan',
    name: 'Planning & Task Breakdown',
    skillId: 'planning-and-task-breakdown',
    phase: 'plan',
    keyPrinciple: 'Small, atomic tasks with explicit proof gates',
    description: 'Breaks down specifications into sequential, vertical slices under 15 minutes each. Defines verification gates for every single task.',
    inputPlaceholder: 'Paste your spec or feature objective to generate an atomic task plan...',
    examples: [
      {
        title: 'Authentication Session Refresh Slice',
        input: 'Implement JWT refresh token rotation with sliding expiration and multi-device revocation.',
        simulatedOutput: `## Execution Plan: Token Rotation (<15 min atomic slices)

### Task 1: Domain Entities & In-Memory Blacklist
- Action: Define \`RefreshToken\` schema with \`familyId\`, \`nonce\`, and \`isRevoked\` flags.
- Verification Gate: Unit test verifying that reusing a previous token in a family revokes the ENTIRE token family.

### Task 2: Rotation Endpoint Controller
- Action: Implement \`POST /api/auth/refresh\`. Reads HttpOnly cookie, validates signature, emits new pair.
- Verification Gate: Supertest integration test verifying 200 OK + \`Set-Cookie\` header on valid token.

### Task 3: Token Family Theft Replay Guard
- Action: If an already-rotated token is presented a second time, immediately mark all active sessions for that user ID as revoked.
- Verification Gate: Automated replay test: simulate Token A -> rotates to Token B -> malicious replay of Token A returns 401 and invalidates Token B.

### Task 4: Frontend Axios/Fetch Interceptor
- Action: Handle 401 with queue mutex so 5 concurrent in-flight requests share a single refresh call.
- Verification Gate: Mock 5 concurrent requests, verify \`/api/auth/refresh\` was called exactly ONCE.`
      }
    ]
  },
  {
    command: '/constraints',
    name: 'Constraint-Driven Development',
    skillId: 'constraint-driven-development',
    phase: 'plan',
    keyPrinciple: 'Decide it once, enforce it everywhere',
    description: 'Surfaces the 4 critical constraints upfront: tech stack boundaries, existing conventions, blast radius limits, and error handling philosophies.',
    inputPlaceholder: 'Enter proposed tech stack or feature boundary to evaluate...',
    examples: [
      {
        title: 'Adding State Management to React App',
        input: 'Should we add Redux Toolkit, Zustand, or stick with React Context for shopping cart?',
        simulatedOutput: `## Constraints Audit & Decision Matrix

1. STACK CONSTRAINTS:
- Existing codebase has zero Redux dependencies; adding RTK introduces +38kB gzipped and boilerplate overhead.
- React Context without selector optimization causes full-tree re-renders on every quantity increment.
- Binding Decision: Use Zustand (1.2kB) or simple atom-based store. Zero boilerplate, selector-level subscription.

2. BLAST RADIUS CONSTRAINTS:
- The Cart state touches Checkout, Header Badge, and Product Page "Add" buttons.
- Invariant: Changing Cart store implementation must NOT change the public API \`useCart() => { items, total, addItem }\`.

3. ERROR PHILOSOPHY:
- Network failures during checkout reservation must present optimistic inline rollback, NEVER a white-screen or silent failure.

4. CONVENTION CONTRACT:
- Store files live strictly in \`src/stores/*.ts\`.
- Actions are colocated with state, never in separate action files.`
      }
    ]
  },
  {
    command: '/test',
    name: 'Test-Driven Development (TDD)',
    skillId: 'test-driven-development',
    phase: 'verify',
    keyPrinciple: 'Tests are proof. Red -> Green -> Refactor.',
    description: 'Enforces writing a failing test that reproduces the bug or proves the requirement before writing the implementation code.',
    inputPlaceholder: 'Enter the function or bug you want to test-drive...',
    examples: [
      {
        title: 'Discount Code Calculation Engine',
        input: 'Calculate percentage discount with maximum cap and expiration date check.',
        simulatedOutput: `// 1. RED: Failing Test (Must fail initially)
describe('applyDiscountCode', () => {
  const expiredCode = { code: 'SAVE20', percent: 20, maxCapCents: 5000, expiresAt: '2025-01-01' };
  const validCode = { code: 'SAVE20', percent: 20, maxCapCents: 2000, expiresAt: '2027-01-01' };

  it('rejects expired discount code with EXPIRED_CODE error', () => {
    expect(() => calculateDiscount(10000, expiredCode, '2026-01-01')).toThrow('EXPIRED_CODE');
  });

  it('caps discount at maxCapCents when percentage exceeds limit', () => {
    // 20% of 20000 is 4000, but cap is 2000
    const result = calculateDiscount(20000, validCode, '2026-01-01');
    expect(result.discountAmount).toBe(2000);
    expect(result.finalTotal).toBe(18000);
  });
});

// 2. GREEN: Minimal passing code
export function calculateDiscount(subtotalCents: number, coupon: Coupon, currentDate: string) {
  if (new Date(coupon.expiresAt) < new Date(currentDate)) {
    throw new Error('EXPIRED_CODE');
  }
  const rawDiscount = Math.round(subtotalCents * (coupon.percent / 100));
  const discountAmount = Math.min(rawDiscount, coupon.maxCapCents);
  return { discountAmount, finalTotal: subtotalCents - discountAmount };
}

// 3. REFACTOR: Clean, robust, typesafe
// Extracted Date parser to deterministic ISO comparison; zero floating point precision drift.`
      }
    ]
  },
  {
    command: '/review',
    name: 'Code Review & Quality (5-Axis Review)',
    skillId: 'code-review-and-quality',
    phase: 'review',
    keyPrinciple: 'Improve code health before merge',
    description: 'Five-axis rigorous audit: Correctness, Readability/Simplicity, Architecture, Operational Safety, and Test Quality.',
    inputPlaceholder: 'Paste code diff or snippet to run the Five-Axis Review...',
    examples: [
      {
        title: 'Async User Fetcher with Cache',
        input: `async function getUser(id) {
  if (cache[id]) return cache[id];
  let res = await fetch('/api/user/' + id);
  let data = await res.json();
  cache[id] = data;
  return data;
}`,
        simulatedOutput: `## Five-Axis Code Review Report

### 1. Correctness: ⚠️ CONCERNS
- Missing HTTP error check: If \`res.status === 404\` or \`500\`, \`res.json()\` still parses or throws, and could cache an error payload \`{ error: "Not Found" }\` as valid user data!
- Race Condition / Thundering Herd: If 3 components call \`getUser('42')\` at the same millisecond, 3 parallel network requests fire before any writes to \`cache['42']\`.

### 2. Readability & Simplicity: ✅ PASS
- Code is concise and straightforward.

### 3. Architecture & Boundaries: ⚠️ CONCERNS
- Global mutable \`cache\` object has unbounded memory growth (potential memory leak). Needs TTL or LRU eviction limit.

### 4. Operational Safety: ❌ FAIL
- Unhandled rejection will crash Node processes or throw uncaught in browser without recovery.
- No timeout configuration on \`fetch\`.

### 5. Test Quality: ❌ MISSING
- No unit tests provided for network failure, cache hit vs miss, or non-200 responses.

VERDICT: 🛑 REQUEST CHANGES. Fix in-flight promise deduplication and HTTP status check.`
      }
    ]
  },
  {
    command: '/code-simplify',
    name: 'Code Simplification',
    skillId: 'code-simplify',
    phase: 'review',
    keyPrinciple: 'Clarity over cleverness. Preserve behavior exactly.',
    description: 'Audits code to remove accidental complexity, redundant abstractions, and over-engineered patterns while guaranteeing zero behavioral drift.',
    inputPlaceholder: 'Paste complex or bloated code to simplify...',
    examples: [
      {
        title: 'Over-engineered Factory & Strategy Pattern',
        input: `class PaymentProcessorFactory {
  static create(type) {
    switch(type) {
      case 'stripe': return new StripePaymentStrategy();
      case 'paypal': return new PayPalPaymentStrategy();
      default: throw new Error('Unknown');
    }
  }
}
class StripePaymentStrategy { execute(amount) { return stripe.charge(amount); } }
class PayPalPaymentStrategy { execute(amount) { return paypal.pay(amount); } }`,
        simulatedOutput: `## Simplified Implementation

// Before: 24 lines, 3 classes, runtime switch
// After: 8 lines, direct object dispatch table with static TypeScript types

export const paymentHandlers = {
  stripe: (amount: number) => stripe.charge(amount),
  paypal: (amount: number) => paypal.pay(amount),
} as const;

export type PaymentMethod = keyof typeof paymentHandlers;
export const processPayment = (method: PaymentMethod, amount: number) => 
  paymentHandlers[method](amount);

Eliminated:
- 2 superfluous class instantiations
- Factory abstraction that provided zero runtime polymorphic value
- Cognitive overhead of 3 separate inheritance layers`
      }
    ]
  },
  {
    command: '/webperf',
    name: 'Web Performance Optimization',
    skillId: 'performance-optimization',
    phase: 'review',
    keyPrinciple: 'Measure before you optimize. Focus on Core Web Vitals.',
    description: 'Audits Core Web Vitals (LCP, INP, CLS), client bundle payloads, layout thrashing, and server response times.',
    inputPlaceholder: 'Paste component, bundle breakdown, or page profile to audit...',
    examples: [
      {
        title: 'React Product Grid with High INP & LCP',
        input: 'Our product listing page has 4.2s LCP and 380ms INP when typing in search or clicking filters.',
        simulatedOutput: `## Web Performance Diagnosis & Prescription

### 1. Interaction to Next Paint (INP: 380ms -> Target <200ms)
- Bottleneck: Synchronous re-filtering of 2,000 array items on keydown blocks the main thread.
- Fix: Wrap search query state update in React \`useTransition\` or \`startTransition\`.
- Fix: Virtualize grid items using \`@tanstack/react-virtual\` or CSS \`content-visibility: auto\` so DOM stays under 100 elements.

### 2. Largest Contentful Paint (LCP: 4.2s -> Target <2.5s)
- Bottleneck: Hero image is lazily loaded via JS (\`loading="lazy"\`) on above-the-fold content!
- Fix: Mark the hero banner with \`fetchpriority="high"\` and remove lazy loading from viewport image.
- Fix: Preconnect to image CDN domain (\`<link rel="preconnect" href="https://cdn.example.com">\`).

### 3. Cumulative Layout Shift (CLS)
- Check: Ensure all product card image containers define aspect-ratio CSS (\`aspect-square\`) before image asset downloads.`
      }
    ]
  },
  {
    command: '/ship',
    name: 'Shipping & Launch Verification',
    skillId: 'shipping-and-launch',
    phase: 'ship',
    keyPrinciple: 'Faster is safer. Canary, verify, roll back with confidence.',
    description: 'Pre-flight launch checklist, smoke verification, database migration safety (expand/contract), and rollback runbooks.',
    inputPlaceholder: 'Describe the release scope, migration, or deployment target...',
    examples: [
      {
        title: 'Production Migration & Feature Release',
        input: 'Shipping customer billing upgrade from Stripe Checkout v2 to Stripe Elements custom flow.',
        simulatedOutput: `## Pre-Flight Launch Verification Checklist

### Phase 1: Database & Migration Safety
- [ ] Non-destructive schema: New billing fields added as nullable (Expand phase).
- [ ] Zero-downtime verified: Old version works seamlessly with new schema.

### Phase 2: Feature Flagging & Canary Staging
- [ ] Feature flag \`custom_elements_checkout\` initialized at 0% rollout.
- [ ] Internal dogfood group enabled (100% staff accounts).
- [ ] Ramp plan: 5% -> 25% -> 50% -> 100% over 4 hours with error rate watchdog.

### Phase 3: Rollback Runbook
- [ ] 1-Click Killswitch: Disabling \`custom_elements_checkout\` flag routes traffic back to fallback flow in <500ms without redeploy.
- [ ] Critical metric alert: If HTTP 5xx or payment error spikes above 0.5%, PagerDuty triggers auto-rollback.`
      }
    ]
  }
];
