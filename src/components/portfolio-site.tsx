"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Maximize2,
  Minus,
  X
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  subtitle: string;
  scope: string;
  metric: string;
  cover: string;
  tone: string;
  slides: string[];
};

const metrics = [
  { value: 14, suffix: "年", label: "设计行业经验" },
  { value: 1, prefix: "近", suffix: "亿元", label: "参与项目年销售规模" },
  { value: 100, suffix: "万+", label: "用户产品经验" },
  { value: 16, suffix: "人", label: "设计团队管理" },
  { value: 5, suffix: "条", label: "品牌 / 产品 / UI / 电商 / 内容营销全链路" },
  { value: 2, suffix: "类", label: "海外众筹与商业化增长项目" }
];

const projects: Project[] = [
  {
    title: "PopuPiano",
    subtitle: "音乐密码",
    scope: "Branding / Product / Packaging / UX / Crowdfunding",
    metric: "海外众筹与智能音乐产品体验",
    cover: "/work/popupiano.svg",
    tone: "from-zinc-300 via-neutral-600 to-black",
    slides: ["/work/popupiano.svg", "/work/keynote-01.svg", "/work/device-01.svg"]
  },
  {
    title: "CodePlay",
    subtitle: "编玩边学",
    scope: "Education Product / UI System / Growth / Content",
    metric: "百万级儿童编程学习产品",
    cover: "/work/codeplay.svg",
    tone: "from-cyan-200 via-slate-600 to-black",
    slides: ["/work/codeplay.svg", "/work/system-01.svg", "/work/keynote-02.svg"]
  },
  {
    title: "Brand Systems",
    subtitle: "其他作品",
    scope: "Visual Identity / E-commerce / Campaign / Experience",
    metric: "品牌、电商与内容营销全链路",
    cover: "/work/brand-system.svg",
    tone: "from-stone-200 via-zinc-700 to-black",
    slides: ["/work/brand-system.svg", "/work/device-02.svg", "/work/system-02.svg"]
  }
];

const experiences = [
  {
    years: "2020 - Now",
    company: "深圳视感文化科技有限公司",
    role: "品牌总监 / 品牌与产品体验负责人",
    details: ["负责品牌策略、产品体验、视觉系统与商业化落地", "管理 16 人设计团队，建立跨项目设计生产机制", "参与 PopuPiano 等海外众筹与智能硬件项目"]
  },
  {
    years: "2017 - 2019",
    company: "编玩边学",
    role: "设计总监",
    details: ["负责儿童编程产品体验、课程品牌与增长素材", "搭建设计系统，提升产品一致性与运营转化效率", "支撑百万级用户产品体验迭代"]
  },
  {
    years: "2010 - 2016",
    company: "品牌 / UI / 电商项目",
    role: "Senior Designer / Creative Lead",
    details: ["覆盖品牌视觉、产品 UI、电商页面与内容营销", "为多个商业项目建立从概念到上线的设计交付流程", "积累跨行业产品表达与增长设计经验"]
  }
];

const awards = [
  "南山创新创业大赛二等奖",
  "工业设计相关奖项",
  "海外众筹项目",
  "行业展示项目",
  "品牌相关荣誉"
];

const contacts = ["Email", "Behance", "Figma", "LinkedIn"];

export function PortfolioSite() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useSmoothScroll();
  useGsapReveals();
  usePointerVars();

  return (
    <main className="site-shell min-h-screen bg-background text-foreground">
      <div className="grain" />
      <div className="ambient-cursor" />
      <Navigation />
      <Hero />
      <About />
      <FeaturedProjects onOpen={setActiveProject} />
      <Experience />
      <Awards />
      <Philosophy />
      <Contact />
      <GalleryOverlay
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}

function Navigation() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-5 md:px-8">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/[0.62] backdrop-blur-xl">
        <a href="#top" className="font-mono text-white">
          TT
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {["About", "Projects", "Experience", "Awards", "Contact"].map(
            (item) => (
              <a
                className="transition-colors hover:text-white"
                href={`#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            )
          )}
        </div>
        <a className="font-mono text-white/80" href="mailto:hello@tomtang.design">
          Available
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-20"
    >
      <motion.div
        aria-hidden
        className="cinematic-field"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="container-lux relative z-10">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 36, filter: "blur(18px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-5">Personal Brand Portfolio / 2026</p>
          <h1 className="text-7xl font-semibold leading-[0.95] tracking-normal text-white md:text-8xl lg:text-9xl">
            Tom Tang
          </h1>
          <div className="mt-8 grid gap-7 md:grid-cols-[1fr_0.9fr] md:items-end">
            <h2 className="text-2xl font-medium text-white/[0.82] md:text-4xl">
              Brand & Product Design Lead
            </h2>
            <p className="max-w-xl text-lg leading-8 text-white/[0.62] md:text-xl md:leading-9">
              通过设计、产品体验与品牌叙事，推动产品价值与商业增长。
            </p>
          </div>
        </motion.div>
        <div className="mt-16 flex items-center gap-5 text-xs text-white/[0.44]">
          <Minus className="h-4 w-4" />
          <span className="font-mono">Scroll to enter</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-lux">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div data-reveal>
            <p className="eyebrow mb-4">About / Value Architecture</p>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight text-white md:text-6xl">
              不只做视觉，而是把设计放进产品价值与商业增长里。
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((item, index) => (
              <motion.div
                className="glass-line rounded-[8px] p-6"
                data-reveal
                key={item.label}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
              >
                <div className="font-mono text-5xl font-semibold text-white md:text-6xl">
                  <CountUp
                    delay={index * 0.08}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    value={item.value}
                  />
                </div>
                <p className="mt-5 text-sm leading-6 text-white/[0.56]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section id="projects" className="section-pad pt-4">
      <div className="container-lux">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div data-reveal>
            <p className="eyebrow mb-4">Featured Projects</p>
            <h2 className="text-4xl font-semibold text-white md:text-6xl">
              Selected Works
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-7 text-white/[0.52] md:text-base"
            data-reveal
          >
            以高级封面、滚动视差与沉浸式浏览呈现。当前为占位图，后续可直接替换为真实作品图片。
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.button
              className="project-cover group grid min-h-[560px] w-full overflow-hidden rounded-[8px] text-left md:grid-cols-[0.88fr_1.12fr]"
              data-reveal
              key={project.title}
              onClick={() => onOpen(project)}
              style={{ perspective: 1200 }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className="relative flex h-full flex-col justify-between p-7 md:p-10">
                <div>
                  <Badge>{String(index + 1).padStart(2, "0")}</Badge>
                  <h3 className="mt-8 text-5xl font-semibold leading-none text-white md:text-7xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-2xl text-white/[0.56]">
                    {project.subtitle}
                  </p>
                </div>
                <div>
                  <p className="max-w-sm text-sm leading-7 text-white/[0.54]">
                    {project.scope}
                  </p>
                  <Separator className="my-6" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase text-white/[0.48]">
                      {project.metric}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition-transform group-hover:scale-110">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[340px] overflow-hidden border-t border-white/10 md:border-l md:border-t-0">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-35",
                    project.tone
                  )}
                />
                <Image
                  src={project.cover}
                  alt={`${project.title} placeholder cover`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="section-pad">
      <div className="container-lux">
        <div className="mb-14" data-reveal>
          <p className="eyebrow mb-4">Experience Timeline</p>
          <h2 className="text-4xl font-semibold text-white md:text-6xl">
            Career System
          </h2>
        </div>
        <div className="relative">
          <div className="timeline-line absolute bottom-0 left-3 top-0 w-px md:left-[13.8rem]" />
          <div className="space-y-4">
            {experiences.map((item, index) => (
              <div
                className="grid gap-4 pl-10 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0"
                data-reveal
                key={item.company}
              >
                <div className="font-mono text-sm text-white/[0.46]">
                  {item.years}
                </div>
                <button
                  className="glass-line relative rounded-[8px] p-6 text-left transition-colors hover:border-white/20"
                  onClick={() => setOpen(open === index ? -1 : index)}
                >
                  <span className="absolute -left-[2.15rem] top-7 h-3 w-3 rounded-full border border-white/[0.35] bg-black md:-left-[2.9rem]" />
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                    <div>
                      <h3 className="text-2xl font-medium text-white">
                        {item.company}
                      </h3>
                      <p className="mt-2 text-white/[0.54]">{item.role}</p>
                    </div>
                    <span className="font-mono text-xs text-white/[0.40]">
                      {open === index ? "Collapse" : "Expand"}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {open === index ? (
                      <motion.ul
                        className="mt-7 grid gap-3 text-sm leading-7 text-white/[0.58] md:grid-cols-3"
                        initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                      >
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" className="section-pad pt-0">
      <div className="container-lux">
        <div className="mb-12" data-reveal>
          <p className="eyebrow mb-4">Awards / Recognition</p>
          <h2 className="text-4xl font-semibold text-white md:text-6xl">
            Selected Signals
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {awards.map((award) => (
            <motion.div
              className="glass-line min-h-44 rounded-[8px] p-5"
              data-reveal
              key={award}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              <div className="mb-10 h-px w-12 bg-white/[0.34] shadow-[0_0_24px_rgba(255,255,255,0.35)]" />
              <p className="text-lg leading-7 text-white/[0.78]">{award}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section-pad">
      <div className="container-lux">
        <div className="mx-auto max-w-5xl text-center" data-reveal>
          <p className="eyebrow mb-8">Design Philosophy</p>
          <h2 className="text-4xl font-semibold leading-tight text-white md:text-7xl">
            设计不只是视觉表达。
            <br />
            它应该参与产品价值、
            <br />
            用户体验与商业增长。
          </h2>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="px-5 pb-10 pt-24 md:px-8">
      <div className="container-lux">
        <Separator />
        <div className="grid gap-10 py-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div data-reveal>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="text-4xl font-semibold text-white md:text-6xl">
              Let&apos;s build value.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contacts.map((item) => (
              <MagneticLink key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function MagneticLink({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={label === "Email" ? "mailto:hello@tomtang.design" : "#"}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
        event.currentTarget.style.setProperty("--mx", `${x}px`);
        event.currentTarget.style.setProperty("--my", `${y}px`);
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.setProperty("--mx", "0px");
        event.currentTarget.style.setProperty("--my", "0px");
      }}
      className="magnetic glass-line flex items-center justify-between rounded-full px-5 py-4 text-sm text-white/[0.72] transition-colors hover:text-white"
    >
      {label}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function GalleryOverlay({
  project,
  onClose
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const wheelLock = useRef(false);
  const slides = project?.slides ?? [];
  const activeSlide = slides[index] ?? slides[0];

  const go = useCallback(
    (direction: 1 | -1) => {
      if (!slides.length) return;
      setIndex((current) => (current + direction + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (!project) return;
    setIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="gallery-backdrop fixed inset-0 z-50 flex flex-col overflow-hidden px-4 py-5 md:px-8"
        initial={{ opacity: 0, filter: "blur(14px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(14px)" }}
        onWheel={(event) => {
          if (wheelLock.current) return;
          wheelLock.current = true;
          go(event.deltaY > 0 ? 1 : -1);
          window.setTimeout(() => {
            wheelLock.current = false;
          }, 620);
        }}
      >
        <Image
          aria-hidden
          src={activeSlide}
          alt=""
          fill
          priority
          className="pointer-events-none -z-10 scale-110 object-cover opacity-22 blur-3xl"
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">{project.scope}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white md:text-4xl">
              {project.title}
            </h3>
          </div>
          <Button onClick={onClose} size="icon" variant="ghost" aria-label="Close gallery">
            <X />
          </Button>
        </div>

        <div className="relative grid flex-1 place-items-center py-8">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              className="relative aspect-[16/10] w-full max-w-6xl overflow-hidden rounded-[8px] border border-white/12 bg-black shadow-[0_40px_140px_rgba(0,0,0,0.55)]"
              key={activeSlide}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(20px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={activeSlide}
                alt={`${project.title} gallery slide ${index + 1}`}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button onClick={() => go(-1)} variant="ghost">
            <ArrowLeft />
            Prev
          </Button>
          <div className="font-mono text-xs text-white/50">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
          <Button onClick={() => go(1)} variant="ghost">
            Next
            <ArrowRight />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CountUp({
  value,
  prefix = "",
  suffix = "",
  delay = 0
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 70;
    const start = window.setTimeout(() => {
      const tick = () => {
        frame += 1;
        const progress = 1 - Math.pow(1 - frame / total, 4);
        setDisplay(Math.round(value * progress));
        if (frame < total) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => window.clearTimeout(start);
  }, [delay, inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.18,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    let active = true;
    const raf = (time: number) => {
      if (!active) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const id = requestAnimationFrame(raf);
    return () => {
      active = false;
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
}

function useGsapReveals() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 34, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 84%"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

function usePointerVars() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}
