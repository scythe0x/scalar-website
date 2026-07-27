"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyEmailButtonProps = {
  email: string;
  label: string;
  copiedLabel: string;
};

export function CopyEmailButton({
  email,
  label,
  copiedLabel,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button type="button" className="contact-action" onClick={copyEmail}>
      <span>{copied ? copiedLabel : label}</span>
      {copied ? (
        <Check aria-hidden="true" size={18} />
      ) : (
        <Copy aria-hidden="true" size={18} />
      )}
    </button>
  );
}
