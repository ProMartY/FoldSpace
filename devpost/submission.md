# FoldSpace

**Elevator pitch:** A paper-airplane tutor that puts the next fold beside the sheet you are working on.

## Inspiration

Paper folding is spatial, while its instructions often sit on a separate screen. FoldSpace explores bringing the demonstration into the same workspace: a real-scale ghost sheet that shows one fold at a time while the learner keeps their real paper nearby.

## What it does

FoldSpace is a SPECS Lens with a five-stage A4 paper-airplane tutorial. After manually positioning the workspace, the learner confirms placement and sees the first fold. Cyan hinge marks, an amber moving edge and a curved arrow explain the motion. The five stages cover the centre crease, corners, narrower nose, body and wings.

Next advances at the learner's pace, Replay repeats a demonstration, Back returns to the preceding stage's start, and Reset cancels the current action and demonstrates stage 1 again. Finish becomes available after the fifth animation and plays a short virtual flight. The workspace stays fixed in the room during the current run.

Progress is manual. FoldSpace does not recognize or track real paper, check the learner's fold, or predict flight performance.

## How it was built

The project was created in Lens Studio 5.23.2 and built through CLAD and Lens Studio MCP. The plan uses the official Devpost Learn brief template and AR/Preview references. The entrant delegated routine design choices to the assistant; no design interview or interview answers are claimed.

TypeScript MeshBuilder geometry clips and rotates paper facets around exact hinges while retaining the material layers. Immutable stage snapshots make Replay deterministic. UIKit supplies the visible controls, SIK supplies standard interactions and manipulation, and one animation clock controls progression and Reset. Three locally synthesized sound effects mark actions and completion. Existing Snap packages, Material Symbols and an unused optional Inter import are disclosed in the repository notices.

## Challenges and results

The main challenge was showing a believable fold while conserving the paper's material area. Sampled poses across all five stages retain 623.7 cm², and the flat runtime mesh measures 21 × 29.7 cm. Another challenge was compatible package versions: the working build uses Leaf 2.0.2 with the template's SIK/UIKit 2.0 packages.

Seven focused LEAF scenarios passed in actual Interactive Preview. They exercise real controls for placement, progression and rapid-click guards, Replay/Back, Reset during animation, completion/restart and IK reach. Native captures show distinct motion poses and room-relative parallax after moving the Preview camera. The repository includes the detailed build report and captures.

## What the build established

The implementation demonstrates a complete spatial tutorial flow in laptop Preview and shows how standard AR controls can remain separate from the folding area. It also makes the sensing boundary explicit: pressing Next is the learner's decision, not evidence that a camera understood the fold.

No physical SPECS glasses or real-paper folding test was performed. Hardware comfort, real hand tracking, optical alignment and teaching effectiveness with physical paper remain unverified. The completion flourish is a visual reward; the room anchor lasts only for the current run.

## What's next

The next useful step is a hands-on trial with A4 paper and a real device, followed by changes based on observed folding and interaction difficulties.

**Built with:** Lens Studio 5.23.2, TypeScript, CLAD, Lens Studio MCP, MeshBuilder, SpectaclesInteractionKit, SpectaclesUIKit, LEAF.

**Repository:** https://github.com/ProMartY/FoldSpace

**Video:** Public YouTube demo URL pending recording and upload. Replace this line with the real URL before final submission.

