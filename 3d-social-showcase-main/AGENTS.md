<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the scrolling portfolio in a browser-only index route with separate presentation and 3D scene modules; this prevents WebGL from entering server rendering.
- Store visual colors in CSS semantic tokens and read those tokens for 3D materials; this keeps the page and scene palette consistent.
- Keep inquiries as validated, non-delivering demo interactions; this prevents the sample site from implying real message delivery.
- Use bundled generated imagery and CDN asset pointers for downloaded models; this keeps media available without third-party hotlinks.
