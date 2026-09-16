# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Eliminating Waterfalls (async)

**Impact:** CRITICAL  
**Description:** Avoidable waterfalls add dependent latency. Flattening high-impact request chains often yields the largest gains.

## 2. Bundle Size Optimization (bundle)

**Impact:** CRITICAL  
**Description:** Reducing unnecessary initial JavaScript can improve startup responsiveness and page rendering.

## 3. Server-Side Performance (server)

**Impact:** HIGH  
**Description:** Optimizing server rendering and data fetching can remove avoidable waits and reduce response times.

## 4. Client-Side Data Fetching (client)

**Impact:** MEDIUM-HIGH  
**Description:** Automatic deduplication and efficient data fetching patterns reduce redundant network requests.

## 5. Re-render Optimization (rerender)

**Impact:** MEDIUM  
**Description:** Reducing unnecessary re-renders minimizes wasted computation and improves UI responsiveness.

## 6. Rendering Performance (rendering)

**Impact:** MEDIUM  
**Description:** Optimizing the rendering process reduces the work the browser needs to do.

## 7. JavaScript Runtime Performance (js)

**Impact:** LOW-MEDIUM  
**Description:** TypeScript emits JavaScript, so these rules optimize emitted runtime behavior. Examples use TypeScript to match the repository source.

## 8. Advanced Patterns (advanced)

**Impact:** LOW  
**Description:** Advanced patterns for specific cases that require careful implementation.
