---
status: draft
readiness: built-and-preview-tested
---

# Design brief: FoldSpace

Prepared on 2 November 2026 using the official Devpost Learn brief template and its AR/Preview references. The entrant delegated routine project choices to the assistant and authorized the build. All design choices below are assistant defaults, not statements from an interview. No plan-lens interview or interview sign-off is claimed; status remains draft for that provenance. The defaults have now been implemented through CLAD in the saved SPECS project and tested in Interactive Preview. Actual results and remaining limits are recorded in `build-report.md`.

## The one spatial moment
A learner folds a paper airplane while a real-scale ghost sheet demonstrates the next crease beside their own paper. They can look around the fold in 3D, replay it, then confirm when they are ready to move on. (default)

## Why it belongs on glasses
- Uses: draws in the world; leaves the user's hands and gaze available for the paper. It does not claim to understand the camera view.
- A crease and a hinged 3D fold have the same size and orientation as the task, avoiding repeated glances at a separate instruction screen. Spatial benefit remains to be verified in Preview; real comfort remains unproven.

## Product or overlay
- Type: a spatial tutorial with manual alignment; the virtual paper is a teaching aid beside a real sheet. (default)
- What the real version would sense: nothing required. The user confirms progress manually.
- Stand-in for Preview: a clearly labeled virtual tabletop and A4 sheet. The demo never claims to recognize a real sheet or verify the user's fold.
- Registration is manual. A grab handle moves the workspace before the lesson; Confirm placement locks it in place. (default)

## Where things live
- The user looks down toward the work surface, keeping arms low. (default)
- Ghost sheet: 21 by 29.7 cm, initially 1.05 m forward and 20 cm below the initial eye origin. Manual placement depth is bounded to 95–130 cm and remains below eye level; the authored workspace transform is also available in the Inspector. It stays anchored in the room when the viewer moves. A measured wire outline is the explicit virtual tabletop stand-in. (default)
- Crease: a bright cyan dashed line on the currently relevant paper face; amber edge and a curved arrow indicate the moving flap. Never indicate direction with color alone. (default)
- Instructions: one short English sentence beside the sheet, with step 1/5 through 5/5. Light text; no opaque dark panel over the folding area. (default)
- Controls: Next and Replay are the primary 8 cm targets at the near edge of the workspace; Back and Reset occupy a secondary row. Keep the complete active workspace within view at the normal standing position. (default)
- The ghost is offset beside the real sheet rather than relying on precise optical registration. Do not claim millimeter accuracy. (default)

## Hands and input
- Confirm placement: standard SIK pinch button, following a SIK grab/drag of the workspace handle. (default)
- Starting the lesson: Confirm placement starts stage 1's animation. Reset starts stage 1 again from the flat sheet. (default)
- Next: standard SIK button; after a stage animation ends, increments exactly once and plays the next stage. At step 5, Finish replaces Next after the wing animation ends. (default)
- Replay: replays the current fold from its starting geometry without changing the step. (default)
- Back: returns to the previous fold's start; disabled at the first step. (default)
- Reset: cancels the old animation, returns to the flat first-step start, and immediately demonstrates stage 1 again. Next is guarded until that demonstration ends. Placement stays locked. (default)
- Targets are big and highlight when aimed at; voice is not required.
- Do not infer correctness from a click. Next means the learner chooses to continue.

## When things show
- Before placement: only the sheet outline, movement handle, and Confirm placement appear. (default)
- During a lesson: show only the current crease, fold arrow, one instruction, progress, and relevant controls. Completed arrows disappear. (default)
- Each fold animation takes about 2 seconds; its final pose holds until Next or Replay. Disable Next during transitions so rapid clicks cannot skip steps. (default)
- Finish: show a short virtual plane takeoff and completion message, with Reset available. This is a celebration, not a physics prediction. (default)
- Nothing requests attention behind the user. Pause the lesson until they act. (default)

## Five lesson stages
1. Fold the A4 sheet lengthwise in half, then open it to reveal the center crease.
2. Fold both top corners inward so their top edges meet the center crease.
3. Fold the new sloping edges inward to the center again to narrow the nose.
4. Fold the model in half along the center crease, keeping the folded layers inside.
5. Fold each wing down symmetrically, then open the wings into the final airplane.

Each stage may contain two sequential sub-animations, with a short hold between left and right folds. Geometry must conserve sheet dimensions and use plausible hinges. First validate all folds physically with an A4 sheet; if an instruction or mesh is ambiguous, fix it before recording. (default)

## Done criteria
All five functional criteria now have Preview evidence. The seven focused LEAF checks and actual captures are listed in `build-report.md`; real-device feel and physical-paper validation remain unproven.
1. A user can move and lock the workspace, then walk sideways in Interactive Preview and see that the sheet stays fixed in the room.
2. Next visits all five stages in order, updating the step, crease and geometry together; rapid clicks during animation never skip a stage.
3. Replay preserves the current step and returns the same final fold. Back returns one stage and is unavailable at step 1.
4. Reset works both during a fold and at completion, restoring the flat first-step start and replaying its demonstration without duplicate timers or geometry.
5. Finish becomes available only after stage 5, plays one completion flourish, then allows a clean restart. A human can read the controls and inspect fold direction from the normal task position.

## Out of scope
- Camera recognition, automatic paper tracking, fold correctness detection, voice, networking and cloud APIs.
- Custom gestures, two-hand tracking, persistent spatial anchors and shared sessions.
- Flight simulation, scoring, copyrighted models, downloaded music and personal recordings.

## Risks and open questions
- Setup resolved: a fresh SPECS Base Template was saved in Lens Studio 5.23.2.26081320; final TypeScript compilation and native save succeeded. Compatible Leaf 2.0.2 is used with the template's SIK/UIKit 2.0 packages.
- The first hinged fold plus Replay passed in actual Preview before full lesson progression was enabled. All-stage tests preserve the A4 material area of 623.7 cm².
- This remains a template-derived, delegated design, not a learner interview transcript. The official plan-lens references informed the spatial defaults and Preview scope.
- Real paper alignment, physical-paper fold validation, real hand tracking and sustained comfort remain unproven. Preview captures and logic tests do not establish those claims.
- Entrant eligibility and Devpost registration are handled separately from the Lens build. Repository and video publication are separate workflow steps; do not fabricate their URLs.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
