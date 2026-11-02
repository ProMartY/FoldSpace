# FoldSpace build report

Built on 2 November 2026 in `FoldSpace.esproj`, Lens Studio **5.23.2.26081320**, target **Spectacles**. The project was saved through the native Editor API. Final TypeScript compilation succeeded.

## What works

FoldSpace is a real-scale A4 paper-airplane tutor with manual workspace placement, five articulated demonstrations, Replay, Back, Reset and a short Finish flight. Cyan dashes identify the current hinge; amber edges and a curved arrow identify motion. Progress is explicitly manual. The Lens does not recognize a sheet or check a person's fold.

All visible controls and instruction surfaces use UIKit inside `FoldSpaceLessonUI.ts`. The controller communicates through typed inputs, setters and events. Standard SIK interaction supplies mouse/pinch input; the placement handle uses InteractableManipulation. Confirm hides the handle and leaves the workspace world-fixed for the current run.

Reset cancels the old transition, returns to the flat first-stage start and immediately demonstrates stage 1 again. Next stays guarded during that demonstration. Finish is actionable only after the fifth animation; repeated activation does not launch another flourish. The workspace outline stays fixed while only the paper visual flies.

## Implementation and provenance

The official CLAD Specs Experience Builder procedure, field notes and scene-construction workflow informed the build. Scene roots and typed references were authored with two VirtualScene bootstrap applies. A third apply removed the incompatible tool-generated inspection handler; the custom bootstrap itself had zero apply errors.

The official Learn `plan-lens` skill, AR design rules, Preview limits and brief template informed these defaults: one spatial moment; real A4 scale beside the real task; large standard controls; current-step information; explicit manual alignment; laptop Preview as the test target. The entrant delegated routine choices. **No interview, interview answers or physical-paper validation were invented.** The design brief keeps that provenance.

The animated paper uses the **code-authored MeshBuilder backend**, deliberately selected through `build-mesh`/`mesh-builder-scripting` for exact articulated hinges. It is not an AI-generated GLB or a substitute after an AI generation failure. Polygon clipping carries every material layer across each hinge. Rodrigues rotations preserve rigid facet dimensions; immutable start snapshots make Replay deterministic. Small render-only layer offsets reduce coplanar flicker. The completed model rolls into a readable wing-horizontal presentation.

`build-sfx` generated three local, algorithmic WAVs: soft click (Back), paper rustle (Confirm/Next/Replay/Reset), and flight whoosh (Finish). They are wired to LowLatency AudioComponents. No music was planned for this utility. Six Material Symbols icons were imported by IconSelector and are used by the controls. Typography uses the kit's existing font.

## Source map

| File in `Assets/Scripts/` | Owns |
| --- | --- |
| `FoldSpaceMain.ts` | Lifecycle, coordination, input guards, placement bounds and audio |
| `FoldSpaceState.ts` | Single progression/animation clock; no delayed timers |
| `FoldSpaceGeometry.ts` | A4 facets, clipping, hinges and immutable stage snapshots |
| `FoldSpacePaperMesh.ts` | Runtime paper, crease, edge, direction and tabletop-outline geometry |
| `FoldSpaceLessonUI.ts` | Passive UIKit view and interaction-intent events |
| `FoldSpaceSceneContracts.ts` | Stable scene and asset names |
| `FoldSpaceLeaf*.ts` | Focused QA scenarios, shared real-button actions, index and optional demo |

## Actual verification

Native LEAF calls ran **serially in Interactive Preview**, using compatible **Leaf 2.0.2** and the template's **SpectaclesInteractionKit/SpectaclesUIKit 2.0** packages. The scene-side scenario manager emitted PASSED lines for the focused tests below. Reset, Finish and placement were run again after their final behavior changes. Full progression succeeded again after the final presentation/footer changes. No unrun scenario is listed as a test pass.

| Scenario | Result | Evidence |
| --- | --- | --- |
| `foldspace-first-fold-proof` | PASSED | Actual midpoint pose 0.257; area 623.7 cm²; Replay preserved step and identical terminal geometry |
| `foldspace-placement-lock` | PASSED | SIK drag changed position; Confirm hid handle; locked world root remained stationary; final run at approximately (-4.71,-10,-95) cm |
| `foldspace-five-stage-order` | PASSED | Five stages in order; second rapid Next did not skip; intermediate material area remained 623.7 cm²; runtime mesh width/depth checked |
| `foldspace-replay-back` | PASSED | Replay preserved current stage/final geometry; Back returned one stage to its start; first-stage guard held |
| `foldspace-reset-during-fold` | PASSED | Old transition cancelled; stage 1 replayed from flat; Next guarded until completion; exactly one completion revision |
| `foldspace-finish-restart` | PASSED | Finish after stage 5; one flourish; repeat guarded; Reset cleared completion and demonstrated stage 1 again |
| `foldspace-ik-reach` | PASSED | IK Confirm with `__leaf__diagnostic_policy: fail-fast`; no diagnostic fallback was used |

The optional `foldspace-demo-tour` is registered for recording and **was not run by the builder**. It drives real UIKit controls over approximately 76 seconds. For clean footage use `__leaf__log_level: ERROR`, timeout 120. `foldspace-capture-start` was run as a scene-setup helper, not counted among the seven assertions-based checks; it temporarily slows the current demonstration to 5 seconds for motion capture. A scene reset restores the normal 2.6-second duration.

### Geometry, placement and static audit

- First-fold and terminal screenshots show distinct actual motion poses. The final plane was visually reviewed after its presentation fix.
- Flat runtime mesh width/depth measured **21 × 29.7 cm**. Material area remained **623.7 cm²** at the sampled poses of every stage.
- GetBoundingBox on the authored paper slot returned its editor placeholder bounds (1 cm), because the mesh children are runtime-generated. LEAF read the runtime RenderMeshVisual instead. Its AABB remains conservative over dynamic updates, so the reported Y extent is not asserted as current paper thickness. Current captures and exact facet geometry establish the visible pose.
- Instruction panel, paper and controls occupy separate vertical/depth regions in the normal task view. Paired captures after moving the Preview camera 12 cm sideways show room-relative parallax. The root remains unparented to the camera.
- All requireAsset paths resolve. All three generated WAVs and six icon PNGs have imported `.meta` files. The vertex-color material is wired.
- Production code has no UI creation or UIKit imports outside the UI module. No hand-built UI backplate/button or absolute-position text stack was used.
- One deterministic Update clock drives the lesson; Reset has no stale callback or duplicate timer to cancel.

## Captures

The `devpost/qa/` PNGs were saved by native PreviewPanelTool after explicitly creating the directory, then verified on disk. The screenshot tool can report success without creating a missing parent directory, so early unverified path reports were discarded.

- `placement.png` — readable manual placement view.
- `fold1-motion.png`, `fold1-terminal.png` — distinct first-fold poses (capture helper uses 5 seconds).
- `locked-before-walk.png`, `locked-after-walk.png` — world-placement camera parallax evidence.
- `final-airplane.png` — current clean stage-5 view, horizontal wings, Finish and corrected footer. This supersedes the earlier `stage5-wings.png` presentation capture.

Root visual QA reviewed the final plane and paired walk captures and confirmed readable controls and anchoring parallax. Root owns subsequent recording/publication.

## External limitations and resolved tool issues

- No physical SPECS device was available. **Feel unproven:** sustained comfort, real hand-tracking behavior, optical alignment and additive-display appearance on hardware.
- Physical A4 folding was not performed. The geometry is mathematically validated and visually inspected in Preview; instructional clarity with real paper remains for a human to try.
- Anchoring is world-fixed within the current Preview/Lens run, not a persistent spatial anchor across sessions.
- The newest Asset Library Leaf 4 and automatically imported AiPreviewAgentInspect targeted renamed InteractionKit/UIKit 4 packages and were incompatible with this 5.23 template. Native package operations selected official Leaf 2.0.2 and removed the incompatible inspection package/handler. Native save → release project → reopen rebuilt stale compiler state. No dependency source or generated Cache files were edited.
- QueryRuntimeScene/CaptureRuntime inspection bridges were not used for final QA because of that compatibility issue. Native panel captures, native logs and compatible LEAF supplied the actual evidence.
- The optional Inter tool call did not return and was abandoned. A later filesystem audit found that its native import had nevertheless completed (`Assets/Fonts/Inter.ttf` plus `.meta`). The UI keeps the working kit font. This optional Inter asset is unused; no runtime feature depends on it.

**Self-caused limitations at sign-off: none known.** Publishing, video upload and Devpost submission are outside this builder handoff and are not claimed here.

## Machine-readable summary

```yaml
tier: interactive
asset_manifest:
  meshes: [FoldSpacePaperMesh.ts]
  sfx: [FoldSpaceClick.wav, FoldSpacePaper.wav, FoldSpaceFlight.wav]
  icons: [arrow_forward.png, replay.png, arrow_back.png, restart_alt.png, check.png, open_with.png]
  ui_modules: [FoldSpaceLessonUI.ts]
  scripts: [FoldSpaceMain.ts, FoldSpaceState.ts, FoldSpaceGeometry.ts, FoldSpacePaperMesh.ts, FoldSpaceSceneContracts.ts, FoldSpaceLeafIndex.ts, FoldSpaceLeafActions.ts, FoldSpaceLeafProof.ts, FoldSpaceLeafPlacement.ts, FoldSpaceLeafProgression.ts, FoldSpaceLeafReplayBack.ts, FoldSpaceLeafReset.ts, FoldSpaceLeafFinish.ts, FoldSpaceLeafReach.ts, FoldSpaceLeafDemo.ts, FoldSpaceLeafCapture.ts]
backend_deviations: []
mesh_backend: {FoldSpacePaperMesh.ts: code-authored MeshBuilder, reason: animated/articulated exact A4 hinge geometry}
spatial_layout: |
  Workspace root (0,-20,-105) cm; identity rotation and unit scale. Paper slot at local(0,0,0), flat XZ A4 21×29.7cm with nose toward -Z. Instruction panel local(0,22,0), 42×12cm; far above paper. Controls local(0,-12,18), 38×14cm; near edge, below paper. Virtual work-surface outline 29×37cm at localY=-0.5; paper on surface. All children move with workspace before confirmation; root remains world-fixed after lock. Flight visual travels -Z and +Y within a short 45cm flourish.
tests_passed: [foldspace-first-fold-proof, foldspace-placement-lock, foldspace-five-stage-order, foldspace-replay-back, foldspace-reset-during-fold, foldspace-finish-restart, foldspace-ik-reach]
tests_not_run: [foldspace-demo-tour]
orphan_assets: [Assets/Fonts/Inter.ttf]
self_caused_limitations: []
external_limitations: [no physical SPECS validation, no physical-paper folding validation, current-run anchoring only]
```
