# Design Guidelines: From Bumble to Forever

## Design Approach
**Reference-Based Approach** inspired by romantic, architecturally-focused interfaces like Airbnb (spatial design), Behance (artistic portfolios), and modern wedding websites, adapted with urban planner aesthetic.

## Core Design Elements

### A. Color Palette
**Light Mode (Primary):**
- Primary: 340 65% 88% (blush pink)
- Secondary: 270 50% 85% (soft lavender)
- Accent: 200 45% 82% (soft blue)
- Gold Highlights: 45 75% 75% (soft gold)
- Background: 0 0% 98% (off-white)
- Text: 0 0% 20% (charcoal)

**Dark Mode:**
- Primary: 340 40% 25% (deep rose)
- Secondary: 270 30% 25% (deep lavender)
- Background: 240 10% 12% (deep navy-gray)
- Text: 0 0% 95% (off-white)

### B. Typography
- **Headings:** Playfair Display (elegant serif) - 700 weight
- **Romantic Accents:** Parisienne or Dancing Script (handwritten script)
- **Body:** Inter (clean sans-serif) - 400/500 weights
- **Hero Title:** 4xl to 6xl, romantic script overlay
- **Section Headers:** 3xl to 4xl, serif
- **Body Text:** base to lg, sans-serif

### C. Layout System
- **Spacing Units:** Tailwind units of 4, 8, 12, 16, 20, 24
- **Section Padding:** py-20 desktop, py-12 mobile
- **Container:** max-w-7xl with px-6
- **Grid Systems:** 12-column for milestones, masonry for memories

### D. Component Library

**Hero Section (Full Viewport):**
- Gradient background (blush to lavender to soft blue)
- Floating geometric shapes (SVG lines, circles, rectangles) with parallax
- Animated headline with script font overlay
- Interactive heart burst on click
- Gentle floating animation for "28" balloons

**Journey Timeline:**
- Horizontal scroll on mobile, vertical on desktop
- Milestone cards with icon, title, description
- Connecting animated arcs/lines between points
- Scroll-triggered fade-in + slide-up animations
- Icons: chat bubble, airplane, city skyline, home

**Memory Cards Grid:**
- Masonry/grid layout (2-3 columns desktop)
- Card flip animation on scroll-in
- Hidden Easter eggs: clickable hearts reveal messages
- Soft shadow + hover sparkle effect
- Image placeholders with romantic moments

**Birthday Celebration Centerpiece:**
- Large "Happy 28th Birthday!" with balloon animations
- Floating "28" balloons with CSS keyframe animation
- Confetti particle system on scroll-in
- Cursor-responsive hearts that follow movement
- Interactive balloon pop on click

**Future Dreams Parallax:**
- Layered skyline silhouettes (Dublin + Guwahati + Jorhat blend)
- Parallax scrolling at different speeds
- Dream icons with subtle float animations
- Soft gradient sky background (pastel sunset)
- Final romantic message in script font

**Footer:**
- Clean minimal design
- "Built with love — from Dublin to Jorhat 💞"
- Small animated heart icon pulse

### E. Animations & Interactions

**Scroll-Driven:**
- Parallax on geometric shapes and skylines
- Fade-in + slide-up for timeline milestones
- Card flip/pop for memory moments
- Progress-based confetti trigger

**Micro-Interactions:**
- Heart burst on click (confetti particles)
- Hover sparkles on cards
- Balloon float with gentle bounce
- Cursor-following hearts in celebration section
- Easter egg reveals with scale + fade

**Keyframe Animations:**
- Floating hearts: translateY + opacity loop
- Balloon float: transform + rotate subtle
- Geometric shapes: slow rotation + drift
- Sparkle twinkle: opacity + scale pulse

## Images

**Hero Section:**
- Large romantic illustration or abstract geometric art as background overlay
- Soft, dreamy quality with pastel tones
- Optional: silhouette couple or abstract heart shapes

**Memory Cards:**
- Placeholder romantic moment illustrations
- Chat screenshots mockups
- Travel/location representative images
- LDR moment representations

**Skyline Section:**
- Custom blended skyline silhouette combining Dublin, Guwahati, and Jorhat architecture
- Layered for parallax effect (3-4 layers)
- Soft gradient sky background

## Special Implementation Notes

- All geometric shapes use SVG for crisp rendering
- Confetti/particle effects use canvas or lightweight library
- Smooth scroll behavior with momentum
- Mobile-first responsive breakpoints
- Performance-optimized animations (transform/opacity only)
- Easter eggs: data attributes for hidden messages
- Architectural grid overlay (subtle) as design element
- All interactive elements have clear hover/active states