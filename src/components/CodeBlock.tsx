"use client";

import { useEffect, useState } from "react";

interface CodeBlockProps {
  value: {
    code?: string;
    language?: string;
    filename?: string;
  };
}

export default function CodeBlock({ value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");

  const code = value?.code ?? "";
  const language = value?.language ?? "text";
  const filename = value?.filename;

  useEffect(() => {
    let cancelled = false;

    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        });

        if (!cancelled) {
          setHighlightedCode(html);
        }
      } catch {
        if (!cancelled) {
          setHighlightedCode("");
        }
      }
    }

    highlightCode();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-neutral-800 bg-[#1f2329] shadow-sm">

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">

        <div className="flex items-center gap-3">

          {filename && (
            <span className="text-sm text-neutral-300">
              {filename}
            </span>
          )}

          {language && (
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              {language}
            </span>
          )}

        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-3 py-1.5 text-sm text-neutral-300 transition hover:bg-neutral-700 hover:text-white"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>

      </div>

      {/* Code */}
      {highlightedCode ? (
        <div
          className="overflow-x-auto p-5 text-sm leading-7"
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      ) : (
        <pre className="overflow-x-auto p-5 text-sm leading-7 text-neutral-100">
          <code>{code}</code>
        </pre>
      )}

    </div>
  );
}
