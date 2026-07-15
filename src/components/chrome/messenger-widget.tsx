"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_REPLIES = [
  "I need a plumber today",
  "Track my booking",
  "Talk to support",
];

export function MessengerWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-4 z-[540] sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 100, damping: 16 }}
            className={cn(
              "mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-white/10",
              "bg-slate-950/90 shadow-2xl shadow-indigo-500/20 backdrop-blur-2xl"
            )}
            role="dialog"
            aria-label="FixItNow Messenger"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-indigo-600/40 to-emerald-500/30 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">FixItNow Chat</p>
                <p className="text-xs text-emerald-300">Online · usually replies in minutes</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 px-4 py-4">
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white/10 px-3 py-2 text-sm text-slate-100">
                Hi! Tell us your stop area and home location — we&apos;ll match a verified technician fast.
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => setMessage(reply)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition duration-300 ease-out hover:scale-[1.02] hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="flex items-center gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                setMessage("");
              }}
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message…"
                className="h-10 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-emerald-400/50"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 transition duration-300 ease-out hover:scale-105 hover:bg-emerald-400"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close messenger" : "Open messenger"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "ml-auto flex h-14 w-14 items-center justify-center rounded-2xl",
          "bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-xl shadow-indigo-500/30",
          "border border-white/20 backdrop-blur-md transition duration-300 ease-out"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
