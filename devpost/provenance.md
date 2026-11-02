# FoldSpace provenance

Prepared for the 2026 Learn AR with SPECS entry. This records actual sources and work; it does not invent an interview or a participant's personal learning history.

## New project work

The SPECS project was created and the FoldSpace implementation was authored on **2 November 2026**. New work includes the articulated A4 geometry, lesson state/controller, UIKit lesson view, placement and progress flow, focused LEAF scenarios, and three algorithmically generated sound effects. The final project targets Spectacles in Lens Studio **5.23.2.26081320**.

CLAD's Specs Experience Builder procedure and specialist skills guided the implementation. Scene construction and package operations used Lens Studio MCP, VirtualScene and native Editor APIs. The build report lists actual tool issues, resolutions, successful tests and remaining limits.

## Planning source

The design brief uses [challengepost/learn-specs](https://github.com/challengepost/learn-specs), commit `5d8bc0800346d38e468c29b15afcb7ca92280005`: the official `plan-lens` skill, brief template, AR design rules and Preview limits. The entrant delegated routine concept and implementation choices to the assistant. Those defaults are labeled in the brief. No user interview, interview responses or interview sign-off is claimed. The source's MIT notice is retained in `LICENSES/Devpost-Learn-MIT.txt`.

## Pre-existing material and generated assets

| Material | Origin and use |
| --- | --- |
| SPECS Base Template | Lens Studio 5.23.2 starting scene, rendering resources and package references |
| SpectaclesInteractionKit / SpectaclesUIKit 2.0 | Snap packages supplying standard input, manipulation, layouts and controls |
| Leaf 2.0.2 | Snap automated testing package used for the seven focused Preview scenarios |
| Motion, Icons, Bitmoji 3D and template resources | Pre-existing native package/template content retained in the saved project; not claimed as original FoldSpace work |
| Six control icon PNGs | Google Material Symbols imported through IconSelector: `arrow_forward`, `replay`, `arrow_back`, `restart_alt`, `check`, `open_with` |
| Existing kit typography | The working runtime UI uses the kit's font |
| `Assets/Fonts/Inter.ttf` | Optional native font import that completed after the tool response stalled; unused by the runtime UI and retained with its OFL notice |
| `SimpleVertexBaseColor.lspkg` | Pre-existing vertex-color material/shader package used by the generated paper mesh |
| IconAtlas editor tooling | Tool-generated editor plugin supporting imported icons; not original tutorial functionality |
| Three WAV sound effects | Generated locally through CLAD `build-sfx`; algorithmic click, paper rustle and flight whoosh, with no sampled recording or music |
| Paper mesh | New code-authored MeshBuilder geometry, deliberately selected for articulated hinges; no generated GLB or downloaded paper model |

No camera-recognition service, cloud API, user recording, sampled music or downloaded paper-airplane model is used by the FoldSpace experience. See `THIRD_PARTY_NOTICES.md` for external asset notices.

## Evidence boundaries

Seven focused LEAF scenarios passed in Interactive Preview; TypeScript compiled and the project was saved. Native captures establish visible poses and placement parallax. No physical SPECS test, physical-paper test, completed video upload or completed contest submission is asserted by this provenance record. Subsequent publication status is maintained separately from the build evidence.

