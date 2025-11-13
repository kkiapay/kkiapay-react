# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The KKiaPay team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:

**support@kkiapay.me**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include in Your Report

Please include the following information:

* Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

### What to Expect

After you submit a report, we will:

1. **Acknowledge receipt** of your vulnerability report within 48 hours
2. **Confirm the problem** and determine affected versions
3. **Audit code** to find any similar problems
4. **Prepare fixes** for all supported versions
5. **Release security patches** as soon as possible
6. **Publicly disclose** the vulnerability after fixes are released

### Disclosure Policy

* We will coordinate with you on the disclosure timeline
* We prefer to fully disclose bugs as soon as possible once a user mitigation is available
* We will credit you in the security advisory (unless you prefer to remain anonymous)

## Security Best Practices for Users

When using kkiapay-react in your application:

### 1. API Key Security

✅ **DO:**
* Store API keys in environment variables
* Use different keys for development and production
* Keep your private/secret keys on the backend only
* Use the public key in your frontend code

❌ **DON'T:**
* Hardcode API keys in your source code
* Commit API keys to version control
* Share API keys in public forums or documentation
* Use production keys in development

**Example:**
```typescript
// ✅ Good - Using environment variable
const apiKey = process.env.REACT_APP_KKIAPAY_PUBLIC_KEY;

// ❌ Bad - Hardcoded key
const apiKey = '3425dc6035d711eca8f5b92f2997955b';
```

### 2. Payment Verification

✅ **ALWAYS verify payments on your backend** using KKiaPay's API

Never trust client-side payment success callbacks alone. Always verify the transaction on your server:


### 3. HTTPS Only

✅ **Always use HTTPS** in production to protect sensitive data in transit

### 4. Input Validation

✅ **Validate all payment parameters** before passing to the widget:

```typescript
function validatePaymentAmount(amount: number): boolean {
  return amount > 0 && amount <= 20000000; // Example limits
}

const handlePayment = () => {
  if (!validatePaymentAmount(amount)) {
    console.error('Invalid amount');
    return;
  }
  
  openKkiapayWidget({ amount, key, sandbox });
};
```

### 5. Error Handling

✅ **Implement proper error handling** to avoid exposing sensitive information:

```typescript
const { error } = useKKiaPay();

if (error) {
  // Log detailed error for debugging
  console.error('Payment system error:', error);
  
  // Show generic message to user
  showUserMessage('Payment system temporarily unavailable');
}
```

### 6. Dependencies

✅ **Keep dependencies up to date** to receive security patches:

```bash
npm audit
npm update
```

### 7. Content Security Policy

✅ **Configure CSP headers** to allow KKiaPay domains:

```
Content-Security-Policy: 
  script-src 'self' https://widget.kkiapay.me;
  frame-src 'self' https://widget.kkiapay.me;
```

### 8. Rate Limiting

✅ **Implement rate limiting** on your backend to prevent abuse:

```typescript
// Example: Limit payment attempts per user
const MAX_ATTEMPTS = 5;
const TIME_WINDOW = 3600000; // 1 hour
```

## Known Security Considerations

### Client-Side Payment Processing

This library runs in the browser and handles payment UI. Remember:

* All client-side code can be inspected and modified
* Never perform authorization or final payment verification in the frontend
* Always validate and verify transactions on your secure backend

### Dynamic Module Loading

The library uses dynamic imports to load the KKiaPay module:

* This is done over HTTPS from npm's CDN
* The module is loaded from the `kkiapay` package dependency
* Ensure your package-lock.json is committed to prevent supply chain attacks

## Security Updates

We will announce security updates through:

* GitHub Security Advisories
* npm security advisories
* Email to security@kkiapay.me subscribers
* CHANGELOG.md

## Bug Bounty Program

We currently do not have a bug bounty program, but we deeply appreciate security researchers who responsibly disclose vulnerabilities to us.

## Contact

For any security concerns, please contact:

* **Email:** support@kkiapay.me
* **General Support:** support@kkiapay.me

---

Thank you for helping keep kkiapay-react and our users safe!
