"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  titleClassName?: string;

  title?: string;
  hideTitle?: boolean;

  src?: string;
  size?: number;

  href?: string;
  clickable?: boolean;
}

export default function Logo({
  className,
  imageClassName,
  titleClassName,

  title = "Form Canvas",
  hideTitle = false,

  src = "/logo.png",
  size = 56,

  href = "/",
  clickable = true,
}: LogoProps) {
  const content = (
    <motion.div
      className={cn(
        "inline-flex items-center gap-3 select-none",
        clickable && "cursor-pointer",
        className,
      )}
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        clickable
          ? {
              scale: 1.02,
            }
          : undefined
      }
      whileTap={
        clickable
          ? {
              scale: 0.98,
            }
          : undefined
      }
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
          rotate: -8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 0.08,
          type: "spring",
          stiffness: 280,
          damping: 22,
        }}
      >
        <Image
          src={src}
          alt={title}
          width={size}
          height={size}
          priority
          draggable={false}
          className={cn("shrink-0", imageClassName)}
        />
      </motion.div>

      {!hideTitle && (
        <motion.h1
          initial={{
            opacity: 0,
            x: -8,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.18,
            duration: 0.35,
          }}
          className={cn("text-xl font-semibold tracking-tight", titleClassName)}
        >
          {title}
        </motion.h1>
      )}
    </motion.div>
  );

  if (!clickable) return content;

  return <Link href={href}>{content}</Link>;
}
