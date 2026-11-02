# FoldSpace

A paper-airplane tutor that puts the next fold beside the sheet you are working on.

FoldSpace is a SPECS Lens built in **Lens Studio 5.23.2.26081320** for [Learn AR with SPECS](https://learn-specs.devpost.com/). It runs in Interactive Preview without glasses. The local build compiles successfully and has passed seven focused LEAF scenarios. The demo recording and public YouTube link are pending.

## Experience

Place a life-size **21 × 29.7 cm** A4 ghost sheet in the virtual workspace, then press **Confirm placement**. A five-stage tutorial demonstrates the centre crease, corner folds, narrower nose, body fold and wings. Cyan dashes mark the active hinge; an amber edge and curved arrow show which part moves.

The demonstration is intended to sit beside real paper. Placement and progress are manual: FoldSpace does not recognize, track or judge a physical sheet. The completion flight is a short visual reward, not an aerodynamic prediction.

| Control | Behavior |
| --- | --- |
| Drag workspace | Move the workspace before confirmation |
| Confirm placement | Lock the workspace for the current run and play the first demonstration |
| Next | Continue after the current animation; guarded during transitions |
| Replay | Repeat the current stage without advancing |
| Back | Return to the preceding stage's starting pose; unavailable at the first stage |
| Reset | Cancel the current action and replay stage 1 from a flat sheet |
| Finish | Appear at stage 5 and play one completion flourish after its animation |

## Open and try

1. Install Lens Studio **5.23.2** and open `FoldSpace.esproj` from this repository. Keep `Assets/`, `Packages/` and their `.meta` files together.
2. Let the native packages import and TypeScript compile. This build uses the template's **SIK/UIKit 2.0** and **Leaf 2.0.2**; upgrading these packages is not required to run it.
3. Open the Preview panel in Interactive/SPECS simulation mode. Click the standard controls as simulated pinch interactions and drag the workspace handle before confirming.
4. Use WASD and right-drag to inspect the guide from nearby viewpoints. The workspace should stay fixed in the room during the current run.

Lens Studio regenerates its local cache and support files. MCP credentials, private keys, editor preferences and generated caches are intentionally excluded from version control. Reading or running the saved Lens does not require publishing those files.

## Verification

The following scenarios passed in actual Interactive Preview using native LEAF. They drive real UIKit/SIK controls rather than changing lesson state directly:

- `foldspace-first-fold-proof`
- `foldspace-placement-lock`
- `foldspace-five-stage-order`
- `foldspace-replay-back`
- `foldspace-reset-during-fold`
- `foldspace-finish-restart`
- `foldspace-ik-reach`

To rerun a focused scenario, reset Preview, select it in the LEAF panel, run it, and inspect the Logger result. Run scenarios serially from a fresh Preview state. For `foldspace-ik-reach`, set `__leaf__diagnostic_policy` to `fail-fast`: this checks actual IK reach to Confirm placement instead of allowing the default diagnostic fallback to simulate reach. The recorded passing run used `fail-fast`. The optional `foldspace-demo-tour` and `foldspace-capture-start` are recording helpers, not additional assertions-based passes.

Geometry checks sampled all five stages: material area remained **623.7 cm²**, and the flat runtime mesh measured **21 × 29.7 cm**. Native screenshots show distinct fold poses and room-relative parallax after moving the Preview camera. Details, limitations and test evidence are in [the build report](devpost/build-report.md); captures are in [devpost/qa](devpost/qa).

## How it was built

The project uses TypeScript, CLAD and Lens Studio MCP, a code-authored MeshBuilder paper model, UIKit controls, SIK manipulation and three locally synthesized sound effects. Exact polygon clipping and hinge rotations preserve the paper's material layers. A single deterministic clock controls animation and reset behavior.

The plan uses the official Devpost Learn skill's brief template and AR/Preview references. The entrant delegated routine choices; no design interview or interview answers are claimed. [Provenance](devpost/provenance.md) records the starting template, reused packages and generated assets. [Third-party notices](THIRD_PARTY_NOTICES.md) identify the external assets and licenses.

## Limits

The project has not been tested on physical SPECS glasses or by physically folding A4 paper. Real hand tracking, sustained comfort, optical alignment and instructional clarity with real paper remain unverified. Workspace locking lasts for the current run; it is not a persistent anchor across sessions. Preview and geometry results do not establish those hardware or teaching outcomes.

Repository: [ProMartY/FoldSpace](https://github.com/ProMartY/FoldSpace). A public YouTube demonstration link will be added after recording and upload.

