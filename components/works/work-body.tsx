import Image from "next/image";
import type { ReactNode } from "react";

type TextBlock = {
  type: "paragraph" | "heading-two" | "heading-three" | "quote";
  value: string;
};

type ListBlock = {
  type: "unordered-list" | "ordered-list";
  items: string[];
};

type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

type DividerBlock = {
  type: "divider";
};

type BodyBlock = TextBlock | ListBlock | ImageBlock | DividerBlock;

function isBlockStart(line: string) {
  return /^(## |### |[-*] |\d+\. |> |---$|!\[|<WorkImage\s)/.test(
    line.trim(),
  );
}

function parseWorkImage(line: string): ImageBlock | null {
  if (!line.trim().startsWith("<WorkImage")) return null;

  const attributes = Object.fromEntries(
    Array.from(line.matchAll(/(\w+)=(?:"([^"]*)"|\{(\d+)\})/g)).map(
      (match) => [match[1], match[2] ?? match[3]],
    ),
  );

  if (!attributes.src || !attributes.alt) return null;

  return {
    type: "image",
    src: attributes.src,
    alt: attributes.alt,
    caption: attributes.caption,
    width: Number(attributes.width) || 1600,
    height: Number(attributes.height) || 1200,
  };
}

function parseMarkdownImage(line: string): ImageBlock | null {
  const match = line
    .trim()
    .match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/);

  if (!match) return null;

  return {
    type: "image",
    alt: match[1],
    src: match[2],
    caption: match[3],
    width: 1600,
    height: 1200,
  };
}

function parseBody(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: BodyBlock[] = [];

  for (let index = 0; index < lines.length; ) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    const workImage = parseWorkImage(line);
    const markdownImage = parseMarkdownImage(line);
    if (workImage || markdownImage) {
      blocks.push(workImage ?? markdownImage!);
      index += 1;
      continue;
    }

    if (line === "---") {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading-three", value: line.slice(4) });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading-two", value: line.slice(3) });
      index += 1;
      continue;
    }

    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*] /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*] /, ""));
        index += 1;
      }
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\. /, ""));
        index += 1;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push({ type: "quote", value: line.slice(2) });
      index += 1;
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !isBlockStart(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", value: paragraph.join(" ") });
  }

  return blocks;
}

function inlineContent(value: string): ReactNode[] {
  const tokens = value.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return tokens.filter(Boolean).map((token, index) => {
    const strong = token.match(/^\*\*([^*]+)\*\*$/);
    if (strong) return <strong key={index}>{strong[1]}</strong>;

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const safeHref =
        link[2].startsWith("/") || /^https?:\/\//.test(link[2])
          ? link[2]
          : "#";
      const external = /^https?:\/\//.test(safeHref);

      return (
        <a
          className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          href={safeHref}
          key={index}
          rel={external ? "noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {link[1]}
        </a>
      );
    }

    return token;
  });
}

type WorkBodyProps = {
  source: string;
  variant?: "standard" | "compact";
};

export function WorkBody({ source, variant = "standard" }: WorkBodyProps) {
  const blocks = parseBody(source);
  const compact = variant === "compact";

  return (
    <div className={compact ? "w-full" : "mx-auto w-full max-w-[1180px]"}>
      {blocks.map((block, index) => {
        if (block.type === "heading-two") {
          return (
            <h2
              className={
                compact
                  ? "mt-9 text-base font-medium leading-6 tracking-[-0.01em] text-[#cfffc4] first:mt-0"
                  : "mt-24 border-t border-line pt-8 text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance md:mt-36 md:pt-10"
              }
              key={index}
            >
              {block.value}
            </h2>
          );
        }

        if (block.type === "heading-three") {
          return (
            <h3
              className={
                compact
                  ? "mt-7 text-sm font-medium leading-6 text-[#f4f5f2]"
                  : "mt-12 max-w-3xl text-2xl font-medium leading-tight tracking-[-0.025em] md:mt-16 md:text-3xl"
              }
              key={index}
            >
              {block.value}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              className={
                compact
                  ? "mt-3 text-base leading-7 text-white/70 text-pretty"
                  : "mt-6 max-w-[70ch] text-base leading-8 text-ink-muted text-pretty md:text-lg md:leading-9"
              }
              key={index}
            >
              {inlineContent(block.value)}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              className={
                compact
                  ? "my-7 text-lg font-medium leading-snug tracking-[-0.015em] text-[#f4f5f2]"
                  : "my-12 max-w-4xl text-2xl font-medium leading-snug tracking-[-0.025em] md:my-16 md:text-4xl"
              }
              key={index}
            >
              {inlineContent(block.value)}
            </blockquote>
          );
        }

        if (
          block.type === "unordered-list" ||
          block.type === "ordered-list"
        ) {
          const List = block.type === "ordered-list" ? "ol" : "ul";
          return (
            <List
              className={
                (compact
                  ? "mt-4 space-y-2 pl-5 text-sm leading-7 text-white/70 marker:text-[#cfffc4] "
                  : "mt-8 max-w-[70ch] space-y-3 pl-5 text-base leading-8 text-ink-muted marker:text-ink ") +
                (block.type === "ordered-list" ? "list-decimal" : "list-disc")
              }
              key={index}
            >
              {block.items.map((item) => (
                <li key={item}>{inlineContent(item)}</li>
              ))}
            </List>
          );
        }

        if (block.type === "divider") {
          return (
            <hr
              className={compact ? "my-8 border-0 border-t border-white/10" : "my-16 border-0 border-t border-line"}
              key={index}
            />
          );
        }

        if (block.type !== "image") return null;

        if (compact) return null;

        return (
          <figure className="my-12 md:my-20" key={index}>
            <Image
              alt={block.alt}
              className="h-auto w-full rounded-sm bg-surface object-cover"
              height={block.height}
              sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1280px) calc(100vw - 8rem), 1180px"
              src={block.src}
              width={block.width}
            />
            {block.caption ? (
              <figcaption className="mt-3 max-w-[70ch] text-sm leading-6 text-ink-soft">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
