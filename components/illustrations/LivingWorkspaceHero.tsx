export function LivingWorkspaceHero() {
  return (
    <figure className="living-workspace">
      <svg
        className="living-workspace__drawing"
        viewBox="0 0 560 520"
        role="img"
        aria-labelledby="living-workspace-title living-workspace-description"
      >
        <title id="living-workspace-title">A question held on an open working surface</title>
        <desc id="living-workspace-description">
          A quiet abstract workspace containing a question, several material fragments,
          one relationship, a focus point and a deliberately incomplete boundary. One
          fragment remains outside the boundary.
        </desc>

        <g className="living-workspace__surface">
          <path className="living-workspace__surface-wash" d="M72 58H482V414H72Z" />
          <path className="living-workspace__boundary living-workspace__boundary--long" d="M72 414V58H482V414H338" />
          <path className="living-workspace__boundary living-workspace__boundary--short" d="M254 414H72" />
        </g>

        <g className="living-workspace__question">
          <path d="M178 183C218 158 300 158 349 184C359 212 356 251 341 278C297 297 224 296 183 277C171 249 169 213 178 183Z" />
          <path className="living-workspace__question-mark" d="M209 218C239 207 283 209 320 220M221 249C251 241 281 242 304 249" />
        </g>

        <g className="living-workspace__material living-workspace__material--one">
          <path d="M104 112L164 102L171 143L111 151Z" />
          <path d="M119 126L153 121" />
        </g>

        <g className="living-workspace__material living-workspace__material--two">
          <path d="M116 320L183 309L194 355L126 366Z" />
          <path d="M136 335L171 329" />
        </g>

        <g className="living-workspace__material living-workspace__material--outside">
          <path d="M350 421L400 431L391 480L341 469Z" />
          <path d="M359 445L386 451" />
        </g>

        <path className="living-workspace__relationship" d="M167 329C194 335 216 319 226 303C235 289 240 285 248 280" />

        <g className="living-workspace__focus" transform="translate(248 280)">
          <circle className="living-workspace__focus-ring" r="17" />
          <circle className="living-workspace__focus-point" r="4" />
        </g>

        <path className="living-workspace__open-mark" d="M274 414C286 406 302 406 316 414" />
      </svg>
      <figcaption className="sr-only">
        An open working surface where material is related to a question, bounded and
        allowed to come to Rest without becoming a solved answer.
      </figcaption>
    </figure>
  );
}
