// Every limit the wireframes call "implementation configuration" lives here.
export const CONFIG = {
  otpLength: 6,
  otpTtlMs: 5 * 60 * 1000,          // shown as 04:59 on the first tick
  resendCooldownMs: 30 * 1000,
  maxOtpAttempts: 5,                // wrong codes before the challenge is burned
  maxSendsPerWindow: 5,             // code sends per phone per window
  sendWindowMs: 60 * 60 * 1000,
  pinLength: 6,
  maxPinAttempts: 3,                // agreed doctor signing-PIN rule
  idleLockMs: 30 * 60 * 1000,
  sessionTtlMs: 8 * 60 * 60 * 1000, // PIN unlock never extends this
  // One phone plus one tablet, laptop or desktop. Other staff roles reuse the
  // same limit until the wireframes say otherwise.
  deviceLimits: { phone: 1, large: 1 },
};

export const ROLES = {
  doctor: { landing: 'home' },
  chief: { landing: 'home' },
  rep: { landing: 'stock' },
  operator: { landing: 'clinics' },
};
