import Image from "next/image";
import Link from "next/link";

type WorkListItemProps = {
  work: {
    cover: string;
    coverAlt: string;
    href?: string;
    meta?: string;
    title: string;
  };
};

export function WorkListItem({ work }: WorkListItemProps) {
  const content = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-[#161616]">
        <Image
          alt={work.coverAlt}
          className="object-cover transition duration-700 ease-out md:group-hover:scale-[1.018] motion-reduce:transition-none"
          fill
          sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1535px) calc((100vw - 7rem) / 2), 680px"
          src={work.cover}
        />
      </div>

      <div className="mt-5 text-center">
        <h2 className="text-[20px] font-normal leading-tight tracking-[0] text-[#f4f5f2] text-balance">
          {work.title}
        </h2>
        {work.meta ? (
          <p className="mt-2 text-[15px] font-light leading-6 tracking-[0.02em] text-[#f4f5f2] sm:text-[16px]">
            {work.meta}
          </p>
        ) : null}
      </div>
    </>
  );

  return (
    <article>
      {work.href ? (
        <Link
          className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#cfffc4]"
          href={work.href}
        >
          {content}
        </Link>
      ) : (
        <div className="group">
          {content}
        </div>
      )}
    </article>
  );
}
