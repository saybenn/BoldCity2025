// /components/financing/FinancingFAQ.tsx

import { useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FinancingFAQProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  items?: FaqItem[];
  className?: string;
  allowMultipleOpen?: boolean;
  defaultOpenIds?: string[];
  onFaqToggle?: (payload: {
    id: string;
    question: string;
    open: boolean;
    location: "FinancingFAQ";
  }) => void;
};

const defaultItems: FaqItem[] = [
  {
    id: "credit-qualification",
    question: "Do I need good credit to qualify?",
    answer:
      "Some financing paths include a credit review, but qualification depends on the specific option and situation.",
  },
  {
    id: "every-project",
    question: "Is financing available for every project?",
    answer:
      "Not every financing option is available for every project. It depends on scope, circumstances, and other factors.",
  },
  {
    id: "down-payment",
    question: "How much is the down payment for in-house financing?",
    answer:
      "When in-house financing is available, down payments typically range from 45% to 65%, depending on the project.",
  },
  {
    id: "hybrid-financing",
    question: "What is hybrid financing?",
    answer:
      "Hybrid financing is a less common option where different parts of the project may be financed through different paths.",
  },
  {
    id: "find-out-options",
    question: "How do I find out what applies to my project?",
    answer:
      "The best next step is to contact our team so we can review the situation and explain what may be available.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={cx(
        "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200",
        open && "rotate-180",
      )}
    >
      <path
        d="M5 7.5 10 12.5l5-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type FinancingFaqItemRowProps = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

function FinancingFaqItemRow({
  item,
  open,
  onToggle,
}: FinancingFaqItemRowProps) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-inset sm:px-6"
      >
        <span className="text-base font-medium leading-7 text-slate-900 sm:text-lg">
          {item.question}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cx(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { FaqItem, FinancingFAQProps };

export default function FinancingFAQ({
  eyebrow = "Frequently Asked Questions",
  title = "Answers to common financing questions",
  body = "We keep this simple. These are some of the most common questions customers ask when trying to understand what options may apply to their project.",
  items = defaultItems,
  className,
  allowMultipleOpen = false,
  defaultOpenIds = items[0] ? [items[0].id] : [],
  onFaqToggle,
}: FinancingFAQProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  if (!items.length) return null;

  const isOpen = (id: string) => openIds.includes(id);

  const toggleItem = (item: FaqItem) => {
    const currentlyOpen = isOpen(item.id);
    const nextOpen = !currentlyOpen;

    setOpenIds((prev) => {
      if (allowMultipleOpen) {
        return currentlyOpen
          ? prev.filter((openId) => openId !== item.id)
          : [...prev, item.id];
      }

      return currentlyOpen ? [] : [item.id];
    });

    onFaqToggle?.({
      id: item.id,
      question: item.question,
      open: nextOpen,
      location: "FinancingFAQ",
    });
  };

  return (
    <section
      className={cx("bg-white", className)}
      aria-labelledby="financing-faq-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {eyebrow}
          </p>

          <h2
            id="financing-faq-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
            {body}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {items.map((item) => (
            <FinancingFaqItemRow
              key={item.id}
              item={item}
              open={isOpen(item.id)}
              onToggle={() => toggleItem(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
